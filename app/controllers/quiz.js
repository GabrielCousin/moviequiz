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
    // @TODO improve algo with more matching questions
    let movies = this.get('movies');
    let actors = this.get('actors');

    let randomMovieIndex = Math.floor(Math.random() * movies.length);
    let randomActorIndex = Math.floor(Math.random() * actors.length);

    let randomMovie = movies[randomMovieIndex];
    let randomActor = actors[randomActorIndex];

    let currentQuestion = {
      movieTitle: randomMovie.get('title'),
      movieImage: randomMovie.get('image'),
      actorName: randomActor.get('name'),
      actorImage: randomActor.get('image'),
      // @TODO replace parseInt hack
      match: randomActor.get('movies').indexOf(parseInt(randomMovie.get('id'))) !== -1
    }

    actors.splice(randomActorIndex, 1)

    this.set('actors', actors);
    this.set('currentQuestion', currentQuestion);
    this.set('currentIndex', this.get('currentIndex') + 1);
  },

  setHighscore() {
    const store = this.get('store');
    const currentUsername = this.get('storage.username');
    const score = this.get('currentIndex');

    store.createRecord('score', {
      name: currentUsername,
      score: score
    })
  },

  actions: {
    checkAnswer(answer) {
      let index = this.get('currentIndex');
      let totalQuestions = this.get('totalQuestions');
      let gameOver = this.get('currentQuestion.match') !== answer;

      if (gameOver || index === totalQuestions) {
        this.setHighscore();
        this.transitionToRoute('leaderboard');
        return;
      }

      this.setNextQuestion()
    }
  }

});
