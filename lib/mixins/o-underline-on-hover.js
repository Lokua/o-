'use strict';

module.exports = underlineOnHover;

const parseArgs = require('../parse-args');

const defaults = new Set([
  ['color', '#000'],
  ['speed', '0.3s']
]);

/**
 * # o-underline-on-hover(color: #000, speed: 0.3s)
 * Animated text underline.
 * If using with an `a` element, be sure to set
 * `text-decoration: none;` on the element and its `:hover`
 */
function underlineOnHover() {
  const args = parseArgs(defaults, arguments);
  return {
    position: 'relative',
    'text-decoration': 'none',
    // hide underline
    '&:before': {
      content: '\'\'',
      position: 'absolute',
      width: '100%',
      height: '1px',
      bottom: 0,
      left: 0,
      'background-color': args.color,
      visibility: 'hidden',
      // fallback unsupport anim
      transform: 'scaleX(0)',
      transition: `all ${args.speed} ease-in-out 0s`,
    },
    // show underline
    '&:hover:before': {
      visibility: 'visible',
      transform: 'scaleX(1)'
    }
  };
}
