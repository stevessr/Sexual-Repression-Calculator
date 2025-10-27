/**
 * 量表指导语 - 为每个量表提供详细的填写指导
 * 帮助用户理解测量内容和作答方式
 */

export interface ScaleInstruction {
  scaleId: string;
  title: string;
  instruction: string;
  tips?: string[];
}

export const SCALE_INSTRUCTIONS: Record<string, ScaleInstruction> = {
  // SIS/SES 量表指导
  sis_ses_sf: {
    scaleId: 'sis_ses_sf',
    title: '性抑制/兴奋倾向测量',
    instruction: '接下来的问题关于影响您性兴趣的因素。每个人的性反应模式都不同，请诚实地反映您的实际情况，没有对错之分。',
    tips: ['请根据您通常的感受作答', '如果您没有相关经验，可以想象自己会如何反应']
  },
  sis_ses_full: {
    scaleId: 'sis_ses_full',
    title: '性抑制/兴奋倾向测量（完整版）',
    instruction: '接下来的问题关于影响您性兴趣的因素。每个人的性反应模式都不同，请诚实地反映您的实际情况，没有对错之分。',
    tips: ['请根据您通常的感受作答', '如果您没有相关经验，可以想象自己会如何反应']
  },
  sis_ses_adapted: {
    scaleId: 'sis_ses_adapted',
    title: '性抑制/兴奋倾向测量（适应版）',
    instruction: '接下来的问题关于您的浪漫和性倾向。每个人都不同，请诚实地反映您的实际情况。',
    tips: ['请根据您的真实感受作答', '这些问题适用于各种经验水平的人']
  },

  // Mosher 性内疚量表指导
  mosher_guilt: {
    scaleId: 'mosher_guilt',
    title: '性道德观和内疚感测量',
    instruction: '这部分问题涉及您对性的道德和价值观看法。请根据您内心真实的想法作答，不必考虑"应该"如何想。',
    tips: ['没有"正确"的答案，每个人的价值观都不同', '请选择最接近您真实想法的选项']
  },
  mosher_guilt_full: {
    scaleId: 'mosher_guilt_full',
    title: '性道德观和内疚感测量（完整版）',
    instruction: '这部分问题涉及您对性的道德和价值观看法。请根据您内心真实的想法作答，不必考虑"应该"如何想。',
    tips: ['没有"正确"的答案，每个人的价值观都不同', '请选择最接近您真实想法的选项']
  },

  // KISS-9 性羞耻量表指导
  kiss9_shame: {
    scaleId: 'kiss9_shame',
    title: '性自我感受测量',
    instruction: '这部分问题询问您关于性的自我感受。请根据您在过去一个月的实际体验作答。',
    tips: ['如果某些问题对您不适用，请选择"从不"', '请回忆您最近的真实感受']
  },

  // SOS 性观感量表指导
  sos_screening: {
    scaleId: 'sos_screening',
    title: '性话题态度测量',
    instruction: '接下来的问题关于您对性相关话题和内容的态度。请根据您的真实感受选择最接近的选项。',
    tips: ['每个人对性话题的舒适度不同', '请诚实反映您的真实态度']
  },
  sos_full: {
    scaleId: 'sos_full',
    title: '性话题态度测量（完整版）',
    instruction: '接下来的问题关于您对性相关话题和内容的态度。请根据您的真实感受选择最接近的选项。',
    tips: ['每个人对性话题的舒适度不同', '请诚实反映您的真实态度']
  },

  // BSAS 性态度量表指导
  bsas_attitudes: {
    scaleId: 'bsas_attitudes',
    title: '性态度和观念测量',
    instruction: '这部分问题关于您对性的总体态度和观念。请根据您的真实想法作答。',
    tips: ['反映您的真实观点，而非社会期望', '没有对错之分']
  },

  // 青少年性态度量表
  teen_sexual_attitudes: {
    scaleId: 'teen_sexual_attitudes',
    title: '性态度和观念测量',
    instruction: '这部分问题关于您对性的态度和想法。请诚实作答，所有回答都是保密的。',
    tips: ['请根据您的真实想法作答', '您的回答不会被任何人看到']
  },

  // 性认知量表
  sexual_cognition: {
    scaleId: 'sexual_cognition',
    title: '性认知和想法测量',
    instruction: '这部分问题关于您对性的认识和想法。请根据您的真实感受作答。',
    tips: ['每个人的认识都不同', '请选择最符合您想法的选项']
  }
};

/**
 * 获取量表指导语
 * @param scaleId 量表ID
 * @returns 指导语对象，如果未找到则返回默认指导
 */
export function getScaleInstruction(scaleId: string): ScaleInstruction {
  return SCALE_INSTRUCTIONS[scaleId] || {
    scaleId,
    title: '问卷填写',
    instruction: '请根据您的真实感受选择最符合的选项。所有回答都将被严格保密。',
    tips: ['没有对错答案，请诚实作答']
  };
}

/**
 * 总体问卷指导语（评估开始前显示）
 */
export const GENERAL_QUESTIONNAIRE_INSTRUCTION = {
  title: '如何填写问卷',
  sections: [
    {
      heading: '没有对错答案',
      content: '这份问卷没有"正确"或"错误"的答案，请根据您的真实感受作答。'
    },
    {
      heading: '作答建议',
      items: [
        '请不要过度思考，选择最符合您第一直觉的选项',
        '如果某个问题让您感到不适，您可以跳过标记为可选的题目',
        '所有回答都是匿名的，不会被他人看到',
        '您可以随时暂停或返回修改答案'
      ]
    },
    {
      heading: '预计时间',
      items: [
        '快速版：8-15分钟',
        '完整版：25-40分钟'
      ]
    }
  ]
};

/**
 * 心理支持资源信息
 */
export const MENTAL_HEALTH_RESOURCES = {
  title: '需要帮助？',
  description: '如果填写问卷过程中您感到焦虑或不适，以下是一些支持资源：',
  sections: [
    {
      heading: '心理咨询热线',
      items: [
        '全国心理援助热线：400-161-9995',
        '北京市心理援助热线：010-82951332',
        '上海市心理援助热线：021-12320-5'
      ]
    },
    {
      heading: '在线资源',
      items: [
        '简单心理：www.jiandanxinli.com',
        '壹心理：www.xinli001.com'
      ]
    },
    {
      heading: '专业建议',
      content: '如果您发现自己有严重的性心理困扰，建议咨询专业的性治疗师或心理咨询师。'
    }
  ]
};
