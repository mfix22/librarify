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
* `fns` _(optional)_ - supported functions for your Library
   * `name` _(required)_ - name of your library function (must be a valid Javascript function name)
      * `route`  _(optional)_ - URL path. Defaults to `/<function_name>`
      * `requiredConfig` _(optional)_ - array of names of required parameters that may have been specified in config for this function.
      * `requiredParam` _(optional)_ - array of names of required parameters for this function.
      * `optionalConfig` _(optional)_ - array of names of optional parameters that may have been specified in config for this function.
      * `optionalParam` _(optional)_ - array of names of optional parameters for this function.

#####Config
All config options can be overidden in function calls. Each config option will be included in every call that is not
overidden by the specific function call. Config() is used to set parameters that are needed for all/most of your function calls (tokens, keys, or global formatting).
```javascript
var library = new librarify(settings);
library.config({
  key : process.env.HIDDEN_KEY,
  globalFormat : 'pretty'
});
```

For each function name in settings.fns, a function with that name will be created. RFC-style names with '.'s are also supported.
Example: `setting.fns['foo']` will create `myLibrary.foo(options[, callback])`. settings.fns['foo.bar'] will create `myLibrary.foo.bar(options[, callback])`

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

###License
Copyright (c) 2016, Michael Fix

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Source: http://opensource.org/licenses/ISC
