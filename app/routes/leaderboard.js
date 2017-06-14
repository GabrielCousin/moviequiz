import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const store = this.get('store');
    return store.peekAll('score');
  },

  actions: {
    onResetLeaderboard() {
      const storage = this.get('storage');
      storage.resetHighscores();
    }
  }
});
