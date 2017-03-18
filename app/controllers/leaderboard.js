import Ember from 'ember';

export default Ember.Controller.extend({

  scores: Ember.computed('model', function () {
    return this.get('model').sortBy('score').reverse();
  })
});
