
import React from 'react';

interface MascotProps {
  id: string;
  size?: number;
}

const Mascot: React.FC<MascotProps> = ({ id, size = 60 }) => {
  const renderMascot = () => {
    switch (id) {
      case 'bird':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="40" fill="#ce82ff" />
            <path d="M50 15C28 15 10 33 10 55C10 77 28 95 50 95C72 95 90 77 90 55C90 33 72 15 50 15Z" fill="#ce82ff" />
            <path d="M50 35C35 35 25 45 25 60C25 75 35 85 50 85C65 85 75 75 75 60C75 45 65 35 50 35Z" fill="#e8c7ff" />
            <circle cx="35" cy="45" r="8" fill="white" />
            <circle cx="65" cy="45" r="8" fill="white" />
            <circle cx="37" cy="47" r="3" fill="black" />
            <circle cx="67" cy="47" r="3" fill="black" />
            <path d="M45 55L50 62L55 55H45Z" fill="#ff9600" />
            <path d="M10 50C5 50 0 60 5 70" stroke="#ce82ff" strokeWidth="6" strokeLinecap="round" />
            <path d="M90 50C95 50 100 60 95 70" stroke="#ce82ff" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case 'robot':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="50" height="40" rx="8" fill="#94a3b8" />
            <rect x="30" y="35" width="40" height="25" rx="4" fill="#1e293b" />
            <circle cx="40" cy="45" r="4" fill="#38bdf8" />
            <circle cx="60" cy="45" r="4" fill="#38bdf8" />
            <rect x="42" y="70" width="16" height="15" fill="#64748b" />
            <circle cx="50" cy="20" r="5" fill="#ef4444" />
            <line x1="50" y1="25" x2="50" y2="30" stroke="#64748b" strokeWidth="4" />
          </svg>
        );
      case 'cat':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="35" fill="#fbbf24" />
            <path d="M30 35L20 15L45 35H30Z" fill="#fbbf24" />
            <path d="M70 35L80 15L55 35H70Z" fill="#fbbf24" />
            <circle cx="40" cy="50" r="4" fill="#333" />
            <circle cx="60" cy="50" r="4" fill="#333" />
            <circle cx="50" cy="60" r="3" fill="#f87171" />
            <path d="M25 60L10 58" stroke="#333" strokeWidth="1" />
            <path d="M25 65L10 68" stroke="#333" strokeWidth="1" />
            <path d="M75 60L90 58" stroke="#333" strokeWidth="1" />
            <path d="M75 65L90 68" stroke="#333" strokeWidth="1" />
          </svg>
        );
      case 'fox':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="60" r="35" fill="#f97316" />
            <path d="M30 40L15 10L45 40H30Z" fill="#f97316" />
            <path d="M70 40L85 10L55 40H70Z" fill="#f97316" />
            <circle cx="50" cy="70" r="20" fill="white" opacity="0.4" />
            <circle cx="40" cy="55" r="4" fill="#333" />
            <circle cx="60" cy="55" r="4" fill="#333" />
            <path d="M45 65L50 70L55 65" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'panda':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="35" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="25" cy="30" r="12" fill="#334155" />
            <circle cx="75" cy="30" r="12" fill="#334155" />
            <circle cx="40" cy="50" r="8" fill="#334155" />
            <circle cx="60" cy="50" r="8" fill="#334155" />
            <circle cx="40" cy="50" r="2" fill="white" />
            <circle cx="60" cy="50" r="2" fill="white" />
            <path d="M48 65Q50 68 52 65" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'bear':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="35" fill="#92400e" />
            <circle cx="25" cy="30" r="10" fill="#92400e" />
            <circle cx="75" cy="30" r="10" fill="#92400e" />
            <circle cx="40" cy="50" r="4" fill="white" />
            <circle cx="60" cy="50" r="4" fill="white" />
            <circle cx="40" cy="50" r="2" fill="black" />
            <circle cx="60" cy="50" r="2" fill="black" />
            <circle cx="50" cy="65" r="8" fill="#b45309" />
            <path d="M48 65L50 67L52 65" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'dino':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="35" fill="#22c55e" />
            <path d="M25 30L35 20L45 30" fill="#15803d" />
            <path d="M55 30L65 20L75 30" fill="#15803d" />
            <circle cx="40" cy="50" r="5" fill="white" />
            <circle cx="60" cy="50" r="5" fill="white" />
            <circle cx="40" cy="50" r="2" fill="black" />
            <circle cx="60" cy="50" r="2" fill="black" />
            <path d="M40 70C45 75 55 75 60 70" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'girl':
      default:
        // REDESIGNED LEXY: No cockroach feel. Clear human shape.
        return (
          <svg width={size} height={size + 10} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <path d="M30 110C30 95 40 85 50 85C60 85 70 95 70 110" fill="#1cb0f6" stroke="#1899d6" strokeWidth="2" />
            {/* Neck */}
            <rect x="46" y="78" width="8" height="10" fill="#ffdbac" />
            {/* Head */}
            <circle cx="50" cy="50" r="32" fill="#ffdbac" />
            {/* Hair - Stylish Bob / Friendly Shape */}
            <path d="M18 50C18 30 30 15 50 15C70 15 82 30 82 50V65C82 65 75 60 50 60C25 60 18 65 18 65V50Z" fill="#ffc800" stroke="#d9a300" strokeWidth="1" />
            <path d="M22 55Q18 65 18 75" stroke="#ffc800" strokeWidth="6" strokeLinecap="round" />
            <path d="M78 55Q82 65 82 75" stroke="#ffc800" strokeWidth="6" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="42" cy="52" r="3.5" fill="#333" />
            <circle cx="58" cy="52" r="3.5" fill="#333" />
            <circle cx="43" cy="51" r="1" fill="white" />
            <circle cx="59" cy="51" r="1" fill="white" />
            {/* Blush */}
            <circle cx="36" cy="60" r="3" fill="#ffb7b7" opacity="0.6" />
            <circle cx="64" cy="60" r="3" fill="#ffb7b7" opacity="0.6" />
            {/* Smile */}
            <path d="M44 65C46 68 54 68 56 65" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {renderMascot()}
    </div>
  );
};

export default Mascot;
