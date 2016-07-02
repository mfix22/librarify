var fs = require('fs');

var lib_name = 'myLibrary';
var config = {
  key : {
    required : true,
    desc : 'your API key'
  },
  lang : {
    defaultVal : 'en',
    required : false
  },
  format : {
    defaultVal : 'json',
    required : false
  },
  display : {
    defaultVal : 'full',
    required : false
  }
};
var fns = {
  'forward' : {
    route : '/forward',
    requiredParam : [{
      name : 'addr',
      desc : 'a 3 word address as a string'
    }],
    optionalConfig : [{
      name :'lang',
      desc : 'a supported w3w address language (see Config)'
    },
    {
      name : 'format',
      desc : 'return data format type (see Config)'
    },
    {
      name :'display',
      desc : 'return display type (see Config)'
    }],
    optionalParam : []
  },
  'reverse' : {
    route : '/reverse',
    requiredParam : ['coords'],
    optionalConfig : ['lang', 'format', 'display'],
    optionalParam : []
  },
  'autosuggest' : {
    route : '/autosuggest',
    requiredParam : ['addr'],
    optionalConfig : ['lang', 'format', 'display'],
    optionalParam : ['focus', 'clip']
  },
  'standardblend' : {
    route : '/standardblend',
    requiredParam : ['addr'],
    optionalConfig : ['lang', 'format'],
    optionalParam : ['focus']
  },
  'grid' : {
    requiredParam : ['bbox'],
    optionalConfig : ['format'],
    optionalParam : []
  },
  'languages' : {
    requiredParam : [],
    optionalConfig : ['format'],
    optionalParam : []
  }
}


var readme = '';
readme += '# ' + lib_name + '\n';

readme += '#### Node.js library for ' + lib_name + ' API\n\n';

readme += '### Getting started\n';
readme += '```sh\n';
readme += ' npm install --save ' + lib_name + '\n';
readme += '```\n\n'

readme += '___\n';
readme += '### Usage\n'
readme += '### Node.js\n'
readme += '```javascript\n'
readme += 'var ' + lib_name + ' = ' + 'require(\'' + lib_name + '\');\n';
readme += '```\n\n'

readme += '#### Config\n'
readme += '```javascript\n'
readme += 'var options = {\n'
for (var c in config) {
  con = config[c];
  readme += '   ' + c + " : " + ((con.defaultVal) ? ('\'' + con.defaultVal + '\'') : "<INSERT> ") + '\n'
}
readme += '}\n'

readme += lib_name + '.config(options);\n'
readme += '```\n'
readme += '###### options\n'
readme += 'All config options can be overidden in function calls. Each config option will be included in every call that is not overidden by the specific function call.\n\n'


for (var c in config) {
  if (config[c].required == true) readme += '* `' + c + '` _(required)_ - ' + (config[c].desc || '') + '\n'
  else readme += '* `' + c + '` _(optional)_ - ' + (config[c].desc || '') + '\n'
}

readme += '\n'

readme += '#### Functions\n'
readme += 'For each of the functions below, all options are passed in the first function parameter. If a second parameter is included, that will be the functions callback. '
readme += 'If not, the function will return a [`Promise`](https://www.npmjs.com/package/promise).\n\n'

for (var fname in fns) {
  readme += '#### ' + fname + '(options[, callback])\n'
  // for (var i in fns[fname].requiredConfig) {
  //   var func = fns[fname].requiredConfig[i];
  //   readme += '* `' + (func.name || func) + '` _(required)_ - ' + ((func.desc) ? func.desc : "<INSERT DESCRIPTION> ") +'\n'
  // }
  for (var i in fns[fname].requiredParam) {
    var func = fns[fname].requiredParam[i]
    readme += '* `' + (func.name || func) + '` _(required)_ - ' + (func.descs || '') + '\n'
  }
  for (var i in fns[fname].optionalParam) {
    var func = fns[fname].optionalParam[i]
    readme += '* `' + (func.name || func) + '` _(optional)_ - ' + (func.descs || '') + '\n'
  }
  for (var i in fns[fname].optionalConfig) {
    var func = fns[fname].optionalConfig[i]
    readme += '* `' + (func.name || func) + '` _(optional)_ - ' + (func.descs || '') + '\n'
  }
  readme += '\n'
}

readme += '\n#### Example\n';
readme += '```javascript\n'
readme += 'var ' + lib_name + ' = require(' + lib_name + ');\n\n'

fs.writeFile('README_TEST.md', readme);
