var xtend = require('xtend');

var defaults = {
  PORT: 4000,
  SECRET: 'JsConf UY Super Secret For JWTs'
};

module.exports = xtend(defaults, process.env);