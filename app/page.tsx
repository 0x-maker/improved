"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

const HomeContent = dynamic(() => import('@/components/HomeContent'), {
  ssr: false,
});

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}