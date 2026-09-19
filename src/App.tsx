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
    <div className="min-h-screen bg-[#F8FAFC] relative font-sans text-slate-800 flex flex-col p-4 sm:p-8 xl:p-10 overflow-x-hidden selection:bg-blue-200/50">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-400/15 blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col w-full max-w-[96rem] mx-auto flex-1">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10 w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-white/60 shadow-lg bg-white/80 backdrop-blur-sm p-1">
              <img src="/logo.png" alt="School Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                AI 助教系统
              </h1>
              <p className="text-sm sm:text-base text-slate-500 font-medium tracking-wide mt-1">智能教学辅助平台</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-base font-semibold text-slate-600 bg-white/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:bg-white/90">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            系统运行中
          </div>
        </header>

        {/* Main Columns */}
        <main className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
          <LeftColumn />
          <RightColumn />
        </main>

        <CompareSection />
      </div>

    </div>
  );
}
