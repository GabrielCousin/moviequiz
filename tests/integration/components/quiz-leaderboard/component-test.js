import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

moduleForComponent('quiz-leaderboard', 'Integration | Component | quiz leaderboard', {
  integration: true,
  beforeEach() {
    this.container
      .registry
      .registrations['helper:route-action'] = Ember.Helper.helper((arg) => {
        return this.routeActions[arg];
      });
    this.routeActions = {
      onSaveToServer() {
        return;
      },
      onResetLeaderboard() {
        this.set('model', []);
      }
    };
  },
});

test('should be empty when there is no score set', function (assert) {
  this.set('model', []);
  this.render(hbs`{{quiz-leaderboard model=model}}`);
  assert.equal(this.$('[data-name=score_empty]').text().trim(), 'No points scored yet');
});

test('should show list scores when set', function (assert) {
  this.set('model', [{
    name: 'User',
    score: 4
  }]);
  this.render(hbs`{{quiz-leaderboard model=model}}`);
  assert.equal(this.$('[data-name=name]').text().trim(), 'User');
  assert.equal(this.$('[data-name=score]').text().trim(), '4');
});

test('should sort list in desc order', function (assert) {
  assert.expect(3);

  this.set('model', [{
    name: 'User',
    score: 3
  }, {
    name: 'User',
    score: 1
  }, {
    name: 'User',
    score: 4
  }]);

  this.render(hbs`{{quiz-leaderboard model=model}}`);

  assert.equal(this.$('[data-name=score_entry]:nth-child(1) [data-name=score]').text().trim(), '4');
  assert.equal(this.$('[data-name=score_entry]:nth-child(2) [data-name=score]').text().trim(), '3');
  assert.equal(this.$('[data-name=score_entry]:nth-child(3) [data-name=score]').text().trim(), '1');
});

test('reset button should empty list', function (assert) {
  this.set('model', [{
    name: 'User',
    score: 3
  }, {
    name: 'User',
    score: 1
  }, {
    name: 'User',
    score: 4
  }]);

  this.render(hbs`{{quiz-leaderboard model=model}}`);
  this.$('[title=Reset]').click();

  return wait().then(() => {
    assert.equal(this.$('[data-name=score_empty]').text().trim(), 'No points scored yet');
  });
});
