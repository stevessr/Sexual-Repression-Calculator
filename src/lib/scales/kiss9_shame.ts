import { Scale, FREQUENCY_OPTIONS } from '@/types';

export const KISS9_SHAME: Scale = {
  id: 'kiss9_shame',
  name: 'KISS-9性羞耻量表',
  description: 'Kyle等人开发的性羞耻简版量表，测量性相关的羞耻体验',
  questions: [
    { id: 'ks_1', text: '我对自己的性身体感到羞耻', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_2', text: '我为自己的性想法感到羞耻', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_3', text: '我为自己的性欲望感到羞耻', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_4', text: '我为自己的性行为感到羞耻', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_5', text: '我为自己的性感受感到羞耻', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_6', text: '我觉得我的性本质在某种程度上是有缺陷的', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_7', text: '我希望我能改变自己的性身份', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_8', text: '我觉得作为一个性存在，我让重要的人失望了', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true },
    { id: 'ks_9', text: '我觉得我的性方面不如其他人', scale: 'kiss9_shame', type: 'likert', options: Object.values(FREQUENCY_OPTIONS), required: true }
  ],
  scoring: { type: 'sum', range: [9, 45] }
};
