export interface ScorableQuestion {
  id: string;
  options: ReadonlyArray<{ value: number }>;
  reverse?: boolean;
}

export interface ScorableResponse {
  questionId: string;
  value: number;
}

export interface ItemScore {
  rawScore: number;
  answered: number;
  total: number;
  complete: boolean;
  average: number;
}

/** Keep the latest answer per question; invalid answers remain unanswered. */
export function scoreQuestions(
  responses: readonly ScorableResponse[],
  questions: readonly ScorableQuestion[],
): ItemScore {
  const latest = new Map<string, number>();
  for (const response of responses) {
    latest.set(response.questionId, response.value);
  }

  let rawScore = 0;
  let answered = 0;
  const seen = new Set<string>();
  for (const question of questions) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);

    const options = question.options.map(option => option.value).filter(Number.isFinite);
    const value = latest.get(question.id);
    if (options.length === 0 || value === undefined || !Number.isFinite(value)) continue;

    const min = Math.min(...options);
    const max = Math.max(...options);
    const clamped = Math.max(min, Math.min(max, value));
    rawScore += question.reverse ? min + max - clamped : clamped;
    answered += 1;
  }

  return {
    rawScore,
    answered,
    total: seen.size,
    complete: seen.size > 0 && answered === seen.size,
    average: answered > 0 ? rawScore / answered : 0,
  };
}

/** A full form includes its short-form items; choose only one version. */
export function selectScaleVersion(
  responses: readonly ScorableResponse[],
  shortQuestions: readonly ScorableQuestion[],
  fullQuestions: readonly ScorableQuestion[],
): 'short' | 'full' | null {
  const shortIds = new Set(shortQuestions.map(question => question.id));
  const respondedIds = new Set(responses.map(response => response.questionId));
  const hasFullOnlyAnswers = fullQuestions.some(question =>
    !shortIds.has(question.id) && respondedIds.has(question.id),
  );

  if (hasFullOnlyAnswers) {
    return scoreQuestions(responses, fullQuestions).complete ? 'full' : null;
  }
  return scoreQuestions(responses, shortQuestions).complete ? 'short' : null;
}

export function standardize(rawScore: number, mean: number, standardDeviation: number): number {
  if (!Number.isFinite(rawScore) || !Number.isFinite(mean) ||
      !Number.isFinite(standardDeviation) || standardDeviation <= 0) return 0;
  return (rawScore - mean) / standardDeviation;
}

/**
 * An explicitly uncalibrated, bounded display fallback when no reference
 * moments exist. The endpoints of the theoretical scale map to z=-2/+2.
 */
export function rangeBasedDisplayZ(rawScore: number, range: readonly [number, number]): number {
  const [min, max] = range;
  if (!Number.isFinite(rawScore) || !Number.isFinite(min) ||
      !Number.isFinite(max) || max <= min) return 0;
  return 4 * (Math.max(min, Math.min(max, rawScore)) - (min + max) / 2) / (max - min);
}

/**
 * Inhibition and excitation are compared by item averages, not total sums.
 * For 1-5 items the midpoint is zero and the contrast is bounded to [-2,2].
 */
export function adaptedInhibitionContrast(inhibitionMean: number, excitationMean: number): number {
  if (!Number.isFinite(inhibitionMean) || !Number.isFinite(excitationMean)) return 0;
  return Math.max(-2, Math.min(2, (inhibitionMean - excitationMean) / 2));
}
