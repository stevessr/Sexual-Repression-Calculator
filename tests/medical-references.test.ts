import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MEDICAL_REFERENCES,
  getMedicalReference,
  lookupMedicalReference,
  medicalReferences,
} from '../src/lib/medical-references.ts';

test('reference data is complete and deeply immutable', () => {
  assert.strictEqual(medicalReferences, MEDICAL_REFERENCES);
  assert.ok(Object.isFrozen(MEDICAL_REFERENCES));
  assert.ok(MEDICAL_REFERENCES.length > 0);

  for (const reference of MEDICAL_REFERENCES) {
    assert.ok(Object.isFrozen(reference));
    assert.ok(Object.isFrozen(reference.usedFor));

    for (const field of [
      'id',
      'title',
      'organization',
      'year',
      'type',
      'url',
      'summary',
      'usedFor',
    ] as const) {
      assert.ok(reference[field] !== undefined, `${reference.id} is missing ${field}`);
    }

    assert.equal(typeof reference.id, 'string');
    assert.equal(typeof reference.title, 'string');
    assert.equal(typeof reference.organization, 'string');
    assert.equal(typeof reference.year, 'number');
    assert.ok(reference.year > 1900);
    assert.ok(reference.summary.length > 0);
    assert.ok(reference.usedFor.length > 0);
  }
});

test('every reference uses an HTTPS URL', () => {
  for (const reference of MEDICAL_REFERENCES) {
    assert.match(reference.url, /^https:\/\//, `${reference.id} must use HTTPS`);
    assert.doesNotThrow(() => new URL(reference.url));
  }
});

test('reference identifiers are unique', () => {
  const ids = MEDICAL_REFERENCES.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
});

test('both guideline and research references are represented', () => {
  const types = new Set(MEDICAL_REFERENCES.map(({ type }) => type));
  assert.ok(types.has('guideline'));
  assert.ok(types.has('research'));
});

test('required WHO, CDC, APA, ICD and dual-control boundaries are documented', () => {
  const who = lookupMedicalReference('who-sexual-health');
  const cdc = lookupMedicalReference('cdc-sexual-history-2024');
  const apa = lookupMedicalReference('apa-dsm-5-tr');
  const icd = lookupMedicalReference('who-icd-11');
  const dualControl = lookupMedicalReference('bancroft-janssen-dual-control-2000');

  assert.ok(who?.summary.includes('well-being'));
  assert.ok(who?.summary.includes('respectful'));
  assert.ok(who?.summary.includes('coercion'));
  assert.ok(cdc?.summary.includes('individualized'));
  assert.ok(cdc?.summary.includes('not a complete diagnostic sexual history'));
  assert.ok(apa?.summary.includes('clinical evaluation'));
  assert.ok(icd?.summary.includes('clinical evaluation'));
  assert.ok(dualControl?.summary.includes('research theory'));
  assert.ok(dualControl?.summary.includes('not a diagnostic'));
});

test('lookup returns the matching reference and undefined for an unknown id', () => {
  const reference = lookupMedicalReference('cdc-sti-treatment-guidelines-2021');

  assert.equal(reference?.organization, 'Centers for Disease Control and Prevention (CDC)');
  assert.equal(lookupMedicalReference('does-not-exist'), undefined);
});
test('getMedicalReference is a stable lookup alias', () => {
  assert.equal(
    getMedicalReference('janssen-sis-ses-2002-development')?.url,
    'https://doi.org/10.1080/00224490209552130',
  );
});
