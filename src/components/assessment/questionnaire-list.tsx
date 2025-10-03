/**
 * 问卷列表组件 - 以列表形式显示所有问卷题目
 * 提供完整的题目概览和横向选项布局
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, ArrowLeft, BarChart3 } from 'lucide-react';
import { Question, Response, Demographics } from '@/types';
import {
  ALL_SCALES,
  QUICK_ASSESSMENT_SCALES,
  INCREMENTAL_ASSESSMENT_SCALES,
  FULL_ASSESSMENT_SCALES,
  getAdaptiveScales,
  getAdaptiveFullScales,
  isMinor,
  isInexperienced,
  getUserGroupDescription,
  getScaleInstruction
} from '@/lib/scales';
import { useSearchParams } from 'react-router-dom';

interface QuestionnaireListProps {
  type: 'quick' | 'full';
  demographics: Demographics;
  responses: Response[];
  onResponseUpdate: (responses: Response[]) => void;
  onComplete: () => void;
  onBack?: () => void;
}

export function QuestionnaireList({
  type,
  demographics,
  responses,
  onResponseUpdate,
  onComplete,
  onBack
}: QuestionnaireListProps) {
  const [searchParams] = useSearchParams();
  const useDetailed = searchParams.get('detail') === '1' || searchParams.get('detail') === 'true';

  const getScalesForUser = () => {
    if (type === 'quick') return getAdaptiveScales(demographics);
    if (useDetailed) {
      try {
        return getAdaptiveFullScales(demographics);
      } catch (e) {
        return FULL_ASSESSMENT_SCALES;
      }
    }
    return INCREMENTAL_ASSESSMENT_SCALES;
  };

  const scaleIds = useMemo(() => getScalesForUser(), [type, demographics, useDetailed]);
  const userGroup = getUserGroupDescription(demographics);
  const allQuestions = scaleIds.flatMap(scaleId => ALL_SCALES[scaleId]?.questions ?? []);

  // 当前展示的量表索引（每个量表单独一页）
  const [currentScaleIndex, setCurrentScaleIndex] = useState<number>(0);
  const currentScaleId = scaleIds[currentScaleIndex];
  // 保留可选的每量表分页状态 if needed later
  const [scalePages, setScalePages] = useState<Record<string, number>>({});
  // PAGE_SIZE is used for legacy pagination calculations (kept for jump/scroll logic)
  const PAGE_SIZE = 10;
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // restore
  useEffect(() => {
    const raw = localStorage.getItem('sri_assessment_progress');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data?.type === type && data?.scalePages) setScalePages(data.scalePages);
    } catch (e) {
      console.error(e);
    }
  }, [type]);

  useEffect(() => {
    // ensure every selected scale has a page, but only update if changed
    setScalePages(prev => {
      const next = { ...prev };
      let changed = false;
      scaleIds.forEach(id => {
        if (!(id in next)) {
          next[id] = 0;
          changed = true;
        }
      });
      // also remove keys for scales that no longer exist
      Object.keys(next).forEach(k => {
        if (!scaleIds.includes(k)) {
          delete next[k];
          changed = true;
        }
      });
      return changed ? next : prev;
    });

    // clamp currentScaleIndex when scaleIds changes, but only if needed
    const clamped = Math.min(currentScaleIndex, Math.max(0, scaleIds.length - 1));
    if (clamped !== currentScaleIndex) setCurrentScaleIndex(clamped);
  }, [scaleIds]);

  // auto save
  useEffect(() => {
    if (responses.length === 0) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem('sri_assessment_progress', JSON.stringify({ type, demographics, responses, scalePages, timestamp: new Date().toISOString() }));
        setLastSaved(new Date());
      } catch (e) {
        console.error(e);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [responses, type, demographics, scalePages]);

  const setPageForScale = (scaleId: string, page: number) => setScalePages(prev => ({ ...prev, [scaleId]: Math.max(0, page) }));

  const getResponseForQuestion = (questionId: string) => responses.find(r => r.questionId === questionId);

  const handleAnswer = (questionId: string, value: number) => {
    const resp: Response = { questionId, value, timestamp: new Date() };
    const updated = responses.filter(r => r.questionId !== questionId);
    updated.push(resp);
    onResponseUpdate(updated);
  };

  const getAnswerStats = () => {
    const answered = responses.length;
    const unanswered = allQuestions.length - answered;
    const requiredUnanswered = allQuestions.filter(q => q.required).filter(q => !responses.some(r => r.questionId === q.id)).length;
    return { answered, unanswered, requiredUnanswered };
  };

  const handleComplete = () => {
    const stats = getAnswerStats();
    if (stats.requiredUnanswered > 0) {
      const firstUnanswered = allQuestions.find(q => q.required && !responses.some(r => r.questionId === q.id));
      if (firstUnanswered) {
        // find owning scale and page
        const owning = scaleIds.find(sid => (ALL_SCALES[sid]?.questions ?? []).some(q => q.id === firstUnanswered.id));
        if (owning) {
          const idx = (ALL_SCALES[owning].questions).findIndex(q => q.id === firstUnanswered.id);
          const targetPage = Math.floor(idx / PAGE_SIZE);
          setPageForScale(owning, targetPage);
          setTimeout(() => document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
          return;
        }
        document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      alert(`还有 ${stats.requiredUnanswered} 道必答题未完成，请继续填写。`);
      return;
    }
    localStorage.removeItem('sri_assessment_progress');
    onComplete();
  };

  const stats = getAnswerStats();
  const progress = (stats.answered / Math.max(1, allQuestions.length)) * 100;

  const goToNextScale = () => setCurrentScaleIndex(i => Math.min(scaleIds.length - 1, i + 1));
  const goToPrevScale = () => setCurrentScaleIndex(i => Math.max(0, i - 1));

  // quick-jump sidebar actions
  const jumpToScale = (scaleId: string, page = 0) => {
    setPageForScale(scaleId, page);
    // scroll to top of that card after DOM update
    setTimeout(() => {
      const firstQ = (ALL_SCALES[scaleId]?.questions ?? [])[page * PAGE_SIZE];
      if (firstQ) document.getElementById(`question-${firstQ.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <Card className="sri-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-psychology-primary" />
                问卷评估进度
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-psychology-primary">{userGroup}</Badge>
                <Badge variant="outline">{type === 'quick' ? '快测版' : '完整版'}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-psychology-primary border-psychology-primary">{stats.answered} / {allQuestions.length} 已完成</Badge>
              {lastSaved && <Badge variant="secondary" className="text-xs">已保存 {lastSaved.toLocaleTimeString()}</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.answered}</div>
              <div className="text-sm text-green-600">已回答</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.unanswered}</div>
              <div className="text-sm text-yellow-600">未回答</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.requiredUnanswered}</div>
              <div className="text-sm text-red-600">必答未完成</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 当前量表：每个测评表单独成页面 */}
      {(() => {
        const scaleId = currentScaleId;
        if (!scaleId) return <div>没有可用的量表</div>;
        const scale = ALL_SCALES[scaleId];
        if (!scale) return <div>量表数据缺失：{scaleId}</div>;
        const scaleResponses = responses.filter(r => scale.questions.some(q => q.id === r.questionId));
        const scaleProgress = (scaleResponses.length / Math.max(1, scale.questions.length)) * 100;
        const scaleInstruction = getScaleInstruction(scaleId);

        return (
          <Card key={scaleId} className="sri-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{scale.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{scale.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{scaleResponses.length} / {scale.questions.length}</Badge>
                  <Progress value={scaleProgress} className="h-1 w-20 mt-2" />
                </div>
              </div>
              {/* 量表指导语 */}
              {scaleInstruction && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-2">📋 {scaleInstruction.title}</p>
                  <p className="text-sm text-blue-800">{scaleInstruction.instruction}</p>
                  {scaleInstruction.tips && scaleInstruction.tips.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {scaleInstruction.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-blue-700 flex items-start gap-1">
                          <span className="mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {scale.questions.map((question, idx) => {
                const absoluteIndex = idx; // index within the scale
                const currentResponse = getResponseForQuestion(question.id);
                const isAnswered = !!currentResponse;
                return (
                  <div key={question.id} id={`question-${question.id}`} className={`p-6 rounded-lg border-2 transition-all duration-200 ${isAnswered ? 'bg-green-50 border-green-200' : question.required ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">{absoluteIndex + 1}</Badge>
                          {question.required && <Badge variant="destructive" className="text-xs">必答</Badge>}
                          {isAnswered && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <h3 className="text-base font-medium text-foreground leading-relaxed">{question.text}</h3>
                        {question.description && <p className="text-sm text-muted-foreground mt-1">{question.description}</p>}
                      </div>
                    </div>

                    <div className="pt-2">
                      {(() => {
                        const numericCurrent = currentResponse ? Number(currentResponse.value) : undefined;
                        const selectedOption = (typeof numericCurrent === 'number' && !isNaN(numericCurrent) && question.options?.length > 0)
                          ? question.options.reduce((best, o) => Math.abs(o.value - (numericCurrent as number)) < Math.abs(best.value - (numericCurrent as number)) ? o : best, question.options[0])
                          : undefined;
                        return (
                          <>
                            <Slider
                              value={currentResponse ? [Number(currentResponse.value)] : undefined}
                              onValueChange={(value) => handleAnswer(question.id, value[0])}
                              min={question.options[0].value}
                              max={question.options[question.options.length - 1].value}
                              step={question.options.length > 1 ? question.options[1].value - question.options[0].value : 1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground px-1 mt-2">
                              {question.options.map((option) => (
                                <span key={option.value} className="text-center w-1/5">{option.label}</span>
                              ))}
                            </div>
                            {selectedOption && <div className="text-center font-medium text-psychology-primary pt-2 text-sm">当前选择: {selectedOption.label}</div>}
                          </>
                        );
                      })()}
                    </div>

                    {question.required && !isAnswered && (
                      <div className="flex items-center gap-2 mt-3 text-red-600"><AlertCircle className="w-4 h-4" /><span className="text-sm">此题为必答题</span></div>
                    )}
                  </div>
                );
              })}

              {/* 量表间切换控制 */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={goToPrevScale} disabled={currentScaleIndex === 0}>上一量表</Button>
                  <Button variant="outline" onClick={goToNextScale} disabled={currentScaleIndex >= scaleIds.length - 1}>下一量表</Button>
                </div>
                <div className="text-sm text-muted-foreground">第 {currentScaleIndex + 1} / {scaleIds.length} 个量表</div>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* 底部操作区域 */}
      <Card className="sri-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2"><ArrowLeft className="w-4 h-4" />返回上一步</Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">请确保所有必答题都已完成</p>
              <Button onClick={handleComplete} disabled={stats.requiredUnanswered > 0} className="bg-psychology-primary hover:bg-psychology-primary/90 px-8" size="lg">完成评估并查看结果 <CheckCircle className="w-4 h-4 ml-2" /></Button>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">进度: {Math.round(progress)}%</p>
              <p className="text-xs text-muted-foreground">{stats.requiredUnanswered > 0 ? `还有 ${stats.requiredUnanswered} 道必答题` : '所有必答题已完成'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 右侧悬浮快速跳转：自动吸附/隐藏，展开时显示题号网格 */}
      {(() => {
        const [open, setOpen] = useState(false);
        const panelRef = useRef<HTMLDivElement>(null);

        // 点击页面其他区域自动收起
        useEffect(() => {
          if (!open) return;
          const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
              setOpen(false);
            }
          };
          document.addEventListener('mousedown', handler);
          return () => document.removeEventListener('mousedown', handler);
        }, [open]);

        // 吸附到右侧边缘的小按钮
        return (
          <div className="fixed right-6 top-32 z-50" style={{ pointerEvents: 'auto' }}>
            {!open && (
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-psychology-primary text-white shadow-lg border-2 border-psychology-primary hover:bg-psychology-primary/90 transition-all"
                style={{ position: 'absolute', right: 0, top: 0 }}
                aria-label="展开快速跳转"
                onClick={() => setOpen(true)}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="6" fill="currentColor"/><text x="10" y="15" textAnchor="middle" fontSize="13" fill="#fff">跳</text></svg>
              </button>
            )}
            {open && (
              <div
                ref={panelRef}
                className="w-56 bg-white border rounded-lg p-3 shadow-lg transition-all animate-in fade-in"
                style={{ position: 'absolute', right: 0, top: 0 }}
                tabIndex={-1}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-muted-foreground">快速跳转（本量表）</div>
                  <button
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-foreground border ml-2"
                    aria-label="收起"
                    onClick={() => setOpen(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-96 overflow-auto">
                  {(ALL_SCALES[currentScaleId]?.questions ?? []).map((q, qi) => {
                    const isAnswered = responses.some(r => r.questionId === q.id);
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          const el = document.getElementById(`question-${q.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          setOpen(false);
                        }}
                        aria-label={`跳转到第 ${qi + 1} 题`}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium border ${isAnswered ? 'bg-green-500 text-white border-green-600' : 'bg-red-100 text-red-700 border-red-200'} hover:scale-105 transition-transform`}
                      >
                        {qi + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">请根据您的真实感受选择最符合的选项。所有回答都将被严格保密，仅用于生成您的个人评估报告。您可以随时修改之前的回答。</p>
      </div>
    </div>
  );
}