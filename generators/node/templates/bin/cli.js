#!/usr/bin/env node
'use strict';

var yargs = require('yargs');

var argv = yargs
  .usage('$0 [options] <files>')
  .version(function() {
    return require('../package.json').version;
  })
  .help('help')
  .alias('help', 'h')
  .showHelpOnFail(true)
  .argv;

require('../lib')(argv);
