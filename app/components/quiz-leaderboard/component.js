import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['Leaderboard'],
  scores: Ember.computed.sort('model', 'scoreSorting'),
  saveLabel: "Save to server",

  scoreSorting: ['score:desc'],

  actions: {
    onSaveToServer() {
      this.set('saveLabel', 'Saving');
      this.get('onSaveToServer')().then(() => {
        this.set('saveLabel', 'Saved!');
      }, () => {
        this.set('saveLabel', 'Failed :(');
      })
    }
  }
});
