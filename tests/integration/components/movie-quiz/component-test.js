import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('movie-quiz', 'Integration | Component | movie quiz', {
  integration: true
});

test('should render first question', function (assert) {
  this.set('model', [{
    movieTitle: 'Omelette',
    movieImage: 'http://url.fr/movie.jpg',
    actorName: 'John Duff',
    actorImage: 'http://url.fr/actor.jpg',
    match: true
  }]);

  this.render(hbs`{{movie-quiz model=model}}`);

  assert.equal(this.$('[data-name=question_index]').text().trim(), 'Question 1/10');
  assert.equal(this.$('[data-name=question_text]').text().trim(), 'Did John Duff played in Omelette?');
});

test('right answer should show next question', function (assert) {
  this.set('model', [{
    movieTitle: 'Omelette',
    movieImage: 'http://url.fr/movie.jpg',
    actorName: 'John Duff',
    actorImage: 'http://url.fr/actor.jpg',
    match: true
  }, {
    movieTitle: 'The Breakfast Club',
    movieImage: 'http://url.fr/movie.jpg',
    actorName: 'Kevin Bacon',
    actorImage: 'http://url.fr/actor.jpg',
    match: false
  }]);

  this.render(hbs`{{movie-quiz model=model}}`);

  this.$('.Btn--validate').click();

  return wait().then(() => {
    assert.equal(this.$('[data-name=question_text]').text().trim(), 'Did Kevin Bacon played in The Breakfast Club?');
  });
})
