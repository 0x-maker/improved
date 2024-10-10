"use client";

import React from 'react';
import DAppStore from '../../components/DAppStore';
import { DApp } from '@/lib/dappData';

export default function DAppStorePage() {
  const [installedDApps, setInstalledDApps] = React.useState<DApp[]>([]);

  const handleInstall = (dapp: DApp) => {
    setInstalledDApps((prev) => [...prev, dapp]);
  };

  return (
    <DAppStore 
      onInstall={(dapp: DApp) => handleInstall(dapp)}
      installedDApps={installedDApps}
    />
  );
}