import Ember from 'ember';

export function inlineBackground([path]) {
  return Ember.String.htmlSafe(`background-image: url("https://image.tmdb.org/t/p/w500${path}")`);
}

export default Ember.Helper.helper(inlineBackground);
