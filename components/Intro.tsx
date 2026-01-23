import React, { useEffect, useRef } from 'react';

interface IntroProps {
  onFinish: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade out e finalizar após 3 segundos
    const fadeOutTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('fade-out');
      }
    }, 2500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div ref={containerRef} className="intro-container fixed inset-0 z-[100] bg-white">
      {/* Texto centralizado */}
      <div className="intro-content flex flex-col items-center justify-center h-full">
        <div ref={textRef} className="intro-text text-center">
          <h1 className="intro-title text-black font-light tracking-[0.2em] uppercase text-4xl md:text-6xl lg:text-7xl mb-4 opacity-0">
            LUCASLIMA
          </h1>
          <div className="intro-line w-0 h-px bg-black opacity-0"></div>
        </div>
      </div>

      <style>{`
        .intro-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .intro-content {
          position: relative;
        }

        .intro-title {
          animation: fadeInUp 1s ease-out 0.3s forwards;
          letter-spacing: 0.15em;
          font-weight: 300;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .intro-line {
          animation: expandLine 0.8s ease-out 1.2s forwards;
          max-width: 200px;
          margin: 0 auto;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 200px;
            opacity: 1;
          }
        }

        @keyframes fadeOutIntro {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        .intro-container.fade-out {
          animation: fadeOutIntro 0.8s ease-out forwards;
        }

        @media (max-width: 768px) {
          .intro-title {
            font-size: 2rem;
            letter-spacing: 0.1em;
          }

          .intro-line {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};
