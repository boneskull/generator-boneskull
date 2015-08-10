'use strict';

module.exports = {
  dotfiles: function() {
    this._copy('editorconfig', '.editorconfig');
    this._copy('eslintignore', '.eslintignore');
    this._copy('travis.yml', '.travis.yml');
  },

  license: function() {
    this._copy('LICENSE');
  },

  readme: function() {
    this._copy('README.md');
  },

  git: function() {
    this.composeWith('node:git', {}, {
      local: require('path').join(__dirname,
        '..',
        '..',
        'node_modules',
        'generator-node',
        'generators',
        'git')
    });
  }

};
