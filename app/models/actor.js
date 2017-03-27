import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  profile_path: DS.attr('string'),
  movies: DS.hasMany('movie')
});
