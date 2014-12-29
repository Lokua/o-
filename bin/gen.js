/**
 * Generates...
 * 1. a main import file to be imported by the real "main" o-.sass file
 * 2. a list.jade partial similar to the main import list used in final demo nav
 * 3. a content.jade file of parsed markdown from sass files for main content of demo
 */

'use strict';

var fs = require('fs-extra'),
    path = require('path'),
    tooly = require('tooly'),
    hljs = require('highlight.js'),
    Remarkable = require('remarkable'),
    md = new Remarkable({
      html: true,
      langPrefix: 'lang-',
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }
        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}
        return ''; // use external default escaping
      }
    });

var libdir = path.resolve(__dirname + path.sep + path.normalize('../lib')),
    demodir = path.resolve(__dirname + path.sep + path.normalize('../demo')),
    dirs = fs.readdirSync(libdir),
    // ../lib/_main.sass
    imports = ['// auto generated from o-/bin/generate-imports.js\n@import core\n'],
    // ../demo/list.jade
    list = [],
    docs = [];

dirs.forEach(function(dir, i) {
  // for each dir in ../lib
  var dirpath = path.resolve(libdir, dir);
  if (fs.lstatSync(dirpath).isDirectory()) {
    // for each file in ../lib/{dir}
    var files = fs.readdirSync(dirpath);
    files.forEach(function(file) {
      var filepath = path.resolve(dirpath, file);
      if (fs.lstatSync(filepath).isFile()) {
        var name = dir + '/' + file.replace(/_|\.sass|\.scss/g, '');
        // push the sass import
        imports.push('@import ' + name + '\n');
        // push the jade nav list item
        list.push('  li: a(href=\'#' + name + '\') ' + name + '\n');

        // generate documentation, if exists
        var lines = fs.readFileSync(filepath, 'utf-8').split('\n'),
            doc = [],
            i = 0, len = lines.length;
        for (; i < len; i++) {
          if (isDoc(lines[i])) {
            var closed = false,
                n = name.split('/');
            doc.push('## ' + n[1].replace(/_/g, '') + '\n');
            while (!closed) {
              i++;
              if (isDoc(lines[i])) {
                closed = true;
              } else {
                doc.push(lines[i].substr(3) + '\n');
              }
            }
            docs.push('<div class=\'doc\'>\n<a name=\'' + name + '\'></a>\n' + 
              md.render(doc.join('')) + '</div>');
          }
        }
      }
    });
  }
});

// ../lib/_main.sass
var outfile = libdir + path.sep + '_main.sass'; 
fs.writeFileSync(outfile, imports.join(''));
console.log('File written to ' + outfile);

// ../demo/list.jade
outfile = demodir + path.sep + 'list.jade';
fs.writeFileSync(outfile, 'ul\n' + list.join(''));
console.log('File written to ' + outfile);

// ../demo/_content.html
outfile = demodir + path.sep + '_content.html';
fs.writeFileSync(outfile, md.render(docs.join('')));
console.log('File written to ' + outfile);

// helper
function isDoc(str) {
  return tooly.startsWith(str, '// ---') || tooly.startsWith(str, '//---') ;
}

