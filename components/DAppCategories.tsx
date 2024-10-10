import React from 'react';
import { Category } from '@/types/dapp';

interface DAppCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const DAppCategories: React.FC<DAppCategoriesProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id} // Add this line to provide a unique key
            className={`bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-gray-700 transition-colors ${
              selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <img src={category.icon} alt={category.name} className="w-12 h-12 mb-2" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DAppCategories;