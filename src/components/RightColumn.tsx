import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileVideo, FileImage, File as FileIcon, CheckCircle2, Mic, Square, Loader2, Sparkles } from 'lucide-react';
import { useVoiceSimulation } from '../hooks/useVoiceSimulation';
import { useTypewriter } from '../hooks/useTypewriter';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_REQ = "请帮我分析一下下一步的处理应该是什么。";
const AI_ANSWER = `基于视频，建议按以下顺序处理：

1. 立即停药并呼救
停止青霉素输注/注射，保留静脉通路并更换输液器与生理盐水；立即通知医生、启动抢救团队。

2. 保持体位并给氧
过敏性休克患者平卧、下肢抬高、保持气道通畅；呼吸困难者立即高流量吸氧。

3. 立即使用肾上腺素
皮下注射或深部肌内注射 0.1% 盐酸肾上腺素 0.5 mL；小儿按 0.01 mg/kg 计算，单次最大 0.3 mL。症状不缓解时，每隔 15 min 可重复 0.5 mL。

4. 准备抢救设备
备好抢救车、气管插管/环甲膜穿刺等气道设备，必要时快速补液；同时安抚患者、消除恐惧。

5. 监测和后续处理
持续监测 BP、P、R、SpO₂ 和神志，按需配合辅助用药；轻度皮疹至少留观 24 h，严重过敏转 ICU。

6. 记录与上报
记录发生时间、通知医生时间、用药、患者反应和处理经过，及时上报护理部/药剂科。`;

const GUIDELINE_NOTE = "指南补充（小字）：图片教材写“皮下注射或深部肌内注射、15 min 可重复”；现行权威建议（AAAAI/ACAAI 2023、ASCIA 2024、RCUK 2021）更倾向将大腿中外侧/前外侧肌内注射作为首选，并建议气道/呼吸/循环问题持续时约 5 min 后重新评估。指南仅作补充，具体执行以本院抢救预案、药品说明书及医嘱为准。";

