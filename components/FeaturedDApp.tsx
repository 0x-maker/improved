import React from 'react';
import { DApp } from '@/types/dapp';

interface FeaturedDAppProps {
  dapp: DApp;
}

const FeaturedDApp: React.FC<FeaturedDAppProps> = ({ dapp }) => {
  if (!dapp) {
    return null; // Return null if no dapp is provided
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="text-sm uppercase tracking-wide">Featured dApp</div>
      <h2 className="text-3xl font-bold mt-2 mb-4">{dapp.name}</h2>
      <p className="text-gray-300 mb-4">{dapp.description}</p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
        Learn More
      </button>
    </div>
  );
};

export default FeaturedDApp;