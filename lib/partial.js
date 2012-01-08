(function() {
  var Partial, Liquid, Templates,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Liquid = require("liquid-node")

  module.exports = Partial = (function(_super) {
    var Syntax, SyntaxHelp;

    __extends(Partial, _super);

    Partial.name = 'Partial';


    Syntax = RegExp("(" + Liquid.QuotedFragment.source + ")");

    SyntaxHelp = "Syntax Error in 'partial' - Valid syntax: partial id";

    function Partial(tagName, markup, tokens) {
      var match;
      match = Syntax.exec(markup);
      if (match) {
        this.id = match[1];
      } else {
        throw new Liquid.SyntaxError(SyntaxHelp);
      }
      Partial.__super__.constructor.apply(this, arguments);
    }

    Partial.prototype.render = function(context) {
      if (!Partial.Templates[this.id]) throw new Error("No template found with id '" + this.id + "'")
      var output = Partial.Templates[this.id].render(context);
      return output;
    };

    Partial.clearTemplates = function() { Partial.Templates = {} };

    Partial.registerTemplate = function(id, template) {
      if (!id) throw new Error('id must be defined')
      if (typeof template === 'string') template = Liquid.Template.parse(template)

      if (!Partial.Templates) Partial.Templates = {}
      Partial.Templates[id] = template
    };

    return Partial;

  })(Liquid.Tag);

  Liquid.Template.registerTag('partial', Partial);

}).call(this);
