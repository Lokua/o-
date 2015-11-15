'use strict';

module.exports = span;

const parseArgs = require('../parse-args');

const defaults = new Set([
  ['cols', 12],
  ['float', 'left']
]);

/**
 * # o-span(cols: 12, float: left)
 * Dynamically add `$number` of columns to an element.
 * Assumes a 12 column grid with no gutters.
 */
function span() {
  const args = parseArgs(defaults, arguments);
  return {
    float: args.float,
    width: 100*(args.cols/12) + '%',
  };
}
