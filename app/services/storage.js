import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  username: null,

  init() {
    const username = localStorage.getItem('moviequiz_user');

    if (username)
      this.signUserIn(username)
  },

  getEntry(key) {
    return localStorage.getItem(key);
  },

  setEntry(key, value) {
    localStorage.setItem(key, value);
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  signUserIn(username) {
    const store = this.get('store');
    this.set('username', username)

    store.createRecord('user', {
      name: username
    });

    this.setEntry('moviequiz_user', username)
  },

});
