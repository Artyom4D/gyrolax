module.exports = function(grunt) {

  var files = [
    // Core
    "public/js/vnd/gameai/utils.js",
    "public/js/vnd/gameai/EventEmitter.js",
    
    // Input
    "public/js/vnd/gameai/input/InputHandlerBase.js",
    "public/js/vnd/gameai/input/MouseInputHandler.js",
    "public/js/vnd/gameai/input/TouchInputHandler.js",
    "public/js/vnd/gameai/input/InputHandler.js",

    // Gyrolax itself
    "public/js/Tracker.js"
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      target_1: {
        files: {
          'public/js/<%= pkg.name %>.min.js': files
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};