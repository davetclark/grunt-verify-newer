/*
 * grunt-verify-newer
 * https://github.com/davetclark/grunt-verify-newer
 *
 * Copyright (c) 2015 Dave Clark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        mockMinify: {
            options: {
                comment: 'This is ignored'
            },
            target1: {
                files: {
                    'tmp/t1a.js': ['test/fixtures/t1a*.js'],
                    'tmp/t1b.js': ['test/fixtures/t1b*.js'],
                    'tmp/t1c.js': []
                }
            },
            target2: {
                files: {
                    'tmp/t2.js': ['test/fixtures/t2*.js']
                }
            }
        },
        eslint: {
            all: ['tasks/**/*.js', 'test/**/*.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-eslint');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['eslint', 'test']);
};
