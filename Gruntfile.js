'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // exec: {
    //   gen: {
    //     cmd: 'npm run gen'
    //   }
    // },

    jade: {
      test: {
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
      options: {
        style: 'expanded'
      },
      test: {
        files: {
          'test/style.css': 'test/style.scss'
        }
      }
    },

    watch: {
      jade: {
        files: ['test/*.jade'],
        tasks: ['jade:test']
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass:test']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jade:test', 'sass:test'])
  // grunt.registerTask('gen', ['exec']);
  // grunt.registerTask('doc', ['exec', 'jade', 'sass']);
}
