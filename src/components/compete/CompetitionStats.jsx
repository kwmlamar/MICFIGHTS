import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Crown, Heart } from 'lucide-react';

const stats = [
  { label: 'Active Competitions', value: '3', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
  { label: 'Total Artists', value: '479', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { label: 'Prize Pool', value: '$22.5K', icon: Crown, color: 'from-purple-500 to-pink-500' },
  { label: 'Funds Raised', value: '$127K', icon: Heart, color: 'from-green-500 to-emerald-500' }
];

const CompetitionStats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
  >
    {stats.map((stat, index) => {
      const Icon = stat.icon;
      return (
        <div key={index} className="glass-effect rounded-2xl p-6 ios-shadow text-center">
          <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      );
    })}
  </motion.div>
);

export default CompetitionStats;