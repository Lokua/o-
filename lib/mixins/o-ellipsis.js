'use strict';

module.exports = ellipsis;

/**
 * # o-ellipsis
 * Truncate text with an ellipsis `...`.
 * Works best on elements with a determined height
 * (not `auto` or `100%`)
 */
function ellipsis(mixin) {
  return {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap'
  };
}
