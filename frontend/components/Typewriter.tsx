import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeNext?: number;
}

export function Typewriter({
  texts,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeNext = 500
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === texts[currentIndex]) {
      timeout = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((current) => (current + 1) % texts.length);
      timeout = setTimeout(() => {}, delayBeforeNext);
    } else {
      const nextText = isDeleting
        ? displayText.slice(0, -1)
        : texts[currentIndex].slice(0, displayText.length + 1);

      timeout = setTimeout(
        () => setDisplayText(nextText),
        isDeleting ? deleteSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deleteSpeed, delayBeforeDelete, delayBeforeNext]);

  return (
    <div className="h-[72px] flex items-center">
      <div className="text-xl md:text-2xl font-medium bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        {displayText}
        <span className="inline-block w-[2px] h-[1.2em] bg-blue-500 ml-1 animate-pulse" />
      </div>
    </div>
  );
}