import React from 'react';
import { MoreHorizontal, AppWindow } from 'lucide-react';
import { DApp } from '@/types/dapp';
import { AppData } from '@/lib/appData';

interface DockProps {
  onAppClick: (app: AppData) => void;
  onMoreClick: () => void;
  installedDApps: DApp[];
}

const Dock: React.FC<DockProps> = ({ onAppClick, onMoreClick }) => {
  const apps = [
    { name: 'Jupiter', icon: <img src="https://cloud.artopia.dev/storage/jup.png" alt="Jupiter" width={28} height={28} /> },
    { name: 'Artopia', icon: <img src="https://cloud.artopia.dev/storage/edge.png" alt="Artopia" width={28} height={28} /> },
    { name: 'dApp Store', icon: <AppWindow size={28} /> },
  ];

  return (
    <div className="dock fixed bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-1 px-2 py-1 rounded-full bg-gray-800/80 backdrop-blur-md overflow-x-auto max-w-full">
      {apps.map((app) => (
        <button
          key={app.name}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
          onClick={() => onAppClick({ name: app.name, iconUrl: '', iframeUrl: app.name === 'Artopia' ? 'https://artopia.dev' : app.name === 'Jupiter' ? 'https://jup.ag' : '' })}
        >
          <div className="text-white">
            {app.icon}
          </div>
        </button>
      ))}
      <button
        className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
        onClick={onMoreClick}
      >
        <div className="text-white">
          <MoreHorizontal size={28} />
        </div>
      </button>
    </div>
  );
};

export default Dock;