export function RightColumn() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reqText, setReqText] = useState('');

  const { isRecording, isWaiting, text: reqVoiceText, start: startVoice, stop: stopVoice } = useVoiceSimulation(PRESET_REQ);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [reqText]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { displayedText: aiAnswerText, startTyping: startAiAnswer, isTyping: aiIsTyping } = useTypewriter(AI_ANSWER, 30, 70);
  const analysisTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      setUploadProgress(0);
      setIsUploadComplete(false);
      setReqText('');
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setIsUploading(false);
          setIsUploadComplete(true);
        }
        setUploadProgress(progress);
      }, 300);
    }
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      const output = stopVoice();
      setReqText(output || PRESET_REQ);
    } else {
      setReqText('');
      startVoice();
    }
  };

  const handleSend = () => {
    setIsAnalyzing(true);
    analysisTimeoutRef.current = setTimeout(() => {
      setIsAnalyzing(false);
      startAiAnswer();
    }, 10000); // 10 seconds analysis
  };

  useEffect(() => {
    return () => {
      if (analysisTimeoutRef.current) clearTimeout(analysisTimeoutRef.current);
    };
  }, []);

  return (
    <section className="flex flex-col relative z-10">
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-base sm:text-lg font-bold uppercase tracking-widest text-slate-500">AI 处理区</h2>
        {isRecording ? (
          <div className="flex items-center gap-3 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-100 backdrop-blur-sm">
            <span className="text-sm text-red-600 font-semibold flex items-center">
              <div className="flex items-end gap-[2px] h-3 mr-2">
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_150ms] h-3"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_300ms] h-2.5"></span>
                <span className="w-0.5 bg-red-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_450ms] h-1.5"></span>
              </div>
              正在聆听...
            </span>
            <div className="bg-red-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full animate-pulse tracking-widest shadow-sm shadow-red-200">LIVE</div>
          </div>
        ) : (
          isUploadComplete && (
            <div className="flex items-center gap-2 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-100 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-sm text-emerald-600 font-semibold tracking-wide">文件解析完成</span>
            </div>
          )
        )}
      </div>
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 flex-1 flex flex-col space-y-8 relative overflow-hidden transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
        {/* Subtle decorative background inside the card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        {/* Upload Section */}
        <div className="mb-2 relative z-10">
          <input 
            type="file" 
            accept=".mp4,.jpg,.jpeg,.png" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          {!file ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-4 py-5 bg-slate-50/50 text-slate-600 rounded-[1.25rem] border-2 border-dashed border-slate-200/80 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer shadow-sm group"
            >
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
              </div>
              <span className="text-lg font-bold tracking-wide">请上传文件</span>
            </button>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              title="点击重新上传"
              className="p-5 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border border-emerald-100/80 rounded-[1.25rem] flex items-center gap-5 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
              <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 shrink-0 border border-emerald-50 relative z-10 backdrop-blur-sm group-hover:scale-105 transition-transform">
                {file.type.startsWith('video/') ? (
                  <FileVideo className="w-7 h-7" />
                ) : file.type.startsWith('image/') ? (
                  <FileImage className="w-7 h-7" />
                ) : (
                  <FileIcon className="w-7 h-7" />
                )}
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-base font-bold text-slate-800 truncate max-w-[200px]">{file.name}</span>
                  <span className="text-sm font-semibold text-slate-500 bg-white/50 px-2 py-0.5 rounded-full">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="w-full h-2 bg-emerald-100/50 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ ease: "linear", duration: 0.3 }}
                  />
                </div>
                {isUploadComplete && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="px-1.5 py-0.5 bg-emerald-100/80 rounded text-xs font-black text-emerald-700 uppercase tracking-widest border border-emerald-200/50">DONE</div>
                    <span className="text-sm font-semibold text-emerald-600/90 tracking-wide">文件已上传 <span className="opacity-60 font-normal ml-1">(点击可重新上传)</span></span>
                  </div>
                )}
              </div>
              {isUploadComplete && (
                <div className="text-emerald-500 shrink-0 relative z-10 bg-white/50 p-1.5 rounded-full group-hover:bg-emerald-100 transition-colors">
                  <CheckCircle2 className="w-6 h-6 drop-shadow-sm" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="flex items-center gap-3 relative z-10 mt-4">
          <button
            onClick={handleToggleVoice}
            className={`p-3.5 rounded-2xl transition-all duration-300 relative group shadow-sm border ${isRecording ? 'bg-red-50 border-red-200 text-red-600 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:bg-red-100' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-500'}`}
          >
            {isRecording ? (
              <>
                <Square className="w-5 h-5 z-10 relative" />
                <div className="absolute inset-0 bg-red-500 rounded-2xl animate-ping opacity-20"></div>
              </>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
          
          {isRecording ? (
            <div className="flex-1 px-5 py-4 border-2 border-red-200/70 rounded-2xl bg-red-50/50 text-lg text-red-800 flex items-center min-w-0 shadow-inner">
              <span className="truncate">{reqVoiceText}</span>
              <span className="inline-block w-1.5 h-4 bg-red-400 ml-1.5 animate-pulse shrink-0 rounded-sm"></span>
            </div>
          ) : (
          <textarea
              ref={textareaRef}
              rows={1}
              value={reqText}
              onChange={(e) => setReqText(e.target.value)}
              placeholder="请输入需求或点击语音输入..."
            className="flex-1 px-5 py-4 border-2 border-slate-200/80 rounded-2xl bg-slate-50/50 text-lg text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all min-w-0 resize-none overflow-hidden leading-relaxed placeholder:text-slate-400 font-medium"
              style={{ minHeight: '52px' }}
            />
          )}
          
          <button
            onClick={handleSend}
            disabled={isAnalyzing || aiIsTyping || isRecording || reqText.trim() === ''}
            className="px-9 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-[0_8px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_25px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed shrink-0 text-lg tracking-wider"
          >
            发送
          </button>
        </div>

        {/* AI Result */}
        <AnimatePresence>
          {(aiAnswerText || isAnalyzing) && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex-1 flex flex-col relative z-10"
            >
              <div className="flex-1 min-h-[20rem] bg-gradient-to-br from-blue-50/80 to-indigo-50/50 rounded-[1.5rem] p-8 border border-blue-100/60 overflow-hidden flex flex-col shadow-inner relative mt-4">
                {/* Decoration inside result box */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/30 blur-2xl rounded-full"></div>

                <p className="text-base font-bold text-blue-800/80 mb-4 flex items-center gap-2 uppercase tracking-widest relative z-10">
                  <Sparkles className="w-4 h-4" />
                  AI 智能分析：
                </p>
                {isAnalyzing ? (
                  <div className="flex items-center gap-4 text-blue-600 py-6 relative z-10">
                     <Loader2 className="w-6 h-6 animate-spin" />
                     <span className="text-lg font-semibold tracking-wide animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">正在深度解析文件...</span>
                  </div>
                ) : (
                  <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap overflow-y-auto relative z-10 font-medium">
                    {aiAnswerText}
                    {aiIsTyping && <span className="inline-block w-2.5 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 ml-1 animate-pulse align-middle rounded-sm"></span>}
                  </div>
                )}
                {!isAnalyzing && !aiIsTyping && aiAnswerText && (
                  <p className="mt-5 pt-4 border-t border-blue-200/70 text-sm leading-relaxed text-slate-500 relative z-10">
                    {GUIDELINE_NOTE}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
