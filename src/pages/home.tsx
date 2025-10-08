/**
 * 主页组件 - 服务暂时关闭页面
 * 显示关闭公告和自动重定向到 GitHub
 */

import React, { useState, useEffect } from 'react';
import { Brain, Clock } from 'lucide-react';

export default function Home() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // 倒计时结束，重定向到GitHub
          window.location.href = 'https://github.com/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-white to-psychology-warm flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Logo 区域 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-psychology-primary rounded-2xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-psychology-primary">SRI Calculator</h1>
            <p className="text-sm text-muted-foreground">性压抑指数计算器</p>
          </div>
        </div>

        {/* 关闭公告 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-psychology-primary/20 p-12 shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            服务暂时关闭
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            由于被倒卖，受人委托暂时关闭
          </p>

          {/* 倒计时显示 */}
          <div className="bg-psychology-primary/10 rounded-lg p-6 mb-6">
            <p className="text-lg text-psychology-primary mb-2">
              页面将在 <span className="font-bold text-2xl">{countdown}</span> 秒后自动跳转到 GitHub
            </p>
            <p className="text-sm text-muted-foreground">
              或您可以直接点击下方链接访问
            </p>
          </div>

          {/* 手动跳转按钮 */}
          <a
            href="https://github.com/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Brain className="w-5 h-5" />
            立即跳转到 GitHub
          </a>
        </div>

        {/* 底部信息 */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>感谢您的理解和支持</p>
        </div>
      </div>
    </div>
  );
}