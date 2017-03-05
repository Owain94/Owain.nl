module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sftp: {
      deploy: {
        files: {
          './': ['dist/.*', 'dist/**']
        },
        options: {
          host: process.env.DEPLOY_HOST,
          path: process.env.DEPLOY_PATH,
          username: process.env.DEPLOY_USERNAME,
          password: process.env.DEPLOY_PASSWORD,
          showProgress: true,
          srcBasePath: 'dist',
          createDirectories: true
        }
      }
    },
    sshexec: {
      test: {
        command: 'ls',
        options: {
          host: process.env.DEPLOY_HOST,
          username: process.env.DEPLOY_USERNAME,
          password: process.env.DEPLOY_PASSWORD
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ssh');
  grunt.registerTask('default', ['sftp']);
};