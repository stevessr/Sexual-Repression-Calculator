import { Scale, LIKERT_OPTIONS } from '@/types';

export const MOSHER_GUILT: Scale = {
  id: 'mosher_guilt',
  name: 'Mosher性内疚量表',
  description: 'Mosher开发的性内疚量表，测量性相关的内疚感和道德负担',
  questions: [
    { id: 'mg_1', text: '我觉得性是不洁净的、令人羞耻的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_2', text: '我认为自我性行为是不健康的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_3', text: '只有在婚姻中性行为才是道德的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_4', text: '有性欲望让我感到内疚', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_5', text: '性幻想是错误的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_6', text: '我因自己的性想法而感到羞耻', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_7', text: '性是只有在特定条件下才能接受的东西', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_8', text: '我担心我的性行为在道德上是错误的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_9', text: '享受性快感让我感到内疚', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_10', text: '性冲动是需要控制的', scale: 'mosher_guilt', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true }
  ],
  scoring: { type: 'sum', range: [10, 50] }
};

export const MOSHER_GUILT_FULL: Scale = {
  id: 'mosher_guilt_full',
  name: 'Mosher性内疚量表完整版',
  description: 'Mosher开发的完整版性内疚量表，全面测量性相关的内疚感和道德负担',
  questions: [
    ...MOSHER_GUILT.questions,
    { id: 'mg_11', text: '我觉得性欲望是人类低级的本能', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_12', text: '谈论性让我感到不舒服', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_13', text: '我觉得强烈的性欲是不好的', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_14', text: '我对自己过去的某些性经历感到后悔', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_15', text: '我觉得性行为应该只是为了生育', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_16', text: '我对自己的性想法感到不安', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_17', text: '我认为享受性是自私的表现', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_18', text: '我担心我的性行为会被他人判断', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_19', text: '我觉得纯洁比性经验更重要', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_20', text: '我对自己的性身体感到不适', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_21', text: '我认为性应该是神圣的，不应该随便对待', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_22', text: '我对自己的性冲动感到困扰', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_23', text: '我觉得性活动会让我变得不纯洁', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_24', text: '我担心性行为会影响我的品格', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_25', text: '我认为好人不应该有太多性想法', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_26', text: '我对自己的性历史感到羞愧', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_27', text: '我觉得性欲望会分散我对重要事情的注意力', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'mg_28', text: '我认为控制性冲动是道德修养的体现', scale: 'mosher_guilt_full', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true }
  ],
  scoring: { type: 'sum', range: [28, 140] }
};
