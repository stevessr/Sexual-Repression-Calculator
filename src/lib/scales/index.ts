/**
 * Consolidated scales index — re-exports per-scale modules and exposes
 * aggregated collections used across the app.
 */

// Re-export individual scale modules (keeps compatibility with existing imports)
export * from './adaptive-scales';
export * from './mosher_guilt';
export * from './kiss9_shame';
export * from './sos';
export * from './bsas_brief';
export * from './demographics_questions';
export * from './scale-instructions';

// Explicit aggregated exports for app flows
import {
  SIS_SES_SF,
  SIS_SES_FULL
} from './sis_ses';
import { MOSHER_GUILT, MOSHER_GUILT_FULL } from './mosher_guilt';
import { KISS9_SHAME } from './kiss9_shame';
import { SOS_SCREENING, SOS_FULL } from './sos';
import { BSAS_BRIEF } from './bsas_brief';
import { DEMOGRAPHICS_QUESTIONS } from './demographics_questions';
import {
  TEEN_SEXUAL_ATTITUDES,
  SEXUAL_COGNITION,
  SIS_SES_ADAPTED,
  getAdaptiveScales,
  getAdaptiveFullScales,
  isMinor,
  isInexperienced,
  getUserGroupDescription
} from './adaptive-scales';

// Build ALL_SCALES map
export const ALL_SCALES = {
  [SIS_SES_SF.id]: SIS_SES_SF,
  [SIS_SES_FULL.id]: SIS_SES_FULL,
  [MOSHER_GUILT.id]: MOSHER_GUILT,
  [MOSHER_GUILT_FULL.id]: MOSHER_GUILT_FULL,
  [KISS9_SHAME.id]: KISS9_SHAME,
  [SOS_SCREENING.id]: SOS_SCREENING,
  [SOS_FULL.id]: SOS_FULL,
  [BSAS_BRIEF.id]: BSAS_BRIEF,
  // adaptive
  [TEEN_SEXUAL_ATTITUDES.id]: TEEN_SEXUAL_ATTITUDES,
  [SEXUAL_COGNITION.id]: SEXUAL_COGNITION,
  [SIS_SES_ADAPTED.id]: SIS_SES_ADAPTED
} as const;

// Quick assessment default set
export const QUICK_ASSESSMENT_SCALES = [
  SIS_SES_SF.id,
  MOSHER_GUILT.id,
  KISS9_SHAME.id,
  SOS_SCREENING.id
];

// The previous "full" measurement is now the incremental assessment
export const INCREMENTAL_ASSESSMENT_SCALES = [
  SIS_SES_FULL.id,
  MOSHER_GUILT_FULL.id,
  KISS9_SHAME.id,
  SOS_FULL.id,
  BSAS_BRIEF.id
];

// Fully-detailed assessment includes all defined scales
export const FULL_ASSESSMENT_SCALES: string[] = Object.keys(ALL_SCALES);

// Also export demographics for forms
export { DEMOGRAPHICS_QUESTIONS };

// Re-export helpers from adaptive-scales for convenience
export {
  getAdaptiveScales,
  getAdaptiveFullScales,
  isMinor,
  isInexperienced,
  getUserGroupDescription
};