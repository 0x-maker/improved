import React from 'react';

interface PortfolioMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioMenu: React.FC<PortfolioMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="w-[80%] h-[80%] bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <img src="https://cloud.artopia.dev/storage/edge.png" alt="Portfolio" width={24} height={24} />
            &nbsp;Portfolio
          </h3>
          <div className="flex-grow overflow-hidden rounded-lg">
            <iframe
              src="https://www.artopia.dev/portfolio?tab=items"
              className="w-full h-full rounded-lg"
              style={{ border: 'none', padding: '4px' }}
              title="Portfolio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMenu;