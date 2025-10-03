import { Scale, LIKERT_OPTIONS } from '@/types';

export const SOS_SCREENING: Scale = {
  id: 'sos_screening',
  name: 'SOS性观感筛查',
  description: '性观感调查的简化筛查版本，测量对性刺激的情绪取向',
  questions: [
    { id: 'sos_1', text: '我对色情内容感到不舒服', scale: 'sos_screening', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_2', text: '性相关的话题让我感到尴尬', scale: 'sos_screening', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_3', text: '我倾向于避免性暗示的内容', scale: 'sos_screening', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_4', text: '看到性相关的图像会让我感到不安', scale: 'sos_screening', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_5', text: '我觉得公开讨论性是不合适的', scale: 'sos_screening', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true }
  ],
  scoring: { type: 'sum', range: [5, 25] }
};

export const SOS_FULL: Scale = {
  id: 'sos_full',
  name: 'SOS性观感量表完整版',
  description: 'Fisher等人开发的完整版性观感调查，全面测量对性刺激的情绪取向',
  questions: [
    ...SOS_SCREENING.questions,
    { id: 'sos_6', text: '我认为过多接触性内容对人有害', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_7', text: '我觉得大多数性教育材料过于露骨', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_8', text: '我认为性应该是私密的，不应该公开讨论', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_9', text: '我对媒体中的性内容感到反感', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_10', text: '我觉得社会对性过于开放', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_11', text: '我认为年轻人接触性信息太早了', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_12', text: '我对性俱乐部或成人娱乐场所持负面态度', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_13', text: '我认为性研究是不必要的', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_14', text: '我觉得公开展示亲密行为是不合适的', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_15', text: '我对性玩具或性用品感到不适', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_16', text: '我认为性应该是自然发生的，不需要特别关注', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_17', text: '我对性多样性的概念感到困扰', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_18', text: '我觉得性咨询或性治疗是令人尴尬的', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_19', text: '我认为传统的性价值观更可取', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_20', text: '我对现代社会的性自由持谨慎态度', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'sos_21', text: '我认为过多的性信息会让人困惑', scale: 'sos_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true }
  ],
  scoring: { type: 'sum', range: [21, 105] }
};
