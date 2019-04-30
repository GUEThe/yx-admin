import path from 'path';
import { API } from './config';
import docJson from './doc.json';
import './api_doc';
import { swagger } from './api_doc';
import { genCode } from './generator';
import { camelizeName, snakelizeName, camelizePath, sh } from './helpers';

const DST_DIR = API.DST_DIR;
const TPL_DIR = API.TPL_DIR;
const DOC_PATH = API.DOC_PATH;

const fieldTypeMap: { [index: string]: string } = {
  integer: 'number',
  long: 'number',
  int64: 'number',
  int32: 'number',
  int: 'number',
  float32: 'number',
  float64: 'number',
  float: 'number',
};

function typeToTstype(type: string) {
  return fieldTypeMap[type] || type;
}

function ensureFieldType(field: swagger.Property) {
  const $ref = field.$ref;
  if ($ref) {
    field.tsType = $refToDataType($ref, true);
    return;
  }
  const items = field.items;
  if (items) {
    // is array
    let itemType;
    if (items.$ref) {
      itemType = $refToDataType(items.$ref, true);
    } else {
      itemType = items.type;
    }
    field.itemType = typeToTstype(itemType);
    field.tsType = field.itemType + '[]';
    return;
  }
  field.tsType = typeToTstype(field.type);
}

function parseModels(docJson: swagger.Doc) {
  const namespaceModels: { [key: string]: any } = {};
  const definitions = docJson.definitions;
  for (const key in definitions) {
    if (!definitions.hasOwnProperty(key)) {
      continue;
    }
    // const [namespace, modelName] = key.split(".", 2);
    const modelName = key;
    let namespace = 'models';
    if (key.endsWith('Notify')) {
      namespace = 'ws';
    } else if (key.endsWith('Form')) {
      namespace = 'forms';
    }
    if (ignoredEmptyInterface.includes(modelName)) {
      console.info('Ignore Interface ', modelName);
      continue;
    }
    // console.info("knm:", key, namespace, modelName);
    const model = definitions[key];
    model.name = modelName;
    const fields = model.properties;
    for (const fkey in fields) {
      if (!fields.hasOwnProperty(fkey)) {
        continue;
      }
      const field = fields[fkey];
      ensureFieldType(field);
    }

    const models = namespaceModels[namespace] || [];
    models.push(model);
    namespaceModels[namespace] = models;
  }

  const tplPath = path.join(TPL_DIR, 'models.jinja2');
  const dstPath = path.join(DST_DIR, 'models.ts');
  genCode(tplPath, dstPath, { namespaceModels });
  console.info('Generate Models Done!');
  sh(`git diff --stat ${dstPath}`);
}

const restMethodOpMap: { [key: string]: string } = {
  get: 'get',
  post: 'create',
  put: 'update',
  delete: 'delete',
};

function $refToDataType($ref: string, isField: boolean = false) {
  const name = $ref.split('/', 3)[2];
  if (isField) {
    return name;
  } else {
    return 'm.' + name;
  }
}

function pathToTplString(path: string) {
  const chars = [];
  for (let i = 0; i < path.length; i++) {
    const char = path[i];
    if (char === '{') {
      chars.push('${options.');
    } else {
      chars.push(char);
    }
  }
  return chars.join('');
}

function tsTypeFromSchema(schema: swagger.Schema) {
  if (schema.type === 'array' && schema.items) {
    const items = schema.items;
    let itemType;
    if (items.$ref) {
      itemType = $refToDataType(items.$ref);
    } else if (items.type) {
      itemType = typeToTstype(items.type);
    } else {
      console.error('Unkown schema items:', items);
    }
    return `${itemType}[]`;
  } else {
    if (schema.$ref) {
      return $refToDataType(schema.$ref);
    } else {
      return typeToTstype(schema.type);
    }
  }
}

function ensureParamTsType(param: swagger.Parameter) {
  if (param.type) {
    param.tsType = typeToTstype(param.type);
  } else {
    param.tsType = tsTypeFromSchema(param.schema);
  }
}

