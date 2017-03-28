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
    },

    onSaveToServer() {
      const store = this.get('store');
      const highscores = store.peekAll('score').toArray();

      let data = highscores.map(function(highscore) {
        return {
          name: highscore.get('name'),
          score: highscore.get('score')
        }
      })

      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.$.ajax({
           url: 'http://wrongurl.net',
           type: 'POST',
           data: JSON.stringify(data)
        }).done(() => {
          resolve()
        }).fail(() => {
          reject()
        });
      });
    }

  }
});
