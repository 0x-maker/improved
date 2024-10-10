"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Desktop from './Desktop';
import Dock from './Dock';
import TopBar from './TopBar';
import Window from './Window';
import AppDrawer from './AppDrawer';
import { DApp } from '@/types/dapp';
import LandingPage from './LandingPage';
import LoadingAnimation from './LoadingAnimation';
import DAppStore from './DAppStore';
import { AppData, desktopApps } from '@/lib/appData';
import ComingSoonOverlay from './ComingSoonOverlay';

const HomeContent: React.FC = () => {
  const [stage, setStage] = useState<'loading' | 'landing' | 'os'>('loading');
  const [openWindows, setOpenWindows] = useState<AppData[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [installedDApps, setInstalledDApps] = useState<DApp[]>([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleLoadingFinish = useCallback(() => {
    setStage('landing');
  }, []);

  const handleExplore = useCallback(() => {
    setStage('os');
  }, []);

  const handleAppClick = useCallback((app: AppData) => {
    const appData = desktopApps.find(a => a.name === app.name) || app;

    if (appData.name === 'dApp Store') {
      setShowComingSoon(true);
    } else if (!openWindows.some(window => window.name === appData.name)) {
      setOpenWindows((prev) => [...prev, appData]);
      setActiveWindow(appData.name);
    } else {
      setActiveWindow(appData.name);
    }
  }, [openWindows]);

  const handleCloseWindow = useCallback((appName: string) => {
    setOpenWindows((prev) => prev.filter((app) => app.name !== appName));
    if (activeWindow === appName) {
      setActiveWindow(openWindows[openWindows.length - 2]?.name || null);
    }
  }, [activeWindow, openWindows]);

  const handleInstallDApp = useCallback((dapp: DApp) => {
    setInstalledDApps((prev) => [...prev, dapp]);
  }, []);

  const handleMoreClick = useCallback(() => {
    setShowComingSoon(true);
  }, []);

  const handleCloseComingSoon = useCallback(() => {
    setShowComingSoon(false);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-900 text-white">
      <AnimatePresence>
        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingAnimation onFinish={handleLoadingFinish} />
          </motion.div>
        )}
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onExplore={handleExplore} />
          </motion.div>
        )}
        {stage === 'os' && (
          <motion.div
            key="os"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TopBar />
            <Desktop
              onAppClick={handleAppClick}
              onRefresh={() => {}}
              installedDApps={installedDApps}
            >
              {openWindows.map((app) => (
                <Window
                  key={app.name}
                  title={app.name}
                  onClose={() => handleCloseWindow(app.name)}
                  isActive={activeWindow === app.name}
                  onFocus={() => setActiveWindow(app.name)}
                  iframeUrl={app.iframeUrl}
                  iconUrl={app.iconUrl}
                >
                  {app.name === 'dApp Store' && (
                    <DAppStore
                      onInstall={handleInstallDApp}
                      installedDApps={installedDApps}
                    />
                  )}
                </Window>
              ))}
            </Desktop>
            <Dock
              onAppClick={handleAppClick}
              onMoreClick={handleMoreClick}
              installedDApps={installedDApps}
            />
            <AppDrawer
              isOpen={showAppDrawer}
              onClose={() => setShowAppDrawer(false)}
              onAppClick={(appName: string) => handleAppClick({ name: appName } as AppData)}
            />
            <ComingSoonOverlay isOpen={showComingSoon} onClose={handleCloseComingSoon} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeContent;