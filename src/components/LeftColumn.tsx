import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { useVoiceSimulation } from '../hooks/useVoiceSimulation';

const PRESET_TEXT = "我想了解一下人工智能的发展历史。";

export function LeftColumn() {
  const [finalText, setFinalText] = useState('');
  
  const { isRecording, isWaiting, text, start, stop } = useVoiceSimulation(PRESET_TEXT);

  const handleToggleVoice = () => {
    if (isRecording) {
      const output = stop();
      setFinalText(output || PRESET_TEXT);
    } else {
      setFinalText('');
      start();
    }
  };

  return (
    <section className="flex flex-col relative z-10">
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-[13px] font-bold uppercase tracking-widest text-slate-500">用户输入区</h2>
        {isRecording && (
          <div className="flex items-center gap-3 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-100 backdrop-blur-sm">
            <span className="text-[11px] text-red-600 font-semibold flex items-center">
              <div className="flex items-end gap-[2px] h-3 mr-2">
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_150ms] h-3"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_300ms] h-2.5"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_450ms] h-1.5"></span>
              </div>
              正在聆听...
            </span>
            <div className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse tracking-widest shadow-sm shadow-red-200">LIVE</div>
          </div>
        )}
      </div>
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex-1 flex flex-col relative overflow-hidden transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
        {/* Subtle decorative background inside the card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <button
          onClick={handleToggleVoice}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all duration-300 group mb-6 relative overflow-hidden ${
            isRecording 
              ? 'bg-red-50/50 text-red-600 border-red-200/50 hover:bg-red-50 hover:border-red-300 shadow-sm' 
              : 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50 text-blue-600 border-blue-100/50 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {isRecording ? (
             <>
               <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                 <Square className="w-4 h-4 fill-current z-10" />
                 <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
               </div>
               <span className="font-semibold">{isWaiting ? '准备中...' : '停止录音'}</span>
             </>
          ) : (
             <>
               <Mic className="w-5 h-5" />
               <span className="font-semibold">点击开始语音输入</span>
             </>
          )}
        </button>

        <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-100 relative flex flex-col">
          {isRecording && text ? (
            <p className="text-lg leading-relaxed text-slate-600">
              {text}
              <span className="border-r-2 border-blue-500 animate-pulse ml-1 inline-block h-5 align-middle"></span>
            </p>
          ) : (
            <textarea
              value={finalText}
              onChange={(e) => setFinalText(e.target.value)}
              placeholder="语音输入的内容将显示在这里..."
              className="w-full h-full bg-transparent focus:outline-none resize-none text-lg leading-relaxed text-slate-600 placeholder:text-slate-400"
            />
          )}
          {isRecording && (
            <span className="absolute bottom-4 right-4 text-xs text-slate-400">点击按钮停止并确认</span>
          )}
        </div>
      </div>
    </section>
  );
}
