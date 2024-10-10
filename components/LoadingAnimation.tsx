import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onFinish: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onFinish }) => {
  const [text, setText] = useState('');
  const fullText = 'Verity';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(onFinish, 1500); // Wait 1.5 seconds after typing is done before finishing
      }
    }, 150); // Typing speed: 150ms between each character

    return () => clearInterval(typingInterval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 
        className="text-2xl md:text-3xl text-blue-500 font-mono"
        style={{
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        {text}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
};

export default LoadingAnimation;