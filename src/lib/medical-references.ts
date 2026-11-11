/**
 * Curated clinical guidance and research references used by the sexual-health
 * education features. These references are descriptive context, not diagnoses.
 */

export type MedicalReferenceType = 'guideline' | 'research';

export interface MedicalReference {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly year: number;
  readonly type: MedicalReferenceType;
  readonly url: string;
  readonly summary: string;
  readonly usedFor: readonly string[];
}

const freezeReference = <const T extends MedicalReference>(reference: T): Readonly<T> =>
  Object.freeze({
    ...reference,
    usedFor: Object.freeze([...reference.usedFor]),
  });

/**
 * The public reference collection is frozen at every level so callers cannot
 * accidentally alter source metadata or the lists describing its use.
 */
export const MEDICAL_REFERENCES = Object.freeze([
  freezeReference({
    id: 'who-sexual-health',
    title: 'Sexual health',
    organization: 'World Health Organization (WHO)',
    year: 2024,
    type: 'guideline',
    url: 'https://www.who.int/health-topics/sexual-health',
    summary:
      'WHO defines sexual health in terms of physical, emotional, mental and social well-being. It calls for a positive and respectful approach to sexuality and sexual relationships that is free of coercion, discrimination and violence.',
    usedFor: ['well-being framing', 'respect and consent language', 'non-coercion and safety'],
  }),
  freezeReference({
    id: 'who-icd-11',
    title: 'ICD-11 for Mortality and Morbidity Statistics',
    organization: 'World Health Organization (WHO)',
    year: 2025,
    type: 'guideline',
    url: 'https://icd.who.int/browse/2025-01/mms/en',
    summary:
      'WHO ICD-11 is a classification and diagnostic-guidance system. Its categories support clinical communication but do not replace an individualized clinical evaluation, history, or professional judgment.',
    usedFor: ['classification context', 'clinical evaluation boundaries'],
  }),
  freezeReference({
    id: 'cdc-sexual-history-2024',
    title: 'Guide to Taking a Sexual History',
    organization: 'Centers for Disease Control and Prevention (CDC)',
    year: 2024,
    type: 'guideline',
    url: 'https://www.cdc.gov/sti/hcp/clinical-guidance/taking-a-sexual-history.html',
    summary:
      'CDC provides an individualized, nonjudgmental framework for taking a sexual history and tailoring prevention conversations. It is not a complete diagnostic sexual history and cannot substitute for a clinical assessment.',
    usedFor: ['individualized history prompts', 'prevention and counseling context'],
  }),
  freezeReference({
    id: 'cdc-sti-treatment-guidelines-2021',
    title: 'Sexually Transmitted Infections Treatment Guidelines, 2021',
    organization: 'Centers for Disease Control and Prevention (CDC)',
    year: 2021,
    type: 'guideline',
    url: 'https://www.cdc.gov/std/treatment-guidelines/default.htm',
    summary:
      'CDC evidence-based recommendations support STI screening, prevention and treatment decisions. They provide clinical guidance rather than a standalone diagnosis or a substitute for patient-specific evaluation.',
    usedFor: ['STI prevention context', 'screening and treatment guidance'],
  }),
  freezeReference({
    id: 'apa-dsm-5-tr',
    title: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
    organization: 'American Psychiatric Association (APA)',
    year: 2022,
    type: 'guideline',
    url: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
    summary:
      'APA DSM-5-TR criteria are one aid within a qualified clinician\'s comprehensive clinical evaluation. Criteria and screening information have boundaries and do not by themselves establish a diagnosis or determine an individual\'s care.',
    usedFor: ['clinical terminology', 'diagnostic evaluation boundaries'],
  }),
  freezeReference({
    id: 'bancroft-janssen-dual-control-2000',
    title: 'The dual control model of male sexual response: a theoretical approach to centrally mediated erectile dysfunction',
    organization: 'John Bancroft and Erick Janssen',
    year: 2000,
    type: 'research',
    url: 'https://doi.org/10.1016/S0149-7634(00)00024-5',
    summary:
      'The Dual Control Model describes sexual response as an interaction between excitation and inhibition. It is a research theory for studying sexual response, not a diagnostic instrument, clinical assessment, or explanation of any one person.',
    usedFor: ['research theory context', 'excitation and inhibition constructs'],
  }),
  freezeReference({
    id: 'janssen-sis-ses-2002-development',
    title: 'The sexual inhibition (SIS) and sexual excitation (SES) scales: I. Measuring sexual inhibition and excitation proneness in men',
    organization: 'Erick Janssen, Harrie C. M. Vorst, Peter R. Finn and John H. J. Bancroft',
    year: 2002,
    type: 'research',
    url: 'https://doi.org/10.1080/00224490209552130',
    summary:
      'This paper reports the development of the SIS/SES research scales. Their constructs can inform research questions, but the measures are not validated Chinese clinical screening tools and do not establish a diagnosis.',
    usedFor: ['research measurement context', 'SIS/SES scale development'],
  }),
  freezeReference({
    id: 'janssen-sis-ses-2002',
    title: 'The sexual inhibition (SIS) and sexual excitation (SES) scales: II. Predicting psychophysiological response patterns',
    organization: 'Erick Janssen, Harrie C. M. Vorst, Peter R. Finn and John H. J. Bancroft',
    year: 2002,
    type: 'research',
    url: 'https://doi.org/10.1080/00224490209552131',
    summary:
      'This research paper operationalizes sexual excitation and inhibition constructs related to the Dual Control Model. The scales are research measures only and are not diagnostic tools or a substitute for clinical evaluation.',
    usedFor: ['research measurement context', 'SIS/SES construct background'],
  }),
  freezeReference({
    id: 'dual-control-scoping-review-2023',
    title: 'The Dual Control Model of Sexual Response: A Scoping Review, 2009–2022',
    organization: 'The Journal of Sex Research',
    year: 2023,
    type: 'research',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37267113/',
    summary:
      'A review of 152 studies describes excitation and inhibition as distinct, interacting research constructs across different outcomes. Their interaction should not be collapsed into a diagnostic label.',
    usedFor: ['dual-control evidence update', 'construct separation'],
  }),
  freezeReference({
    id: 'sis-ses-sf-spain-2024',
    title: 'Validity and Reliability Evidence and Norms for the Spanish Version of the Sexual Inhibition/Sexual Excitation Scales–Short Form',
    organization: 'Sierra, Cervilla, Álvarez-Muelas and Sánchez-Fuentes',
    year: 2024,
    type: 'research',
    url: 'https://doi.org/10.7334/psicothema2023.189',
    summary:
      'Validation of the SIS/SES-SF three-factor structure in 2,223 Spanish adults. Age- and sex-specific standardized scores are specific to that instrument and population; they cannot be transferred to this independently adapted Chinese question bank.',
    usedFor: ['three separate excitation/inhibition constructs', 'norm-transfer limitations'],
  }),
  freezeReference({
    id: 'sds3-multinational-2024',
    title: 'The short version of the Sexual Distress Scale (SDS-3): Measurement invariance across countries, gender identities, and sexual orientations',
    organization: 'International Journal of Clinical and Health Psychology',
    year: 2024,
    type: 'research',
    url: 'https://doi.org/10.1016/j.ijchp.2024.100461',
    summary:
      'A multinational analysis across 42 countries and 26 languages examined the measurement of sexual distress. It supports distinguishing experienced distress from sexual attitudes or frequency of activity; this app does not reproduce or claim to validate SDS-3 items.',
    usedFor: ['distress separated from attitudes', 'cross-population measurement context'],
  }),
  freezeReference({
    id: 'sexual-distress-collectivistic-2025',
    title: 'Development and validation of the sexual distress scale: results from a collectivistic culture',
    organization: 'Husain and Jahrami, BMC Psychology',
    year: 2025,
    type: 'research',
    url: 'https://doi.org/10.1186/s40359-025-02443-3',
    summary:
      'An eight-item measure of sexual distress was developed in a sample of 656 Pakistani adults. Findings illustrate the influence of context and the need for new local validation before applying norms to other cultures.',
    usedFor: ['cultural context', 'separate self-reported distress'],
  }),
  freezeReference({
    id: 'cosmin-sexual-health-proms-2026',
    title: 'Measurement properties of patient-reported outcome measures for sexual health in the general population: a systematic review following the COSMIN 2.0 guidelines',
    organization: 'Shang, Yuan, Shen et al., Health and Quality of Life Outcomes',
    year: 2026,
    type: 'research',
    url: 'https://doi.org/10.1186/s12955-026-02535-7',
    summary:
      'The 2026 COSMIN systematic review assessed 27 sexual-health patient-reported outcome measures and found important gaps in content validity and responsiveness. Research support for one questionnaire cannot validate a new composite SRI score.',
    usedFor: ['measurement quality', 'limits of composite SRI validity', 'future validation design'],
  }),
] as const);

/** Backwards-friendly camel-case export for consumers that prefer data nouns. */
export const medicalReferences = MEDICAL_REFERENCES;

/** Find one reference by its stable identifier. */
export function lookupMedicalReference(id: string): MedicalReference | undefined {
  return MEDICAL_REFERENCES.find((reference) => reference.id === id);
}

/** Alias for callers using the shorter lookup name. */
export const lookupReference = lookupMedicalReference;
/** Stable name for UI and test consumers. */
export const getMedicalReference = lookupMedicalReference;
