import Ember from 'ember';
import config from 'moviequiz/config/environment';

export default Ember.Component.extend({
  classNames: ['Quiz'],

  init() {
    this._super(...arguments);
    this.setProperties({
      'currentQuestion': this.get('model')[0],
      'totalQuestions': config.APP.QUESTION_PER_ROUND,
      'currentIndex': 1
    })
  },

  setNextQuestion () {
    const currentIndex = this.get('currentIndex');
    const questions = this.get('model');

    this.set('currentQuestion', questions[currentIndex]);
    this.set('currentIndex', currentIndex + 1);
  },

  actions: {
    checkAnswer(answer) {
      let index = this.get('currentIndex');
      let totalQuestions = this.get('totalQuestions');
      let gameOver = this.get('currentQuestion.match') !== answer;

      if (gameOver || index === totalQuestions) {
        let finalScore = gameOver ? index - 1 : index;
        this.get('endGame')(finalScore);
        return;
      }

      this.setNextQuestion()
    }
  }
});
