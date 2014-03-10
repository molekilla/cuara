
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        devel: true,
        curly: true,
        strict: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        expr: true,
	browser: true,
        multistr: true,
        laxcomma: true,
        globals: {
          require: false,
          module:false,
          __dirname: false,
//          console: false,
          exports: false,
          describe: false,
        //  expect: false,
        //  sinon: false,
          it: false,
          beforeEach: false,
          afterEach: false,
          Buffer: false,
          process: false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js', 'templates/**/*.js', 'app.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    },


    simplemocha: {
       options: {
         globals: ['should'],
         timeout: 3000,
         ignoreLeaks: false,
         grep: '#',
         ui: 'bdd',
         reporter: 'spec'
       },

       all: { src: ['test/**/*.js'] }
     },
     mochaTest: {
       test: {
         options: {
           reporter: 'spec',
           ui: 'bdd',
           colors: true
         },
         src: ['test/**/*.js']
       }
     }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');



  // Default task.
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('spec', ['simplemocha', 'jshint']);
};
