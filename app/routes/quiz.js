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

    // data.results.length = 10;

    data.results.forEach((result) => {
      let movieIds = [];

      // result.known_for.length = 1;

      result.known_for.forEach((movie) => {
        movieIds.push(movie.id);
        if (movie.media_type !== 'movie')
          return;

        let movieExists = store.peekRecord('movie', movie.id);

        if (!movieExists) {
          store.createRecord('movie', {
            id: movie.id,
            image: movie.poster_path,
            title: movie.title
          })
        }
      })

      store.createRecord('actor', {
        id: result.id,
        image: result.profile_path,
        name: result.name,
        movies: movieIds
      })
    });
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
      this.storeMovieDbData(data)
    }).then(() => {
      // @TODO improve algo with more matching questions
      const store = this.get('store');
      let movies = store.peekAll('movie').toArray();
      let actors = store.peekAll('actor').toArray();

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

      // debugger;
      actors.splice(randomActorIndex, 1);

      controller.set('isFetching', false);
      controller.set('currentIndex', 1);
      controller.set('currentQuestion', currentQuestion);
      controller.set('movies', movies);
      controller.set('actors', actors);
    });
  }
});
