import DS from 'ember-data';

export default DS.Model.extend({
  actors: DS.hasMany('actor'),
  poster_path: DS.attr('string'),
  media_type: DS.attr('string'),
  title: DS.attr('string')
})
