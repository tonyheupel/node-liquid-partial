var Liquid = require('liquid')

if (!Liquid) throw new Error('Liquid not defined!')

Liquid.Templates = {}

// Register a template
Liquid.registerTemplate = function(id, template) {
  if (!id) throw new Error('id must be defined')
  if (typeof template === 'String') template = Liquid.Template.parse(template)

  Liquid.Templates[id] = template
};

module.exports = Liquid.Templates