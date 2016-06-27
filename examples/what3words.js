var librarify = require('../librarify');

var settings = {
  'url' : 'https://api.what3words.com/v2',
  'defaults' : {
    lang : 'en',
    format : 'json',
    display : 'full'
  },
  'fns' : {
    'forward' : {
      route : '/forward',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : []
    },
    'reverse' : {
      route : '/reverse',
      requiredConfig : ['key'],
      requiredParam : ['coords'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : []
    },
    'autosuggest' : {
      route : '/autosuggest',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format', 'display'],
      optionalParam : ['focus', 'clip']
    },
    'standardblend' : {
      route : '/standardblend',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format'],
      optionalParam : ['focus']
    },
    'grid' : {
      requiredConfig : ['key'],
      requiredParam : ['bbox'],
      optionalConfig : ['format'],
      optionalParam : []
    },
    'languages' : {
      requiredConfig : ['key'],
      requiredParam : [],
      optionalConfig : ['format'],
      optionalParam : []
    }
  }
}

var w3w = new librarify(settings);

w3w.config({
  key : process.env.W3W_KEY, // <INSERT_YOUR_W3W_KEY_HERE>
  lang : 'en',
  format : "json",
  randomThing : 'RANDOM'
});

w3w.forward({
  addr : 'steep.sober.potato',
  display : 'terse'
}, function (err, res){
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    console.log(JSON.stringify(res, null, 4));
  }
});
