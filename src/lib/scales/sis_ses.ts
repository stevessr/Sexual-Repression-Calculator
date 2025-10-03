import { Scale, LIKERT_OPTIONS } from '@/types';

// SIS/SES-SF 14项量表 (Sexual Inhibition/Sexual Excitation Scale - Short Form)
export const SIS_SES_SF: Scale = {
  id: 'sis_ses_sf',
  name: 'SIS/SES-SF 性抑制/性兴奋量表简版',
  description: 'Janssen等人开发的双控制模型量表，测量性抑制和性兴奋系统',
  questions: [
    // SES items (Sexual Excitation System)
    {
      id: 'ses_1',
      text: '当我看到有吸引力的人时，我很容易产生性幻想',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_2', 
      text: '性的画面或故事很容易让我兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_3',
      text: '我很容易被性唤起',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_4',
      text: '看到裸体会让我性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items (性能表现相关抑制)
    {
      id: 'sis1_1',
      text: '如果我担心性表现，我就很难维持性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_2',
      text: '我担心性表现不好会让伴侣失望，这让我难以放松',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_3',
      text: '担心无法满足伴侣会降低我的性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_4',
      text: '担心性表现会让我难以专注于性快感',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_5',
      text: '性活动中的分心想法会让我失去性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items (威胁/恐惧相关抑制)
    {
      id: 'sis2_1',
      text: '如果我认为有被发现的风险，我不太可能寻求性活动',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_2',
      text: '担心性传播疾病会降低我的性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_3',
      text: '如果存在风险，我很难保持性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_4',
      text: '担心怀孕会影响我的性兴趣',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_5',
      text: '陌生或不熟悉的环境会让我难以性兴奋',
      scale: 'sis_ses_sf',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [14, 70]
  }
};

// SIS/SES完整版量表 (45项)
export const SIS_SES_FULL: Scale = {
  id: 'sis_ses_full',
  name: 'SIS/SES 性抑制/性兴奋量表完整版',
  description: 'Janssen等人开发的完整版双控制模型量表，全面测量性抑制和性兴奋系统',
  questions: [
    // SES items (Sexual Excitation System) - 16项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('ses_')),
    {
      id: 'ses_5',
      text: '当我幻想与某人发生性关系时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_6',
      text: '性兴奋来得快去得也快',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_7',
      text: '当某人性感地触摸我时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_8',
      text: '某些气味会让我想起性并让我兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_9',
      text: '我很容易对不熟悉的人产生性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_10',
      text: '当我听到别人谈论性时，我很容易被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_11',
      text: '音乐可以让我想起性并让我兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_12',
      text: '很多事情都能让我想起性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_13',
      text: '我觉得自己性欲很强',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_14',
      text: '当我看电影中的浪漫场景时，我想到性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_15',
      text: '我容易被多种类型的人吸引',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'ses_16',
      text: '我经常发现自己在想性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS1 items 完整版 - 14项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis1_')),
    {
      id: 'sis1_6',
      text: '我需要我的生殖器被伴侣完全接受，否则我无法保持兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_7',
      text: '我需要确信伴侣对我有性吸引力，才能专注于自己的快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_8',
      text: '担心性表现会如何被评判会让我失去性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_9',
      text: '我需要觉得自己在性方面有能力，才能享受性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_10',
      text: '我无法专注于性快感，因为我担心我的身体外观',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_11',
      text: '当我担心是否会达到高潮时，我很难保持性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_12',
      text: '如果我觉得我被迫发生性关系，我会失去性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_13',
      text: '除非感觉安全，否则我无法被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis1_14',
      text: '如果我不确定我能满足伴侣，我很难变得兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    // SIS2 items 完整版 - 15项
    ...SIS_SES_SF.questions.filter(q => q.id.startsWith('sis2_')),
    {
      id: 'sis2_6',
      text: '如果有人可能听到我们，我不太可能被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_7',
      text: '当我第一次与某人发生性关系时，我很难被唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_8',
      text: '如果我无法专注于正在发生的事情，我会失去性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_9',
      text: '除非我的伴侣似乎真正想要性，否则我很难保持兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_10',
      text: '当我觉得我的伴侣没有完全投入时，我会失去性兴趣',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_11',
      text: '我需要感到与伴侣的强烈情感联系才能享受性',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_12',
      text: '药物或酒精会让我很难被性唤起',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_13',
      text: '除非情绪合适，否则我无法真正专注于性快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_14',
      text: '如果我担心伴侣的感受，我很难专注于自己的快感',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sis2_15',
      text: '有时我担心性接触的意义，这会干扰我的性兴奋',
      scale: 'sis_ses_full',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [45, 225]
  }
};

// 修改过的SIS/SES量表（移除具体性行为相关题目）
export const SIS_SES_ADAPTED: Scale = {
  id: 'sis_ses_adapted',
  name: 'SIS/SES适应版量表',
  description: '适用于无性经验用户的性抑制/兴奋倾向量表',
  questions: [
    {
      id: 'sisa_1',
      text: '当我看到有吸引力的人时，我很容易产生浪漫想法',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_2',
      text: '浪漫的画面或故事很容易让我产生情感反应',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_3',
      text: '我很容易被浪漫情境所打动',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_4',
      text: '亲密接触的想法会让我紧张',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_5',
      text: '我担心在亲密关系中让对方失望',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_6',
      text: '我觉得在亲密关系中需要很多条件才能放松',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_7',
      text: '如果感到有风险，我会避免亲密接触',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    },
    {
      id: 'sisa_8',
      text: '陌生或不熟悉的环境会让我难以表达亲密情感',
      scale: 'sis_ses_adapted',
      type: 'likert',
      options: Object.values(LIKERT_OPTIONS),
      required: true
    }
  ],
  scoring: {
    type: 'sum',
    range: [8, 40]
  }
};
