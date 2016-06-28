var Request = require('request');
var Promise = require('promise');

Library.prototype.config = function(config) {
  // set values to default values given
  if (this.defaults) this.configuration = this.defaults;
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      this.configuration[key] = config[key];
    }
  }
}

function get(params, fname, callback){
  var fn = this.fns[fname];
  var address = this.url + (fn.route || "/" + fname) + "?";
  if (fn.requiredConfig)
    fn.requiredConfig.forEach((requirement) => {
      if (!this.configuration[requirement] && !params[requirement]) throw new Error(requirement + " is required.");
      address += requirement + "=" + (params[requirement] || this.configuration[requirement]) + "&";
    });
  if (fn.requiredParam)
    fn.requiredParam.forEach((requirement) => {
      if (!params[requirement]) throw new Error(requirement + " parameter is missing.");
      address += requirement + "=" + params[requirement] + "&";
    });
  if (fn.optionalConfig)
    fn.optionalConfig.forEach((option) => {
      address += option + "=" + (params[option] || this.configuration[option]) + "&";
    });
  if (fn.optionalParam)
    fn.optionalParam.forEach((option) => {
      if (params[option]) address += option + "=" + params[option] + "&";
    });
  if (callback) {
    Request.get(address, function (err, response, body) {
      if (err) callback(err, null);
      else callback(null, JSON.parse(body));
    });
  } else {
    return new Promise(function (fulfill, reject){
      Request.get(address, function (err, response, body) {
        if (err) reject(err);
        else fulfill(JSON.parse(body));
      });
    });
  }
}

function Library(settings) {
  if (!settings.url) throw new Error('settings.url is required to create a library.')
  this.url = settings.url;
  this.configuration = settings.defaults; //config set to default originally
  this.defaults = settings.defaults;
  this.fns = settings.fns;

  // used for to access get() for dynamic function naming
  this._get = get;
  for (var fn in settings.fns) {
    if (settings.fns.hasOwnProperty(fn)) {
      if (/[a-zA-Z_$][0-9a-zA-Z_$]*\.[a-zA-Z_$][0-9a-zA-Z_$]*/i.test(fn)){
        var split = fn.split('.');
        var base = split[0];
        var name = split[1];
        if (!this[base]) this[base] = {};
        this[base][name] = new Function('parent', 'fname',
          "return function " + name + "(params, callback){ return parent._get(params, fname, callback); }"
        )(this, fn);
      } else {
        this[fn] = new Function('fname',
          "return function " + fn + "(params, callback){ return this._get(params, fname, callback); }"
        )(fn);
      }
    }
  }
}

module.exports = Library;
