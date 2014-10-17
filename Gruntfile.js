module.exports = function(grunt) {
  var version = '0.10.5';

  grunt.initConfig({
    nodewebkit: {
      options: {
        build_dir: './dist',
        version: version,
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
    var options = {
      args: ['nuffsaid']
    };

    switch(process.platform) {
      case 'linux':
        options['cmd'] = './dist/cache/linux32/' + version + '/nw';
      break;
      case 'darwin':
        options['cmd'] = 'dist/cache/mac/' + version + '/node-webkit.app/Contents/MacOS/node-webkit'
      break;
    }

    grunt.util.spawn(options);
  })
};