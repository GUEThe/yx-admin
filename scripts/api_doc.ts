export namespace swagger {
  export interface Info {
    description: string;
    title: string;
    contact: any;
    license: any;
    version: string;
  }
  export interface Schema {
    type: string;
    $ref?: string;
    items?: {
      type?: string;
      $ref?: string;
    };
  }

  export interface Parameter {
    description: string;
    name: string;
    in: 'body' | 'header' | 'path' | 'query';
    required: boolean;
    schema: Schema;
    [key: string]: any;
  }

  type StatusCode = '200' | '500' | '400' | '406' | '401' | string;
  export interface Response {
    description: string;
    schema: Schema;
    [key: string]: any;
  }

  type Method = 'post' | 'get' | 'put' | 'delete';
  export interface Request {
    description: string;
    consumes: string[];
    produces: string[];
    tags: string[];
    summary: string;
    operationId?: string;
    parameters?: Parameter[];
    responses: { [P in StatusCode]: Response };
    [key: string]: any;
  }
  export interface Paths {
    [index: string]: { [key: string]: Request };
  }

  export interface Property {
    type: string;
    format?: string;
    example?: string;
    $ref?: string;
    [key: string]: any;
  }

  export interface Definition {
    type: string;
    required: string[];
    properties: { [index: string]: Property };
    [key: string]: any;
  }

  export interface Doc {
    swagger: string;
    info: Info;
    host: string;
    basePath: string;
    paths: Paths;
    definitions: { [index: string]: Definition };
  }
}
