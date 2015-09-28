'use strict';

module.exports = {

  dotfiles: function() {
    this._copy('eslintrc', '.eslintrc');
  },

  gruntfiles: function() {
    this._copy('grunt/**', 'grunt/');
    this.fs.copy(this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'));
  },

  appfiles: function() {
    var props = this.props;

    this._copy('_package.json', 'package.json');
    if (props.es6) {
      this._copy('main/index.js', 'src/index.js');
    } else {
      this._copy('main/index.js', 'lib/index.js');
    }
    if (props.cli) {
      this._copy('bin/cli.js', 'bin/' + props.moduleName + '.js');
    }
  },

  testfiles: function() {
    this._copy('test/fixture.js');
    this._copy('test/test.spec.js');
    this._copy('test/eslintrc', 'test/.eslintrc');
  }
};
