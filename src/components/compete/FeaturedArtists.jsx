import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Music, Heart, Share2, MapPin, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedArtists = ({ artists, onAction }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Featured Artists</h2>
      <Button
        variant="outline"
        onClick={() => onAction('View all artists')}
        className="border-gray-300"
      >
        View All
      </Button>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {artists.map((artist) => (
        <motion.div
          key={artist.id}
          whileHover={{ scale: 1.02 }}
          className="glass-effect rounded-2xl p-6 ios-shadow card-hover"
        >
          {artist.isWinner && (
            <div className="flex items-center justify-center mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Competition Winner
              </span>
            </div>
          )}
          
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{artist.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{artist.song}</p>
            <div className="flex items-center justify-center space-x-1 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500 text-sm">{artist.venue}</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{artist.rating}</span>
              <span className="text-gray-500 text-sm">({artist.votes} votes)</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Funding Progress</span>
              <span className="text-sm text-gray-600">
                ${artist.fundingRaised.toLocaleString()} / ${artist.fundingGoal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: `${(artist.fundingRaised / artist.fundingGoal) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((artist.fundingRaised / artist.fundingGoal) * 100)}% funded
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction('Play video')}
                className="border-gray-300"
              >
                <Play className="w-4 h-4 mr-1" />
                Video
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction('Play audio')}
                className="border-gray-300"
              >
                <Music className="w-4 h-4 mr-1" />
                Audio
              </Button>
            </div>
            
            <Link to={`/micfight-hero/${artist.id}`}>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                View Hero Page
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction('Support artist')}
                className="border-green-300 text-green-600 hover:bg-green-50"
              >
                <Heart className="w-4 h-4 mr-1" />
                Support
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction('Share artist')}
                className="border-gray-300"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default FeaturedArtists;