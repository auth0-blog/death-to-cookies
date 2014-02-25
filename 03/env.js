var xtend = require('xtend');

var defaults = {
  PORT: 4000,
  GOOGLE_CLIENT_ID: '547106703597-a9nvjh93gvr1ac45c79vc9hc4jgedb5o.apps.googleusercontent.com',
  REDIRECT_URI: 'http://localhost:4000/'
};

module.exports = xtend(defaults, process.env);