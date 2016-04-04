'use strict';

module.exports = function (grunt) {
	//require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		appPaths: {
      			app: './src/',
      			dist: './dist/'
    		},
		clean: {
			buildx: ['<%= appPaths.app %>/vendor', '<%= appPaths.dist %>', './.tmp'],
		},
		useminPrepare: {
      			html: ['<%= appPaths.app %>/**/*.html'],
      			options: {
        			dest: '<%= appPaths.dist %>'
      			}
    		},
		concurrent: {
		      dist: [
			'jshint',
			'htmlhint',
			'csslint'
		      ]
    		},
		jshint: {
			options: {
				devel: true,
				strict: "global",
				browser: true
			},
			files: ['<%= appPaths.app %>/js/**/*.js', '!<%= appPaths.app %>/vendor/bower_components/**/*.js']
		},		
		htmlhint: {
			templates: {
				options: {
					'attr-lower-case': true,
					'attr-value-not-empty': true,
					'tag-pair': true,
					'tag-self-close': true,
					'tagname-lowercase': true,
					'id-class-value': true,
					'id-class-unique': true,
					'img-alt-required': true
				},
				src: ['<%= appPaths.app %>/**/*.html']
			}
		}, 		
		csslint: {
			strict: {
				options: {
				},
				src: ['<%= appPaths.app %>/css/**/*.css']
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeEmptyAttributes: true,
					removeEmptyElements: true,
					removeRedundantAttributes: true,
					removeComments: false,
					removeOptionalTags: false,
					removeTagWhitespace: true
					
				},
				files: [{
					expand: true,
					cwd: '<%= appPaths.app  %>',
					src: ['**/*.html'],
					dest: '<%= appPaths.dist  %>'
				}] 
				
			}
		},		
		concat: {			
		},
		cssmin: {						
		},
		uglify: {						
			options: {
				compress: {
					drop_console: true
				},
				beautify: true			
			}
		},
    		rev: {
      			dist: {
        			files: {
          				src: [
            					'<%= appPaths.dist %>/js/**/*.js',
            					'<%= appPaths.dist %>/css/**/*.css',
            					'<%= appPaths.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'          
					]
        			}
      			}
    		},
    		usemin: {
      			html: ['<%= appPaths.dist %>/{,*/}*.html'],
      			css: ['<%= appPaths.dist %>/css/{,*/}*.css'],
      			options: {
        			dirs: ['<%= appPaths.dist %>']
      			}
    		}
	});	

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.registerTask("default", ['clean:buildx', 'useminPrepare', 'concurrent:dist', 'htmlmin:dist', 'concat', 'cssmin','uglify', 'rev', 'usemin']);
};
