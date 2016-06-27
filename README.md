#Librarify
### Create a Node.js library for your REST API with just a _settings_ JSON object

**Librarify** is a library for creating libraries for REST APIs as easily as possible. When you create a library with **Librarify**, your library has functions to configure parameter requirements and defaults at a per-function and global basis.

###Getting started
```sh
$ npm install --save librarify
```
___
###Usage
###Node.js
```javascript
var Library = require('librarify');

var myLibrary = new Library(settings);
```

####Settings
```javascript
var settings = {
  url : 'https://your.baseurl.com/v2',
  defaults : {
    key : 'KEY_THAT_IS_NEEDED_FOR_EVERYTHING',
    globalFormat : 'pretty'
  },
  fns : {
    fn1 : {
      route : '/routeForFn1', //hits https://your.baseurl.com/v1/routeForFn1
      requiredConfig : ['key'],
      requiredParam : ['you', 'need', 'these'],
      optionalConfig : ['globalFormat'],
      optionalParam : ['nice', 'to', 'haves']
    }
  }
}

var myLibrary = new Library(settings);
```
######options
* `url` _(required)_ - your API key (get yours [here](https://map.what3words.com/register?dev=true))
* `defaults` _(optional)_ - specify default parameter values by { parameter : value }
* `fns` _(required)_ - supported functions for your Library
  * `name` _(required)_ - name of your library function (must be a valid Javascript function name)
   * `route`  _(optional)_ - URL path. Defaults to `/functionName`
   * `requiredConfig` _(optional)_ - array of names of required parameters that may have been specified in config for this function.
   * `requiredParam` _(optional)_ - array of names of required parameters for this function.
   * `optionalConfig` _(optional)_ - array of names of optional parameters that may have been specified in config for this function.
   * `optionalParam` _(optional)_ - array of names of optional parameters for this function.

#####Config
All config options can be overidden in function calls. Each config option will be included in every call that is not
overidden by the specific function call.
```javascript
var library = new librarify(settings);
library.config({
  key : process.env.HIDDEN_KEY,
  globalFormat : 'pretty'
});
```

####Examples
Also see   [/examples](examples)

This example is for the [what3words API](https://docs.what3words.com/api/v2/)
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
  key : process.env.W3W_KEY,
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

### Coming Soon
Multiple HTTP request options (POST, PUT, DELETE)
