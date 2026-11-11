export interface ContextResponse {
  questionId: string;
  value: number;
}

export interface ClinicalContextSummary {
  distressScore: number;
  protectiveContextScore: number;
  impactFlag: boolean;
  safetyFlag: boolean;
  supportFlag: boolean;
  note: string;
}

// The research construct of personal distress is kept separate from
// environmental pressure, consent and relationship safety.
const DISTRESS_IDS = ['wb_distress', 'wb_impact', 'wb_avoidance', 'wb_shame'] as const;
const PRESSURE_ID = 'wb_pressure';
const PROTECTIVE_IDS = ['wb_consent', 'wb_boundaries', 'wb_information', 'wb_communication', 'wb_help'] as const;

function clamp(value: number, min = 0, max = 4): number {
  return Math.max(min, Math.min(max, value));
}

function getValue(responses: ContextResponse[], questionId: string): number | undefined {
  // If a survey was resumed, take its latest value, not a stale earlier answer.
  for (let i = responses.length - 1; i >= 0; i--) {
    const response = responses[i];
    if (response.questionId === questionId) {
      return Number.isFinite(response.value) ? clamp(response.value) : undefined;
    }
  }
  return undefined;
}

function average(values: Array<number | undefined>): number | undefined {
  const available = values.filter((value): value is number => value !== undefined);
  return available.length > 0
    ? available.reduce((sum, value) => sum + value, 0) / available.length
    : undefined;
}

/**
 * Summarise the optional context check-in without applying a diagnostic cutoff.
 * Distress and functional impact are kept separate from identity, orientation,
 * relationship status and activity level. A low safety score is a prompt to
 * seek confidential help, never a classification of the respondent.
 */
export function calculateClinicalContext(responses: ContextResponse[]): ClinicalContextSummary | undefined {
  const hasCheckIn = [...DISTRESS_IDS, PRESSURE_ID, ...PROTECTIVE_IDS].some(id => getValue(responses, id) !== undefined);
  if (!hasCheckIn) return undefined;

  const concernAverage = average(DISTRESS_IDS.map(id => getValue(responses, id))) ?? 0;
  const protectiveAverage = average(PROTECTIVE_IDS.map(id => getValue(responses, id))) ?? 0;
  const impact = getValue(responses, 'wb_impact');
  const pressure = getValue(responses, PRESSURE_ID);
  const consent = getValue(responses, 'wb_consent');
  const boundaries = getValue(responses, 'wb_boundaries');
  const help = getValue(responses, 'wb_help');

  return {
    distressScore: Math.round((concernAverage / 4) * 100),
    protectiveContextScore: Math.round((protectiveAverage / 4) * 100),
    impactFlag: impact !== undefined && impact >= 2,
    safetyFlag: (consent !== undefined && consent <= 1) || (boundaries !== undefined && boundaries <= 1) || (pressure !== undefined && pressure >= 2),
    supportFlag: help !== undefined && help <= 1,
    note: '这是近四周的自我报告摘要，不是诊断、风险分层或医疗建议；如困扰持续、影响生活，或你感到不安全，请联系当地合适的医疗/心理健康服务。'
  };
}
