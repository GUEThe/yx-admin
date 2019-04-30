import fs from 'fs';
import nunjucks from 'nunjucks';
import prettier, { BuiltInParserName } from 'prettier';

export function genCode(sourceTplOrPath: string, outputPath: string, context: { [key: string]: any }) {
  const isPath = fs.existsSync(sourceTplOrPath);
  if (isPath) {
    console.info('tpl path:', sourceTplOrPath);
  }
  nunjucks.configure({
    trimBlocks: true,
    lstripBlocks: true,
  });
  const tsSource = isPath ? nunjucks.render(sourceTplOrPath, context) : nunjucks.renderString(sourceTplOrPath, context);
  const debug = false;
  let output;
  if (debug) {
    output = tsSource;
  } else {
    let parser = guessPrettierParser(outputPath);
    output = prettier.format(tsSource, {
      parser,
    });
  }
  fs.writeFileSync(outputPath, output, 'utf8');
}

function guessPrettierParser(filepath: string): BuiltInParserName {
  const dotIndex = filepath.lastIndexOf('.');
  const ext = filepath.substring(dotIndex + 1);
  switch (ext) {
    case 'js':
      return 'babylon';
    case 'ts':
      return 'typescript';
    default:
      return ext as BuiltInParserName;
  }
}
