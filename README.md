#Librarify
### Create a Node.js library for your REST API with just a config JSON object

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
```sh
$ node examples/slack.js
$ node examples/what3words.js
```
