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

  actions: {
    endGame(score) {
      const store = this.get('store');
      const storage = this.get('storage');
      const currentUsername = this.get('storage.username');

      store.createRecord('score', {
        name: currentUsername,
        score: score
      })

      storage.addHighscore(currentUsername, score);
      this.transitionTo('leaderboard');
    }
  }
});
