'use strict';

var path = require('path');
var rimraf = require('rimraf');

rimraf(path.join(__dirname, '..', 'tmp'), function(err) {
  if (err) {
    throw new Error(err);
  }
});
