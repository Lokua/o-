'use strict';

module.exports = size;

/**
 * # o-size(width, height: width)
 * Note that this mixin does not support the named
 * argument syntax as that is completely redundant.
 */
function size(mixin, width, height) {
  if (height === undefined) height = width;
  return { width, height };
}
