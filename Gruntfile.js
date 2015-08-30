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
                    'moto/static/js/myScroller.min.js': ['moto/static_dev/js/myScroller.js']
                    // 'moto/static/jquery-timeago-1.4.1/jquery.timeago.min.js': ['moto/static/jquery-timeago-1.4.1/jquery.timeago.js']
                }
            },libs:{
                files:{
                    'moto/static/js/require.min.js':'moto/static/js/require.js'
                    ,'moto/static/js/resumable.min.js':'moto/static/js/resumable.js'
                    ,'moto/static/js/jquery-timeago/jquery.timeago.min.js':'moto/static/js/jquery-timeago/jquery.timeago.js'
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
              'moto/static/jquery.snsshare.js/css/style.min.css': 'moto/static/jquery.snsshare.js/css/style.css'
              // 'moto/static/selectize.js-0.12.1/dist/css/selectize.bootstrap3.min.css': 'moto/static/selectize.js-0.12.1/dist/css/selectize.bootstrap3.css'
            }
          }
        }
        ,bowercopy: {
             js: {
                options: {
                    destPrefix: 'moto/static/js'
                },
                files: {
                 'jquery.min.js': 'jquery/dist/jquery.min.js'
                ,'jquery.min.map': 'jquery/dist/jquery.min.map'
                ,'backbone-min.js': 'backbone/backbone-min.js'
                ,'backbone-min.map': 'backbone/backbone-min.map'
                ,'hammer.min.map': 'hammerjs/hammer.min.map'
                ,'hammer.min.js': 'hammerjs/hammer.min.js'
                ,'jstz.min.js': 'jstz-1.0.4.min/index.js'
                ,'lodash.min.js': 'lodash/lodash.min.js'
                ,'masonry.min.js': 'masonry/dist/masonry.pkgd.min.js'
                ,'require.js': 'requirejs/require.js'
                ,'resumable.js': 'resumablejs/resumable.js'
                ,'velocity.min.js': 'velocity/velocity.min.js'
                ,'waves.min.js': 'waves/dist/waves.min.js'
                ,'waves.min.js.map': 'waves/dist/waves.min.js.map'
                ,'Jcrop.min.js': 'jcrop/js/Jcrop.min.js'
                ,'jquery.color.js': 'jcrop/js/jquery.color.js'
                ,'semantic.min.js': 'semantic/dist/semantic.min.js'
                ,'imagesloaded.pkgd.min.js': 'imagesloaded/imagesloaded.pkgd.min.js'
                ,'jquery-timeago/jquery.timeago.js': 'jquery-timeago/jquery.timeago.js'
                ,'jquery-timeago/locales/':'jquery-timeago/locales/' 
               
                }
            },
            css:{
                options: {
                    destPrefix: 'moto/static/css'
                },
                files:{
                    'waves.css':'waves/dist/waves.css'
                    ,'Jcrop.css':'jcrop/css/Jcrop.css'
                    ,'Jcrop.gif':'jcrop/css/Jcrop.gif'
                    ,'themes':'semantic/dist/themes'
                    ,'semantic.min.css': 'semantic/dist/semantic.min.css'
                }
            },
            plugins:{
                 options: {
                    destPrefix: 'moto/static/'
                },
                files:{
                    'selectize':'selectize/dist/'
                    
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['bowercopy:js','bowercopy:css','bowercopy:plugins','uglify:libs','concat:dist','less:dist','uglify:clean', 'uglify:build','copy:main']);
    
};
