/**
 * 探索性 SRI 显示引擎 - 使用产品参考值生成可读的相对显示
 * 实现 z 分数转换、四维度计算和 0-100 显示映射
 */

import {AssessmentResults, DimensionScores, NormativeData, Response, ScaleScore, SRI_LEVELS, SRIResult} from '@/types';
import {ALL_SCALES} from '@/lib/scales';
import {calculateClinicalContext} from '@/lib/medical-context';
import {adaptedInhibitionContrast, rangeBasedDisplayZ, scoreQuestions, selectScaleVersion, standardize} from './scoring';

/**
 * 标准正态分布累积分布函数 (CDF)
 * 用于将相对 z 分数转换为 0-100 的显示刻度
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2.0);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1.0 + sign * y);
}

/**
 * 计算响应的原始分数
 * @param responses 用户响应数组
 * @param scaleId 量表ID
 * @returns 原始分数
 */
export function calculateRawScore(responses: Response[], scaleId: string): number {
  const scale = ALL_SCALES[scaleId];
  if (!scale) {
    console.warn(`Unknown scale: ${scaleId}`);
    return 0;
  }
  return scoreQuestions(responses, scale.questions).rawScore;
}

/**
 * 计算 z 分数（标准化分数）
 * @param rawScore 原始分数
 * @param mean 均值
 * @param stdDev 标准差
 * @returns z 分数
 */
export function calculateZScore(rawScore: number, mean: number, stdDev: number): number {
  return standardize(rawScore, mean, stdDev);
}

/**
 * 获取产品兼容用的参考值。
 * 这些值不是本地代表性常模；实际临床或研究用途应使用经过验证的人群常模。
 */
export function getDefaultNorms(): NormativeData {
  return {
    sampleSize: 0, // 没有本地常模样本；仅保留参考值以兼容现有结果
    means: {
      'sis_total': 35.2,
      'ses_total': 16.8,
      'sis1_total': 15.4,
      'sis2_total': 19.8,
      
      // SIS/SES完整版参考均值
      'sis_ses_full_sis': 87.5,
      'sis_ses_full_ses': 42.8,
      
      // Mosher 性内疚参考均值
      'mosher_guilt': 25.6,
      'mosher_guilt_full': 62.7,
      
      // KISS-9 性羞耻参考均值  
      'kiss9_shame': 18.7,
      
      // SOS 筛查版参考均值
      'sos_screening': 15.3,
      'sos_full': 63.0,
      
      // BSAS 性态度量表参考均值
      'bsas_brief': 69.2,
      
      // 适应性量表参考均值
      'teen_sexual_attitudes': 25.0,
      'sexual_cognition': 28.5,
      'sis_ses_adapted': 24.0
    },
    standardDeviations: {
      'sis_total': 8.9,
      'ses_total': 3.7,
      'sis1_total': 4.1,
      'sis2_total': 5.2,
      
      // 完整版标准差
      'sis_ses_full_sis': 18.3,
      'sis_ses_full_ses': 9.2,
      'mosher_guilt': 7.8,
      'mosher_guilt_full': 19.2,
      'kiss9_shame': 6.4,
      'sos_screening': 4.6,
      'sos_full': 12.8,
      'bsas_brief': 15.4,
      
      // 适应性量表标准差
      'teen_sexual_attitudes': 6.2,
      'sexual_cognition': 7.1,
      'sis_ses_adapted': 5.8
    },
    updatedAt: new Date()
  };
}

/**
 * 计算 SIS/SES 相关分数
 * @param responses 用户响应
 * @param norms 常模数据
 * @returns SIS/SES分数对象
 */
function selectedForm(
  responses: Response[],
  briefId: 'sis_ses_sf' | 'mosher_guilt' | 'sos_screening',
  fullId: 'sis_ses_full' | 'mosher_guilt_full' | 'sos_full',
): string | null {
  const version = selectScaleVersion(responses, ALL_SCALES[briefId].questions, ALL_SCALES[fullId].questions);
  return version === 'full' ? fullId : version === 'short' ? briefId : null;
}

function referenceZ(
  raw: number,
  key: string,
  norms: NormativeData,
  theoreticalRange: readonly [number, number],
): number {
  // A descriptive, published population norm cannot be transferred to
  // this separately adapted questionnaire. The default reference set
  // contains no real sample, so use only the theoretical item bounds.
  const mean = norms.means[key];
  const std = norms.standardDeviations[key];
  return norms.sampleSize > 0 && Number.isFinite(mean) &&
    Number.isFinite(std) && std > 0
    ? calculateZScore(raw, mean, std)
    : rangeBasedDisplayZ(raw, theoreticalRange);
}

