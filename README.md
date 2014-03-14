cuara
=====

Regular Expression parser using templates and models

## Sample Cuara template


```javascript
var _ = require('underscore');
var Cuara = require('cuara');


// Your local var goes here


module.exports = 
new Cuara.Parser({
    // Cuara.Model
    model: Cuara.Model,

    // Parse accepts a data row and a doc id
    parse: function(data, id) {
      // Any possible logic
      var matches; 
      if (!this.model.get('master')) {
        this.model.add('master', {});
      }
      if (!this.model.get('details')) {
        this.model.add('details', []);
      }


      var header = this.model.get('master');
      // Header fields
      this.regexp.country.tryParse(data, header);
      this.regexp.city.tryParse(data, header);

      if (this.step === 0) {
        details.push({ raw: data });
      }
    

      if (this.regexp.startDetail.find(data)) {
        this.step = this.regexp.startDetail.step;
      }
        
    },
    // regexp fields
    regexp: {
      country: new Cuara.Field({
        regexp: /Country:\s+(\S+)\s+/i,
        fields: ['country']
      }),
      city: new Cuara.Field({
        regexp: /City:\s+(\S+)\s+/i,
        fields: ['city']
      }),
      startDetail: new Cuara.Field({
        regexp: /Cities/i,
        step: 0
      })
   }
  });

 ```
 
### Cuara Field Options
 
 ```javascript
       monthlySummaryDetail: new CuaraField({
        regexp: /(\d+)\s+([a-zA-Z ']+)\s+(\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+)/i,
        fields: ['cellNumber', 'subscriber', 'accountId', 
        'monthlyCharge', 'usageCharge', 'help911Charge', 
        'ISC','SDC', 'valueAddedCharge', 'adjustments', 'totalCurrent'],
        step: -1,
        customFields: {
          total: function(model) {
            var value = model.monthlyCharge + model.usageCharge + model.help911Charge + 
              model.ISC + model.SDC + model.valueAddedCharge + model.adjustments + model.totalCurrent;
            return CuaraField.toDecimal(2)(value);
          }
        },
        renderers: {
          monthlyCharge: CuaraField.toDecimal(2),
          usageCharge: CuaraField.toDecimal(2),
          'help911Charge': CuaraField.toDecimal(2),
          ISC: CuaraField.toDecimal(2),
          SDC: CuaraField.toDecimal(2),
          valueAddedCharge: CuaraField.toDecimal(2),
          adjustments: CuaraField.toDecimal(2),
          totalCurrent: CuaraField.toDecimal(2),
          subscriber: function(value) {
            return value.trim();
          }
        }
      }),
      
```

### Parsing
```javascript
var expect = require('chai').expect;
var Cuara = require('cuara');
var template = require('../lib/templates/my_dtemplate');
var _ = require('underscore');
var fs = require('fs');

describe('Template Spec', function(){
  describe('#parse', function() {
    var converter, user, docId, profile;
    beforeEach(function() {
    // Load template into Cuara Converter
      converter = new Cuara.Converter(template);
    });
    
    it('should transform text and match models', function() {
      var file1 = __dirname + '/somedata.txt';
      var items = [file1];
     // Expects text files as array of file paths
     converter.toModels(items, {
        complete: function(models) {
          expect(_.first(models[0].details).image1).to.equal(3);
          expect(_.first(models[0].details).image2).to.equal(2);
          expect(models[0].details[132].image1).to.equal(286);
          expect(models[0].details[141].image1).to.equal(295);

          expect(_.last(models[0].details).image1).to.equal(458);

        },
        error: function(err) {
        }
      });
    });

  });
});
```
### License

Copyright 2014 Rogelio Morrell C. MIT License
