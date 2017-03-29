import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('movie', 'Unit | Model | movie', {
  needs: ['model:actor']
});

test('should have many actors', function (assert) {
  const movie = this.store().modelFor('movie');
  const relationship = Ember.get(movie, 'relationshipsByName').get('actors');

  assert.equal(relationship.key, 'actors');
  assert.equal(relationship.kind, 'hasMany');
});
