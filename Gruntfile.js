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
        files: {
          'test/style.css': 'test/style.sass'
        }
      }//,
      // dev: {
      //   options: {
      //     lineNumbers: true,
      //     style: 'expanded'/*,
      //     sourcemap: 'none'*/
      //   },
      //   files: {
      //     'o-.css': 'o-.sass',
      //     'test/style.css': 'test/style.sass'
      //   }
      // }
    },

    // 'string-replace': {
    //   test: {
    //     files: {
    //       'dist/': 'lib/**/*.sass',
    //       'test/style.sass': 'test/style.brute'
    //     },
    //     options: {
    //       replacements: [{
    //         pattern: /\+\+/ig,
    //         replacement: '@extend'
    //       }, {
    //         pattern: />>/ig,
    //         replacement: '@include'
    //       }]
    //     }
    //   }
    // },

    watch: {
      jade: { 
        files: ['test/index.jade'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['dist/**/*.sass', 'test/*.sass'],
        tasks: [/*'string-replace:test',*/ 'sass:test']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
}