var librarify = require('../src/librarify');

var settings = {
  'package' : 'w3w',
  'url' : 'https://api.what3words.com/v2',
  'config' : {
    key : {
      required : true
    },
    lang : 'en',
    format : 'json',
    display : 'full'
  },

  'fns' : {
    'forward' : {
      route : '/forward',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
    },
    'reverse' : {
      route : '/reverse',
      requiredConfig : ['key'],
      requiredParam : ['coords'],
      optionalConfig : true,
    },
    'autosuggest' : {
      route : '/autosuggest',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : true,
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
    },
    'languages' : {
      requiredConfig : ['key'],
      optionalConfig : ['format'],
    }
  }
}

var w3w = new librarify(settings);

w3w.config({
  key : process.env.W3W_KEY, // <INSERT_YOUR_W3W_KEY_HERE>
  lang : 'en',
  format : "json",
  randomThing : 'RANDOM' // not included in calls
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
