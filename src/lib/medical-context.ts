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

const CONCERN_IDS = ['wb_distress', 'wb_impact', 'wb_avoidance', 'wb_shame', 'wb_pressure'] as const;
const PROTECTIVE_IDS = ['wb_consent', 'wb_boundaries', 'wb_information', 'wb_communication', 'wb_help'] as const;

function clamp(value: number, min = 0, max = 4): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

function getValue(responses: ContextResponse[], questionId: string): number | undefined {
  const response = responses.find(item => item.questionId === questionId);
  return response ? clamp(response.value) : undefined;
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
  const hasCheckIn = [...CONCERN_IDS, ...PROTECTIVE_IDS].some(id => getValue(responses, id) !== undefined);
  if (!hasCheckIn) return undefined;

  const concernAverage = average(CONCERN_IDS.map(id => getValue(responses, id))) ?? 0;
  const protectiveAverage = average(PROTECTIVE_IDS.map(id => getValue(responses, id))) ?? 0;
  const impact = getValue(responses, 'wb_impact');
  const consent = getValue(responses, 'wb_consent');
  const boundaries = getValue(responses, 'wb_boundaries');
  const help = getValue(responses, 'wb_help');

  return {
    distressScore: Math.round((concernAverage / 4) * 100),
    protectiveContextScore: Math.round((protectiveAverage / 4) * 100),
    impactFlag: impact !== undefined && impact >= 2,
    safetyFlag: (consent !== undefined && consent <= 1) || (boundaries !== undefined && boundaries <= 1),
    supportFlag: help !== undefined && help <= 1,
    note: '这是近四周的自我报告摘要，不是诊断、风险分层或医疗建议；如困扰持续、影响生活，或你感到不安全，请联系当地合适的医疗/心理健康服务。'
  };
}
