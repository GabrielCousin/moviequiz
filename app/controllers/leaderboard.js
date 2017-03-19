import Ember from 'ember';

export default Ember.Controller.extend({
  // @TODO sort http://emberjs.com/api/classes/Ember.computed.html#method_sort
  scores: Ember.computed.alias('model'),

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
