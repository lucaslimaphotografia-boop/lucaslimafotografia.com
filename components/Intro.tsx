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

  const LOGO_URL = 'https://res.cloudinary.com/di6xabxne/image/upload/v1769109817/LOGO_BRANCO_PNG_qsi22a.png';

  return (
    <div ref={containerRef} className="intro-container fixed inset-0 z-[100] bg-black">
      <div className="intro-content flex flex-col items-center justify-center h-full">
        <div ref={textRef} className="intro-text text-center">
          <img
            src={LOGO_URL}
            alt="LUCASLIMA STUDIO"
            className="intro-logo block w-full max-w-[min(85vw,560px)] h-auto opacity-0"
          />
          <div className="intro-line w-0 h-px bg-white/60 opacity-0 mt-8"></div>
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

        .intro-logo {
          animation: fadeInUp 1s ease-out 0.3s forwards;
        }

        .intro-line {
          animation: expandLine 0.8s ease-out 1.2s forwards;
          max-width: 200px;
          margin-left: auto;
          margin-right: auto;
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
          .intro-logo {
            max-width: 80vw;
          }

          .intro-line {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};
