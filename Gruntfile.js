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
          'demo/index.html': 'demo/index.jade'
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
        dest: 'scss'
      }
    },

    sass: {
      demo: {
        options: {
          style: 'expanded'
        },
        files: {
          'demo/style.css': 'demo/style.sass'
        }
      }
    },

    watch: {
      jade: { 
        files: ['demo/*.jade'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['lib/**/*.sass', 'demo/*.sass'],
        tasks: ['exec', 'sass:demo']
      }
    }

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('gen', ['exec']);
}