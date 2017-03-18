import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',

  saveUsername() {
    let username = this.get('username');
    const store = this.get('store');

    if (username.length > 2) {
      store.createRecord('user', {
        name: username
      });
    }

    return;
  },

  actions: {
    onSaveUsername() {
      this.saveUsername();
    }
  }
});
