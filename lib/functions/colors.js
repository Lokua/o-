'use strict';

const f = {
  red(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, 0, ${alpha||1})`;
  },

  orange(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${clamp(x/2)}, 0, ${alpha||1})`;
  },

  yellow(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, ${x}, 0, ${alpha||1})`;
  },

  green(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, 0, ${alpha||1})`;
  },

  cyan(x, alpha) {
    x = clamp(x);
    return `rgba(0, ${x}, ${x}, ${alpha||1})`;
  },

  blue(x, alpha) {
    x = clamp(x);
    return `rgba(0, 0, ${x}, ${alpha||1})`;
  },

  violet(x, alpha) {
    x = clamp(x);
    return `rgba(${clamp(x/2)}, 0, ${x}, ${alpha||1})`;
  },

  magenta(x, alpha) {
    x = clamp(x);
    return `rgba(${x}, 0, ${x}, ${alpha||1})`;
  },

  gray(x, alpha) {
    x = clamp(x);
    x = [x, x, x].join(',');
    return `rgba(${x},${alpha||1})`;
  }
};

// aliases
f.grayscale = f.gray;
f['gray-scale'] = f.gray;
f.grey = f.gray;
f.greyscale = f.gray;
f['grey-scale'] = f.gray;

f.purple = f.violet;
f.pink = f.magenta;

module.exports = f;

function clamp(x) {
  x = x > 255 ? 255 : x < 0 ? 0 : x;
  return Math.round(x);
}
