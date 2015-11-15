'use strict';

module.exports = str;

/**
 * # o-str(any)
 * wrap input as string, ensures output
 * in css is wrapped in quotes.
 */
function str(input) {
  return `"${input}"`;
}
