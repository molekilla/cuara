cuara
=====

Regular Expression parser using templates and models

Example template
====

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
  
  ```javascript
