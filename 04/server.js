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

var server = http.createServer(app).listen(env.PORT, function (err) {
  if (err) {
    console.error(err.message);
    return process.exit(1);
  }
  console.log('listening in http://localhost:' + env.PORT);
});


var io = require('socket.io').listen(server);
var socketioJwt   = require("socketio-jwt");

// set authorization for socket.io
io.set('authorization', socketioJwt.authorize({
  secret:    '-----BEGIN CERTIFICATE-----\nMIICITCCAYqgAwIBAgIIDWbHs5+4tiswDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xNDAzMTUwNDU4MzRaFw0xNDAzMTYxNzU4MzRaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wgZ8wDQYJKoZI\nhvcNAQEBBQADgY0AMIGJAoGBAOCTw33PAEvNVAPuYx5k81+DiZI/ZgNMhdXdmdiK\nIrug8sMszUGYO5Ygu4jIukCoYymk6PinIpkfduBCG/qPnE1hHBcF8v40VF8kNpZA\nn+s8blaSTp1LXRC5WtqngMXWGRs28t7zmauOVAT3fw0vti4qO5uWav9CD/NRwIVf\nbtDTAgMBAAGjODA2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1Ud\nJQEB/wQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4GBAJz7iA6vKOQLXi6V\nmke85+t2B5YXRJ917wlm0y3yGB6k8Kg3XUgJ2a+u29lTRrUCR6696Jw41xdm5yEL\nj3gABoWkjRyOfOBMPAYiADWkLCAnc4HxIXAz9LvGC6gW5RekWlCZZXL93YyRLdJW\n9B1Chsv/g0/ks64KxbACQ0qaOtLC\n-----END CERTIFICATE-----\n',
  handshake: true
}));

//-----BEGIN CERTIFICATE-----\nMIICITCCAYqgAwIBAgIIZ4AZHSLL8FkwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xNDAzMTQwNTEzMzRaFw0xNDAzMTUxODEzMzRaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wgZ8wDQYJKoZI\nhvcNAQEBBQADgY0AMIGJAoGBALn+KA5p1n6KSMwcjTbjsflNbwyiZF4yUa1z1LR3\n5zECcbaXIeemZ8c8oxNblVem4VZ0Dtc0xbqGYGW/pthHPXWu5JxW9ESMogxvu6Yv\nJVpbPmwcYhqQ2BjiQip8jW+lEtIj/cNZbmWi0gXN2TleWSjuTRQLShh1pRiJZZqH\nYBrxAgMBAAGjODA2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1Ud\nJQEB/wQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4GBAIHzVG/JRtHKAY6q\nY/AsAOLDEO1mIisN88dwwVc7vUzULnkSCZ9lZXxGG72Z0+FOryfe2g1FqYB+EQa6\nx54EGiCzqfxgXMrh8XavtTdJiIj0xUjDXIwpfGleM1gL2snj4M5eDHV+hkKRo86c\nyHM3Oj3unjc4vO+/KELOMUNx3R4r\n-----END CERTIFICATE-----\n

io.sockets.on('connection', function (socket) {
  console.log('hello! ', socket.handshake.decoded_token.email);

  setInterval(function () {
    socket.emit('super-message', {
      name: "tito"
    });
  }, 2000);
});
