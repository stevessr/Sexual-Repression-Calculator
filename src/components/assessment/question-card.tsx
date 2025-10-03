/**
 * 单题卡片组件 - 展示单个问卷题目和选项
 * 提供清晰的交互界面和视觉反馈
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import { Badge } from '@/components/ui/badge';
import { SkipForward, AlertCircle } from 'lucide-react';
import { Question, QuestionOption, Response } from '@/types';
import { ALL_SCALES } from '@/lib/scales';

interface QuestionCardProps {
  question: Question;
  currentResponse?: Response;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (response: Response) => void;
  onSkip?: () => void;
  allowSkip?: boolean;
}

export function QuestionCard({
  question,
  currentResponse,
  questionNumber,
  totalQuestions,
  onAnswer,
  onSkip,
  allowSkip = false
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value.toString() || ''
  );
  const [showValidation, setShowValidation] = useState(false);

  // 获取量表信息
  const scale = ALL_SCALES[question.scale];
  const scaleName = scale?.name || question.scale;

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setShowValidation(false);
    
    // 立即提交回答，但不自动跳转
    const response: Response = {
      questionId: question.id,
      value: parseFloat(value),
      timestamp: new Date()
    };
    onAnswer(response);
  };

  const handleSkip = () => {
    if (question.required && !allowSkip) {
      setShowValidation(true);
      return;
    }
    onSkip?.();
  };

  const sortedOptions = React.useMemo(() => [...question.options].sort((a, b) => a.value - b.value), [question.options]);
  const min = sortedOptions[0].value;
  const max = sortedOptions[sortedOptions.length - 1].value;
  const step = sortedOptions.length > 1 ? sortedOptions[1].value - sortedOptions[0].value : 0.1;
  // 将选中的字符串值转换为数字，并按数值最近邻匹配到对应的选项（区域匹配）
  const numericSelected = selectedValue ? Number(selectedValue) : undefined;
  const selectedOption = typeof numericSelected === 'number' && !isNaN(numericSelected)
    ? sortedOptions.reduce((best, o) => {
        return Math.abs(o.value - numericSelected) < Math.abs(best.value - numericSelected) ? o : best;
      }, sortedOptions[0])
    : undefined;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="sri-card shadow-lg">
        <CardContent className="p-8">
          {/* 题目头部信息 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-psychology-primary border-psychology-primary">
                {questionNumber} / {totalQuestions}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {scaleName}
              </Badge>
            </div>
            {question.required && (
              <Badge variant="destructive" className="text-xs">
                必答
              </Badge>
            )}
          </div>

          {/* 题目文本 */}
          <div className="mb-8">
            <h2 className="text-xl font-medium leading-relaxed text-foreground">
              {question.text}
            </h2>
            {question.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {question.description}
              </p>
            )}
          </div>

          {/* 选项区域 */}
          <div className="space-y-6 pt-4">
            <Slider
              value={selectedValue ? [parseFloat(selectedValue)] : [min]}
              onValueChange={(value) => handleValueChange(value[0].toString())}
              min={min}
              max={max}
              step={step}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              {sortedOptions.map((option) => (
                <span key={option.value} className="text-center w-1/5">
                  {option.label}
                </span>
              ))}
            </div>
            {selectedOption && (
              <div className="text-center font-medium text-psychology-primary pt-2 text-sm">
                当前选择: {selectedOption.label}
              </div>
            )}
          </div>

          {/* 验证提示 */}
          {showValidation && question.required && !selectedValue && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">请选择一个选项后继续</span>
            </div>
          )}

          {/* 跳过按钮 */}
          {allowSkip && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                跳过此题
              </Button>
            </div>
          )}

          {/* 选择状态提示 */}
          {selectedValue && (
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓ 已选择答案，请点击"下一题"继续
              </p>
            </div>
          )}

          {/* 底部说明 */}
          <div className="mt-6 pt-4 border-t border-muted text-center">
            <p className="text-xs text-muted-foreground">
              请根据您的真实感受选择最符合的选项。您的回答将被严格保密。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}