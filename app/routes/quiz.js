import Ember from 'ember';
import config from 'moviequiz/config/environment';

export default Ember.Route.extend({

  beforeModel() {
    const store = this.get('store');
    let users = store.peekAll('user').toArray();

    if (!users.length)
      this.transitionTo('index');
  },

  storeMovieDbData(data) {
    const store = this.get('store');

    data.results.forEach((result) => {
      let movieIds = [];

      result.known_for.forEach((movie) => {
        if (movie.media_type !== 'movie')
          return;

        movieIds.push(movie.id);
        let movieExists = store.peekRecord('movie', movie.id);

        if (!movieExists) {
          store.createRecord('movie', {
            id: movie.id,
            image: movie.poster_path,
            title: movie.title
          })
        }
      })

      let actorExists = store.peekRecord('actor', result.id);

      if (!actorExists) {
        store.createRecord('actor', {
          id: result.id,
          image: result.profile_path,
          name: result.name,
          movies: movieIds
        })
      }
    });
  },

  setQuestionTypes () {
    // this ensure we generate more matching questions
    let types = [];
    for (let i = 0; i < 10; i++)
      types.push(Math.round(Math.random()));

    return types;
  },

  getMovieById (id) {
    const store = this.get('store');
    return store.peekRecord('movie', id)
  },

  setupController(controller) {
    const MOVIEDB_APIKEY = config.APP.MOVIEDB_APIKEY;
    const MOVIEDB_QUERY_PAGE = Math.ceil((Math.random() * 10));

    controller.set('isFetching', true);

    Ember.$.ajax({
       url: 'https://api.themoviedb.org/3/person/popular',
       type: 'GET',
       data: {
         page: MOVIEDB_QUERY_PAGE,
         api_key: MOVIEDB_APIKEY
       }
    }).done((data) => {
      this.storeMovieDbData(data);
    }).then(() => {
      const store = this.get('store');
      let types = this.setQuestionTypes();
      let movies = store.peekAll('movie').toArray();
      let actors = store.peekAll('actor').toArray();

      let questions = types.map((forced) => {
        let actorId = Math.floor(Math.random() * actors.length);
        let actor = actors[actorId];

        let movieId = forced ? actor.get('movies')[0] : Math.floor(Math.random() * movies.length);
        let movie = forced ? this.getMovieById(movieId) : movies[movieId];
        if (!movie)
          this.setupController();

        return {
          movieTitle: movie.get('title'),
          movieImage: movie.get('image'),
          actorName: actor.get('name'),
          actorImage: actor.get('image'),
          match: actor.get('movies').indexOf(parseInt(movie.get('id'))) !== -1
        }
      })

      controller.set('isFetching', false);
      controller.set('questions', questions);
      controller.set('currentQuestion', questions[0]);
      controller.set('currentIndex', 1);
    });
  }
});
