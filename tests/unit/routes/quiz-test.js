import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:quiz', 'Unit | Route | quiz', {
  beforeEach: function () {
    this.register('service:moviedb', Ember.Service.extend({}));
  }
});

test('it exists', function (assert) {
  let route = this.subject();
  assert.ok(route);
});
