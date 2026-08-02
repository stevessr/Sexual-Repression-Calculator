import assert from 'node:assert/strict';
import test from 'node:test';
import { SEXUAL_WELLBEING_CHECKIN } from '../src/lib/scales/sexual_wellbeing.ts';
test('wellbeing check-in is separate from the exploratory SRI', () => {
  assert.equal(SEXUAL_WELLBEING_CHECKIN.questions.length, 10);
  assert.equal(SEXUAL_WELLBEING_CHECKIN.includeInSRI, false);
  assert.equal(SEXUAL_WELLBEING_CHECKIN.scoring.range?.[1], 40);
  assert.equal(
    SEXUAL_WELLBEING_CHECKIN.questions.filter((question) => question.reverse).length,
    5,
  );
});

test('protective answers use the low-to-high response convention', () => {
  const protectiveQuestions = SEXUAL_WELLBEING_CHECKIN.questions.filter((question) => question.reverse);
  const options = protectiveQuestions[0].options;
  const lowest = options[0];
  const highest = options[options.length - 1];

  assert.equal(lowest.value, 0);
  assert.equal(highest.value, 4);
  assert.equal(highest.value + lowest.value - lowest.value, 4);
});
