# Liquid.Partial

Liquid.Partial is a tag for the Node.js implementation of Liquid ([liquid-node](http://github.com/sirlantis/liquid-node)) from [Marcel Jackwerth's](http://github.com/sirlantis) , which is a port of Tobias Lutke's Liquid templating language.

It adds the ability to register templates (or strings that get parsed into templates) as partials and then refer to them in other templates with this notation:

```html
{% partial my-partial-id %}
```

## Usage

### Client-Side
This is already included in the [liquid.js project](https://github.com/tchype/liquid.js) implementation.

### Server-Side
Inside your project using liquid-node, simply install this package like this:

```shell
npm install node-liquid-partial
```

Or by installing the latest node package from git directly:

```shell
$ npm install git@github.com/tchype/node-liquid-partial
```

And then use it in your node program like this:

```js
var Liquid = require('liquid-node');
var Liquid.Partial = require('liquid-partial');

var firstTemplate = Liquid.Template.parse('This is the first template');
Liquid.Partial.registerTemplate('first-template', firstTemplate);
Liquid.Partial.registerTemplate('second-template', 'This contains the first: "{% partial first-template %}"');

console.log(Liquid.Template.parse('{% partial second-template %}').render());
```

Which outputs:

```shell
This contains the first: "This is the first template"
```
