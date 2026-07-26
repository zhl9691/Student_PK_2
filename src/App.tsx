/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LeftColumn } from './components/LeftColumn';
import { RightColumn } from './components/RightColumn';
import { CompareSection } from './components/CompareSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative font-sans text-slate-800 flex flex-col p-4 sm:p-8 overflow-x-hidden selection:bg-blue-200/50">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-400/15 blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto flex-1">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-8 w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-white/60 shadow-lg bg-white/80 backdrop-blur-sm p-1">
              <img src="/logo.png" alt="School Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                AI 助教系统
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">智能教学辅助平台</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:bg-white/90">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            系统运行中
          </div>
        </header>

        {/* Main Columns */}
        <main className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <LeftColumn />
          <RightColumn />
        </main>

        <CompareSection />
      </div>

      {/* Overlay (Visual Feedback Representation) */}
      <div className="fixed bottom-8 right-8 w-72 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 flex items-start gap-4 z-50 transition-all hover:shadow-blue-500/10 hover:-translate-y-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center text-blue-600 shrink-0 shadow-inner border border-blue-100/50 mt-0.5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800 tracking-wide">小贴士</div>
          <div className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">点击底部对比按钮，可查看AI与用户输入之间的核心差异深度分析。</div>
        </div>
      </div>
    </div>
  );
}
