import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:index', 'Unit | Controller | index', {
  beforeEach: function () {
    this.register('service:storage', Ember.Service.extend({
      signUserIn() {}
    }));
  }
});

test('username must be greater than 2 chars', function (assert) {
  let controller = this.subject();
  controller.set('username', 'Us')
  controller.send('onSaveUsername');
  assert.equal(controller.get('isInvalid'), true)
});
