'use strict';

var slug = require('slug');
var superb = require('superb');
var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');
var camelCase = require('lodash.camelcase');

module.exports = {
  app: function() {
    var done = this.async();
    var prompts = [
      {
        name: 'generator',
        message: 'What kind of module is this?',
        type: 'list',
        choices: [
          {
            name: 'NodeJS',
            value: 'node'
          },
          {
            name: 'AngularJS',
            value: 'angular'
          }
        ]
      },
      {
        name: 'moduleName',
        message: 'What do you want to name your module?',
        'default': this.appname.replace(/\s/g, '-'),
        store: true,
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
        message: 'What is the URL of your personal website?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You must provide a website URL';
        },
        filter: function(val) {
          return normalizeUrl(val);
        }
      }
    ];

    require('./greeting').call(this);

    this.prompt(prompts, function(props) {
      this.props = props;
      props.camelModuleName = camelCase(props.moduleName);
      props.name = this.user.git.name();
      props.email = this.user.git.email();
      props.humanizedWebsite = humanizeUrl(props.website);
      props.year = new Date().getFullYear();
      this.user.github.username(function(err, username) {
        if (err) {
          return done(err);
        }
        props.githubUsername = username;
        done();
      });
    }.bind(this));

  },
  generator: function() {
    var generator = this.props.generator;

    if (generator === 'angular') {
      throw new Error('not implemented');
    }

    this.composeWith('boneskull:' + generator, {
      options: {
        props: this.props
      }
    }, {
      local: require.resolve('../../generators/' + generator)
    });
  }
};
