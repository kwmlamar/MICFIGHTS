
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Music,
  Star,
  Search,
  Filter,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const Karaoke = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const { toast } = useToast();

  const karaokeGenres = ['all', 'pop', 'rock', 'country', 'r&b', 'hip-hop', 'classic'];
  const difficultyLevels = ['all', 'easy', 'medium', 'hard', 'expert'];

  const karaokeTracks = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      genre: "rock",
      difficulty: "expert",
      duration: "5:55",
      rating: 4.8,
      isMicfightEligible: true,
      hasBackingVocals: true
    },
    {
      id: 2,
      title: "Sweet Caroline",
      artist: "Neil Diamond",
      genre: "classic",
      difficulty: "easy",
      duration: "3:21",
      rating: 4.9,
      isMicfightEligible: false,
      hasBackingVocals: true
    },
    {
      id: 3,
      title: "Don't Stop Believin'",
      artist: "Journey",
      genre: "rock",
      difficulty: "medium",
      duration: "4:11",
      rating: 4.7,
      isMicfightEligible: true,
      hasBackingVocals: false
    },
    {
      id: 4,
      title: "I Will Always Love You",
      artist: "Whitney Houston",
      genre: "r&b",
      difficulty: "hard",
      duration: "4:31",
      rating: 4.6,
      isMicfightEligible: true,
      hasBackingVocals: false
    }
  ];

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    toast({
      title: "Karaoke Mode",
      description: `🚧 Karaoke playback for "${track.title}" isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!currentTrack) {
      playTrack(karaokeTracks[0]);
    }
  };

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold gradient-text mb-4">Karaoke Studio</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sing your heart out with professional karaoke tracks and dynamic player controls
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Karaoke Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 ios-shadow mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Karaoke Player</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showHelp('karaoke player')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {/* Current Track Display */}
              {currentTrack ? (
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentTrack.title}</h3>
                  <p className="text-gray-600 mb-2">{currentTrack.artist}</p>
                  <div className="flex items-center justify-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentTrack.difficulty)}`}>
                      {currentTrack.difficulty.charAt(0).toUpperCase() + currentTrack.difficulty.slice(1)}
                    </span>
                    {currentTrack.isMicfightEligible && (
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                        Micfight Eligible
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Music className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Select a track to start singing</p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[0]}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0:00</span>
                  <span>{currentTrack?.duration || '0:00'}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white w-16 h-16 rounded-full"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-4 mb-6">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <Slider
                  value={[75]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500 w-8">75</span>
              </div>

              {/* Karaoke Controls */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => toast({
                    title: "Vocal Guide",
                    description: "🚧 Vocal guide toggle isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                    duration: 3000,
                  })}
                  className="border-gray-300"
                >
                  Toggle Vocal Guide
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast({
                    title: "Key Change",
                    description: "🚧 Key change isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                    duration: 3000,
                  })}
                  className="border-gray-300"
                >
                  Change Key
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Track Library */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-6 ios-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Track Library</h3>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tracks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {karaokeGenres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Track List */}
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                {karaokeTracks.map((track) => (
                  <motion.div
                    key={track.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentTrack?.id === track.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-white/50 hover:bg-white/70 text-gray-800'
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{track.title}</h4>
                        <p className={`text-sm truncate ${currentTrack?.id === track.id ? 'text-white/80' : 'text-gray-600'}`}>
                          {track.artist}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className={`text-xs ${currentTrack?.id === track.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {track.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentTrack?.id === track.id 
                          ? 'bg-white/20 text-white' 
                          : getDifficultyColor(track.difficulty)
                      }`}>
                        {track.difficulty}
                      </span>
                      <span className={`text-xs ${currentTrack?.id === track.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {track.duration}
                      </span>
                    </div>

                    {track.isMicfightEligible && (
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          currentTrack?.id === track.id 
                            ? 'bg-yellow-400 text-yellow-900' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          Micfight Eligible
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Professional Tracks",
              description: "High-quality karaoke tracks with adjustable vocal guides",
              icon: Music,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Difficulty Levels",
              description: "Tracks rated from easy to expert for all skill levels",
              icon: Star,
              color: "from-purple-500 to-pink-500"
            },
            {
              title: "Competition Ready",
              description: "Practice with Micfight eligible tracks for competitions",
              icon: Mic,
              color: "from-green-500 to-emerald-500"
            }
          ].map((feature, index) => (
            <div key={index} className="glass-effect rounded-2xl p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Karaoke;
