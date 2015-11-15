'use strict';

module.exports = random;

const Random = require('random-js');
const _random = new Random(Random.engines.mt19937().autoSeed());

/**
 * # o-random (min:0, max:256, float:false)
 * Get a random number between `min` and `max`, inclusive.
 * Random number generation provided by
 * [random-js](https://github.com/ckknight/random-js)
 */
function random(min, max, float, inclusive) {
  min = min || 0;
  max = max || 256;
  float = !!float;
  return float
    ? _random.real(min, max, inclusive)
    : _random.integer(min, max);
}
