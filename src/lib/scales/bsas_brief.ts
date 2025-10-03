import { Scale, LIKERT_OPTIONS } from '@/types';

export const BSAS_BRIEF: Scale = {
  id: 'bsas_brief',
  name: 'BSAS简版性态度量表',
  description: 'Hendrick等人开发的性态度量表简版，测量性态度的四个维度',
  questions: [
    { id: 'bsas_perm_1', text: '我不需要与某人有感情承诺就可以和他们发生性关系', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_perm_2', text: '我觉得婚前性行为是可以接受的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_perm_3', text: '我认为一夜情是可以接受的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_perm_4', text: '我觉得有多个性伴侣是可以的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_perm_5', text: '我认为性应该只发生在已婚夫妇之间', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_perm_6', text: '我觉得性自由是重要的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_birth_1', text: '避孕是双方的责任', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_birth_2', text: '女性应该负责避孕', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_birth_3', text: '男性应该负责避孕', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_birth_4', text: '使用避孕措施是明智的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_birth_5', text: '我支持计划生育', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_birth_6', text: '性教育应该包括避孕信息', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_comm_1', text: '谈论性是困难的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_comm_2', text: '我觉得和伴侣讨论性是重要的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_comm_3', text: '我觉得表达性需求是困难的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_comm_4', text: '我能轻松地和朋友谈论性', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_comm_5', text: '我认为开放的性沟通是健康关系的关键', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_inst_1', text: '性主要是为了身体快感', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_inst_2', text: '性最重要的部分是享受', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_inst_3', text: '性不需要爱情', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_inst_4', text: '性可以是纯粹的身体活动', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true },
    { id: 'bsas_inst_5', text: '性主要是为了情感联系', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true },
    { id: 'bsas_inst_6', text: '我觉得性应该总是浪漫的', scale: 'bsas_brief', type: 'likert', options: Object.values(LIKERT_OPTIONS), required: true, reverse: true }
  ],
  scoring: { type: 'sum', range: [23, 115] }
};
