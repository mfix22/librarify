var Library = require('../../src/librarify');

var settings = require('./settings.json');
var w3w = new Library(settings);

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
