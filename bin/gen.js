'use strict';

var fs = require('fs-extra'),
    path = require('path');

var libdir = path.resolve(__dirname + path.sep + path.normalize('../lib')),
    dirs = fs.readdirSync(libdir),
    // ../lib/_main.sass
    imports = ['// auto generated from o-/bin/generate-imports.js\n@import core\n'],
    docs = [];

// --- start the program
parse();
write();
// --- end

function parse() {
  // for each dir in ../lib
  dirs.forEach(function(dir, i) {

    var dirpath = path.resolve(libdir, dir);
    if (fs.lstatSync(dirpath).isDirectory()) {

      // for each file in ../lib/{dir}
      fs.readdirSync(dirpath).forEach(function(file) {

        if (fs.lstatSync(path.resolve(dirpath, file)).isFile()) {
          var name = dir + '/' + file.replace(/_|\.sass|\.scss/g, '');
          imports.push('@import ' + name + '\n');
        }

      });
    }
  });
}

function write() {
  // ../lib/_main.sass
  var outfile = libdir + path.sep + '_main.sass'; 
  fs.writeFileSync(outfile, imports.join(''));
  console.log('File written to ' + outfile);
}

