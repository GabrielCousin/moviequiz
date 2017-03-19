import Ember from 'ember';

export default Ember.Controller.extend({
  scores: Ember.computed.sort('model', 'scoreSorting'),
  scoreSorting: ['score:desc'],

  resetLeaderboard() {
    const store = this.get('store');
    const scores = store.peekAll('score').toArray();

    scores.forEach(function (score) {
      score.deleteRecord();
    })
  },

  actions: {
    onResetLeaderboard() {
      this.resetLeaderboard();
    }
  }
});
