'use strict';

var prompts = [
  {
    name: 'cli',
    message: 'Do you need a CLI?',
    type: 'confirm',
    'default': false
  },
  {
    name: 'es6',
    message: 'Use ES6?',
    type: 'confirm',
    'default': false
  }
];

module.exports = {
  generator: function() {
    var done = this.async();

    this.prompt(prompts, function(props) {
      this.props.cli = props.cli;
      this.props.es6 = props.es6;
      done();
    }.bind(this));

  }
};
