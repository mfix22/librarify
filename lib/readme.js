var fs = require('fs');
var path = require('path');

if (!process.argv[2]) {
  console.log('README generator requires path to JSON config file.');
  process.exit();
}
var p = path.resolve(__dirname, "..", process.argv[2]);
console.log(p);
var settings = require(p);
if (!settings.package) {
  console.log('Your JSON config file must include \'package : package_name\'');
  process.exit();
}

var readme = '';
readme += '# ' + settings.package + '\n';

readme += '#### Node.js library for ' + settings.package + ' API\n\n';

readme += '### Getting started\n';
readme += '```sh\n';
readme += ' npm install --save ' + settings.package + '\n';
readme += '```\n\n'

readme += '___\n';
readme += '### Usage\n'
readme += '### Node.js\n'
readme += '```javascript\n'
readme += 'var ' + settings.package + ' = ' + 'require(\'' + settings.package + '\');\n';
readme += '```\n\n'

readme += '#### Config\n'
readme += '```javascript\n'
readme += 'var options = {\n'
for (var c in settings.config) {
  con = settings.config[c];
  readme += '   ' + c + " : " + ((con.defaultVal) ? ('\'' + con.defaultVal + '\'') : "<INSERT> ") + '\n'
}
readme += '}\n'

readme += settings.package + '.config(options);\n'
readme += '```\n'
readme += '###### options\n'
readme += 'All config options can be overidden in function calls. Each config option will be included in every call that is not overidden by the specific function call.\n\n'


for (var c in settings.config) {
  if (settings.config[c].required == true) readme += '* `' + c + '` _(required)_ - ' + (settings.config[c].desc || '') + '\n'
  else readme += '* `' + c + '` _(optional)_ - ' + (settings.config[c].desc || '') + '\n'
}

readme += '\n'

readme += '#### Functions\n'
readme += 'For each of the functions below, all options are passed in the first function parameter. If a second parameter is included, that will be the functions callback. '
readme += 'If not, the function will return a [`Promise`](https://www.npmjs.com/package/promise).\n\n'

for (var fname in settings.fns) {
  readme += '#### ' + fname + '(options[, callback])\n'
  for (var i in settings.fns[fname].requiredParam) {
    var func = settings.fns[fname].requiredParam[i]
    readme += '* `' + (func.name || func) + '` _(required)_ - ' + (func.descs || '') + '\n'
  }
  for (var i in settings.fns[fname].optionalParam) {
    var func = settings.fns[fname].optionalParam[i]
    readme += '* `' + (func.name || func) + '` _(optional)_ - ' + (func.descs || '') + '\n'
  }
  for (var i in settings.fns[fname].optionalConfig) {
    var func = settings.fns[fname].optionalConfig[i]
    readme += '* `' + (func.name || func) + '` _(optional)_ - ' + (func.descs || '') + '\n'
  }
  readme += '\n'
}

readme += '\n#### Example\n';
readme += '```javascript\n'
readme += 'var ' + settings.package + ' = require(' + settings.package + ');\n\n'

if (process.argv[3]){
  var output = path.resolve(__dirname, "..", process.argv[3]);
  if (!fs.existsSync(output)){
    fs.openSync(output, "w");
  }
  fs.writeFileSync(output, readme);
} else {
  if (!fs.existsSync('./docs')){
    fs.mkdirSync('./docs');
  }
  fs.writeFileSync('./docs/README.md', readme);
}
