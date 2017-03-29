import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const storageStub = Ember.Service.extend({
  username: 'User'
});

moduleForComponent('ui-topbar', 'Integration | Component | ui topbar', {
  integration: true,
  beforeEach: function () {
    this.register('service:storage', storageStub);
  }
});

test('it should display username', function (assert) {
  this.render(hbs`{{ui-topbar}}`);
  assert.equal(this.$('[data-name=username]').text().trim(), 'User');
});
