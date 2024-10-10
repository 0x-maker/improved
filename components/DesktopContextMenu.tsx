import React, { useState } from 'react';
import { Image as ImageIcon, ChevronRight, Wheat } from 'lucide-react';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onRefresh: () => void;
  onClose: () => void;
  onAbout: () => void;
  onNextWallpaper: () => void;
  onViewPortfolio: () => void;
  onFarming: () => void;
}

const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({ 
  x, 
  y, 
  onClose, 
  onNextWallpaper,
  onViewPortfolio,
  onFarming
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const menuItems = [
    { icon: <ImageIcon size={14} />, label: 'Next Wallpaper', action: onNextWallpaper },
    { 
      icon: <ChevronRight size={14} />, 
      label: 'View', 
      submenu: [
        { icon: <ImageIcon size={14} />, label: 'JPEGs', action: onViewPortfolio },
      ]
    },
    { icon: <Wheat size={14} />, label: 'Farming', action: onFarming },
  ];

  return (
    <div
      className="absolute bg-gray-800 shadow-lg rounded-md py-1 z-50 w-48 text-white text-sm"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) => (
        <div 
          key={index} 
          className="relative"
          onMouseEnter={() => setActiveSubmenu(item.label)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <button
            className="w-full text-left px-3 py-1.5 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
            onClick={() => {
              if (item.action) {
                item.action();
                onClose();
              }
            }}
          >
            <span className="flex items-center">
              <span className="mr-2 text-gray-400">{item.icon}</span>
              {item.label}
            </span>
            {item.submenu && <ChevronRight size={14} />}
          </button>
          {item.submenu && activeSubmenu === item.label && (
            <div className="absolute left-full top-0 bg-gray-800 shadow-lg rounded-md py-1 w-48 ml-2">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  className="w-full text-left px-3 py-1.5 hover:bg-gray-700 transition-colors duration-200 flex items-center"
                  onClick={() => {
                    subItem.action();
                    onClose();
                  }}
                >
                  <span className="mr-2 text-gray-400">{subItem.icon}</span>
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopContextMenu;