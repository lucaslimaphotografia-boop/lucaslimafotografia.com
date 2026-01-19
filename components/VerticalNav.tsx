import React from 'react';

interface VerticalNavProps {
  text: string;
  position: 'left' | 'right';
  onClick?: () => void;
  color?: 'black' | 'white';
}

export const VerticalNav: React.FC<VerticalNavProps> = ({ text, position, onClick, color = 'black' }) => {
  const isRight = position === 'right';
  
  // Define styles based on color prop to ensure high contrast/visibility
  const bgColor = color === 'white' ? 'bg-white' : 'bg-black';
  const textColor = color === 'white' ? 'text-black' : 'text-white';
  
  return (
    <div 
      onClick={onClick}
      className={`fixed top-1/2 -translate-y-1/2 z-50 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 duration-300 ${isRight ? 'right-8' : 'left-8'}`}
    >
      <div 
        className={`${bgColor} ${textColor} py-6 px-3 shadow-xl backdrop-blur-sm`}
      >
        <div 
            className="whitespace-nowrap uppercase tracking-widest font-black text-base md:text-lg"
            style={{ 
            writingMode: 'vertical-rl', 
            transform: isRight ? 'rotate(0deg)' : 'rotate(180deg)' 
            }}
        >
            {text}
        </div>
      </div>
    </div>
  );
};