export function calculateSisSeScores(responses: Response[], norms: NormativeData) {
  const form = selectedForm(responses, 'sis_ses_sf', 'sis_ses_full');
  const questions = form ? ALL_SCALES[form].questions : [];
  const ses = scoreQuestions(responses, questions.filter(q => q.id.startsWith('ses_')));
  const sis1 = scoreQuestions(responses, questions.filter(q => q.id.startsWith('sis1_')));
  const sis2 = scoreQuestions(responses, questions.filter(q => q.id.startsWith('sis2_')));
  const isFull = form === 'sis_ses_full';
  const sisTotal = sis1.rawScore + sis2.rawScore;
  const sesZ = form ? referenceZ(
    ses.rawScore, isFull ? 'sis_ses_full_ses' : 'ses_total',
    norms, [ses.total, 5 * ses.total],
  ) : 0;
  const inhibitionCount = sis1.total + sis2.total;
  const sisZ = form ? referenceZ(
    sisTotal, isFull ? 'sis_ses_full_sis' : 'sis_total',
    norms, [inhibitionCount, 5 * inhibitionCount],
  ) : 0;
  const hasMatchedNorms = form && norms.sampleSize > 0 &&
    Number.isFinite(norms.means[isFull ? 'sis_ses_full_ses' : 'ses_total']) &&
    Number.isFinite(norms.means[isFull ? 'sis_ses_full_sis' : 'sis_total']) &&
    norms.standardDeviations[isFull ? 'sis_ses_full_ses' : 'ses_total'] > 0 &&
    norms.standardDeviations[isFull ? 'sis_ses_full_sis' : 'sis_total'] > 0;
  const contrast = !form ? 0 : hasMatchedNorms
    ? (sisZ - sesZ) / Math.SQRT2
    : adaptedInhibitionContrast((sis1.average + sis2.average) / 2, ses.average);

  return {
    sesRaw: ses.rawScore,
    sesZ,
    sis1Raw: sis1.rawScore,
    sis2Raw: sis2.rawScore,
    sisTotal,
    sisZ,
    sisOverSes: contrast
  };
}

/**
 * 计算四维度分数
 * @param responses 用户响应
 * @param norms 常模数据 
 * @returns 四维度分数
 */
function calculateDimensionsWithCoverage(
  responses: Response[],
  norms: NormativeData,
): { scores: DimensionScores; present: Array<keyof DimensionScores> } {
  const scores: DimensionScores = {
    sosReversed: 0,
    sexGuilt: 0,
    sexualShame: 0,
    sisOverSes: 0,
  };
  const present: Array<keyof DimensionScores> = [];
  const add = (dimension: keyof DimensionScores, value: number) => {
    if (Number.isFinite(value)) {
      scores[dimension] = value;
      present.push(dimension);
    }
  };

  const sosForm = selectedForm(responses, 'sos_screening', 'sos_full');
  if (sosForm) {
    const score = scoreQuestions(responses, ALL_SCALES[sosForm].questions);
    const isFull = sosForm === 'sos_full';
    add('sosReversed', referenceZ(
      score.rawScore, isFull ? 'sos_full' : 'sos_screening',
      norms, ALL_SCALES[sosForm].scoring.range,
    ));
  }

  const guiltForm = selectedForm(responses, 'mosher_guilt', 'mosher_guilt_full');
  if (guiltForm) {
    const score = scoreQuestions(responses, ALL_SCALES[guiltForm].questions);
    const isFull = guiltForm === 'mosher_guilt_full';
    add('sexGuilt', referenceZ(
      score.rawScore, isFull ? 'mosher_guilt_full' : 'mosher_guilt',
      norms, ALL_SCALES[guiltForm].scoring.range,
    ));
  }

  const shame = scoreQuestions(responses, ALL_SCALES.kiss9_shame.questions);
  const teenAttitudes = scoreQuestions(responses, ALL_SCALES.teen_sexual_attitudes.questions);
  if (shame.complete) {
    add('sexualShame', referenceZ(shame.rawScore, 'kiss9_shame', norms, ALL_SCALES.kiss9_shame.scoring.range));
  } else if (teenAttitudes.complete) {
    add('sexualShame', referenceZ(
      teenAttitudes.rawScore, 'teen_sexual_attitudes', norms, ALL_SCALES.teen_sexual_attitudes.scoring.range,
    ));
  }

  const adaptedQuestions = ALL_SCALES.sis_ses_adapted.questions;
  const adapted = scoreQuestions(responses, adaptedQuestions);
  if (adapted.complete) {
    const excitation = scoreQuestions(responses, adaptedQuestions.filter(q =>
      ['sisa_1', 'sisa_2', 'sisa_3'].includes(q.id),
    ));
    const inhibition = scoreQuestions(responses, adaptedQuestions.filter(q =>
      ['sisa_4', 'sisa_5', 'sisa_6', 'sisa_7', 'sisa_8'].includes(q.id),
    ));
    add('sisOverSes', adaptedInhibitionContrast(inhibition.average, excitation.average));
  } else if (adapted.answered === 0) {
    const sisForm = selectedForm(responses, 'sis_ses_sf', 'sis_ses_full');
    if (sisForm) {
      add('sisOverSes', calculateSisSeScores(responses, norms).sisOverSes);
    } else {
      const cognition = scoreQuestions(responses, ALL_SCALES.sexual_cognition.questions);
      if (cognition.complete) {
        add('sisOverSes', referenceZ(
          cognition.rawScore, 'sexual_cognition', norms, ALL_SCALES.sexual_cognition.scoring.range,
        ));
      }
    }
  }

  return { scores, present };
}

