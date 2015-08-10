'use strict';

var prompts = [
  {
    name: 'cli',
    message: 'Do you need a CLI?',
    type: 'confirm',
    'default': false
  }
];

module.exports = {
  generator: function() {
    var done = this.async();

    this.prompt(prompts, function(props) {
      this.props.cli = props.cli;
      done();
    }.bind(this));

  }
};
