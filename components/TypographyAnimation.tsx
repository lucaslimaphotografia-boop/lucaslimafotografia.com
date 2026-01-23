import React, { useEffect, useState } from 'react';

interface TypographyAnimationProps {
  text?: string[];
  subtitle?: string;
  animationType?: 'drop' | 'slide' | 'scale' | 'fade' | 'bounce' | 'glitch';
}

export const TypographyAnimation: React.FC<TypographyAnimationProps> = ({ 
  text = ['FOTOGRAFIA', 'É UMA ARTE,', 'UMA EMOÇÃO', 'ETERNIZADA'],
  subtitle = 'CADA CASAMENTO É UMA HISTÓRIA ÚNICA. CADA MOMENTO É UMA OBRA DE ARTE. CADA FOTOGRAFIA É UMA MEMÓRIA PARA SEMPRE.',
  animationType = 'drop'
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render when text or animation changes
    setKey(prev => prev + 1);
  }, [animationType, text]);

  const splitTextIntoLetters = (line: string, lineIndex: number) => {
    let totalDelay = 0;
    // Calculate delay for previous lines
    for (let i = 0; i < lineIndex; i++) {
      totalDelay += (text[i]?.length || 0) * 0.05 + 0.2;
    }
    
    return line.split('').map((char, charIndex) => {
      const delay = totalDelay + charIndex * 0.05;
      return (
        <span
          key={`${lineIndex}-${charIndex}-${key}`}
          className="letter"
          style={{ animationDelay: `${delay}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="w-full bg-white py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="typography-art text-center">
          <div className={`main-text animation-${animationType}`}>
            {text.map((line, index) => (
              <span key={`line-${index}-${key}`} className="word-line block">
                {splitTextIntoLetters(line, index)}
              </span>
            ))}
          </div>

          <p className="subtitle opacity-0 animate-[fadeInUp_1s_ease_2.5s_forwards]">
            {subtitle}
          </p>
        </div>
      </div>

      <style>{`
        .typography-art {
          position: relative;
        }

        .main-text {
          font-size: clamp(2.5rem, 6vw, 7rem);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #000;
          position: relative;
          margin-bottom: 40px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding-top: 0.1em;
        }

        .word-line {
          display: block;
          overflow: visible;
          padding-top: 0.05em;
          padding-bottom: 0.05em;
        }

        .letter {
          display: inline-block;
          opacity: 0;
        }

        .subtitle {
          font-size: clamp(0.75rem, 1.2vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #000;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.6;
          text-transform: uppercase;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Drop Animation */
        .animation-drop .letter {
          animation: letterDrop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes letterDrop {
          0% {
            opacity: 0;
            transform: translateY(-100%) rotate(10deg) scale(0);
          }
          50% {
            transform: translateY(10%) rotate(-5deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }

        /* Slide Animation */
        .animation-slide .letter {
          animation: letterSlide 0.5s ease forwards;
        }

        @keyframes letterSlide {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Scale Animation */
        .animation-scale .letter {
          animation: letterScale 0.5s ease forwards;
        }

        @keyframes letterScale {
          from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        /* Fade Animation */
        .animation-fade .letter {
          animation: letterFade 0.8s ease forwards;
        }

        @keyframes letterFade {
          from {
            opacity: 0;
            filter: blur(10px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Bounce Animation */
        .animation-bounce .letter {
          animation: letterBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes letterBounce {
          0% {
            opacity: 0;
            transform: translateY(-200px);
          }
          60% {
            transform: translateY(20px);
          }
          80% {
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Glitch Animation */
        .animation-glitch .letter {
          animation: letterGlitch 0.7s ease forwards;
        }

        @keyframes letterGlitch {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            text-shadow: -5px 0 red, 5px 0 blue;
          }
          25% {
            transform: translateX(10px);
            text-shadow: 5px 0 red, -5px 0 blue;
          }
          50% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(3px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            text-shadow: none;
          }
        }

        @media (max-width: 768px) {
          .main-text {
            margin-bottom: 30px;
          }

          .subtitle {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};
