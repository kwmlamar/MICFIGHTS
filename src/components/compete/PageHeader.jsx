import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = () => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl font-bold gradient-text mb-4">Micfight Competition</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Discover amazing artists, support their dreams, and witness the next generation of music stars
      </p>
    </motion.div>
  </div>
);

export default PageHeader;