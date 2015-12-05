'use strict'

const Levenshtein = require('levenshtein')
const chroma = require('chroma-js')
const sass = require('node-sass')
const _ = {
  each: require('lodash.foreach'),
  values: require('lodash.values')
}

const materialColorsRGB = require('./resources/material-colors-rgb.json')
const materialColors = require('./resources/material-colors.json')
const SassColor = sass.types.Color

let hexes = []
let rgbs = []
_.each(materialColors, (shade, color) => {
  if (!/white|black/.test(color)) {
    hexes = hexes.concat(_.values(shade))
    rgbs = rgbs.concat(_.values(materialColorsRGB[color]))
  }
})
hexes.sort()

/**
 * @param  {Array[Number]} x - [r,g,b]
 * @param  {Array[Number]} y - [r,g,b]
 * @return {Number}
 */
function distance(x, y) {
  return Math.sqrt(
    Math.pow(x[0] - y[0], 2) +
    Math.pow(x[1] - y[1], 2) +
    Math.pow(x[2] - y[2], 2)
  )
}

function sassColorToHex(color) {
  return chroma(color.getR(), color.getG(), color.getB()).hex()
}

function hexToSassColor(hex) {
  const c = chroma(hex);
  return new SassColor(c.get('rgb.r'), c.get('rgb.g'), c.get('rgb.b'));
}

/**
 * @param  {Array[Number]} rgb - [r,g,b]
 * @return {Array[Number]}
 */
function closest(rgb) {
  let min = Infinity
  let minIndex = -1
  rgbs.some((x, i) => {
    const d = distance(rgb, x)
    if (d === 0) {
      minIndex = i
      return true
    }
    if (d < min) {
      min = d
      minIndex = i
    }
  })
  if (minIndex > -1) return rgbs[minIndex]
}

module.exports = {

  /**
   * @param  {SassString} $color
   * @param  {SassNumber} $shade=500
   * @return {SassColor}
   */
  'o-md-color($color, $shade: 500)' (color, shade) {
    const mdColor = materialColors[color.getValue()][shade.getValue()]
    return hexToSassColor(mdColor)
  },

  /**
   * @param  {SassColor} $color
   * @return {SassColor}
   */
  'o-closest-md-color($color)' (color) {
    const c = closest([color.getR(), color.getG(), color.getB()])
    return new SassColor(c[0], c[1], c[2])
  }

}
