

Liquid = require 'liquid-node'

class Liquid.Partial extends Liquid.Tag

  Syntax = RegExp "(#{Liquid.QuotedFragment.source})"
  SyntaxHelp = "Syntax Error in 'partial' - Valid syntax: partial id";

  constructor: (tagName, markup, tokens) ->
    match = Syntax.exec markup

    if match
      @id = match[1]
    else
      throw new Liquid.SyntaxError SyntaxHelp

    super


  render: (context) ->
    throw new Error("No template found with id '#{@id}'") unless Liquid.Partial.Templates[@id] 
    Liquid.Partial.Templates[@id].render context;


Liquid.Partial.clearTemplates = () -> Liquid.Partial.Templates = {}


Liquid.Partial.registerTemplate = (id, template) ->
  throw new Error('id must be defined') unless id
  template = Liquid.Template.parse(template) if typeof template == 'string'

  Liquid.Partial.Templates = {} unless Liquid.Partial.Templates
  Liquid.Partial.Templates[id] = template



Liquid.Template.registerTag 'partial', Liquid.Partial
module.exports = Liquid.Partial
