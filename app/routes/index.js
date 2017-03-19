import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    const store = this.get('store');
    let users = store.peekAll('user').toArray();

    if (users.length)
      this.transitionTo('quiz');
  }
});
