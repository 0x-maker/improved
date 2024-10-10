"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface WindowProps {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  isActive: boolean;
  onFocus: () => void;
  iframeUrl?: string;
  iconUrl: string;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, isActive, onFocus, iframeUrl, iconUrl }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [prevState, setPrevState] = useState({ position: { x: 100, y: 100 }, size: { width: 800, height: 600 } });
  const [showSplash, setShowSplash] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeUrl) {
      const timer = setTimeout(() => setShowSplash(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [iframeUrl]);

  const toggleMaximize = useCallback(() => {
    if (!isMaximized) {
      setPrevState({ position: { ...position }, size: { ...size } });
      setPosition({ x: 0, y: 24 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 24 });
    } else {
      setPosition(prevState.position);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  }, [isMaximized, position, size, prevState]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleDrag = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, e.clientX - startX),
        y: Math.max(24, e.clientY - startY),
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, [isMaximized, position.x, position.y]);

  const handleResizeStart = useCallback((direction: string) => (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPositionX = position.x;
    const startPositionY = position.y;

    const handleResize = (e: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPositionX;
      let newY = startPositionY;

      if (direction.includes('e')) newWidth = startWidth + (e.clientX - startX);
      if (direction.includes('s')) newHeight = startHeight + (e.clientY - startY);
      if (direction.includes('w')) {
        newWidth = startWidth - (e.clientX - startX);
        newX = startPositionX + (e.clientX - startX);
      }
      if (direction.includes('n')) {
        newHeight = startHeight - (e.clientY - startY);
        newY = startPositionY + (e.clientY - startY);
      }

      setSize({
        width: Math.max(300, Math.min(newWidth, window.innerWidth - newX)),
        height: Math.max(200, Math.min(newHeight, window.innerHeight - newY)),
      });
      setPosition({
        x: Math.max(0, newX),
        y: Math.max(24, newY),
      });
    };

    const handleResizeEnd = () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [isMaximized, size.width, size.height, position.x, position.y]);

  const handleRefresh = useCallback(() => {
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  return (
    <motion.div
      ref={windowRef}
      className={`window absolute rounded-lg overflow-hidden ${
        isActive ? 'z-10' : 'z-0'
      } bg-gray-100 shadow-lg`}
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onFocus}
    >
      <div className="relative w-full h-full">
        {iframeUrl ? (
          <>
            <iframe 
              ref={iframeRef}
              src={iframeUrl} 
              className="w-full h-full border-none" 
              title={title} 
              style={{ display: showSplash ? 'none' : 'block' }}
            />
            {showSplash && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <img 
                  src={iconUrl} 
                  alt={`${title} Icon`} 
                  width={100} 
                  height={100}
                  className="object-contain"
                />
              </div>
            )}
          </>
        ) : (
          children
        )}
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-transparent cursor-move"
          onMouseDown={handleDragStart}
        >
          <button
            className="w-5 h-5 rounded-full bg-gray-300 bg-opacity-50 hover:bg-opacity-75 transition-colors flex items-center justify-center"
            onClick={handleRefresh}
          >
            <RefreshCw size={12} className="text-gray-700" />
          </button>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-gray-700 drop-shadow-md">
            {title}
          </div>
          <div className="flex space-x-2">
            <button
              className="w-5 h-5 rounded-full bg-gray-300 bg-opacity-50 hover:bg-opacity-75 transition-colors flex items-center justify-center"
              onClick={toggleMaximize}
            >
              <Maximize2 size={12} className="text-gray-700" />
            </button>
            <button
              className="w-5 h-5 rounded-full bg-gray-300 bg-opacity-50 hover:bg-opacity-75 transition-colors flex items-center justify-center"
              onClick={onClose}
            >
              <X size={12} className="text-gray-700" />
            </button>
          </div>
        </div>
        {/* Resize handles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('nw')} />
          <div className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('ne')} />
          <div className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('sw')} />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('se')} />
          <div className="absolute top-0 left-4 right-4 h-4 cursor-ns-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('n')} />
          <div className="absolute bottom-0 left-4 right-4 h-4 cursor-ns-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('s')} />
          <div className="absolute left-0 top-4 bottom-4 w-4 cursor-ew-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('w')} />
          <div className="absolute right-0 top-4 bottom-4 w-4 cursor-ew-resize bg-transparent hover:bg-blue-500 hover:bg-opacity-25 pointer-events-auto" onMouseDown={handleResizeStart('e')} />
        </div>
      </div>
    </motion.div>
  );
};

export default Window;