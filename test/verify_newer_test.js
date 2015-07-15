'use strict';

var grunt = require('grunt');
var path = require('path');
var exec = require('child_process').exec;
var execOptions = {
    cwd: path.normalize(path.join(__dirname, '..'))
};

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tests = {
    setUp: function (done) {
        // Clear out the temp mock minified files
        var tmpPath = path.normalize(path.join(__dirname, '../tmp'));
        grunt.file.delete(tmpPath);
        done();
    },
    failsInvalidTask: function (test) {
        test.expect(2);
        exec('grunt verify_newer:badTaskName', execOptions, function (error) {
            test.notEqual(error, null);
            exec('grunt verify_newer:badTaskName:badTargetName', execOptions, function (err2) {
                test.notEqual(err2, null);
                test.done();
            });
        });
    },
    failsInvalidTarget: function (test) {
        test.expect(1);
        exec('grunt verify_newer:mockMinify:badTarget', execOptions, function (error) {
            test.notEqual(error, null);
            test.done();
        });
    },
    failsIfNoDestfile: function (test) {
        test.expect(1);
        exec('grunt verify_newer:mockMinify:target1', execOptions, function (error, stdout) {
            test.notEqual(error, null);
            test.done();
        });
    },
    failsIfNotNewer: function (test) {
        test.expect(1);
        exec('grunt mockMinify:target1:notmin verify_newer:mockMinify:target1', execOptions, function (error, stdout) {
            test.notEqual(error, null);
            test.done();
        });
    },
    failsIfOneTargetNotNewer: function (test) {
        test.expect(1);
        exec('grunt mockMinify:target1:notmin mockMinify:target2:min verify_newer:mockMinify', execOptions, function (error, stdout) {
            test.notEqual(error, null);
            test.done();
        });
    },
    targetSuccess: function (test) {
        test.expect(1);
        exec('grunt mockMinify:target1:min verify_newer:mockMinify:target1', execOptions, function (error, stdout) {
            test.equal(error, null);
            test.done();
        });
    },
    taskSuccess: function (test) {
        test.expect(1);
        exec('grunt mockMinify:target1:min mockMinify:target2:min verify_newer:mockMinify', execOptions, function (error, stdout) {
            test.equal(error, null);
            test.done();
        });
    }
};
