'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

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

    sass: {
      test: {
        files: {
          'test/sass-test.css': 'test/sass-test.sass'
        }
      },
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          'o-.css': 'o-.scss',
          'test/style.css': 'test/style.scss'
        }
      }
    },

    'string-replace': {
      test: {
        files: {
          'dist/': 'lib/**/*.scss',
          'test/style.scss': 'test/style.brute'
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
        files: ['dist/**/*.scss', 'test/*.brute'],
        tasks: ['string-replace:test', 'sass:dev']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
}