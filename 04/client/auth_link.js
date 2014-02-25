var url = require('url');
var env = require('../env');

module.exports =   url.format({
  protocol: 'https',
  host:     'accounts.google.com',
  pathname: '/o/oauth2/auth',
  query: {
    client_id:     env.GOOGLE_CLIENT_ID,
    redirect_uri:  env.REDIRECT_URI,
    response_type: 'id_token',
    scope:         'openid email'
  }
});