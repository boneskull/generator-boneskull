#!/usr/bin/env node
'use strict';

<% if (es6) { %>import <%= moduleName %> from '../src';
import yargs from 'yargs';
import pkg from '../package.json';
<% } else { %>var <%= moduleName %> = require('../lib');
var pkg = require('../package.json');
var yargs = require('yargs');<% } %>
<% if (es6) { %>const argv = yargs<% } else { %> {
var argv = yargs<% } %>
  .usage('$0 [options] <files>')
<% if (es6) { %>  .version(() => pkg.version)<% } else { %>
  .version(function() {
    return pkg.version;
  })<% } %>
  .help('help')
  .alias('help', 'h')
  .showHelpOnFail(true)
  .argv;

<%= moduleName %>(argv);
