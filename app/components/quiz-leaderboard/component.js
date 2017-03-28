import Ember from 'ember';

export default Ember.Component.extend({
  scores: Ember.computed.sort('model', 'scoreSorting'),

  scoreSorting: ['score:desc'],

  actions: {
    onResetLeaderboard() {
      this.get('onResetLeaderboard')();
    }
  }
});
