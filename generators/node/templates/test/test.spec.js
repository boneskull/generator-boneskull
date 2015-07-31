'use strict';

var <%= camelModuleName %> = require('../lib');

describe('<%= camelModuleName %>', function() {

  it('should be a function', function () {
    expect(<%= camelModuleName %>).to.be.a('function');
  });

});
