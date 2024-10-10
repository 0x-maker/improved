"use client";

import React, { useState } from 'react';

interface DesktopIconProps {
  name: string;
  iconUrl: string;
  onClick: () => void;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, iconUrl, onClick, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150); // Reset after animation
    onClick();
    onSelect(!isSelected);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-16 h-20 ${
        isSelected ? 'bg-white/20' : ''
      } ${isHovered ? 'bg-white/10' : ''} rounded-md transition-all duration-200 ${
        isClicked ? 'scale-95' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="bg-gray-800 rounded-xl p-1 mb-1 w-12 h-12 flex items-center justify-center">
        <img
          src={iconUrl}
          alt={name}
          width={36}
          height={36}
          className="rounded-md"
        />
      </div>
      <span className="text-[10px] text-white text-center truncate w-full px-1">{name}</span>
    </div>
  );
};

export default DesktopIcon;