const commonResponseNames = ['m.CommonResp', 'm.DataResp'];
const ignoredEmptyInterface = ['CheckinRuleCategory', 'LessonCategory', 'CheckinWay', 'CheckinStatus'];

function parseResponse(resp: swagger.Response, namePrefix: string) {
  const schema = resp.schema;
  resp.name = camelizeName(namePrefix, 'Response');
  if (schema.type === 'array' && schema.items && schema.items.$ref) {
    const itemType = $refToDataType(schema.items.$ref);
    resp.dataType = `${itemType}[]`;
    resp.itemType = itemType;
    resp.isArray = true;
  } else if (schema.$ref) {
    resp.dataType = $refToDataType(schema.$ref);
    if (commonResponseNames.includes(resp.dataType)) {
      resp.isCommon = true;
      resp.name = resp.dataType;
    }
  } else {
    console.error('Unkown schema:', schema);
  }

  if (!resp.isCommon) {
    if (resp.isArray) {
      resp.name = `m.PageResponse<${resp.dataType}>`;
    } else {
      resp.name = `m.DataResponse<${resp.dataType}>`;
    }
  }

  return resp;
}

const listRespModels = ['DepartmentNode'];

function isListResponse(resp: swagger.Response) {
  const schema = resp.schema;
  if (schema) {
    if (schema.type === 'array') {
      return true;
    } else if (schema.$ref) {
      const $ref = schema.$ref;
      for (const model of listRespModels) {
        if ($ref.includes(model)) {
          return true;
        }
      }
    }
  }
  return false;
}

function parseRequests(docJson: swagger.Doc) {
  const paths = docJson.paths as swagger.Paths;
  const groups = [];
  for (const path in paths) {
    if (!paths.hasOwnProperty(path)) {
      continue;
    }
    if (path.startsWith('/ignore/')) {
      console.warn(`Ignore ${path}`);
      continue;
    }
    const entryGroup = paths[path];
    const reqs = [];
    for (const method in entryGroup) {
      if (!entryGroup.hasOwnProperty(method)) {
        return;
      }
      const req = entryGroup[method];
      const operationId = req.operationId;
      const respOk = req.responses['200'] || req.responses['201'];
      if (!respOk) {
        console.error('NO response 200 or 201 for ', req);
        continue;
      }
      if (operationId) {
        req.isRest = false;
        req.funName = snakelizeName(...operationId.split('/'));
      } else {
        req.isRest = true;
        const op = restMethodOpMap[method] || method;
        const isList = isListResponse(respOk);
        req.funName = op + camelizePath(path) + (isList ? 'List' : '');
      }
      req.path = path;
      req.pathTpl = pathToTplString(path);
      req.resp = parseResponse(respOk, req.funName);
      console.info('req ', req.funName, req.resp.name, req.resp.dataType);
      req.method = method.toLowerCase(); //method.toUpperCase();
      req.params = req.parameters;
      req.needAuth = !!req.security;
      if (!req.parameters) {
        req.parameters = new Array<swagger.Parameter>();
      }
      for (const param of req.parameters) {
        ensureParamTsType(param);
      }
      req.pathParams = req.parameters.filter(p => p.in == 'path');
      req.nonPathParams = req.parameters.filter(p => p.in != 'path');
      req.queryParams = req.parameters.filter(p => p.in == 'query');
      req.headerParams = req.parameters.filter(p => p.in == 'header');
      req.bodyParams = req.parameters.filter(p => p.in == 'body');
      reqs.push(req);
    }
    groups.push({
      reqs,
    });
  }

  const tplPath = path.join(TPL_DIR, 'requests.jinja2');
  const destPath = path.join(DST_DIR, 'requests.ts');
  genCode(tplPath, destPath, {
    doc: docJson,
    groups,
  });
  console.info('Generate Requests Done!');
  sh(`git diff --stat ${destPath}`);
  return groups;
}

const reqNameListSourceTpl = `
// 此文件为自动生成而成。请不要手动修改。
/**
 *
 *  API 请求名枚举列表
 */
export const enum ReqNames{
    {% for group in groups %}
      {% for req in group.reqs %}
      {{req.funName}} = "{{req.funName}}",
      {% endfor %}
    {% endfor %}
}

`;

