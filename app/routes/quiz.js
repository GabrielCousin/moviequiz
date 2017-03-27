import Ember from 'ember';

export default Ember.Route.extend({
  moviedb: Ember.inject.service(),

  beforeModel() {
    const store = this.get('store');
    const moviedb = this.get('moviedb');

    let users = store.peekAll('user').toArray();

    if (!users.length)
      this.transitionTo('index');

    return moviedb.refresh()
  },

  model() {
    const moviedb = this.get('moviedb');
    return moviedb.pickGame();
  },

  setupController (controller, model) {
    controller.setProperties({
      questions: model,
      currentQuestion: model[0],
      currentIndex: 1
    })
  }


});
