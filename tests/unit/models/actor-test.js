import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('actor', 'Unit | Model | actor', {
  needs: ['model:movie']
});

test('should have many movies', function (assert) {
  const actor = this.store().modelFor('actor');
  const relationship = Ember.get(actor, 'relationshipsByName').get('movies');

  assert.equal(relationship.key, 'movies');
  assert.equal(relationship.kind, 'hasMany');
});
