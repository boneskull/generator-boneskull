'use strict';

module.exports = {

  dotfiles: function() {
    this._copy('editorconfig', '.editorconfig');
    this._copy('eslintignore', '.eslintignore');
    this._copy('travis.yml', '.travis.yml');
  },

  gruntfiles: function() {
    this._copy('grunt/**', 'grunt/');
  },

  readme: function readme() {
    this._copy('README.md');
  },

  license: function license() {
    this._copy('LICENSE');
  },

  generator: function() {
  }
};
