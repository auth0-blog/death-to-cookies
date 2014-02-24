function login (form) {
  var data = form.serialize();
  $.ajax({
    url: '/login',
    data: data,
    type: 'POST'
  }).done(function (result) {
    form.hide();

    //set the token for api calls
    set_api_token(result.token);

    //decode the profile to show the name
    var profile = jwt_decode(result.token);
    $('.bio-name').html(profile.first_name);
    $('#bio').show();
  });
}

function set_api_token(token) {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      //this should be set only for requests to this domain
      xhr.setRequestHeader("Authorization","Bearer " + token);
    }
  });
}

function get_messages() {
  $.ajax({
    url: '/api/messages',
    cache: false
  }).done(function (result) {
    alert(result);
  });
}

$('#login').submit(function (e) {
  e.preventDefault();
  var form = $(this);
  login(form);
});

$('#call-api').click(function (e) {
  e.preventDefault();
  get_messages();
});