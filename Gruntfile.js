module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n * <%= pkg.name %>\n' +
            ' * Author:<%= pkg.author %>\n' +
            ' * Summary:<%= pkg.description %>\n' +
            ' * License:<%= pkg.license %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' *\n * URL:\n * <%= pkg.homepage %>\n' +
            ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n',
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                'moto/static_dev/js/requirejs.config.js',
                'moto/static_dev/js/django.csrf.js',
                'moto/static_dev/js/global.js',
                'moto/static_dev/js/app_dev.js'
                ],
                dest: 'moto/static_dev/js/app_dev.pkged.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            clean: {
                options: {
                    beautify: {
                        width: 50,
                        beautify: true
                    },
                    mangle: {
                        except: ['_','Backbone','$','semantic','Resumable']
                    }
                },
                src: 'moto/static_dev/js/app_dev.pkged.js',
                dest: 'moto/static_dev/js/app.js'
            },
            build: {
                options:{
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'moto/static/js/app.min.js': ['moto/static_dev/js/app.js'],
                    'moto/static/js/myScroller.min.js': ['moto/static_dev/js/myScroller.js'],
                    'moto/static/jquery-timeago-1.4.1/jquery.timeago.min.js': ['moto/static/jquery-timeago-1.4.1/jquery.timeago.js']
                }
            }
        },
        copy: {
          main: {
            src: 'moto/static_dev/js/app.js',
            dest: 'moto/static/js/app.js'
          }
        },
        watch: {
            /* options: {
              livereload: true,
            },*/
          static: {
            files: ['moto/static_dev/js/app_dev.js',
            'moto/static_dev/js/django.csrf.js',
            'moto/static_dev/js/global.js',
            'moto/static_dev/js/requirejs.config.js',
            'moto/static_dev/js/myScroller.js'
            ],
            tasks: ['default']/*,
            options: {
              spawn: false,
            },*/
          }
        },less: {
          dist: {
            options: {
                compress:true,
                // syncImport:true,
              paths: ["moto/static/css/"]
            },
            files: {
              "moto/static/css/styles.min.css": "moto/static_dev/less/styles.less"
            }
          }
        },
         cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'moto/static/semantic/semantic.min.css': 'moto/static/semantic/semantic.css',
              'moto/static/jquery.snsshare.js/css/style.min.css': 'moto/static/jquery.snsshare.js/css/style.css',
              'moto/static/selectize.js-0.12.1/dist/css/selectize.bootstrap3.min.css': 'moto/static/selectize.js-0.12.1/dist/css/selectize.bootstrap3.css'
            }
          }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:dist','less:dist','uglify:clean', 'uglify:build','copy:main']);
    
};
