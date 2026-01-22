import React, { useEffect, useRef } from 'react';

interface IntroProps {
  onFinish: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const bgEffectRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Criar partículas no fundo
    if (bgEffectRef.current) {
      const particleCount = 40;
      const particles: HTMLDivElement[] = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        bgEffectRef.current.appendChild(particle);
        particles.push(particle);
      }

      // Cleanup
      return () => {
        particles.forEach(particle => particle.remove());
      };
    }
  }, []);

  useEffect(() => {
    // Fade out e finalizar após 4 segundos
    const fadeOutTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('fade-out');
      }
    }, 3500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div ref={containerRef} className="intro-container fixed inset-0 z-[100] bg-black">
      {/* Efeito de fundo com partículas */}
      <div ref={bgEffectRef} className="background-effect absolute inset-0 w-full h-full overflow-hidden opacity-0 animate-fadeInBg"></div>

      {/* Logo */}
      <div className="logo-wrapper relative flex flex-col items-center z-10">
        <div className="logo-image relative" style={{ width: 'clamp(400px, 60vw, 900px)' }}>
          <img 
            className="logo-main-img block w-full h-auto opacity-0"
            src="https://res.cloudinary.com/di6xabxne/image/upload/v1769109817/LOGO_BRANCO_PNG_qsi22a.png" 
            alt="LUCASLIMA STUDIO"
            style={{
              transform: 'scale(0.95) translateY(15px)',
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))',
              clipPath: 'inset(0 0 35% 0)',
              animation: 'logoEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards, revealFullLogo 1s ease-out 1.5s forwards'
            }}
          />
        </div>
        
        <div className="decorative-line mt-8 transform scale-x-0 w-[200px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-expandLine"></div>
      </div>

      <style>{`
        @keyframes fadeInBg {
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(15px);
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0)) blur(6px);
          }
          60% {
            transform: scale(1.02) translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.2)) blur(0);
          }
        }

        @keyframes revealFullLogo {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes expandLine {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }

        @keyframes fadeOutIntro {
          to { opacity: 0; }
        }

        .intro-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .background-effect {
          animation: fadeInBg 1s ease-out 0.5s forwards;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
        }

        .logo-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 80%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 1.8s ease-in-out 1.8s;
          pointer-events: none;
        }

        .intro-container.fade-out {
          animation: fadeOutIntro 1s ease-out forwards;
        }

        .animate-fadeInBg {
          animation: fadeInBg 1s ease-out 0.5s forwards;
        }

        .animate-expandLine {
          animation: expandLine 1s ease-out 2.2s forwards;
        }

        @media (max-width: 768px) {
          .logo-image {
            width: clamp(320px, 85vw, 600px) !important;
          }
        }

        @media (max-width: 480px) {
          .logo-image {
            width: 92vw !important;
          }
          
          .decorative-line {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};
