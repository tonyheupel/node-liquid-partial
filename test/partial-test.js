var vows   = require('vows'),
    assert = require('assert');

Liquid = require('liquid-node');
Liquid.Partial = require('../index');

vows.describe('Partial Tag').addBatch({
  'Register a template': {
    topic: 'My template',
    "should convert a string to a Template": function(topic) {
      Liquid.Partial.registerTemplate('foobar', topic);
      assert.instanceOf(Liquid.Partial.Templates['foobar'], Liquid.Template);
    },
    "should simply use a Template as-is": function(topic) {
      var template = Liquid.Template.parse(topic);
      Liquid.Partial.registerTemplate('bizbuzz', template);
      assert.strictEqual(Liquid.Partial.Templates['bizbuzz'], template);
    }
  },
  'Render a valid partial template': {
    topic: 'This template uses foobar value and makes it uppercase: {{ foobar | upcase }}',

    "should insert the partial's content and do proper replacements": function (topic) {
      var template = Liquid.Template.parse("Before partial\n{% partial sample-partial %}\nAfter partial");
      Liquid.Partial.registerTemplate('sample-partial', topic);

      var actual = template.renderOrRaise({ foobar: 'The foobar value' });
      assert.equal(actual, "Before partial\nThis template uses foobar value and makes it uppercase: THE FOOBAR VALUE\nAfter partial");
    }
  }
}).export(module);