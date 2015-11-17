'use strict';

module.exports = str;

/**
 * @function o-str([input])
 * @desc
 * Wrap input as string, ensures output
 * in css is wrapped in quotes.
 * @param input - anything
 * @return "`input`"
 */
function str(input) {
  return `"${input}"`;
}
