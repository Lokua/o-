'use strict';

var fs = require('fs-extra'),
    path = require('path'),
    tooly = require('tooly'),
    hljs = require('highlight.js'),
    Remarkable = require('remarkable');

var libdir,  // ../lib
    demodir, // ../demo
    dirs,    // ../lib/{dir}
    docs,    // each doc in each ../lib/{dir}/{file}
    list,    // ../demo/_list.jade (navigation)
    md;      // markdown compiler

// --- start 
init(); 
parse(); 
write();
// --- end 

function init() {
  libdir = path.resolve(__dirname + path.sep + path.normalize('../lib'));
  demodir = path.resolve(__dirname + path.sep + path.normalize('../demo'));
  dirs = fs.readdirSync(libdir);
  docs = [];
  list = [];
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
}

function parse() {
  // for each dir in ../lib
  dirs.forEach(function(dir, i) {

    var dirpath = path.resolve(libdir, dir);
    if (fs.lstatSync(dirpath).isDirectory()) {

      // for each file in ../lib/{dir}
      fs.readdirSync(dirpath).forEach(function(file) {

        var filepath = path.resolve(dirpath, file);
        if (fs.lstatSync(filepath).isFile()) {

          // generate documentation, if exists
          var lines = fs.readFileSync(filepath, 'utf-8').split('\n'),
              doc = [],
              docCount = 0, // monkey-patch: count if file contains more than one doc
              i = 0, d = 0, len = lines.length;

          // docCount form = `// doc n;` where n === number
          if (tooly.startsWith(lines[0], '// doc')) {
            docCount = +(lines[0].replace(/([\/]+\sdoc\s|;)/gi, ''));
          }

          for (; i < len; i++) {
            if (isDoc(lines[i])) {
              var closed = false;
              while (!closed) {
                i++;
                if (isDoc(lines[i])) {
                  closed = true;
                } else {
                  var str = lines[i].substr(3);
                  if (tooly.startsWith(lines[i], '// # ')) {
                    var anchor = str.substr(1).trim();
                    list.push('  li: a(href=\'#' + fmtsig(anchor) + '\') ' + fmtsig(anchor, true) + '\n');
                  }
                  doc.push(str + '\n');
                }
              }
              if (!docCount || (docCount && ++d === docCount)) {
                docs.push('<div class=\'doc\'>\n' + md.render(doc.join('')) + '</div>');
              }
            }
          }
        }
      });
    }
  });
}


function write() {
  // ../demo/__DOCTEST.html
  var outfile = demodir + path.sep + '_list.jade';
  fs.writeFileSync(outfile, 'ul\n' + list.join(''));
  console.log('File written to ' + outfile);  
  // ../demo/__DOCTEST.html
  outfile = demodir + path.sep + '_content.html';
  fs.writeFileSync(outfile, md.render(docs.join('')));
  console.log('File written to ' + outfile);
}

// helper: test for opening or closing doc tags
function isDoc(str) {
  return tooly.startsWith(str, '// ---') || tooly.startsWith(str, '//---') ;
}

// helper: strip param info from doc header for nav link
function fmtsig(sig, start0) {
  var indexOf = sig.indexOf('('),
      start = /[#%=]/.test(sig.charAt(0)) && !start0 ? 1 : 0;
  return indexOf === -1 ? sig.substr(start) : sig.substr(start, indexOf).replace('(', '');
}

