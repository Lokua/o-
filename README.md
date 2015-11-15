# o-

###### pronounced "Oh Dash"

> A collection of mixins and functions for use with
  postcss-mixins and postcss-functions

# NOTE: this branch is in its early stage

See the `sass` branch for a stable sass version of this lib.

### Mixins

Mixins can be used with positional or named arguments, but not both.
Usage of named arguments requires that all arguments
are wrapped within parens, but can be included in any order, and are
completely optional.  Positional arguments must be included in the exact
order as their signature dictates (and some mixins have different signatures
depending on the context in which they are called).

Positional arguments example:
```css
body {
  /* radius, top-opacity, bottom-opacity, background-opacity */
  @mixin o-emboss 0.25, 0.5, 0.5, 0.5;
}
```

Named arguments example:
```css
body {
  @mixin o-emboss (bottom-opacity: 0.5);
}
```

## License
[MIT][1]

[1]: http://lokua.net/license-mit.html
[2]: http://lokua.github.io/o-
