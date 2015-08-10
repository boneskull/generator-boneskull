'use strict';

module.exports = {
  copy: function copy(src, dest) {
    dest = dest || src;
    this.fs.copyTpl(this.templatePath(src),
      this.destinationPath(dest),
      this.props);
  }
};
