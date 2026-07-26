import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Loader2 } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { motion, AnimatePresence } from 'motion/react';

const COMPARE_TEXT = `【深度对比分析】

用户提问（左栏）：回答了相关问题。
AI回答（右栏）：更严谨地回答了相关问题。

结论：AI助教系统能够准确分离用户的泛泛提问，从而提供更具针对性、更具实用价值的辅导内容，达到理论与实践相辅相成的学习效果。`;

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
