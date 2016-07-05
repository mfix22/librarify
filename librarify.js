var Request = require('request');
var Promise = require('promise');

Library.prototype.config = function(config) {
  // set values to default values given

  if (this._defaults) this._configuration = this._defaults;
  for (var key in config) {
    this._configuration[key] = config[key]
  }
}

function put(params, fname, callback) {
  var fn = this.fns[fname];
  var address = this.url + (fn.route || "/" + fname)
  if (this._requiredConfigs)
    this._requiredConfigs.forEach((requirement) => {
      if (!this._configuration[requirement] && !params[requirement]) throw new Error(requirement + " is required.");
      // include configured parameters
      params[requirement] = this._configuration[requirement];
    });
  if (fn.requiredParam)
    fn.requiredParam.forEach((requirement) => {
      if (!params[requirement]) throw new Error(requirement + " parameter is missing.");
    });
  if (fn.optionalConfig) {
    if (typeof fn.optionalConfig == 'boolean' && fn.optionalConfig == true) {
      for (var i in this._configuration) {
        if (object.hasOwnProperty(i)) {
          var option = this._configuration[i]
          params[option] = params[option] || this._configuration[option];
        }
      }
    } else{
      fn.optionalConfig.forEach((option) => {
        params[option] = params[option] || this._configuration[option]
      });
    }
  }
  if (callback) {
    Request.post({url : address, form: params}, function (err, response, body) {
      if (err) callback(err, null);
      else callback(null, JSON.parse(body));
    });
  } else {
    return new Promise(function (fulfill, reject){
      Request.post(address, function (err, response, body) {
        if (err) reject(err);
        else fulfill(JSON.parse(body));
      });
    });
  }
}

function post(params, fname, callback) {
  var fn = this.fns[fname];
  var address = this.url + (fn.route || "/" + fname)
  if (this._requiredConfigs)
    this._requiredConfigs.forEach((requirement) => {
      if (!this._configuration[requirement] && !params[requirement]) throw new Error(requirement + " is required.");
      // include configured parameters
      params[requirement] = this._configuration[requirement];
    });
  if (fn.requiredParam)
    fn.requiredParam.forEach((requirement) => {
      if (!params[requirement]) throw new Error(requirement + " parameter is missing.");
    });
  if (fn.optionalConfig) {
    if (typeof fn.optionalConfig == 'boolean' && fn.optionalConfig == true) {
      for (var i in this._configuration) {
        if (object.hasOwnProperty(i)) {
          var option = this._configuration[i]
          params[option] = params[option] || this._configuration[option];
        }
      }
    } else{
      fn.optionalConfig.forEach((option) => {
        params[option] = params[option] || this._configuration[option]
      });
    }
  }
  if (callback) {
    Request.post({url : address, form: params}, function (err, response, body) {
      if (err) callback(err, null);
      else callback(null, JSON.parse(body));
    });
  } else {
    return new Promise(function (fulfill, reject){
      Request.post(address, function (err, response, body) {
        if (err) reject(err);
        else fulfill(JSON.parse(body));
      });
    });
  }
}

function get(params, fname, callback){
  var fn = this.fns[fname];
  var address = this.url + (fn.route || "/" + fname) + "?";
  if (this._requiredConfigs)
    this._requiredConfigs.forEach((requirement) => {
      if (!this._configuration[requirement] && !params[requirement]) throw new Error(requirement + " is required.");
      address += requirement + "=" + (params[requirement] || this._configuration[requirement]) + "&";
    });
  if (fn.requiredParam)
    fn.requiredParam.forEach((requirement) => {
      if (!params[requirement]) throw new Error(requirement + " parameter is missing.");
      address += requirement + "=" + params[requirement] + "&";
    });
  if (fn.optionalConfig) {
    if (typeof fn.optionalConfig == 'boolean' && fn.optionalConfig == true) {
      for (var i in this._configuration) {
        if (object.hasOwnProperty(i)) {
          var option = this._configuration[i]
          address += option + "=" + (params[option] || this._configuration[option]) + "&";
        }
      }
    } else{
      fn.optionalConfig.forEach((option) => {
        address += option + "=" + (params[option] || this._configuration[option]) + "&";
      });
    }
  }
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
  this._configuration = {};
  this._defaults = {};
  this._requiredConfigs = [];
  for (var key in settings.config) {
    var value = settings.config[key];
    if (typeof value == 'string') {
      this._configuration[key] = value; //config set to default originally
      this._defaults[key] = value;
    } else if (typeof value == 'boolean') {
      this._requiredConfigs.push(key);
    } else{
      if (value.required == true) this._requiredConfigs.push(key);
      this._configuration[key] = value.defaultVal; //config set to default originally
      this._defaults[key] = value.defaultVal;
    }
  }
  this.fns = settings.fns;

  // used for to access get() for dynamic function naming
  this._get = get;
  this._post = post;
  this._put = put;
  var call = '_get'
  for (var fn in settings.fns) {
    if (settings.fns.hasOwnProperty(fn)) {
      if (/[a-zA-Z_$][0-9a-zA-Z_$]*\.[a-zA-Z_$][0-9a-zA-Z_$]*/i.test(fn)){
        var split = fn.split('.');
        var base = split[0];
        var name = split[1];
        if (!this[base]) this[base] = {};
        this[base][name] = new Function('parent', 'fname',
          "return function " + name + "(params, callback){ return parent._" + (settings.fns[fn].type.toLowerCase() || 'get') + "(params, fname, callback); }"
        )(this, fn);
      } else {
        this[fn] = new Function('fname',
          "return function " + fn + "(params, callback){ return this._" + (settings.fns[fn].type.toLowerCase() || 'get') + "(params, fname, callback); }"
        )(fn);
      }
    }
  }
}

module.exports = Library;