export function calculateDimensionScores(responses: Response[], norms: NormativeData): DimensionScores {
  return calculateDimensionsWithCoverage(responses, norms).scores;
}

/**
 * 计算 SRI 指数（0-100）
 * @param dimensionScores 四维度分数
 * @returns SRI 结果对象
 */
export function calculateSRI(
  dimensionScores: DimensionScores,
  presentDimensions: readonly (keyof DimensionScores)[] = [
    'sosReversed', 'sexGuilt', 'sexualShame', 'sisOverSes',
  ],
): SRIResult {
  const unique = [...new Set(presentDimensions)];
  const values = unique.map(key => dimensionScores[key]).filter(Number.isFinite);
  const compositeZ = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const percentile = normalCDF(compositeZ) * 100;
  const totalScore = Math.round(Math.max(0, Math.min(100, percentile)));

  let level: keyof typeof SRI_LEVELS = 'moderate';
  for (const [key, definition] of Object.entries(SRI_LEVELS)) {
    if (totalScore >= definition.min && totalScore < definition.max) {
      level = key as keyof typeof SRI_LEVELS;
      break;
    }
  }

  return {
    totalScore,
    scoringVersion: '2026-11',
    zScore: compositeZ,
    percentile,
    level,
    dimensionScores,
    scaleScores: []
  };
}

/**
 * 主要的 SRI 计算函数
 * @param responses 用户所有响应
 * @param sessionId 会话 ID
 * @param norms 常模数据（可选）
 * @returns 完整的评估结果
 */
export function calculateAssessmentResults(
  responses: Response[], 
  sessionId: string, 
  norms?: NormativeData
): AssessmentResults {
  if (!responses || responses.length === 0) {
    throw new Error('No responses provided for calculation');
  }
  
  const normsData = norms || getDefaultNorms();
  
  // Only one version per overlapping scale family contributes to reported scores.
  const families = [
    ['sis_ses_sf', 'sis_ses_full'],
    ['mosher_guilt', 'mosher_guilt_full'],
    ['sos_screening', 'sos_full'],
  ] as const;
  const excluded = new Set<string>();
  for (const [briefId, fullId] of families) {
    const full = scoreQuestions(responses, ALL_SCALES[fullId].questions);
    if (full.answered === 0) continue;
    const selected = selectedForm(responses, briefId, fullId);
    if (!selected) throw new Error('Insufficient data for SRI calculation');
    excluded.add(selected === briefId ? fullId : briefId);
  }

  const scaleScores: ScaleScore[] = [];
  for (const scaleId of Object.keys(ALL_SCALES)) {
    const scale = ALL_SCALES[scaleId];
    if (!scale || excluded.has(scaleId)) continue;
    const scored = scoreQuestions(responses, scale.questions);
    if (scored.answered === 0) continue;
    if (!scored.complete) throw new Error('Insufficient data for SRI calculation');
    if (scale.includeInSRI === false) continue;

    const meanKey = scaleId.replace('_sf', '_total');
    const mean = normsData.means[meanKey] ?? normsData.means[scaleId];
    const stdDev = normsData.standardDeviations[meanKey] ?? normsData.standardDeviations[scaleId];
    const zScore = normsData.sampleSize > 0 && Number.isFinite(mean) && Number.isFinite(stdDev) && stdDev > 0
      ? calculateZScore(scored.rawScore, mean, stdDev)
      : rangeBasedDisplayZ(scored.rawScore, scale.scoring.range);
    const percentile = normalCDF(zScore) * 100;
    scaleScores.push({
      scaleId,
      rawScore: scored.rawScore,
      zScore,
      percentile: Math.max(0, Math.min(100, Math.round(percentile)))
    });
  }

  if (scaleScores.length === 0) {
    throw new Error('Insufficient data for SRI calculation');
  }

  const { scores: dimensionScores, present } = calculateDimensionsWithCoverage(responses, normsData);
  if (present.length === 0) {
    throw new Error('Insufficient data for SRI calculation');
  }
  const sri = calculateSRI(dimensionScores, present);
  sri.scaleScores = scaleScores;
  
  const interpretation = generateInterpretation(sri);
  const recommendations = generateRecommendations(sri);
  const clinicalContext = calculateClinicalContext(responses);
  
  if (clinicalContext?.impactFlag) {
    recommendations.push('如果这些困扰已影响日常生活或关系，建议预约合适的医疗或心理健康专业人员进一步讨论。');
  }
  if (clinicalContext?.safetyFlag) {
    recommendations.push('如果你在亲密互动中感到不安全或无法自由拒绝，请优先联系当地可信任的支持或医疗服务。');
  }
  if (clinicalContext?.supportFlag) {
    recommendations.push('可以先从可信赖的性健康信息、基层医疗或心理咨询服务开始，按自己的节奏寻求帮助。');
  }
  const result: AssessmentResults = {
    sessionId,
    sri,
    interpretation,
    recommendations,
    calculatedAt: new Date()
  };

  if (clinicalContext) {
    result.clinicalContext = clinicalContext;
  }

  return result;
}

