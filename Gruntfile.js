/*!
 * pageui
 */

/* jshint node: true */
module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var dist = 'dist/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            distPath: dist,
            doclessetsPath: 'docs/assets/',
            docsDistPath: 'docs/dist/',
            docsPath: 'docs/',
            jsPath: 'js/',
            srcPath: 'less/'
        },

        banner: '/*!\n' +
        ' * =====================================================\n' +
        ' * pageui V<%= pkg.version %>' +
        ' *\n' +
        ' * =====================================================\n' +
        ' */\n',

        clean: {
            dist: ['<%= meta.distPath %>', '<%= meta.docsDistPath %>']
        },

        concat: {
            light7: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/intro.js',
                    'js/device.js',
                    'js/util.js',
                    'js/detect.js',
                    'js/zepto-adapter.js',
                    'js/fastclick.js',
                    'js/template7.js',
                    'js/page.js',
                    'js/tabs.js',
                    'js/bar-tab.js',
                    'js/modal.js',
                    'js/calendar.js',
                    'js/picker.js',
                    'js/datetime-picker.js',
                    'js/notification.js',
                    'js/index.js',
                    'js/searchbar.js',
                    'js/panels.js',
                    'js/router.js',
                    'js/init.js',
                    //轮播图，照片浏览器
                    'js/swiper.js',
                    'js/swiper-init.js',
                    'js/photo-browser.js',
                    //城市三级联动
                    'js/city-data.js',
                    'js/city-picker.js',
                    //swipout  action
                    'js/swipeout.js'
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>.js'
            },
            i18n: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/i18n/cn.js'
                ],
                dest: '<%= meta.distPath %>js/i18n/cn.js'
            }
        },


        less: {
            core: {
                src: 'less/light7.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.css'
            },
            docs: {
                src: 'less/docs.less',
                dest: '<%= meta.doclessetsPath %>css/docs.css'
            },
            demos: {
                src: 'less/demos.less',
                dest: '<%= meta.doclessetsPath %>css/demos.css'
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        '<%= meta.distPath %>css/*.css',
                        '<%= meta.doclessetsPath %>css/docs.css'
                    ]
                }
            }
        },

        csscomb: {
            options: {
                config: 'less/.csscomb.json'
            },
            core: {
                files: {
                    '<%= less.core.dest %>': '<%= less.core.dest %>'
                }
            },
            docs: {
                files: {
                    '<%= less.docs.dest %>': '<%= less.docs.dest %>'
                }
            }
        },

        copy: {
            img: {
                expand: true,
                src: 'img/*',
                dest: '<%= meta.distPath %>'
            },
            fonts: {
                expand: true,
                src: 'fonts/*',
                dest: '<%= meta.distPath %>'
            },
            docs: {
                expand: true,
                cwd: '<%= meta.distPath %>',
                src: [
                    '**/*'
                ],
                dest: '<%= meta.docsDistPath %>'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 9',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            core: {
                src: '<%= less.core.dest %>'
            },
            docs: {
                src: '<%= less.docs.dest %>'
            },
            demos: {
                src: '<%= less.demos.dest %>'
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: '*', // keep all important comments
                advanced: false,
                keepBreaks: true
            },
            light7: {
                src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
            },
            docs: {
                src: [
                    '<%= meta.doclessetsPath %>css/docs.css',
                    '<%= meta.doclessetsPath %>css/pygments-manni.css'
                ],
                dest: '<%= meta.doclessetsPath %>css/docs.min.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: false
            },
            light7: {
                src: '<%= concat.light7.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>.min.js'
            },
            i18n: {
                src: '<%= concat.i18n.dest %>',
                dest: '<%= meta.distPath %>js/i18n/cn.min.js'
            },
            docs: {
                src: [
                    '<%= meta.doclessetsPath %>js/docs.js',
                    '<%= meta.doclessetsPath %>js/fingerblast.js'
                ],
                dest: '<%= meta.doclessetsPath %>js/docs.min.js'
            }
        },

        qunit: {
            options: {
                inject: 'js/tests/unit/phantom.js'
            },
            files: 'js/tests/index.html'
        },

        watch: {
            options: {
                hostname: 'localhost',
                livereload: true,
                port: 8000
            },
            js: {
                files: '<%= meta.jsPath %>*.js',
                tasks: ['dist-js', 'copy']
            },
            i18n: {
                files: ['<%= meta.jsPath %>i18n/*.js'],
                tasks: ['concat:i18n']
            },
            css: {
                files: '<%= meta.srcPath %>**/*.less',
                tasks: ['dist-css', 'copy']
            },
            html: {
                files: '<%= meta.docsPath %>**',
                tasks: ['jekyll']
            }
        },

        jekyll: {
            docs: {}
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js', 'grunt/*.js']
            },
            src: {
                src: 'js/*.js'
            },
            docs: {
                src: ['<%= meta.doclessetsPath %>/js/docs.js', '<%= meta.doclessetsPath %>/js/fingerblast.js']
            }
        },


        connect: {
            site: {
                options: {
                    base: '_site/',
                    hostname: '0.0.0.0',
                    livereload: true,
                    open: true,
                    port: 8000
                }
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);
    grunt.registerTask('dist-js', ['concat', 'uglify']);
    grunt.registerTask('dist', ['dist-css', 'dist-js', 'copy']);
    grunt.registerTask('validate-html', ['jekyll']);
    grunt.registerTask('build', ['dist']);
    grunt.registerTask('test', ['dist', 'jshint', 'qunit', 'validate-html']);
    grunt.registerTask('server', ['dist', 'jekyll', 'connect', 'watch']);
    grunt.registerTask('default', ['test', 'dist']);
};
