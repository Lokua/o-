'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)

  grunt.initConfig({

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
        style: 'expanded',
        functions: require('./index')
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
  })

  grunt.registerTask('default', ['watch'])
  grunt.registerTask('test', ['jade:test', 'sass:test'])
}
