/*
 * grunt-verify-newer
 * https://github.com/davetclark/grunt-verify-newer
 *
 * Copyright (c) 2015 Dave Clark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');

    grunt.registerTask('mockMinify', function (target, mode) {
        function touchFiles(destFile, sourceFiles, reverse, done) {
            var i;
            if (reverse) {
                grunt.file.write(destFile, '');
            } else {
                for (i = 0; i < sourceFiles.length; ++i) {
                    grunt.file.write(sourceFiles[i], '');
                }
            }

            setTimeout(function () {
                if (reverse) {
                    for (i = 0; i < sourceFiles.length; ++i) {
                        grunt.file.write(sourceFiles[i], '');
                    }
                } else {
                    grunt.file.write(destFile, '');
                }

                if (done !== undefined) {
                    done(true);
                }
            }, 10);
        }

        var tmpPath = path.normalize(path.join(__dirname, 'tmp')),
            specs = grunt.config.get('mockMinify')[target].files,
            destFile,
            destFiles = [],
            sourceFiles,
            i,
            doneFunc;

        // Must make the second call on a timeout or the timestamps will be equal
        var done = this.async();

        grunt.file.mkdir(tmpPath);

        for (destFile in specs) {
            if (specs.hasOwnProperty(destFile)) {
                destFiles.push(destFile);
            }
        }

        for (i = 0; i < destFiles.length; ++i) {
            sourceFiles = grunt.file.expand(specs[destFiles[i]]);
            doneFunc = (i === (destFiles.length - 1) ? done : undefined);
            touchFiles(destFiles[i], sourceFiles, mode === 'notmin', doneFunc);
        }
    });
};