/**
 * 生成结果解释文案
 * @param sri SRI 结果
 * @returns 解释文案数组
 */
function generateInterpretation(sri: SRIResult): string[] {
  const level = SRI_LEVELS[sri.level];
  const interpretation = [
    `您的探索性 SRI 显示值为 ${sri.totalScore} 分，处于「${level.label}」水平。`,
    `这只反映本次回答在性相关心理体验方面${getInterpretationByLevel(sri.level)}，不代表诊断或“正常/异常”判断。`
  ];
  
  // 添加维度分析
  const highDimensions = [];
  if (sri.dimensionScores.sosReversed > 1) highDimensions.push('对性刺激的回避倾向');
  if (sri.dimensionScores.sexGuilt > 1) highDimensions.push('性相关内疚感');
  if (sri.dimensionScores.sexualShame > 1) highDimensions.push('性羞耻体验');
  if (sri.dimensionScores.sisOverSes > 1) highDimensions.push('性抑制相对优势');
  
  if (highDimensions.length > 0) {
    interpretation.push(`在以下维度上得分较高：${highDimensions.join('、')}。`);
  }
  
  return interpretation;
}

/**
 * 根据等级生成解释描述
 */
function getInterpretationByLevel(level: keyof typeof SRI_LEVELS): string {
  const descriptions = {
    'very-low': '相对较低，可能更少报告回避或压抑体验',
    'low': '相对较低，但仍应以个人感受和情境为准',
    'moderate': '处于本产品参考分布的中间区间，不代表医学上的正常范围',
    'high': '相对较高；如果同时存在持续困扰或功能影响，可考虑寻求专业支持',
    'very-high': '相对较高；如果让你持续困扰或感到不安全，建议联系合适的专业服务'
  };
  
  return descriptions[level];
}

/**
 * 生成个性化建议
 * @param sri SRI 结果
 * @returns 建议文案数组
 */
function generateRecommendations(sri: SRIResult): string[] {
  const recommendations = [];
  
  if (sri.level === 'very-high' || sri.level === 'high') {
    recommendations.push('较高的探索性显示值本身不代表需要治疗；如果你同时感到持续困扰或生活受影响，可考虑与合适的专业人员交流。');
    recommendations.push('可以阅读可靠的性健康信息，按自己的节奏思考哪些经验或环境因素值得进一步了解。');
  }
  
  if (sri.dimensionScores.sexGuilt > 1) {
    recommendations.push('探索性内疚感的来源，可能与文化背景、家庭教育或宗教信念相关。');
  }
  
  if (sri.dimensionScores.sexualShame > 1) {
    recommendations.push('练习自我接纳和身体正念，建立与自己身体的积极关系。');
  }
  
  if (sri.dimensionScores.sisOverSes > 1) {
    recommendations.push('学习放松技巧和正念练习，减少性焦虑和过度控制。');
  }
  
  // 通用建议
  recommendations.push('在你感到安全且愿意的前提下，可与信任的人或专业人员讨论性健康；不需要为了得分而分享私人信息。');
  recommendations.push('记住这不是诊断工具，结果仅供自我了解和反思使用。');
  
  return recommendations;
}