"use client";

import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import BatteryMenu from './BatteryMenu';
import SoundMenu from './SoundMenu';
import WifiMenu from './WifiMenu';
import VerityOSMenu from './VerityOSMenu';
import CryptoChartMenu from './CryptoChartMenu';
import BirdeyeMenu from './BirdeyeMenu';

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBatteryMenuOpen, setIsBatteryMenuOpen] = useState<boolean>(false);
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState<boolean>(false);
  const [isWifiMenuOpen, setIsWifiMenuOpen] = useState<boolean>(false);
  const [isVerityOSMenuOpen, setIsVerityOSMenuOpen] = useState<boolean>(false);
  const [activeCryptoChart, setActiveCryptoChart] = useState<string | null>(null);
  const [isBirdeyeMenuOpen, setIsBirdeyeMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleBatteryMenu = () => {
    setIsBatteryMenuOpen(!isBatteryMenuOpen);
    setIsSoundMenuOpen(false);
    setIsWifiMenuOpen(false);
    setIsVerityOSMenuOpen(false);
    setIsBirdeyeMenuOpen(false);
  };

  const toggleSoundMenu = () => {
    setIsSoundMenuOpen(!isSoundMenuOpen);
    setIsBatteryMenuOpen(false);
    setIsWifiMenuOpen(false);
    setIsVerityOSMenuOpen(false);
    setIsBirdeyeMenuOpen(false);
  };

  const toggleWifiMenu = () => {
    setIsWifiMenuOpen(!isWifiMenuOpen);
    setIsBatteryMenuOpen(false);
    setIsSoundMenuOpen(false);
    setIsVerityOSMenuOpen(false);
    setIsBirdeyeMenuOpen(false);
  };

  const toggleVerityOSMenu = () => {
    setIsVerityOSMenuOpen(!isVerityOSMenuOpen);
    setIsBatteryMenuOpen(false);
    setIsSoundMenuOpen(false);
    setIsWifiMenuOpen(false);
    setIsBirdeyeMenuOpen(false);
  };

  const toggleBirdeyeMenu = () => {
    setIsBirdeyeMenuOpen(!isBirdeyeMenuOpen);
    setIsBatteryMenuOpen(false);
    setIsSoundMenuOpen(false);
    setIsWifiMenuOpen(false);
    setIsVerityOSMenuOpen(false);
  };

  const toggleCryptoChart = (cryptoName: string) => {
    setActiveCryptoChart(activeCryptoChart === cryptoName ? null : cryptoName);
    setIsBatteryMenuOpen(false);
    setIsSoundMenuOpen(false);
    setIsWifiMenuOpen(false);
    setIsVerityOSMenuOpen(false);
    setIsBirdeyeMenuOpen(false);
  };

  const menuItems = [
    { name: 'Dexscreener', url: 'https://dexscreener.com' },
    { name: 'Dextools', url: 'https://dextools.io' },
    { name: 'Dune', url: 'https://dune.com' },
    { name: 'Pump', url: 'https://pump.fun' },
  ];

  const handleMenuItemClick = (url: string) => {
    window.open(url, '_blank');
  };

  const cryptoIcons = [
    { name: 'Bitcoin', icon: 'https://cloud.artopia.dev/storage/btc.png' },
    { name: 'Ethereum', icon: 'https://cloud.artopia.dev/storage/eth.png' },
    { name: 'Solana', icon: 'https://cloud.artopia.dev/storage/sol.png' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-6 bg-gray-800/80 backdrop-blur-md text-white flex items-center justify-between px-2 z-50 text-xs">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleVerityOSMenu}
          >
            <img src="https://cloud.artopia.dev/storage/0x-OS.png" alt="Verity" width={14} height={14} />
          </button>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className="hover:bg-white/10 rounded px-1.5 py-0.5 transition-colors duration-200 whitespace-nowrap"
              onClick={() => handleMenuItemClick(item.url)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          {cryptoIcons.map((crypto) => (
            <button
              key={crypto.name}
              className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
              onClick={() => toggleCryptoChart(crypto.name)}
            >
              <img src={crypto.icon} alt={crypto.name} width={14} height={14} />
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleBirdeyeMenu}
          >
            <img src="https://cloud.artopia.dev/storage/birdeye.png" alt="Birdeye" width={14} height={14} />
          </button>
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleWifiMenu}
          >
            <img src="https://cloud.artopia.dev/storage/decrypt-mark.webp" alt="Decrypt" width={14} height={14} />
          </button>
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleBatteryMenu}
          >
            <img src="https://cloud.artopia.dev/storage/lmnft.jpg" alt="Sound" width={14} height={14} />
          </button>
          <button 
            className="hover:bg-white/10 rounded p-1 transition-colors duration-200"
            onClick={toggleSoundMenu}
          >
            <img src="https://cloud.artopia.dev/storage/edge.png" alt="Sound" width={14} height={14} />
          </button>
          <button className="hover:bg-white/10 rounded px-1.5 py-0.5 transition-colors duration-200">
            {currentTime}
          </button>
        </div>
      </div>
      <BatteryMenu isOpen={isBatteryMenuOpen} onClose={() => setIsBatteryMenuOpen(false)} />
      <SoundMenu isOpen={isSoundMenuOpen} onClose={() => setIsSoundMenuOpen(false)} />
      <WifiMenu isOpen={isWifiMenuOpen} onClose={() => setIsWifiMenuOpen(false)} />
      <VerityOSMenu isOpen={isVerityOSMenuOpen} onClose={() => setIsVerityOSMenuOpen(false)} />
      <CryptoChartMenu
        activeCrypto={activeCryptoChart}
        onClose={() => setActiveCryptoChart(null)}
      />
      <BirdeyeMenu isOpen={isBirdeyeMenuOpen} onClose={() => setIsBirdeyeMenuOpen(false)} />
    </>
  );
};

export default TopBar;