'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    exec: {
      gen: {
        cmd: 'npm run gen'
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true,
          layout: false
        },
        files: {
          'test/index.html': 'test/index.jade'
        }
      }
    },

    'sass-convert': {
      options: {
        from: 'scss',
        to: 'sass'
      },
      files: {
        src: ['lib/**/*.scss'],
        dest: '__dest'
      }
    },

    sass: {
      test: {
        options: {
          style: 'expanded'
        },
        files: {
          'test/style.css': 'test/style.sass'
        }
      }
    },

    'string-replace': {
      test: {
        files: {
          'dist/': 'lib/**/*.sass',
          'test/style.sass': 'test/style.brute'
        },
        options: {
          replacements: [{
            pattern: /\+\+/ig,
            replacement: '@extend'
          }, {
            pattern: />>/ig,
            replacement: '@include'
          }]
        }
      }
    },

    watch: {
      jade: { 
        files: ['test/index.jade'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['lib/**/*.sass', 'test/*.sass'],
        tasks: ['exec', 'sass:test']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('gen', ['exec']);
}