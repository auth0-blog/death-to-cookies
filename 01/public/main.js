function login (form) {
  var data = form.serialize();
  return $.ajax({
    url: '/login',
    data: data,
    type: 'POST'
  }).done(function (result) {
    //set the token for api calls
    set_api_token(result.token);

    //decode the profile to show the name
    var profile = jwt_decode(result.token);
    $('.bio-name').html(profile.first_name);
  });
}

function set_api_token(token) {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      //make sure where you send the header.
      //in this case we will send it only to requests to our own domain:
      if (this.crossDomain) return;

      //other option
      //if(!this.url.match(/^https\:\/\/api\.myapp\.com/)) return;
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  });
}

function get_messages() {
  return $.ajax({
    url: '/api/messages',
    cache: false
  });
}

$('#login').submit(function (e) {
  e.preventDefault();
  var form = $(this);
  login(form)
    .done(function () {
      form.hide();
      $('#bio').show();
    });
});

$('#call-api').click(function (e) {
  e.preventDefault();
  get_messages()
    .done(function (messages) {
      var target = $('#messages');
      messages.forEach(function (msg) {
        $('<li>')
          .text(msg.subject + ' by ' + msg.sender)
          .appendTo(target);
      });
    });
});