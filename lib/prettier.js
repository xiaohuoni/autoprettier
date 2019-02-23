#!/usr/bin/env node
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettier = require('prettier');
var fs = require('fs');
var getPrettierFiles = require('./getPrettierFiles');
var prettierConfigPath = require.resolve('../.prettierrc');
var chalk = require('chalk');

var didError = false;
var prettierFile = function prettierFile(file) {
  var options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath
  });
  var fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    var input = fs.readFileSync(file, 'utf8');
    var withParserOptions = (0, _extends3.default)({}, options, {
      parser: fileInfo.inferredParser
    });
    var output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      console.log(chalk.green(file + ' is prettier'));
    }
  } catch (e) {
    didError = true;
    console.log(chalk.red('prettier ' + file + ' is error'));
  }
};
var script = process.argv[2];
if (script) {
  prettierFile(script);
} else {
  var files = getPrettierFiles();
  files.forEach(function (file) {
    prettierFile(file);
  });
}

if (didError) {
  process.exit(1);
}
console.log(chalk.hex('#1890FF')('prettier success!'));