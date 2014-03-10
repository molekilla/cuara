
var _ = require('underscore');
var CuaraModel = function() {
  this._attributes = {};
};
CuaraModel.prototype.toJSON = function() {
  var data = JSON.stringify(this._attributes);
  return data;
};
CuaraModel.prototype.add = function(key, value) {
  this._attributes[key] = value;
};

CuaraModel.prototype.get = function(key) {
  var value = this._attributes[key];
  if (!_.isUndefined(value)) {
    return value;
  }
  else {
    return undefined;
  }
};

module.exports = CuaraModel;
