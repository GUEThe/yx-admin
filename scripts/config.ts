import path from 'path'

export const PROJECT_DIR = path.join(__dirname, '..')
export const API_DST_DIR = path.join(PROJECT_DIR, 'src/.generated')
export const API_TPL_DIR = __dirname
export const API = {
  DOC_JSON_URL: 'https://localhost:44384/swagger/v1/swagger.json',
  DOC_PATH: path.join(__dirname, 'doc.json'),
  DST_DIR: API_DST_DIR,
  TPL_DIR: API_TPL_DIR
}

export const PAGES = {
  DST_PATH: path.join(PROJECT_DIR, 'src/pages.ts'),
  DIR: path.join(PROJECT_DIR, 'src/pages')
}

export const IMGS = {
  DST_PATH: path.join(PROJECT_DIR, 'src/Assets.ts'),
  DIR: path.join(PROJECT_DIR, 'src/assets')
}
