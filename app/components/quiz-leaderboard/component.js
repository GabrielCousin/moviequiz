import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['Leaderboard'],
  scores: Ember.computed.sort('model', 'scoreSorting'),

  scoreSorting: ['score:desc'],

  actions: {
    onResetLeaderboard() {
      this.get('onResetLeaderboard')();
    }
  }
});
