import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const AchievementsCard = ({ achievements }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="glass-effect rounded-2xl p-6 ios-shadow"
  >
    <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
    <div className="space-y-3">
      {achievements.map((achievement, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-700">{achievement}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default AchievementsCard;