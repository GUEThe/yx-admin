## Project setup

### API 请求与 model 生成思路

```bash
请求swagger的json文档保存到本地然后git diff比较，根据模板生成model与api请求
```

### swagger json 文档地址修改

```bash
script/目录下的config.ts文件的API对象里的DOC_JSON_URL属性
```

### 生成 API 请求与 model

```bash
yarn gen_api
```

### Install dependencies

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn run build
```

### Lints and fixes files

```bash
yarn run lint
```

### Run your unit tests

```bash
yarn run test:unit
```

### Run your end-to-end tests

```bash
yarn run test:e2e
```

### Generate all svg components

```bash
yarn run svg
```
