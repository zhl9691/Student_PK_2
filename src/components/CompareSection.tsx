import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Loader2 } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { motion, AnimatePresence } from 'motion/react';

const COMPARE_TEXT = `【深度对比分析】

**同学回答：** 视频中已经完成停药，接下来想到吸氧、肾上腺素、准备抢救设备和安抚患者，体现了抢救现场的快速反应和人文关怀。
**AI回答：** 在同学回答的基础上，补充了呼叫医生、保持体位、保留静脉通路、药物剂量、监测、留观和记录上报，形成了更完整的抢救流程。

**1. 同学回答的优点**
✅ **停药后立即想到吸氧和肾上腺素**
✅ **提前准备抢救车及气道设备**，关注病情恶化风险
✅ **安抚患者、消除恐惧**，体现人文护理
✅ 顺序符合抢救现场“先处理、再完善”的时间线思维

**2. AI 补充的关键内容**
❌ 立即通知医生、启动抢救团队
❌ 过敏性休克体位：平卧、下肢抬高并保持气道通畅
❌ 保留静脉通路并更换输液器与生理盐水
❌ 肾上腺素的给药途径、剂量和重复时间
❌ 监测生命体征、辅助用药、留观及严重过敏转 ICU
❌ 记录处理经过并及时上报护理部/药剂科

**3. 综合评价**
同学回答抓住了**最紧急的现场处置**，反应快、有临床温度；AI 则把抢救流程补充得更完整，尤其是呼救、体位、给药细节、监测和上报。
两者结合后，既保留了**“先抢救”的现场思维**，也覆盖了护理记录、留观和后续管理要求。`;

const COMPARE_GUIDELINE_NOTE = "指南补充：教材写“皮下注射或深部肌内注射、15 min 重复”；现行 AAAAI/ACAAI 2023、ASCIA 2024 与 RCUK 2021 更倾向优先选择大腿中外侧/前外侧肌内注射，气道/呼吸/循环问题持续时约 5 min 后再评估是否重复。指南仅作补充，具体执行以教材教学要求、本院抢救预案和医嘱为准。";

function renderFormattedText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => (
    <React.Fragment key={`${lineIndex}-${line}`}>
      {line.split(/(\*\*.*?\*\*)/g).map((part, partIndex) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={`${lineIndex}-${partIndex}`} className="font-extrabold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={`${lineIndex}-${partIndex}`}>{part}</React.Fragment>
        ),
      )}
      {lineIndex < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

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
        <span className="relative z-10 flex items-center text-lg tracking-wide">
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
            className="w-full max-w-6xl mt-10 relative"
          >
             {/* Glowing border effect */}
             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] blur opacity-20 animate-pulse pointer-events-none"></div>
             
             <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 via-purple-50/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                
                <div className="text-base font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-7 flex items-center gap-3">
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
                     <span className="text-base font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">正在深度对比双方内容特征...</span>
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700 font-medium relative z-10">
                      {renderFormattedText(displayedText)}
                      {isTyping && <span className="inline-block w-2.5 h-5 bg-gradient-to-b from-blue-500 to-purple-500 ml-1 animate-pulse align-middle rounded-sm"></span>}
                    </div>
                    {!isAnalyzing && !isTyping && displayedText && (
                      <p className="mt-6 pt-4 border-t border-blue-200/70 text-sm leading-relaxed text-slate-500 relative z-10">
                        {COMPARE_GUIDELINE_NOTE}
                      </p>
                    )}
                  </>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
