var fs = require('fs-extra'),
    path = require('path');

var libdir = path.resolve(__dirname + path.sep + path.normalize('../lib'));
var dirs = fs.readdirSync(libdir),
    imports = ['// auto generated from o-/bin/generate-imports.js\n@import core\n'];

dirs.forEach(function(dir, i) {
  var dirpath = path.resolve(libdir, dir);
  if (fs.lstatSync(dirpath).isDirectory()) {
    var files = fs.readdirSync(dirpath);
    files.forEach(function(file) {
      var filepath = path.resolve(dirpath, file);
      if (fs.lstatSync(filepath).isFile()) {
        imports.push('@import ' + dir + '/' + (file === '__o-components.sass' ? '_' : '') +
          file.replace(/_|\.sass|\.scss/g, '') + '\n');
      }
    });
  }
});

var outfile = libdir + path.sep + '_main.sass'; 
fs.writeFile(outfile, imports.join(''), function(err) {
  if (err) throw err;
  console.log('File written to ' + outfile);
});