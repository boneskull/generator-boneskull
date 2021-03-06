'use strict';
var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function(args, options) {
    generators.Base.apply(this, arguments);
    options = options || {};
    this.props = options.props;
  },
  prompting: require('./prompting'),
  writing: require('./writing'),
  _copy: require('../../lib/utils').copy

});
