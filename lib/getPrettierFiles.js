'use strict';

var glob = require('glob');

var getPrettierFiles = function getPrettierFiles() {
  var files = [];
  var jsFiles = glob.sync('./**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  var tsFiles = glob.sync('./**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  // const configFiles = glob.sync('config/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  // const scriptFiles = glob.sync('scripts/**/*.js');
  var lessFiles = glob.sync('./**/*.less*', { ignore: ['**/node_modules/**', 'build/**'] });
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  // files = files.concat(configFiles);
  // files = files.concat(scriptFiles);
  files = files.concat(lessFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;