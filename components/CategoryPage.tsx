import React from 'react';
import { DApp } from '@/lib/dappData';
import { Button } from "@/components/ui/button";

interface CategoryPageProps {
  category: string;
  dapps: DApp[];
  onInstall: (dapp: DApp) => void;
  installedDApps: DApp[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, dapps, onInstall, installedDApps }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{category}</h1>

      {/* Featured dApp for this category */}
      {dapps.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Featured {category} dApp</h2>
          <div className="flex items-center">
            <img src={dapps[0].icon} alt={dapps[0].name} className="w-16 h-16 mr-4" />
            <div>
              <h3 className="text-lg font-medium">{dapps[0].name}</h3>
              <p className="text-gray-400">{dapps[0].description}</p>
            </div>
            <Button
              onClick={() => onInstall(dapps[0])}
              disabled={installedDApps.some(d => d.id === dapps[0].id)}
              className="ml-auto"
            >
              {installedDApps.some(d => d.id === dapps[0].id) ? 'Installed' : 'Get'}
            </Button>
          </div>
        </div>
      )}

      {/* List of dApps in this category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dapps.map((dapp) => (
          <div key={dapp.id} className="bg-gray-800 rounded-lg p-4 flex flex-col">
            <img src={dapp.icon} alt={dapp.name} className="w-16 h-16 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-center mb-2">{dapp.name}</h3>
            <p className="text-sm text-gray-400 flex-grow">{dapp.description}</p>
            <Button
              onClick={() => onInstall(dapp)}
              disabled={installedDApps.some(d => d.id === dapp.id)}
              className="mt-4"
            >
              {installedDApps.some(d => d.id === dapp.id) ? 'Installed' : 'Get'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;