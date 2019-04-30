import path from 'path';
import fs from 'fs';

import { snakelizeName } from './helpers';
import { PAGES, IMGS } from './config';
import { genCode } from './generator';

function normalizeVarName(name: string) {
  const parts = name.split(/[^a-zA-Z0-9]/);
  const normalizedParts = parts.map(p => p.trim()).filter(p => p.length > 0);
  return snakelizeName(...normalizedParts);
}

const imgListSourceTpl = `
/**
 *   src/assets  资源列表，本文件由脚本自动生成，请不要手动修改，谢谢。
 *
 */
export const enum Assets{
  {% for img in imgs %}
  {{img.name}} = "{{img.path}}",
  {% endfor %}
}

`;

function genImageList() {
  const filenames = fs.readdirSync(IMGS.DIR);
  const imgs = [];
  // 1) list all page names
  for (const imgName of filenames) {
    if (imgName[0] === '.') {
      continue;
    }
    const filepath = path.join(IMGS.DIR, imgName);
    if (fs.statSync(filepath).isFile()) {
      const path = '~@/assets/' + imgName;
      const name = normalizeVarName(imgName);
      imgs.push({ name, path });
    }
  }

  // output pages
  genCode(imgListSourceTpl, IMGS.DST_PATH, {
    imgs,
  });
}

function main() {
  genImageList();
}

main();
