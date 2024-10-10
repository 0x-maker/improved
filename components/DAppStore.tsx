"use client";

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { categories, DApp, dapps } from '@/lib/dappData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryPage from './CategoryPage';

interface DAppStoreProps {
  onInstall: (dapp: DApp) => void;
  installedDApps: DApp[];
}

const DAppStore: React.FC<DAppStoreProps> = ({ onInstall, installedDApps }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDApps, setFilteredDApps] = useState<DApp[]>(dapps);

  useEffect(() => {
    const filtered = dapps.filter((dapp) => 
      (selectedCategory ? dapp.category === selectedCategory : true) &&
      dapp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDApps(filtered);
  }, [selectedCategory, searchTerm]);

  const handleInstall = (dapp: DApp) => {
    if (!installedDApps.some(installedDApp => installedDApp.id === dapp.id)) {
      onInstall(dapp);
    }
  };

  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 space-y-4">
        <Input
          type="text"
          placeholder="Search dApps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 text-white"
        />
        <nav>
          <ul className="space-y-2">
            <li><Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedCategory(null)}><Star className="mr-2" size={16} />Discover</Button></li>
            {categories.map((category) => (
              <li key={category.id}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        {selectedCategory ? (
          <CategoryPage 
            category={selectedCategory} 
            dapps={filteredDApps.filter(dapp => dapp.category === selectedCategory)}
            onInstall={handleInstall}
            installedDApps={installedDApps}
          />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">dApp Store</h1>

            {/* Featured dApp */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">Featured dApp</h2>
              <div className="flex items-center">
                <img src={dapps[0].icon} alt={dapps[0].name} className="w-16 h-16 mr-4" />
                <div>
                  <h3 className="text-lg font-medium">{dapps[0].name}</h3>
                  <p className="text-gray-400">{dapps[0].description}</p>
                </div>
                <Button
                  onClick={() => handleInstall(dapps[0])}
                  disabled={installedDApps.some(d => d.id === dapps[0].id)}
                  className="ml-auto"
                >
                  {installedDApps.some(d => d.id === dapps[0].id) ? 'Installed' : 'Get'}
                </Button>
              </div>
            </div>

            {/* Categories */}
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <img src={category.icon} alt={category.name} className="w-8 h-8 mb-2" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Top dApps */}
            <h2 className="text-2xl font-bold mb-4">Top dApps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDApps.slice(0, 8).map((dapp) => (
                <div key={dapp.id} className="bg-gray-800 rounded-lg p-4 flex flex-col">
                  <img src={dapp.icon} alt={dapp.name} className="w-16 h-16 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-center mb-2">{dapp.name}</h3>
                  <p className="text-sm text-gray-400 flex-grow">{dapp.description}</p>
                  <Button
                    onClick={() => handleInstall(dapp)}
                    disabled={installedDApps.some(d => d.id === dapp.id)}
                    className="mt-4"
                  >
                    {installedDApps.some(d => d.id === dapp.id) ? 'Installed' : 'Get'}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DAppStore;