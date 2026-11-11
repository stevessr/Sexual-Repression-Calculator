import assert from 'node:assert/strict';
import test from 'node:test';
import {
  adaptedInhibitionContrast,
  rangeBasedDisplayZ,
  referenceOrRangeZ,
  scoreQuestions,
  selectScaleVersion,
  standardize,
} from '../src/lib/calculator/scoring.ts';

const options = [1, 2, 3, 4, 5].map(value => ({ value }));
const item = (id: string, reverse = false) => ({ id, options, reverse });
const answer = (questionId: string, value: number) => ({ questionId, value });

test('reverse scoring works with noninteger slider answers', () => {
  const score = scoreQuestions(
    [answer('one', 1.25), answer('two', 4.5)],
    [item('one', true), item('two')],
  );
  assert.equal(score.rawScore, 9.25);
  assert.equal(score.average, 4.625);
  assert.equal(score.complete, true);
});

test('latest duplicate answer wins; unrelated answers do not contribute', () => {
  const score = scoreQuestions(
    [answer('a', 1), answer('other', 5), answer('a', 4), answer('b', 2)],
    [item('a'), item('b')],
  );
  assert.equal(score.rawScore, 6);
  assert.equal(score.answered, 2);
});

test('out of range answers clamp while invalid answers do not become minimum scores', () => {
  const score = scoreQuestions(
    [answer('a', 99), answer('b', Number.NaN), answer('c', -100)],
    [item('a'), item('b'), item('c', true)],
  );
  assert.equal(score.rawScore, 10);
  assert.equal(score.answered, 2);
  assert.equal(score.complete, false);
});

test('zero-valued items are valid completed answers', () => {
  const zeroOptions = [0, 1, 2, 3, 4].map(value => ({ value }));
  const score = scoreQuestions([answer('a', 0)], [{ id: 'a', options: zeroOptions }]);
  assert.equal(score.rawScore, 0);
  assert.equal(score.complete, true);
});

test('full forms replace, rather than double-count, their short versions', () => {
  const brief = [item('a'), item('b')];
  const full = [...brief, item('c')];
  assert.equal(selectScaleVersion([answer('a', 1), answer('b', 2)], brief, full), 'short');
  assert.equal(selectScaleVersion([answer('a', 1), answer('b', 2), answer('c', 3)], brief, full), 'full');
  assert.equal(selectScaleVersion([answer('a', 1), answer('c', 3)], brief, full), null);
});

test('missing data and invalid reference deviations cannot yield invalid z scores', () => {
  assert.equal(standardize(30, 20, 5), 2);
  assert.equal(standardize(30, 20, 0), 0);
  assert.equal(standardize(30, 20, Number.NaN), 0);
  assert.equal(rangeBasedDisplayZ(1, [1, 5]), -2);
  assert.equal(rangeBasedDisplayZ(3, [1, 5]), 0);
  assert.equal(rangeBasedDisplayZ(5, [1, 5]), 2);
});

test('adapted contrast is invariant to different inhibition/excitation item counts', () => {
  const excitation = scoreQuestions([answer('e1', 2), answer('e2', 2)], [item('e1'), item('e2')]);
  const inhibition = scoreQuestions(
    [answer('i1', 4), answer('i2', 4), answer('i3', 4)],
    [item('i1'), item('i2'), item('i3')],
  );
  assert.equal(adaptedInhibitionContrast(inhibition.average, excitation.average), 1);
  assert.equal(adaptedInhibitionContrast(2, 4), -1);
  assert.equal(adaptedInhibitionContrast(3, 3), 0);
});

test('illustrative built-in reference numbers are ignored without a real sample', () => {
  const illustrative = {
    sampleSize: 0,
    means: { score: 400 },
    standardDeviations: { score: 0.01 },
  };
  assert.equal(referenceOrRangeZ(3, 'score', illustrative, [1, 5]), 0);
  assert.equal(referenceOrRangeZ(5, 'score', illustrative, [1, 5]), 2);
});

test('explicit reference moments remain opt-in and invalid references fall back to bounds', () => {
  const reference = {
    sampleSize: 100,
    means: { score: 3 },
    standardDeviations: { score: 0.5 },
  };
  assert.equal(referenceOrRangeZ(4, 'score', reference, [1, 5]), 2);
  assert.equal(referenceOrRangeZ(1, 'missing', reference, [1, 5]), -2);
  assert.equal(referenceOrRangeZ(3, 'score', { ...reference, standardDeviations: { score: 0 } }, [1, 5]), 0);
});
