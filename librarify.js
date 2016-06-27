var Request = require('request');
var Promise = require('promise');

Library.prototype.config = function(config) {
  // set values to default values given
  this.configuration = this.defaults;
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      this.configuration[key] = config[key];
    }
  }
}

function get(params, callback){
  var fn = this.fns[arguments.callee.caller.name];
  var address = this.url + (fn.route || "/" + arguments.callee.caller.name) + "?";
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
  if (arguments.length == 2) {
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
  this.url = settings.url;
  this.configuration = settings.defaults; //config set to default originally
  this.defaults = settings.defaults;
  this.fns = settings.fns;

  // used for to access get() for dynamic function naming
  this._get = get;
  for (var fn in settings.fns) {
    if (settings.fns.hasOwnProperty(fn)) {
      Library.prototype[fn] = new Function(
           "return function " + fn + "(params, callback){ return this._get.apply(this, arguments); }"
      )();
    }
  }
}

module.exports = Library;
