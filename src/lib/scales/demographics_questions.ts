// Demographics questions (no 'scale' field required)
export const DEMOGRAPHICS_QUESTIONS = [
  {
    id: 'age',
    text: '您的年龄段',
    type: 'multiple',
    options: [
      { value: 0, label: '14-17岁' },
      { value: 1, label: '18-24岁' },
      { value: 2, label: '25-34岁' },
      { value: 3, label: '35-44岁' },
      { value: 4, label: '45-54岁' },
      { value: 5, label: '55岁以上' }
    ],
    required: true
  },
  {
    id: 'gender',
    text: '您的性别认同',
    type: 'multiple',
    options: [
      { value: 1, label: '男性' },
      { value: 2, label: '女性' },
      { value: 3, label: '非二元性别' },
      { value: 4, label: '不愿回答' }
    ],
    required: true
  },
  {
    id: 'relationshipStatus',
    text: '您目前的关系状态',
    type: 'multiple',
    options: [
      { value: 1, label: '单身' },
      { value: 2, label: '恋爱中' },
      { value: 3, label: '已婚/同居' },
      { value: 4, label: '不便回答' }
    ],
    required: true
  },
  {
    id: 'sexualActivity',
    text: '您的性经验状况',
    type: 'multiple',
    options: [
      { value: 0, label: '从未有过性行为' },
      { value: 1, label: '有过性行为，但近一年内无' },
      { value: 2, label: '很少（1-3次/年）' },
      { value: 3, label: '偶尔（1-3次/月）' },
      { value: 4, label: '经常（1-3次/周）' },
      { value: 5, label: '频繁（4次/周以上）' }
    ],
    required: true
  },
  {
    id: 'religiousCultural',
    text: '您的宗教/文化背景（可选）',
    type: 'multiple',
    options: [
      { value: 1, label: '无特定宗教' },
      { value: 2, label: '基督教' },
      { value: 3, label: '佛教' },
      { value: 4, label: '伊斯兰教' },
      { value: 5, label: '其他' },
      { value: 6, label: '不愿回答' }
    ],
    required: false
  }
];
