'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelCase = require('lodash.camelcase');
var superb = require('superb');
var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');
var slug = require('slug');

function copy(src, dest) {
  dest = dest || src;
  this.fs.copyTpl(this.templatePath(src),
    this.destinationPath(dest),
    this.props);
}

module.exports = generators.Base.extend({
  prompting: function() {
    var done = this.async();
    var prompts;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + superb() + ' ' + chalk.red('boneskull') +
      ' generator!'
    ));

    prompts = [
      {
        name: 'moduleName',
        message: 'What do you want to name your module?',
        'default': this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return slug(val);
        }
      }, {
        name: 'description',
        message: 'Please describe this module.',
        'default': 'A ' + superb() + ' module',
        store: true
      }, {
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You have to provide a website URL';
        },
        filter: function(val) {
          return normalizeUrl(val);
        }
      }, {
        name: 'cli',
        message: 'Do you need a CLI?',
        type: 'confirm',
        'default': false
      }
    ];

    this.prompt(prompts, function(props) {
      this.props = props;
      props.camelModuleName = camelCase(props.moduleName);
      props.name = this.user.git.name();
      props.email = this.user.git.email();
      props.githubUsername = this.user.github.username();
      props.humanizedWebsite = humanizeUrl(props.website);
      props.year = new Date().getFullYear();
      props.superb = superb();

      done();
    }.bind(this));
  },

  configuring: {

    dotfiles: function() {
      var cp = copy.bind(this);

      cp('editorconfig', '.editorconfig');
      cp('eslintrc', '.eslintrc');
      cp('eslintignore', '.eslintignore');
      cp('travis.yml', '.travis.yml');
    },

    gruntfiles: function() {
      var cp = copy.bind(this);

      cp('grunt/**', 'grunt/');
    },

    license: function() {
      copy.call(this, 'LICENSE');
    },

    readme: function() {
      copy.call(this, 'README.md');
    },

    git: function() {
      var path = require('path');
      this.composeWith('node:git', {}, {
        local: path.join(__dirname,
          '..',
          '..',
          'node_modules',
          'generator-node',
          'generators',
          'git')
      });
    }
  },

  writing: {
    appfiles: function() {
      var props = this.props;
      var cp = copy.bind(this);

      cp('_package.json', 'package.json');
      cp('lib/index.js');
      if (props.cli) {
        cp('bin/cli.js', 'bin/' + props.moduleName + '.js');
      }
    },

    testfiles: function() {
      var cp = copy.bind(this);

      cp('test/fixture.js');
      cp('test/test.spec.js');
      cp('test/eslintrc', 'test/.eslintrc');
    }
  },

  install: function() {
    this.installDependencies();
  }
});
