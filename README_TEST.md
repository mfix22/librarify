# myLibrary
#### Node.js library for myLibrary API

### Getting started
```sh
 npm install --save myLibrary
```

___
### Usage
### Node.js
```javascript
var myLibrary = require('myLibrary');
```

#### Config
```javascript
var options = {
   key : <INSERT> 
   lang : 'en'
   format : 'json'
   display : 'full'
}
myLibrary.config(options);
```
###### options
All config options can be overidden in function calls. Each config option will be included in every call that is not overidden by the specific function call.

* `key` _(required)_ - your API key
* `lang` _(optional)_ - 
* `format` _(optional)_ - 
* `display` _(optional)_ - 

#### Functions
For each of the functions below, all options are passed in the first function parameter. If a second parameter is included, that will be the functions callback. If not, the function will return a [`Promise`](https://www.npmjs.com/package/promise).

#### forward(options[, callback])
* `addr` _(required)_ - 
* `lang` _(optional)_ - 
* `format` _(optional)_ - 
* `display` _(optional)_ - 

#### reverse(options[, callback])
* `coords` _(required)_ - 
* `lang` _(optional)_ - 
* `format` _(optional)_ - 
* `display` _(optional)_ - 

#### autosuggest(options[, callback])
* `addr` _(required)_ - 
* `focus` _(optional)_ - 
* `clip` _(optional)_ - 
* `lang` _(optional)_ - 
* `format` _(optional)_ - 
* `display` _(optional)_ - 

#### standardblend(options[, callback])
* `addr` _(required)_ - 
* `focus` _(optional)_ - 
* `lang` _(optional)_ - 
* `format` _(optional)_ - 

#### grid(options[, callback])
* `bbox` _(required)_ - 
* `format` _(optional)_ - 

#### languages(options[, callback])
* `format` _(optional)_ - 


#### Example
```javascript
var myLibrary = require(myLibrary);

