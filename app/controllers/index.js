import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  username: '',
  isInvalid: false,

  validateUsername() {
    let username = this.get('username');

    if (username.length > 2) {
      this.saveUsername(username);
      return;
    }

    this.set('isInvalid', true)
  },

  saveUsername(username) {
    const storage = this.get('storage');
    storage.signUserIn(username);
    this.transitionToRoute('quiz');
  },

  actions: {
    onSaveUsername() {
      this.validateUsername();
    },

    onKeyUp(event) {
      let keyPressed = event.which;

      if (keyPressed === 13)
        this.validateUsername()

      this.set('isInvalid', false)
      return;
    }
  }
});
