var http = require('http');
var express = require('express');

var validateGoogleJWT = require('connect-google-jwt');
var browserify = require('browserify-middleware');

var env = require('./env');

var app = express();

app.configure(function () {
  this.use(express.static(__dirname + '/public'));

  //validate Google's JWT on every call:
  // - signature
  // - audience
  // - expiration
  this.use('/api', validateGoogleJWT({
    client_id: env.GOOGLE_CLIENT_ID
  }));
});

app.get('/main.js', browserify('./client/index.js'));

app.get('/api/messages', function (req, res) {
  res.json([
    { subject: 'Your invoice',  sender: 'Robert'},
    { subject: 'hello foobar',  sender: 'Bob'}
  ]);
});

http.createServer(app).listen(env.PORT, function (err) {
  if (err) {
    console.error(err.message);
    return process.exit(1);
  }
  console.log('listening in http://localhost:' + env.PORT);
});