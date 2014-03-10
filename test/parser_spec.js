/*global it:true, beforeEach:true, describe:true*/
var expect = require('chai').expect;
var Cuara = require('../lib').Parser;
var CuaraModel = require('../lib').Model;

describe('Parser Spec', function(){
  describe('#new', function(){
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
  });

  describe('#parse', function() {
    var template;
    it('should return an error when parse is undefined', function() {
      template = new Cuara({ model: CuaraModel });
      expect(template.parse).to.throw('Missing parse method');
    });
    it('should return ok when parse is defined', function() {
      template = new Cuara({
  model: CuaraModel,
        parse: function(data, id) {
          this.sequence = id + data.substring(0,3);
          this.step = 1;
        }
      });
      template.parse('Log table for May 2014', 'a1');
      expect(template.sequence).to.equal('a1Log');
    });
  });
});