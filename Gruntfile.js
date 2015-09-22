module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/analyticsCNIL.js'],
        dest: 'js/analyticsCNIL.min.js'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['uglify', 'cssmin']);

};