function genReqNames(groups: any) {
  const dstPath = path.join(DST_DIR, 'req-names.ts');
  genCode(reqNameListSourceTpl, dstPath, { groups });
  console.info('Generate ReqNames done!');
  sh(`git diff --stat ${dstPath}`);
}

const enum ProtoType {
  req,
  notify,
  ack,
}

function parseWebSocketProtos(docJson: swagger.Doc) {
  const parseProtoCode = (summary: string) => {
    const re = /code\s?=\s?(\d+)/;
    const results = re.exec(summary);
    if (results) {
      //  ["code=1000", "1000", index: 7, input: "签到信息请求 code=1000", groups: undefined]
      return results[1]; //
    }
    return null;
  };
  const parseName = (path: string) => {
    const parts = path.split('/');
    const nameParts = parts.slice(2);
    return camelizeName(...nameParts);
  };

  const parseFunName = (path: string, type: ProtoType) => {
    //  ["", "ignore", "checkin", "info", "req"]
    const parts = path.split('/');
    const nameParts = parts.slice(2);
    switch (type) {
      case ProtoType.req:
        nameParts.unshift('send');
        break;
      case ProtoType.notify:
        nameParts.unshift('observe');
        break;
      case ProtoType.ack:
        nameParts.unshift('onReceive');
        break;
    }
    return snakelizeName(...nameParts);
  };
  const paths = docJson.paths as swagger.Paths;
  const protos = [];
  const notifyList = [];
  for (const path in paths) {
    if (!paths.hasOwnProperty(path)) {
      continue;
    }
    if (!path.startsWith('/ignore/')) {
      continue;
    }
    const entryGroup = paths[path];
    const getReq = entryGroup['get'];
    console.info('parse proto ', path);
    if (!getReq.tags.includes('websocket')) {
      console.warn('Ignored api but no websocket tag: ', getReq.tags);
      continue;
    }
    const summary = getReq.summary;
    const description = getReq.description;
    const name = parseName(path);
    const code = parseProtoCode(summary);
    if (!code) {
      console.error('NO CODE in summary ', summary);
      continue;
    }
    if (path.endsWith('/req')) {
      const codes = Object.keys(getReq.responses);
      codes.sort((a, b) => {
        return b.length - a.length;
      });
      console.info('statusCodes :', codes);
      const ackCode = codes[0];
      const params = getReq.parameters || [];
      const payloadParam = params.find(it => it.name === 'payload');
      const payload = tsTypeFromSchema(payloadParam!.schema);
      const resp = getReq.responses[ackCode];
      const ackDescription = resp.description;
      const ackPayload = tsTypeFromSchema(resp.schema);
      const funName = parseFunName(path, ProtoType.req);
      protos.push({
        ackCode,
        description,
        summary,
        funName,
        code,
        payload,
        ackPayload,
        ackDescription,
        name,
      });
    } else if (path.endsWith('/notify')) {
      const resp = getReq.responses[code];
      const payload = tsTypeFromSchema(resp.schema);
      const funName = parseFunName(path, ProtoType.notify);
      notifyList.push({
        funName,
        code,
        payload,
        summary,
        description,
        name,
      });
    }
  }

  // const dstPath = path.join(DST_DIR, "ws-proto.ts");
  // const tplPath = path.join(TPL_DIR, "ws-proto.jinja2");
  // genCode(tplPath, dstPath, { protos, notifyList });
  // console.info("Generate WebSocket Protos done!");
  // sh(`git diff --stat ${dstPath}`);

  // Gen dev notify sender
  // const devDstPath = path.join(TPL_DIR, "dev_notify_sender.ts");
  // const devTplPath = path.join(TPL_DIR, "dev_notify_sender.jinja2");
  // genCode(devTplPath, devDstPath, { protos, notifyList });
}

async function genApi() {
  parseModels(docJson as any);
  const groups = parseRequests(docJson as any);
  genReqNames(groups);
  // parseWebSocketProtos(docJson as any);
}
genApi();
