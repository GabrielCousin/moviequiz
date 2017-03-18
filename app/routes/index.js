import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // @TODO: handle transition to leaderboard if a user is already saved into localStorage
  }
});
