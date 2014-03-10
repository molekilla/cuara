/*global it:true, beforeEach:true, describe:true*/
var expect = require('chai').expect;
var Cuara = require('../lib').Parser;
var CuaraModel = require('../lib').Model;

describe('Model Spec', function(){
  describe('#new Cuara template', function(){
    var template;
    beforeEach(function() {
      template = new Cuara({ model: CuaraModel });
    });
    it('should create a new Cuara instance', function(){
      //var template = new Cuara({ });
      expect(template.step).to.equal(-1);
      expect(template.sequence).to.equal('');
    });
    it('should have a model property', function(){
      expect(template.model).to.not.equal(undefined);
    });
    it('should have a defaultt model property', function(){
      template = new Cuara({});
      expect(template.model).to.exist;
    });
  });

  describe('#parse', function() {
    var template;
    beforeEach(function() {
      template = new Cuara({
  model: CuaraModel,
        parse: function(data, id) {
          this.sequence = id + data.substring(0,3);
          this.step = 1;
    this.model.add('test', data);
  }
      });
    });
    it('should parse and write to model', function() {
      template.parse("Logger", "a1");
      expect(template.model._attributes.test).to.ok;
    });
    it('should return value from key "test"', function() {
      template.parse("Logger", "a1");
      expect(template.model._attributes.test).to.ok;
      var value = template.model.get('test');
      expect(value).to.equal('Logger');
    });
  });

  describe('#toJSON', function() {
    var template;
    it('should parse, write and output JSON data', function() {
       template = new Cuara({
  model: CuaraModel,
        parse: function(data, id) {
          this.sequence = id + data.substring(0,3);
          this.step = 1;
    this.model.add('test', data);
        }
      });
      
      template.parse("Logger", "a1");
      expect(template.model._attributes.test).to.ok;
      
      var data = template.model.toJSON();
      expect(data).to.equal(JSON.stringify({ test: 'Logger' }));
    });
  });
});