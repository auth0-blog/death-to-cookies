var http = require('http');
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var env = require('./env');

var app = express();

app.configure(function () {
  this.use(express.static(__dirname + '/public'));

  this.use('/api', expressJwt({ secret: env.SECRET }));
  this.use(express.json());
  this.use(express.urlencoded());
});


app.post('/login', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.password === '123')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, env.SECRET, { expiresInMinutes: 60*5 });

  res.json({ token: token });
});

app.get('/api/send_email', function (req, res) {
  res.json({ to: req.user.email });
});

http.createServer(app).listen(env.PORT, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('listening in http://localhost:' + env.PORT);
});