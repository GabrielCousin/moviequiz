import Ember from 'ember';

export default Ember.Component.extend({
  storage: Ember.inject.service(),

  tagName: 'nav',
  classNames: ['Topbar'],

  username: Ember.computed('storage.username', function() {
    return this.get('storage.username');
  })
});
