import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',

  saveUsername() {
    let username = this.get('username');
    const storage = this.get('storage');

    if (username.length > 2) {
      storage.signUserIn(username);
      this.transitionToRoute('quiz');
    }

    return;
  },

  actions: {
    onSaveUsername() {
      this.saveUsername();
    }
  }
});
