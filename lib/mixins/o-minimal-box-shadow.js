'use strict';

module.exports = minimalBoxShadow;

const parseArgs = require('../parse-args');

const defaults = new Set([['color', 'rgba(0, 0, 0, 0.25)']]);

/**
 * # o-minimal-box-shadow(color: rgba(0, 0, 0, 0.25))
 */
function minimalBoxShadow() {
  const color = parseArgs(defaults, arguments).color;
  return {
    'box-shadow': `0px 1px 2px 1px ${color}`
  };
}
