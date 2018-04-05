module.exports = function(grunt) {

    grunt.initConfig({

        env: {
            chrome: {
                BROWSER: 'chrome'
            },
            firefox: {
                BROWSER: 'firefox'
            },
            dashboard: {
                NODE_ENV: 'development',
                BABEL_ENV: 'development'
            }
        },

        open : {
            dashboard : {
              path: 'http://localhost:3001/index.html',
              app: 'Chrome'
            }
        },

        clean: {
            dashboard: ['./cucumber/dashboard/public'],
            testLogs: ['./cucumber/dashboard/public/logs']
        },

        copy: {
            dashboardResource: {
                files: [{
                    expand: true, 
                    src: ['./cucumber/dashboard/resource/*'], 
                    dest: './cucumber/dashboard/public/', 
                    flatten: true, 
                    filter: 'isFile'
                }]
            },
            dashboardDuplicateLogs: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: ['./cucumber/logs/*'], 
                    dest: './cucumber/dashboard/public/logs/',
                    filter: 'isFile'
                }]
            },
            renameLog: {
                files: [{
                    expand: true,
                    src: ['cucumber/logs/cucumber.json'],
                    dest: 'cucumber/logs/', 
                    filter: 'isFile',
                    rename: function(dest, src) {
                        const currDate = new Date;
                        return dest + 'cucumber_' + process.env.BROWSER + '_' + currDate.getTime() + '.json';
                    }
                }]
            }
        },

        mkdir: {
            logging: {
                options: {
                    create: ['cucumber/logs'],
                },
            },
            publicLogs: {
                options: {
                    create: ['cucumber/dashboard/public/logs/'],
                },
            },
        },

        concat_css: {
            dashboard: {
                src: ["cucumber/dashboard/src/**/*.css"],
                dest: "cucumber/dashboard/public/app.css"
            },
        },

        browserify: {
              dashboard: {
                options: {
                  debug: false,
                  transform: [ [ 'babelify', { "presets": ["react-app"] } ], [ 'browserify-css' ] ]
                },
                files: {
                  './cucumber/dashboard/public/app.js': './cucumber/dashboard/src/**/*.js'
                }
            }
        },

        express: {
            dashboard: {
                options: {
                    script: './cucumber/dashboard/server.js',
                    nospawn: true,
                    delay: 5
                }
            }
        },        

        watch: {
            dashboard: {
                files: ['./cucumber/logs/**/*.json'],
                tasks: ['express:dashboard'],
                options: {
                    nospawn: true
                }   
            }            
        },

        exec: {
                chrome: 'npm run testChrome',
                firefox: 'npm run testFireFox'
            }
    });

    grunt.registerTask('testChrome', function(arg) {
        grunt.task.run('mkdir:logging', 'env:chrome', 'exec:chrome', 'afterTest');
    });

    grunt.registerTask('testFireFox', function(arg) {
        grunt.task.run('mkdir:logging', 'env:firefox', 'exec:firefox', 'afterTest');
    });

    grunt.registerTask('afterTest', function(arg) {
        grunt.task.run('copy:renameLog', 'deployTestReports', 'express:dashboard', 'open:dashboard', 'watch:dashboard');
    });    

    grunt.registerTask('deployTestReports', function(arg) {
        grunt.task.run('indexTestReports', 'mkdir:publicLogs', 'clean:testLogs', 'copy:dashboardDuplicateLogs');
    });

    grunt.registerTask('buildDashboard', function(arg) {
        grunt.task.run('clean:dashboard', 'env:dashboard', 'copy:dashboardResource', 'browserify:dashboard', 'concat_css:dashboard', 'deployTestReports', 'express:dashboard', 'open:dashboard', 'watch:dashboard');
    });    

    grunt.registerTask('indexTestReports', function(arg) {
        const dirList = grunt.file.expand({filter: "isFile", cwd: "cucumber/logs/"}, ["*.json"]);
        let reportArray = [];

        dirList.map(function (t) {
            if(t !== "cucumber.json" && t !== "reportIndex.json") {
                let reportFile = '{"filename":"' + t + '",';

                const browser = t.substring(t.indexOf('_') + 1, t.lastIndexOf('_'));

                reportFile += '"browser":"' + browser + '",';

                const timeStamp = t.substring(t.lastIndexOf('_') + 1, t.indexOf('.'));

                reportFile += '"timestamp":"' + timeStamp + '",';

                reportFile += '"loaded":false}';

                reportArray.push(reportFile);
            }
        });
        grunt.file.write('cucumber/logs/reportIndex.json', '{"reportIndex":[' + reportArray + ']}');
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-folder-list');

}