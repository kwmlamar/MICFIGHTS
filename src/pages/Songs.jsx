import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import SongsSidebar from '@/components/songs/SongsSidebar';
import SongList from '@/components/songs/SongList';
import DynamicPlayer from '@/components/songs/DynamicPlayer';
import CreateLibraryModal from '@/components/songs/CreateLibraryModal';
import CreatePlaylistModal from '@/components/songs/CreatePlaylistModal';

const Songs = () => {
  const { toast } = useToast();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [libraries, setLibraries] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const [selectedLibrary, setSelectedLibrary] = useState('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const [showCreateLibrary, setShowCreateLibrary] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  useEffect(() => {
    fetchSongs();
    const savedLibraries = localStorage.getItem('musicLibraries');
    const savedPlaylists = localStorage.getItem('musicPlaylists');
    const savedFavorites = localStorage.getItem('favoriteSongs');
    
    if (savedLibraries) setLibraries(JSON.parse(savedLibraries));
    if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
    if (savedFavorites) setFavoriteSongs(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('musicLibraries', JSON.stringify(libraries));
  }, [libraries]);

  useEffect(() => {
    localStorage.setItem('musicPlaylists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
  }, [favoriteSongs]);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');
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

  const handlePlayPause = (song = null) => {
    if (song && song.id !== currentSong?.id) {
      setCurrentSong(song);
      setIsPlaying(true);
      toast({
        title: "Now Playing",
        description: `${song.title} by ${song.artist}`,
      });
    } else if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const toggleFavorite = (songId) => {
    const isFavorite = favoriteSongs.includes(songId);
    if (isFavorite) {
      setFavoriteSongs(favoriteSongs.filter(id => id !== songId));
      toast({ title: "Removed from Favorites" });
    } else {
      setFavoriteSongs([...favoriteSongs, songId]);
      toast({ title: "Added to Favorites" });
    }
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (song.album && song.album.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <Helmet>
        <title>Songs - Music Streaming Platform</title>
        <meta name="description" content="Stream your favorite songs with our dynamic music player" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Your Music</h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SongsSidebar
            libraries={libraries}
            playlists={playlists}
            selectedLibrary={selectedLibrary}
            setSelectedLibrary={setSelectedLibrary}
            selectedPlaylist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
            onShowCreateLibrary={() => setShowCreateLibrary(true)}
            onShowCreatePlaylist={() => setShowCreatePlaylist(true)}
          />
          <div className="lg:col-span-3">
            <SongList
              songs={filteredSongs}
              viewMode={viewMode}
              onPlayPause={handlePlayPause}
              onToggleFavorite={toggleFavorite}
              favoriteSongs={favoriteSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
            />
          </div>
        </div>

        <AnimatePresence>
          {currentSong && (
            <DynamicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onPlayPause={() => handlePlayPause()}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCreateLibrary && (
            <CreateLibraryModal
              onClose={() => setShowCreateLibrary(false)}
              onLibraryCreated={(newLibrary) => setLibraries([...libraries, newLibrary])}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCreatePlaylist && (
            <CreatePlaylistModal
              onClose={() => setShowCreatePlaylist(false)}
              onPlaylistCreated={(newPlaylist) => setPlaylists([...playlists, newPlaylist])}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Songs;