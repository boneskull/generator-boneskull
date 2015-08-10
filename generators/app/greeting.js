'use strict';

var yosay = require('yosay');
var superb = require('superb');
var chalk = require('chalk');

module.exports = function() {
  this.log(yosay(
    'Welcome to the ' + superb() + ' ' + chalk.red('boneskull') +
    ' generator!'
  ));
};
