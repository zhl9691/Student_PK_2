import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Loader2 } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { motion, AnimatePresence } from 'motion/react';

const COMPARE_TEXT = `【深度对比分析】

同学回答：像“现场第一反应”——停针之后马上想的是“吸氧、肾上腺素、备设备、安抚情绪”，是抢救现场的时间线思维。
AI回答：像“护理抢救标准预案”——从停药、呼医、体位、首选药、辅助药、监测上报到留观，是制度+流程+法律依据全覆盖。

1. 同学答到的（而且答得不错）
✅ 停药后下一步：吸氧
✅ 关键药：肾上腺素
✅ 准备抢救设备（插管/除颤/抢救车）
✅ 安抚患者、消除恐惧——这是 AI 没提、但临床很重要的点
过敏性休克患者清醒时会极度恐慌，恐惧本身加重交感兴奋、心率快、耗氧增加。同学能想到“人文安抚”，说明有临床温度，不只是背流程。

2. 同学漏掉的（考试会扣分）
❌ 没提立即通知医生/启动抢救团队（默认医生会在，但流程上必须先呼救）
❌ 没提体位：休克平卧、下肢抬高
❌ 没提保留静脉通路、换生理盐水（停青霉素≠拔针，通路要留着扩容）
❌ 肾上腺素说了，但肌注大腿外侧、0.3–0.5mg、可重复这些细节没有
❌ 辅助用药（地塞米松、抗组胺、扩容）、监测生命体征、上报不良事件、留观 24h/转 ICU 全没提
❌ 没区分“轻度皮疹”和“休克”，按最重情况一把抓

3. AI 的强项与弱点
✅ 有法律依据（《护士条例》第十七条）
✅ 有顺序：停药→呼医→体位→肾上腺素→辅助→监测→上报→留观
✅ 把“医生不在场护士也能先救”这个坑填上了
✅ 适合：护考简答题、护理病历、科室复盘
⚠️ AI 弱点：
- “安抚情绪”这种人文护理完全没写，太冷、像操作手册
- 同学能脱口而出的“别慌、陪着患者”，AI 要你提醒才加`;

export function CompareSection() {
  const [show, setShow] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { displayedText, startTyping, isTyping } = useTypewriter(COMPARE_TEXT, 20, 50);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCompare = () => {
    setShow(true);
    setIsAnalyzing(true);
    timeoutRef.current = setTimeout(() => {
      setIsAnalyzing(false);
      startTyping();
    }, 1500 + Math.random() * 500); // 1.5 - 2s delay
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <footer className="flex flex-col items-center mt-4 pb-12 relative z-10">
      <button
        onClick={handleCompare}
        disabled={isAnalyzing}
        className="group relative px-12 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-bold shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden disabled:opacity-80 disabled:hover:-translate-y-0 disabled:hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center text-[15px] tracking-wide">
          {isAnalyzing ? (
            <><Loader2 className="w-5 h-5 mr-3 animate-spin text-blue-300" /> 正在对比分析...</>
          ) : (
            <>
              对比两者的答案
              <ArrowLeftRight className="w-4 h-4 ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-4xl mt-10 relative"
          >
             {/* Glowing border effect */}
             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur opacity-20 animate-pulse pointer-events-none"></div>
             
             <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-white/60 shadow-2xl p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 via-purple-50/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                
                <div className="text-[13px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 flex items-center gap-3">
                  <span className="p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </span>
                  对比分析结果
                </div>
                
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-6">
                     <div className="relative">
                       <Loader2 className="w-10 h-10 animate-spin text-blue-500 relative z-10" />
                       <div className="absolute inset-0 bg-blue-400 blur-xl opacity-40 animate-pulse"></div>
                     </div>
                     <span className="text-sm font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">正在深度对比双方内容特征...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700 font-medium relative z-10">
                    {displayedText}
                    {isTyping && <span className="inline-block w-2.5 h-5 bg-gradient-to-b from-blue-500 to-purple-500 ml-1 animate-pulse align-middle rounded-sm"></span>}
                  </div>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
