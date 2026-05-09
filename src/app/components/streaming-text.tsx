import { useState, useEffect } from 'react';

interface StreamingTextProps {
  text: string;
  className?: string;
  hoverDelay?: number;
}

export function StreamingText({ text, className = '', hoverDelay = 3000 }: StreamingTextProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldStream, setShouldStream] = useState(false);
  const [displayedText, setDisplayedText] = useState(text);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering) {
      const timer = setTimeout(() => {
        setShouldStream(true);
      }, hoverDelay);
      setHoverTimer(timer);
    } else {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        setHoverTimer(null);
      }
      setShouldStream(false);
      setDisplayedText(text);
    }

    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [isHovering, hoverDelay]);

  useEffect(() => {
    if (shouldStream) {
      let index = 0;
      setDisplayedText('');

      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [shouldStream, text]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
    >
      {displayedText}
      {shouldStream && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
}
