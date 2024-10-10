import React from 'react';

interface ComingSoonOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="text-white text-6xl font-bold">
        COMING SOON
      </div>
    </div>
  );
};

export default ComingSoonOverlay;