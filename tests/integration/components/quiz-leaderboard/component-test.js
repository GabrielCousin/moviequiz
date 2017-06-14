import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quiz-leaderboard', 'Integration | Component | quiz leaderboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{quiz-leaderboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#quiz-leaderboard}}
      template block text
    {{/quiz-leaderboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
