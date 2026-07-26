import { useState, useRef, useCallback, useEffect } from 'react';

export function useVoiceSimulation(presetText: string) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  const typeNext = useCallback(() => {
    if (indexRef.current < presetText.length) {
      setText(presetText.substring(0, indexRef.current + 1));
      indexRef.current++;
      const isLongPause = Math.random() < 0.08; // 8% chance of long pause
      const delay = isLongPause ? Math.random() * 600 + 400 : Math.random() * 100 + 30; 
      timeoutRef.current = setTimeout(typeNext, delay);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [presetText]);

  const start = useCallback(() => {
    setIsRecording(true);
    setIsWaiting(true);
    setText('');
    indexRef.current = 0;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsWaiting(false);
      typeNext();
    }, 1500 + Math.random() * 500); // 1.5 - 2s delay
  }, [typeNext]);

  const stop = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsRecording(false);
    setIsWaiting(false);
    const output = presetText.substring(0, indexRef.current);
    return output;
  }, [presetText]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isRecording, isWaiting, text, start, stop };
}
