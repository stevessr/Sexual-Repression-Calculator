import type { Scale } from '../../types/index.ts';
import { CHECKIN_OPTIONS } from '../../types/index.ts';

/**
 * Evidence-informed context check-in.
 *
 * These items are not a validated diagnostic instrument. They deliberately
 * separate distress/impact from protective context (consent, privacy and
 * access to care) so that a person's identity, orientation or activity level
 * is never treated as a symptom.
 */
export const SEXUAL_WELLBEING_CHECKIN: Scale = {
  id: 'sexual_wellbeing_checkin',
  name: '性健康与困扰自评（非诊断）',
  description: '围绕近四周的困扰、生活影响、同意与支持环境进行的补充自评；不产生临床诊断或治疗结论。',
  includeInSRI: false,
  questions: [
    {
      id: 'wb_distress',
      text: '在过去四周，性或亲密关系相关的想法、感受或经历让我感到明显困扰。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true
    },
    {
      id: 'wb_impact',
      text: '在过去四周，这些困扰影响了我的睡眠、情绪、日常活动或关系。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true
    },
    {
      id: 'wb_avoidance',
      text: '我会回避自己本来想要的亲密沟通或体验，事后因此感到难受。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true
    },
    {
      id: 'wb_shame',
      text: '我会因为自己的性欲、幻想、身体或身份而觉得自己有问题或不值得被爱。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true
    },
    {
      id: 'wb_pressure',
      text: '我曾因伴侣、家庭、文化或网络期待而觉得必须以某种方式发生性行为。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true
    },
    {
      id: 'wb_consent',
      text: '在亲密互动中，我能随时表达同意、拒绝或改变主意，而且不会因此被惩罚。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'wb_boundaries',
      text: '在亲密关系中，我的边界、隐私和身体通常受到尊重。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'wb_information',
      text: '我能获得可靠、符合自己需要的性健康信息或医疗服务。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'wb_communication',
      text: '在安全和相互尊重的前提下，我能谈论自己的性健康需求或疑问。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true,
      reverse: true
    },
    {
      id: 'wb_help',
      text: '如果这些问题持续困扰，我愿意考虑向合适的医疗或心理健康专业人员求助。',
      scale: 'sexual_wellbeing_checkin',
      type: 'likert',
      options: Object.values(CHECKIN_OPTIONS),
      required: true,
      reverse: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [0, 40]
  }
};
