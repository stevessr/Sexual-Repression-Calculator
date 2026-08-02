import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateClinicalContext } from '../src/lib/medical-context.ts';

const checkIn = (value: number) => [
  { questionId: 'wb_distress', value },
  { questionId: 'wb_impact', value },
  { questionId: 'wb_avoidance', value },
  { questionId: 'wb_shame', value },
  { questionId: 'wb_pressure', value },
  { questionId: 'wb_consent', value },
  { questionId: 'wb_boundaries', value },
  { questionId: 'wb_information', value },
  { questionId: 'wb_communication', value },
  { questionId: 'wb_help', value },
];

test('context analysis is absent for legacy sessions without check-in items', () => {
  assert.equal(calculateClinicalContext([{ questionId: 'mg_1', value: 5 }]), undefined);
});
test('context analysis keeps low distress and protective context separate', () => {
  const summary = calculateClinicalContext(
    checkIn(0).map((response) =>
      response.questionId.startsWith('wb_') && !['wb_distress', 'wb_impact', 'wb_avoidance', 'wb_shame', 'wb_pressure'].includes(response.questionId)
        ? { ...response, value: 4 }
        : response,
    ),
  );

  assert.ok(summary);
  assert.equal(summary.distressScore, 0);
  assert.equal(summary.protectiveContextScore, 100);
  assert.equal(summary.impactFlag, false);
  assert.equal(summary.safetyFlag, false);
  assert.equal(summary.supportFlag, false);
});

test('context analysis flags impact and safety without diagnosing', () => {
  const responses = checkIn(4).map((response) =>
    response.questionId === 'wb_consent' || response.questionId === 'wb_boundaries'
      ? { ...response, value: 0 }
      : response,
  );
  const summary = calculateClinicalContext(responses);

  assert.ok(summary);
  assert.equal(summary.distressScore, 100);
  assert.equal(summary.protectiveContextScore, 60);
  assert.equal(summary.impactFlag, true);
  assert.equal(summary.safetyFlag, true);
  assert.equal(summary.supportFlag, false);
  assert.match(summary.note, /不是诊断/);
});
test('context analysis clamps malformed numeric responses', () => {
  const summary = calculateClinicalContext([
    { questionId: 'wb_distress', value: 99 },
    { questionId: 'wb_impact', value: Number.NaN },
    { questionId: 'wb_consent', value: -4 },
  ]);

  assert.equal(summary.distressScore, 50);
  assert.equal(summary.protectiveContextScore, 0);
  assert.equal(summary.impactFlag, false);
  assert.equal(summary.safetyFlag, true);
});
