import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'vocal', label: 'Vocal' },
    { id: 'rock', label: 'Rock' },
    { id: 'pop', label: 'Pop' },
    { id: 'country', label: 'Country' },
    { id: 'r&b', label: 'R&B' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center mb-8"
    >
      <div className="glass-effect rounded-2xl p-2 inline-flex overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;