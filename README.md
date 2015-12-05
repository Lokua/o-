# o-

###### pronounced "Oh Dash"

> A collection of functions, mixins, and placeholders for [sass][0]

## Install

via npm
```bash
npm install o- --save-dev
```
or through bower
```bash
bower install o-dash --save
```

## Usage

```sass
@import path_to_node_modules/o-/o-
```

Refer to the documentation for placeholder,
function, and mixin specifics located at [lokua.github.io/o-][2], or internally at
[doc/index.html](doc/index.html)

## Dev

`NODE_ENV=development && npm install`

If adding a new file, run `npm run gen` afterword to repopulate the `lib/_index.scss`
imports file.

Documentation is generated via `npm run doc`

## License
[MIT][1]

[0]: http://sass-lang.com
[1]: http://lokua.net/license-mit.html
[2]: http://lokua.github.io/o-
[3]: http://sassdoc.com/
