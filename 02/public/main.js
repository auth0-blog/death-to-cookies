function login (form) {
  var data = form.serialize();
  $.ajax({
    url: '/login',
    data: data,
    type: 'POST'
  }).done(function (result) {
    load_token(result.token);
    store_token(result.token);
  });
}

function load_token(token) {
  var profile = jwt_decode(token);

  if (profile.exp < (new Date().getTime() / 1000)) {
    store.remove('id_token');
    return;
  }

  $('#login').hide();

  //set the token for api calls
  set_api_token(token);

  //decode the profile to show the name
  $('.bio-name').html(profile.first_name);
  $('#bio').show();
}

function store_token(token) {
  store.set('id_token', token);
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

$(function () {
  var token = store.get('id_token');
  if (token) {
    load_token(token);
  }
});

$('#login').submit(function (e) {
  e.preventDefault();
  var form = $(this);
  login(form);
});

$('#call-api').click(function (e) {
  e.preventDefault();
  get_messages();
});