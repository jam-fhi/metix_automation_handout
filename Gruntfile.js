module.exports = function(grunt) {

    grunt.initConfig({

        env: {
            chrome: {
                BROWSER: 'chrome'
            },
            firefox: {
                BROWSER: 'firefox'
            },
        },

        copy: {
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
        },

        exec: {
                chrome: 'npm run testChrome',
                firefox: 'npm run testFireFox'
            }
    });

    grunt.registerTask('testChrome', function(arg) {
        grunt.task.run('mkdir:logging', 'env:chrome', 'exec:chrome', 'copy:renameLog');
    });

    grunt.registerTask('testFireFox', function(arg) {
        grunt.task.run('mkdir:logging', 'env:firefox', 'exec:firefox', 'copy:renameLog');
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-env');
}