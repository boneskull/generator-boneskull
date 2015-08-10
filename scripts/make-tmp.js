'use strict';

var path = require('path');
var mkdirp = require('mkdirp');

mkdirp(path.join(__dirname, '..', 'tmp'), function(err) {
  if (err) {
    throw new Error(err);
  }
});
