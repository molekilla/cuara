var highland = require('highland'),
    //Helpers = require('../helpers'),
    _ = require('underscore'),
    crypto = require('crypto'),
    fs = require('fs');


function CuaraConverter(template) {
  this.template = template;
}
CuaraConverter.prototype.getHashCode = function getHashCode(s) {
  var shasum = crypto.createHash('sha1');
  shasum.update(s);
  return shasum.digest('hex');
};
// toModels:
// filenames: array
// options: complete/error
// For each buffer, generate unique id
// Change template.parse to be two args
// Use toArray to get an Array for options.complete
CuaraConverter.prototype.toModels = function(filenames, options) {
  var self = this, i = 0;

  if (options && options.complete && options.error) {
    var readFile = highland.wrapCallback(fs.readFile);
    var multi = highland(filenames)
      .map(readFile)
      .series()
      .map(function(buffer) {
        var data = buffer.toString();
        var id = self.getHashCode(data);
        self.template.reset();
        _.each(data.split('\n'), function(line) {
          self.template.parse(line, id);
        });
        self.template.model.add('_id', id);
        self.template.model.add('_filepath', filenames[i]);
        i++;
        return self.template.model._attributes;
      });
      
      multi.toArray(function(models) {
        options.complete(models);
      });
  } else {
    throw new Error('Missing options.complete and options.error');
  }
};


module.exports = CuaraConverter;
