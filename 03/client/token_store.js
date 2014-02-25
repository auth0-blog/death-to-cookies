var store = require('store');
var key = 'id_token';

module.exports = {
  save: function store_token(token) {
    store.set(key, token);
  },
  get: function () {
    return store.get(key);
  },
  clear: function () {
    return store.remove(key);
  }
};

