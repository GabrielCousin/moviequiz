import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  username: null,

  init() {
    const username = localStorage.getItem('moviequiz_user');
    const highscores = localStorage.getItem('moviequiz_scores');

    if (username)
      this.signUserIn(username)

    if (highscores)
      this.recoverLeaderboard(highscores)
  },

  getItem(key) {
    return localStorage.getItem(key);
  },

  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  recoverLeaderboard(highscores) {
    const store = this.get('store');
    let _highscores = JSON.parse(highscores) || [];

    if (!_highscores.length)
      return;

    _highscores.forEach(function (score) {
      store.createRecord('score', score);
    })
  },

  addHighscore(name, score) {
    let highscores = JSON.parse(this.getItem('moviequiz_scores')) || [];

    highscores.push({
      name: name,
      score: score
    });

    this.setItem('moviequiz_scores', JSON.stringify(highscores));
  },

  resetHighscores() {
    const store = this.get('store');
    const scores = store.peekAll('score').toArray();

    scores.forEach(function (score) {
      score.deleteRecord();
    })

    this.removeItem('moviequiz_scores');
  },

  signUserIn(username) {
    const store = this.get('store');
    this.set('username', username)

    store.createRecord('user', {
      name: username
    });

    this.setItem('moviequiz_user', username)
  },

});
