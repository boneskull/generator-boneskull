'use strict';
var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({
  prompting: require('./prompting'),
  configuring: require('./configuring'),
  writing: require('./writing'),
  _copy: require('../../lib/utils').copy
});
