import { genCode } from './generator';
import path from 'path';
import fs from 'fs';
import { PROJECT_DIR } from './config';
import { camelizeName, snakelizeWord } from './helpers';

class Route {
  constructor(readonly module: string, readonly path: string, readonly component: string, readonly name: string) {}
}

const routesTpl = `
/*DO NOT EDIT manual*/
import { RouteConfig } from "vue-router";
{% for route in routes %}
import {{route.component}} from "{{route.module}}"
{% endfor %}


{% for route in routes %}
if(({{route.component}} as any).options){
  ({{route.component}} as any).options.name = "{{route.name}}";
}else{
  console.warn("{{route.name}} no options");
}
{% endfor %}

interface RouteConfigEx extends RouteConfig{
  name:string;
}
// : { [key: string]: RouteConfigEx }
export const routeMap = {
{% for route in routes %}
  {{route.name}}: {
    path: "{{route.path}}",
    name: "{{route.name}}",
    component:{{route.component}},
    meta: {
      public: false
    }
  },
{% endfor %}
}
export const routes = [
{% for route in routes %}
  routeMap.{{route.name}},
{% endfor %}
]

`;
function genRoutes(routes: Route[]) {
  const destPath = path.join(PROJECT_DIR, 'src/routes.ts');
  genCode(routesTpl, destPath, { routes });
}

const routePathsTpl = `
/*DO NOT EDIT manual*/
module.exports = {
{% for route in routes %}
  {{route.name}}: "{{route.path}}",
{% endfor %}
}
`;
function genRoutePathsForTest(routes: Route[]) {
  const destPath = path.join(PROJECT_DIR, 'tests/e2e/specs/routes.js');
  genCode(routePathsTpl, destPath, { routes });
}
function main() {
  const routes: Route[] = [];
  const viewsDir = path.join(PROJECT_DIR, 'src/views');
  function genRouteInDir(dirName: string, parentDir: string, parentBizModules: string[]) {
    const currentDirPath = path.join(parentDir, dirName);
    const bizModule = dirName;
    console.info('biz module:', bizModule);
    for (const subfile of fs.readdirSync(currentDirPath)) {
      if (subfile.endsWith('.vue')) {
        console.info('biz ', bizModule, ' submodule:', subfile);
        const bizModules = [];
        bizModules.push(...parentBizModules);
        bizModules.push(bizModule);
        const module = './views/' + path.join(...bizModules, subfile);
        const subComponent = subfile.substr(0, subfile.length - 4); // remove .vue suffix
        let component = camelizeName(...bizModules, subComponent);
        component = component.replace(/-/g, '_');

        const urlPaths = [];
        urlPaths.push(...bizModules);
        if (subComponent.toLowerCase() !== 'index') {
          urlPaths.push(subComponent);
        }
        let urlPath = '/' + urlPaths.map(snakelizeWord).join('/');
        const names = [];
        names.push(...bizModules);
        if (subComponent.toLowerCase() !== 'index') {
          names.push(subComponent);
        }

        if (/^\d/.test(bizModules[0])) {
          names[0] = 'Http' + names[0];
        }
        let name = names.map(snakelizeWord).join('_');
        name = name.replace(/-/g, '_');

        routes.push(new Route(module, urlPath, component, name));
      } else {
        const filePath = path.join(currentDirPath, subfile);
        if (fs.statSync(filePath).isDirectory()) {
          parentBizModules.push(bizModule);
          genRouteInDir(subfile, currentDirPath, parentBizModules);
        }
      }
    }
  }
  for (const file of fs.readdirSync(viewsDir)) {
    if (file.endsWith('.vue')) {
      console.info('vue ts module:', file); // eg About.vue
      const module = './views/' + file;
      let component = file.substr(0, file.length - 4); // remove .vue suffix
      const path = '/' + snakelizeWord(component);
      if (/^\d/.test(component)) {
        component = 'Http' + component;
      }
      const name = snakelizeWord(component);
      routes.push(new Route(module, path, component, name));
    } else {
      const filePath = path.join(viewsDir, file);

      if (fs.statSync(filePath).isDirectory()) {
        genRouteInDir(file, viewsDir, []);
      }
    }
  }
  genRoutes(routes);
  genRoutePathsForTest(routes);
}

main();
