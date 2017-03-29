import Ember from 'ember';
import { inlineBackground } from 'moviequiz/helpers/inline-background';
import { module, test } from 'qunit';

module('Unit | Helper | inline background');

test('should inline background style from img path', function (assert) {
  let result = inlineBackground(['/img.jpg']);
  let expected = Ember.String.htmlSafe('background-image: url("https://image.tmdb.org/t/p/w500/img.jpg")');
  assert.equal(result.text, expected.text);
});
