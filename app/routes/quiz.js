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
      let currentActor = store.peekRecord('actor', result.id);

      if (!currentActor) {
        currentActor = store.createRecord('actor', {
          id: result.id,
          profile_path: result.profile_path,
          name: result.name,
          // known_for: result.known_for
        })
      }

      result.known_for.forEach((movie) => {
        if (movie.media_type !== 'movie')
          return;

        let currentMovie = store.peekRecord('movie', movie.id);

        if (!currentMovie) {
          currentMovie = store.createRecord('movie', {
            id: movie.id,
            poster_path: movie.poster_path,
            media_type: movie.media_type,
            title: movie.title,
          })
        }
        currentActor.get('movies').pushObject(currentMovie);
      })
    });
  },

  setQuestionTypes () {
    // this ensure we generate more matching questions
    let types = [];
    for (let i = 0; i < 10; i++)
      types.push(Math.round(Math.random()));

    return types;
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
        let movie = forced ? actor.get('movies').toArray()[0] : movies[Math.floor(Math.random() * movies.length)];

        return {
          movieTitle: movie.get('title'),
          movieImage: movie.get('poster_path'),
          actorName: actor.get('name'),
          actorImage: actor.get('profile_path'),
          match: actor.get('movies').findBy('id', movie.get('id')) !== undefined
        }
      })

      controller.setProperties({
        isFetching: false,
        questions,
        currentQuestion: questions[0],
        currentIndex: 1
      });
    });
  }
});
