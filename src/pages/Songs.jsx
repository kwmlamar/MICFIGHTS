import React, { useState, useEffect, useRef } from 'react';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  
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

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      console.log('Audio ended');
      setIsPlaying(false);
      handleNext();
    };
    const handlePlay = () => {
      console.log('Audio play event fired');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('Audio pause event fired');
      setIsPlaying(false);
    };
    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      toast({
        title: "Playback Error",
        description: "Unable to play this song. Please try another track.",
        variant: "destructive",
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [toast]);

  // Update audio source when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    console.log('Loading audio source:', currentSong.source_url);
    
    audio.src = currentSong.source_url;
    audio.load();
    
    // Add event listeners for debugging
    const handleCanPlay = () => {
      console.log('Audio can play, duration:', audio.duration);
    };
    
    const handleLoadStart = () => {
      console.log('Audio load started');
    };
    
    const handleLoadEnd = () => {
      console.log('Audio load ended');
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadend', handleLoadEnd);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadend', handleLoadEnd);
    };
  }, [currentSong, toast]);

  // Volume control
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = (song = null) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (song && song.id !== currentSong?.id) {
      console.log('Setting new song:', song.title, 'URL:', song.source_url);
      setCurrentSong(song);
      // Don't auto-play, wait for user to click play
      setIsPlaying(false);
      toast({
        title: "Song Loaded",
        description: `${song.title} by ${song.artist} - Click play to start`,
      });
    } else if (currentSong) {
      console.log('Current audio state:', {
        paused: audio.paused,
        readyState: audio.readyState,
        src: audio.src,
        duration: audio.duration,
        currentTime: audio.currentTime
      });
      
      if (isPlaying) {
        console.log('Pausing audio');
        audio.pause();
        setIsPlaying(false);
      } else {
        console.log('Attempting to play audio');
        // Check if audio is ready to play
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Audio started playing successfully');
                setIsPlaying(true);
              })
              .catch(error => {
                console.error('Playback failed:', error);
                setIsPlaying(false);
                if (error.name === 'NotAllowedError') {
                  toast({
                    title: "Autoplay Blocked",
                    description: "Please click play again to start playback.",
                    variant: "destructive",
                  });
                } else {
                  toast({
                    title: "Playback Error",
                    description: `Unable to play "${currentSong.title}". Error: ${error.message}`,
                    variant: "destructive",
                  });
                }
              });
          }
        } else {
          console.log('Audio not ready, readyState:', audio.readyState);
          toast({
            title: "Loading...",
            description: "Audio is still loading, please wait a moment.",
          });
        }
      }
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

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');
    if (error) {
      toast({
        title: "Error fetching songs",
        description: error.message,
        variant: "destructive",
      });
    } else {
      console.log('Fetched songs:', data);
      // Log the first song's details to debug
      if (data && data.length > 0) {
        console.log('First song details:', {
          title: data[0].title,
          artist: data[0].artist,
          source_url: data[0].source_url,
          supabase_storage_path: data[0].supabase_storage_path
        });
      }
      setSongs(data);
    }
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

      {/* Hidden audio element for actual playback */}
      <audio ref={audioRef} preload="metadata" />

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
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              volume={volume}
              onVolumeChange={handleVolumeChange}
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