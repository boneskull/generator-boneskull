'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('boneskull:node', function() {

  describe('with no CLI', function() {

    beforeEach(function(done) {
      helpers.run(path.join(__dirname, '../generators/node'))
        .withOptions({
          skipInstall: true
        })
        .withPrompts({
          moduleName: 'foo',
          website: 'boneskull.com',
          email: 'president@whitehouse.gov',
          cli: false
        })
        .withGenerators([[helpers.createDummyGenerator(), 'node:git']])
        .on('end', done);
    });

    it('generates expected files', function() {

      var expected = [
        '.editorconfig',
        '.eslintrc',
        '.eslintignore',
        '.travis.yml',
        'lib/index.js',
        'LICENSE',
        'package.json',
        'README.md',
        'test/test.spec.js',
        'test/.eslintrc',
        'grunt/aliases.yaml',
        'grunt/bump.yaml',
        'grunt/devUpdate.yaml',
        'grunt/mocha_istanbul.yaml',
        'grunt/test-tasks.yaml'
      ];

      assert.file(expected);
      assert.noFile('bin/test.js');
    });
  });

  describe('with CLI', function() {
    beforeEach(function(done) {
      helpers.run(path.join(__dirname, '../generators/node'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          moduleName: 'foo',
          website: 'boneskull.com',
          email: 'president@whitehouse.gov',
          cli: true
        })
        .on('end', done);
    });

    it('should generate files', function() {
      assert.file('bin/foo.js');
      assert.fileContent('package.json', /"bin":/);
      assert.fileContent('package.json',
        /"bin": {\n\s+"foo": "bin\/foo.js"\n\s+}/);
      assert.fileContent('package.json', /"yargs"/);

    });
  });
});
