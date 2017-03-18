import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.attr('string'),
  title: DS.attr('string')
})
