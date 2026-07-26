import { useState, useRef, useCallback, useEffect } from 'react';

export function useTypewriter(fullText: string, minDelay = 20, maxDelay = 60) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const typeNextChar = useCallback(() => {
    if (currentIndexRef.current < fullText.length) {
      setDisplayedText(fullText.substring(0, currentIndexRef.current + 1));
      currentIndexRef.current++;
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = setTimeout(typeNextChar, delay);
    } else {
      setIsTyping(false);
    }
  }, [fullText, maxDelay, minDelay]);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setDisplayedText('');
    currentIndexRef.current = 0;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(typeNextChar, minDelay);
  }, [typeNextChar, minDelay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { displayedText, isTyping, startTyping };
}
