import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import MassUpload from '@/components/admin/MassUpload';
import { supabase } from '@/lib/supabaseClient';

const SongManagement = () => {
  const [songs, setSongs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({
        title: "Error fetching songs",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSongs(data);
    }
  };

  const handleFeature = (feature) => {
    toast({
      title: feature,
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const toggleSongFeature = async (songId, feature, currentValue) => {
    const { error } = await supabase
      .from('songs')
      .update({ [feature]: !currentValue })
      .eq('id', songId);

    if (error) {
      toast({
        title: "Error updating song",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Song Updated!",
        description: "The song feature has been toggled.",
      });
      fetchSongs();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <MassUpload onUploadSuccess={fetchSongs} />

      <div className="glass-effect rounded-2xl p-6 ios-shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Song Library Management</h3>
        <div className="space-y-4">
          {songs.length > 0 ? songs.map((song) => (
            <div key={song.id} className="bg-white/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{song.title}</h4>
                  <p className="text-gray-600 text-sm">{song.artist}</p>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Karaoke:</span>
                    <button
                      onClick={() => toggleSongFeature(song.id, 'is_karaoke_track', song.is_karaoke_track)}
                      className={`p-1 rounded-full transition-colors ${
                        song.is_karaoke_track ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {song.is_karaoke_track ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Micfight:</span>
                    <button
                      onClick={() => toggleSongFeature(song.id, 'is_competition_master', song.is_competition_master)}
                      className={`p-1 rounded-full transition-colors ${
                        song.is_competition_master ? 'text-yellow-600' : 'text-gray-400'
                      }`}
                    >
                      {song.is_competition_master ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFeature('Edit song metadata')}
                    className="border-gray-300"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500">No songs found in the database. Try uploading some!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SongManagement;