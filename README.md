#Librarify
### Create a Node.js library for your REST API with just a config JSON object

**Librarify** is a library for creating libraries for REST APIs as easily as possible. When you create a library with Librarify, your library has functions to configure parameter requirements and defaults at a per-function and global basis.

###Getting started
```sh
$ npm install --save what3words
```
___
###Usage
###Node.js
```javascript
var Library = require('librarify');

var myLibrary = new Library(settings);
```

####Configuration
```javascript
var settings = {
  url : 'https://your.baseurl.com/v2',
  defaults : {},
  fns : {
    fn1 : {
      route : '/routeForFn1', //hits https://your.baseurl.com/v2/routeForFn1
      requiredConfig : [],
      requiredParam : [],
      optionalConfig : [],
      optionalParam : []
    }
  }
}

var myLibrary = new Library(settings);
```
######Options
All config options can be overidden in function calls. Each config option will be included in every call that is not
overidden by the specific function call.

* `url` _(required)_ - your API key (get yours [here](https://map.what3words.com/register?dev=true))
* `defaults` _(optional)_ - a supported w3w address language: `en` (the default), `de, ru, sv, pt, sw, it, fr, es` or `tr`.
* `fns` _(required)_ - return data format type. Can be `json` (the default), `geojson` or `xml`

####Examples
All see [/examples](examples)

```javascript
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
    }
  }
}

var library = new librarify(settings);
library.config({
  key : process.env.W3W_KEY, // <INSERT_YOUR_W3W_KEY_HERE>
});

library.forward({
  addr : 'steep.sober.potato',
  display : 'terse'
}, function (err, res){
  if (err) console.log(JSON.stringify(err, null, 4));
  else {
    console.log(JSON.stringify(res, null, 4));
  }
});
```
