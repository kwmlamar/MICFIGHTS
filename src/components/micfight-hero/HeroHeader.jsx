import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Music, Calendar, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroHeader = ({ artist, onAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="glass-effect rounded-2xl p-8 ios-shadow mb-8"
  >
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold gradient-text mb-2">{artist.name}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 mb-4">
          <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /><span>{artist.location}</span></div>
          <div className="flex items-center space-x-1"><Music className="w-4 h-4" /><span>{artist.genre}</span></div>
          <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>Joined {artist.joinDate}</span></div>
        </div>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-bold text-lg">{artist.stats.rating}</span>
            <span className="text-gray-500">({artist.stats.votes} votes)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="font-bold">{artist.stats.supporters}</span>
            <span className="text-gray-500">supporters</span>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{artist.bio}</p>
      </div>

      <div className="lg:col-span-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Music className="w-24 h-24 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-800 mb-1">Featured Song</h3>
          <p className="text-gray-600">{artist.song}</p>
          <p className="text-sm text-gray-500">Performed at {artist.venue}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default HeroHeader;