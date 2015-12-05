# o-

###### pronounced "Oh Dash"

> A collection of functions, mixins, and placeholders for [sass][sass-lang]

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

Import __o-__ into your sass/scss
```scss
@import 'node_modules/o-';
```

As of [node-sass][node-sass] >= v3.0.0, js functions can be registered at
configuration time, which is needed for `o-md-color` and `o-closest-md-color`
functions. You will need [node-sass][node-sass], [gulp-sass][gulp-sass],
or [grunt-sass][grunt-sass] depending on your build setup.

Grunt:
```js
// ...
sass: {
  options: {
    functions: require('o-')
  },
  build: {
    files: {
      'style.css': 'style.scss'
    }
  }
}
// ...
```

Gulp:
```js
// ...
gulp.task('sass', () => {
  return gulp.src('style.scss')
    .pipe(sass({
      functions: require('o-')
    }))
    .pipe(gulp.src('style.css'))
})
// ...
```

Node:
```js
// ...
sass.render({
  data: `
    body {
      color: o-closest-md-color(o-random-color())
    }
  `,
  functions: require('o-')
}, (err, result) => {/*...*/})
// ...
```

## API

You can refer to the documentation online at [lokua.github.io/o-][doc-site], or internally by opening
[doc/index.html](doc/index.html).

## Dev

`NODE_ENV=development && npm install`

If adding a new file, run `npm run gen` afterword to repopulate the `lib/_index.scss`
imports file.

Documentation is generated with the much awesome [sassdoc][sass-doc]. `npm run doc`

## License
[MIT][license]

[sass-lang]: http://sass-lang.com
[license]: http://lokua.net/license-mit.html
[doc-site]: http://lokua.github.io/o-
[sass-doc]: http://sassdoc.com/
[gulp-sass]: https://github.com/dlmanning/gulp-sass
[grunt-sass]: https://github.com/sindresorhus/grunt-sass
[node-sass]: https://github.com/sass/node-sass
