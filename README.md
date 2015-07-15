# grunt-verify-newer

> Verifies that tasks such as uglify have been run to generate updated artifacts.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-verify-newer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-verify-newer');
```

## The "verify_newer" task

### Overview
There is no config.

### Options
No options

### Usage Examples
We'll use uglify as an example:
```
uglify: {
    options: {
        sourceMap: true
    },
    myTarget: {
        files: {
            'target-file.js': ['src/target/**/*.js']
        }
    },
    myOtherTarget: {
        files: {
            'other-target-file.js': ['src/other/**/*.js']
        }
    }
}
```

Register a task using verify_newer that will check to make sure the minified files are up to date. This task will check that both target-file.js and other-target-file.js are up to date:
```
grunt.registerTask('verify', ['verify_newer:uglify']);
```
This task will only check that target-file.js is up to date.
```
grunt.registerTask('verify', ['verify_newer:uglify:myTarget']);
```


### Known Limitations
This task only works on tasks that have their file lists in the standard grunt format:
```
thirdPartyTask: {
    options: {
        ignored: true
    },
    targetName: {
        files: {
            'destination-file.js': ['src/**/*.js']
        }
    }
}
```

It has only been tested for cssmin and uglify. If there is another config format that you would like supported, submit a pull request or contact the author.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
