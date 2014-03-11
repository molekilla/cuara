
var _ = require('underscore');

function _defaultRender(value) {
  return value;
}

var CuaraField = function(options) {
  this.regexp = options.regexp;
  this.fields = options.fields || [];
  this.renderers = options.renderers || {};
  this.step = options.step;
};

CuaraField.prototype.tryParse = function(data, parent, skip) {
  var model = this.parse(data, skip);
  if (model) {
    _.extend(parent, model);
  }
};

CuaraField.prototype.find = function(data) {
  var index = data.search(this.regexp);
  if (index > -1) {
    return true;
  }
  else {
    return false;
  }
};

CuaraField.prototype.parse = function(data, skip) {
  var self = this,
      matches = data.match(this.regexp);
  if (matches) {
    var model = {}, i = 0 + (skip || 0);

    _.each(this.fields, function(name) {
      var render = self.renderers[name] || _defaultRender;
      model[name] = render(matches[i]);
      i++;
    });

    return model;
  } else {
    return false;
  }
};

CuaraField.toDecimal = function(precision) {
  var parse = function(value) {
    return parseFloat(value).toFixed(precision) * 1;
  };
  return parse;
};

// CuaraField.toDate = function(format) {
// // TODO:
//   var parse = function(value) {
//     return parseFloat(value).toFixed(precision) * 1;
//   };
//   return parse;
// };

module.exports = CuaraField;
