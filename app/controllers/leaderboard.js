import Ember from 'ember';

export default Ember.Controller.extend({
  scores: Ember.computed.sort('model', 'scoreSorting'),
  scoreSorting: ['score:desc'],

  actions: {
    onResetLeaderboard() {
      const storage = this.get('storage');
      storage.resetHighscores();
    }
  }
});
