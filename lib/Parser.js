
var _ = require('underscore');
var CuaraModel = require('./Model');

function CuaraParser(template) {
  this.regexp = {};
  this.sequence = "";
  this.step = -1;
  if (template.model) {
    this.model = new template.model();
    delete template.model;
  } else {
    this.model = new CuaraModel();
  }
  _.extend(this, template);
}
CuaraParser.prototype.parse = function() { 
  throw new Error('Missing parse method');
};


CuaraParser.prototype.reset = function() {
  this.model._attributes = {};
};
module.exports = CuaraParser;
