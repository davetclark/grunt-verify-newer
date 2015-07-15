/*
 * grunt-verify-newer
 * https://github.com/davetclark/grunt-verify-newer
 *
 * Copyright (c) 2015 Dave Clark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var fs = require('fs');

    function getAllTargets(taskConfig) {
        var key,
            targets = [];
        for (key in taskConfig) {
            if (key !== 'options' && taskConfig.hasOwnProperty(key)) {
                targets.push(taskConfig[key]);
            }
        }
        return targets;
    }

    grunt.registerTask('verify_newer',
        'Verifies that tasks such as uglify have been run to generate updated artifacts.',
        function (taskName, targetName) {
            var taskConfig = grunt.config.get(taskName);

            if (taskConfig === undefined) {
                console.log('Invalid task name ' + taskName + '. No config provided');
                return false;
            }

            var targets = [];
            if (targetName) {
                if (!(targetName in taskConfig)) {
                    console.log('Invalid target name ' + targetName + '. No config provided in ' + taskName);
                    return false;
                }
                targets.push(taskConfig[targetName]);
            } else {
                /* If no target name passed in, use every target not named options */
                targets = getAllTargets(taskConfig);
            }

            var i,
                fileEntries,
                destFile,
                sourceFiles;

            for (i in targets) {
                fileEntries = targets[i].files;
                if (fileEntries === undefined) {
                    console.log(taskName + ':' + targetName + ' has no files key');
                    return false;
                }

                for (destFile in fileEntries) {
                    if (fileEntries.hasOwnProperty(destFile)) {
                        /* Flatten source files, removing duplicates etc */
                        sourceFiles = grunt.file.expand(fileEntries[destFile]);

                        for (i = 0; i < sourceFiles.length; ++i) {
                            if (!grunt.file.exists(destFile)) {
                                console.error(destFile + ' does not yet exist');
                                return false;
                            }
                            if (fs.statSync(destFile).mtime.getTime() < fs.statSync(sourceFiles[i]).mtime.getTime()) {
                                console.error('' + destFile + ' older than ' + sourceFiles[i]);
                                return false;
                            }
                        }
                    }
                }
            }

            return true;
        }
    );
};
