import Ember from 'ember';
import config from 'moviequiz/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  // init() {},

  refresh() {
    const MOVIEDB_APIKEY = config.APP.MOVIEDB_APIKEY;
    const MOVIEDB_QUERY_PAGE = Math.ceil((Math.random() * 10));

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
         url: 'https://api.themoviedb.org/3/person/popular',
         type: 'GET',
         data: {
           page: MOVIEDB_QUERY_PAGE,
           api_key: MOVIEDB_APIKEY
         }
      }).done((data) => {
        this.populateStore(data);
        resolve()
      }).fail(() => {
        reject()
      });
    });
  },

  pickGame() {
    const store = this.get('store');
    let types = this.getRandomTypes();
    let movies = store.peekAll('movie').toArray();
    let actors = store.peekAll('actor').toArray();

    let questions = types.map((forced) => {
      let actor = actors[Math.floor(Math.random() * actors.length)];
      let movie = forced ? actor.get('movies').toArray()[0] : movies[Math.floor(Math.random() * movies.length)];

      return {
        movieTitle: movie.get('title'),
        movieImage: movie.get('poster_path'),
        actorName: actor.get('name'),
        actorImage: actor.get('profile_path'),
        match: actor.get('movies').findBy('id', movie.get('id')) !== undefined
      }
    })

    return questions;
  },

  populateStore(data) {
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

  getRandomTypes () {
    // this ensure we generate more matching questions
    let types = [];
    for (let i = 0; i < 10; i++)
      types.push(Math.round(Math.random()));

    return types;
  }

});
