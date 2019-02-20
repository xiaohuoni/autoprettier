'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  lint file is prettier
 *----------*****--------------
 */

var prettier = require('prettier');
var fs = require('fs');
var chalk = require('chalk');
var prettierConfigPath = require.resolve('../.prettierrc');

var files = process.argv.slice(2);

var didError = false;

files.forEach(function (file) {
  _promise2.default.all([prettier.resolveConfig(file, {
    config: prettierConfigPath
  }), prettier.getFileInfo(file)]).then(function (resolves) {
    var _resolves = (0, _slicedToArray3.default)(resolves, 2),
        options = _resolves[0],
        fileInfo = _resolves[1];

    if (fileInfo.ignored) {
      return;
    }
    var input = fs.readFileSync(file, 'utf8');
    var withParserOptions = (0, _extends3.default)({}, options, {
      parser: fileInfo.inferredParser
    });
    var output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      console.log(chalk.green(file + ' is prettier'));
    }
  }).catch(function (e) {
    didError = true;
  }).finally(function () {
    if (didError) {
      process.exit(1);
    }
    console.log(chalk.hex('#1890FF')('prettier success!'));
  });
});