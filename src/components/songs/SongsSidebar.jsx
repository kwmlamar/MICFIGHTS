import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SongsSidebar = ({
  libraries,
  playlists,
  selectedLibrary,
  setSelectedLibrary,
  selectedPlaylist,
  setSelectedPlaylist,
  onShowCreateLibrary,
  onShowCreatePlaylist,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Libraries</h3>
        <div className="space-y-2 mb-4">
          <button
            onClick={() => setSelectedLibrary('all')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedLibrary === 'all' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            All Songs
          </button>
          <button
            onClick={() => setSelectedLibrary('favorites')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedLibrary === 'favorites' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Favorites
          </button>
          {libraries.map(library => (
            <button
              key={library.id}
              onClick={() => setSelectedLibrary(library.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedLibrary === library.id ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {library.name}
            </button>
          ))}
        </div>
        <Button
          onClick={onShowCreateLibrary}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Library
        </Button>

        <h3 className="text-xl font-semibold text-white mb-4 mt-8">Playlists</h3>
        <div className="space-y-2 mb-4">
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedPlaylist === playlist.id ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {playlist.name}
            </button>
          ))}
        </div>
        <Button
          onClick={onShowCreatePlaylist}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>
    </motion.div>
  );
};

export default SongsSidebar;