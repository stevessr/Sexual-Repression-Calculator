/**
 * 科学依据页面 - 展示 SRI 的研究参考、题目来源和测量边界
 * 提供公开来源、产品定义与非诊断使用说明
 */

import React from 'react';
import {MEDICAL_REFERENCES} from '@/lib/medical-references';
import {Link} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
    Award,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle,
    FileText,
    Globe,
    Home,
    Microscope,
    Shield,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';

export default function Science() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-psychology-calm via-background to-psychology-warm">
      {/* 装饰背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 right-20 w-28 h-28 bg-psychology-accent/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-16 w-36 h-36 bg-psychology-primary/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-psychology-secondary/3 rounded-full blur-2xl"></div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Brain className="w-8 h-8 text-psychology-primary" />
              <span className="text-xl font-semibold text-foreground">SRI Calculator</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                首页
              </Link>
              <Link to="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                使用指南
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <Microscope className="w-16 h-16 text-psychology-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            科学依据
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            结合性健康框架、研究理论与自评题库的教育性工具；不替代临床评估，也不提供诊断结论
          </p>
        </div>

        <div className="space-y-8">
          {/* 理论基础 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-psychology-primary" />
                理论基础
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">双控制模型 (Dual Control Model)</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Bancroft与Janssen(2000)提出的双控制模型，将性反应理解为性兴奋系统(SES)与性抑制系统(SIS)的互动。
                    这里将其作为研究理论来组织题目，不把模型分数解释为个人疾病或医学风险。
                  </p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-psychology-warning" />
                    <span className="text-sm font-medium">研究理论来源</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">性压抑概念</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    本工具把“性压抑”作为对性相关想法、感受或互动的主观困扰与回避体验来讨论。
                    个体差异本身不是疾病；是否需要临床关注，要结合持续时间、个人困扰、功能影响、安全与其他健康因素由专业人员评估。
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-psychology-success" />
                    <span className="text-sm font-medium">研究背景</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 量表构成 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-psychology-secondary" />
                研究构念与题目来源
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6">
                  {[
                    {
                      name: "SIS/SES-SF",
                      fullName: "性抑制/性兴奋量表简版",
                      items: "14项",
                      author: "Janssen et al. (2002)",
                      evidenceNote: "原始研究量表；本中文题库未完成独立信效度验证",
                      desc: "用于描述性兴奋、性能表现相关抑制(SIS1)与威胁/后果相关抑制(SIS2)等研究构念，不用于个人诊断。",
                      color: "bg-psychology-primary/10 border-psychology-primary/20"
                    },
                    {
                      name: "Mosher性内疚量表",
                      fullName: "Mosher Sexual Guilt Scale", 
                      items: "10项",
                      evidenceNote: "研究构念改写；本版本未完成独立信效度验证",
                      desc: "用于探索性内疚和道德化压力体验，不能把文化或宗教价值观差异判定为病理。",
                      color: "bg-psychology-secondary/10 border-psychology-secondary/20"
                    },
                    {
                      name: "KISS-9性羞耻量表",
                      fullName: "Kyle Inventory of Sexual Shame",
                      items: "9项", 
                      evidenceNote: "研究构念改写；本版本未完成独立信效度验证",
                      desc: "用于探索性羞耻和自我评价体验，不对性身份、取向或经历作价值判断。",
                      color: "bg-psychology-accent/10 border-psychology-accent/20"
                    },
                    {
                      name: "SOS性观感量表",
                      fullName: "Sexual Opinion Survey",
                      items: "5项简版",
                      evidenceNote: "研究构念改写；本版本未完成独立信效度验证",
                      desc: "用于探索对性相关内容的主观舒适度与回避体验，不将开放或保守偏好视为医学问题。",
                      color: "bg-psychology-warning/10 border-psychology-warning/20"
                    }
                  ].map((scale) => (
                    <Card key={scale.name} className={`${scale.color} border`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{scale.name}</h4>
                              <p className="text-sm text-muted-foreground">{scale.fullName}</p>
                            </div>
                            <Badge variant="secondary">{scale.items}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{scale.desc}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span><strong>证据边界：</strong>{scale.evidenceNote}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SRI指数计算 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-psychology-accent" />
                SRI指数计算方法
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">四维度标准化</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>1. <strong>性观感反向</strong>：SOS分数反向转换，高分表示对性刺激的消极反应</div>
                    <div>2. <strong>性内疚</strong>：Mosher量表原始分数，反映道德化性压抑</div>
                    <div>3. <strong>性羞耻</strong>：KISS-9题目反映性相关自我评价和羞耻体验，不对身份或取向作判断</div>
                    <div>4. <strong>抑制优势</strong>：分别计算 SIS1、SIS2 与 SES 的每题均值，再比较抑制与兴奋倾向；不同题数不会直接相减</div>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">z分数标准化</h4>
                  <p className="text-sm text-muted-foreground">
                    当前默认按题目理论取值范围生成探索性显示分数，不将其他语言量表的均值与标准差用作中文常模。
                    仅在明确提供外部参考数据时采用相应的 z 标准化；显示值不能视为医学百分位、正常范围或临床切点。
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">SRI合成计算</h4>
                  <p className="text-sm text-muted-foreground">
                    等权合成和CDF映射是本产品定义的探索性显示方式，用于帮助用户观察回答模式，
                    不是经过验证的临床量表总分，也不能单独决定是否需要治疗或诊断。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测量证据边界 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-psychology-success" />
                测量证据边界
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">研究层面的依据</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    双控制模型与 SIS/SES 原始论文为性兴奋、性抑制构念提供研究背景。原论文的样本、语言和测量目的
                    不能自动转化为本项目中文改写题库的信效度或临床常模。
                  </p>
                  <Badge variant="secondary">研究参考</Badge>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">本项目当前状态</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    当前没有代表性中文常模，也没有为本版本完成独立的内部一致性、重测、结构效度或临床效度研究。
                    结果只用于自我观察和后续对话，不应用于筛选、诊断、治疗决策或对他人分类。
                  </p>
                  <Badge variant="outline">待验证</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 研究应用 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-psychology-secondary" />
                研究应用
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "教育与自我反思",
                    desc: "帮助用户观察性相关困扰、回避和支持环境，不做诊断",
                    icon: Brain,
                    count: "非诊断"
                  },
                  {
                    title: "中文题库验证",
                    desc: "需要独立样本、信效度和跨文化测量等后续研究",
                    icon: FileText,
                    count: "待验证"
                  },
                  {
                    title: "临床沟通边界",
                    desc: "可作为对话起点，但不能替代问诊、体检或专业判断",
                    icon: Users,
                    count: "不用于诊断"
                  }
                ].map(({ title, desc, icon: Icon, count }) => (
                  <div key={title} className="text-center p-4 bg-muted/30 rounded-lg">
                    <Icon className="w-8 h-8 text-psychology-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 现行医疗标准与研究参考 */}
          <Card className="sri-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-psychology-primary" />
                现行医疗标准与研究参考
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                题目中的“困扰、生活影响、同意、边界、信息可及性与求助”用语参考 WHO、CDC、ICD-11 与 DSM-5-TR 的临床边界。
                这些来源用于教育和题目设计，不会把性取向、性别、关系状态或性活动频率当作疾病，也不为本工具建立诊断切点。
              </p>
              <div className="grid gap-3">
                {MEDICAL_REFERENCES.map((reference) => (
                  <a
                    key={reference.id}
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground">{reference.title}</h3>
                      <Badge variant="secondary">
                        {reference.type === 'guideline' ? '指南/标准' : '研究'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {reference.organization} · {reference.year}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {reference.summary}
                    </p>
                    <p className="mt-2 text-xs text-psychology-primary">
                      用于：{reference.usedFor.join('、')}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 限制说明 */}
          <Card className="sri-card border-psychology-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-psychology-warning">
                <TrendingUp className="w-6 h-6" />
                使用限制与说明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-psychology-warning/5 border border-psychology-warning/20 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>常模限制：</strong>本版本没有代表性中文常模；默认以题目理论范围映射显示分数，不将其他人群参考值当作本地常模</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>测量限制：</strong>中文题目尚未完成独立信效度验证，结果应结合个人情境而非单独解释</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>动态变化：</strong>回答可能随时间、经历和环境变化，单次显示值不代表永久特征</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-psychology-warning rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>使用范围：</strong>用于性健康教育和自我反思，不应用于临床诊断、筛选或重要决策</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 行动按钮 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-psychology-primary hover:bg-psychology-primary/90">
                <Link to="/guide" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  查看使用指南
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/assessment" className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  开始测评
                </Link>
              </Button>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                返回首页
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}