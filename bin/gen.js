'use strict'

const fs = require('fs-extra')
const path = require('path')

const libdir = path.resolve(__dirname + path.sep + path.normalize('../lib'))
const dirs = fs.readdirSync(libdir)
const imports = ['// auto generated from o-/bin/gen.js\n\n']
const docs = []

// --- start the program
parse()
write()
// --- end

function parse() {
  dirs.forEach((dir, i) => {
    var dirpath = path.resolve(libdir, dir)
    if (!fs.lstatSync(dirpath).isDirectory()) return

    fs.readdirSync(dirpath).forEach(file => {
      if (fs.lstatSync(path.resolve(dirpath, file)).isFile()) {
        const name = `${dir}/${file.replace(/_|\.sass|\.scss/g, '')}`
        imports.push(`@import '${name}';\n`)
      }
    })
  })
}

function write() {
  const outfile = `${libdir}/_index.scss`
  fs.writeFileSync(outfile, imports.join(''))
  console.log('File written to ' + outfile)
}
