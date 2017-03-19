import Ember from 'ember';
import config from 'moviequiz/config/environment';

export default Ember.Controller.extend({

  totalQuestions: config.APP.QUESTION_PER_ROUND,

  movieImageStyle: Ember.computed('currentQuestion', function() {
    let path = this.get('currentQuestion.movieImage');
    return Ember.String.htmlSafe(`background-image: url("https://image.tmdb.org/t/p/w500${path}")`);
  }),

  actorImageStyle: Ember.computed('currentQuestion', function() {
    let path = this.get('currentQuestion.actorImage');
    return Ember.String.htmlSafe(`background-image: url("https://image.tmdb.org/t/p/w500${path}")`);
  }),

  setNextQuestion () {
    const currentIndex = this.get('currentIndex');
    const questions = this.get('questions');

    this.set('currentQuestion', questions[currentIndex]);
    this.set('currentIndex', currentIndex + 1);
  },

  setHighscore(score) {
    const store = this.get('store');
    const storage = this.get('storage');
    const currentUsername = this.get('storage.username');

    store.createRecord('score', {
      name: currentUsername,
      score: score
    })

    storage.addHighscore(currentUsername, score);
  },

  actions: {
    checkAnswer(answer) {
      let index = this.get('currentIndex');
      let totalQuestions = this.get('totalQuestions');
      let gameOver = this.get('currentQuestion.match') !== answer;

      if (gameOver || index === totalQuestions) {
        let finalScore = gameOver ? index - 1 : index;
        this.setHighscore(finalScore);
        this.transitionToRoute('leaderboard');
        return;
      }

      this.setNextQuestion()
    }
  }

});
