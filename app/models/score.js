import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {
    async: false
  }),
  score: DS.attr('number'),
  createdAt: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  })
});
