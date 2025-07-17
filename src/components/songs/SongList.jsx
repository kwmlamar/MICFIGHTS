import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SongList = ({ songs, viewMode, onPlayPause, onToggleFavorite, favoriteSongs, currentSong, isPlaying }) => {
  if (songs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-16">
        <p>No songs found in the library.</p>
        <p>Go to the Admin Portal to upload some music!</p>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        : "space-y-4 mb-8"
      }
    >
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 ${
            viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
          }`}
        >
          {viewMode === 'grid' ? (
            <>
              <div className="relative mb-4">
                <img
                  src={song.cover_image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'}
                  alt={song.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    onClick={() => onPlayPause(song)}
                    className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                    size="lg"
                  >
                    {isPlaying && currentSong?.id === song.id ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                </div>
                {song.is_competition_master && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
                    Competition
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{song.title}</h3>
              <p className="text-gray-300 mb-2">{song.artist}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{song.duration}</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onToggleFavorite(song.id)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Heart className={`w-4 h-4 ${favoriteSongs.includes(song.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  {song.is_karaoke_track && (
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Mic className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={song.cover_image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'}
                alt={song.title}
                className="w-16 h-16 object-cover rounded-xl mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{song.title}</h3>
                <p className="text-gray-300">{song.artist} • {song.album}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{song.duration}</span>
                <Button
                  onClick={() => onToggleFavorite(song.id)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Heart className={`w-4 h-4 ${favoriteSongs.includes(song.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                {song.is_karaoke_track && (
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Mic className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  onClick={() => onPlayPause(song)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying && currentSong?.id === song.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SongList;