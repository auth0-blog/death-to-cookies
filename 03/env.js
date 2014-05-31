var xtend = require('xtend');

var defaults = {
  PORT: 4000,
  SECRET: 'this-is-secret'
};

module.exports = xtend(defaults, process.env);