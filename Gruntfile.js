module.exports = function(grunt) {
  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './dist',
        credits: './nuffsaid/credits.html',
        win: true,
        linux32: true,
        linux64: true
      },
      src: './nuffsaid/**/*'
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('dist', ['nodewebkit']);
  grunt.registerTask('start', 'Start app', function() {
    grunt.util.spawn({
      //cmd: './dist/cache/linux32/0.9.2/nw',
      cmd: 'dist/cache/mac/0.9.2/node-webkit.app/Contents/MacOS/node-webkit',
      args: ['nuffsaid']
    });
  })
};