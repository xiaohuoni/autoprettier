#!/usr/bin/env node
const prettier = require('prettier');
const fs = require('fs');
const getPrettierFiles = require('./getPrettierFiles');
const prettierConfigPath = require.resolve('../.prettierrc');
const chalk = require('chalk');

let didError = false;
const prettierFile = file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      console.log(chalk.green(`${file} is prettier`));
    }
  } catch (e) {
    didError = true;
    console.log(chalk.red(`prettier ${file} is error`));
  }
};
const script = process.argv[2];
if (script) {
  prettierFile(script);
} else {
  const files = getPrettierFiles();
  files.forEach(file => {
    prettierFile(file);
  });
}

if (didError) {
  process.exit(1);
}
console.log(chalk.hex('#1890FF')('prettier success!'));
