import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const DynamicPlayer = ({ 
  song, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  currentTime = 0,
  duration = 0,
  onSeek,
  volume = 1,
  onVolumeChange
}) => {
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [isKaraokeMode, setIsKaraokeMode] = useState(false);
  const [playerSize, setPlayerSize] = useState('medium');
  const [playerShape, setPlayerShape] = useState('rounded');

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    toast({ title: isShuffled ? "Shuffle Off" : "Shuffle On" });
  };

  const handleRepeat = () => {
    const modes = ['off', 'one', 'all'];
    const nextMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
    setRepeatMode(nextMode);
    toast({ title: `Repeat: ${nextMode}` });
  };

  const toggleKaraokeMode = () => {
    if (!song.is_karaoke_track) {
      toast({ title: "Karaoke Not Available", variant: "destructive" });
      return;
    }
    setIsKaraokeMode(!isKaraokeMode);
    toast({ title: isKaraokeMode ? "Music Mode" : "Karaoke Mode" });
  };

  const handleVolumeSliderChange = (value) => {
    const newVolume = value[0] / 100;
    onVolumeChange(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(volume);
      setIsMuted(false);
    } else {
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (value) => {
    const newTime = (value[0] / 100) * duration;
    onSeek(newTime);
  };

  const getPlayerSizeClass = () => {
    switch (playerSize) {
      case 'small': return 'w-80 h-20';
      case 'large': return 'w-full h-32';
      default: return 'w-96 h-24';
    }
  };

  const getPlayerShapeClass = () => {
    switch (playerShape) {
      case 'square': return 'rounded-none';
      case 'circle': return 'rounded-full';
      default: return 'rounded-2xl';
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = isMuted ? 0 : volume * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className={`${getPlayerSizeClass()} ${getPlayerShapeClass()} bg-white/10 backdrop-blur-md border border-white/20 p-4 flex items-center gap-4`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={song.cover_image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'}
            alt={song.title}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold truncate">{song.title}</h4>
            <p className="text-gray-300 text-sm truncate">{song.artist}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleShuffle} variant="ghost" size="sm" className={`text-white hover:bg-white/20 ${isShuffled ? 'text-purple-400' : ''}`}><Shuffle className="w-4 h-4" /></Button>
          <Button onClick={onPrevious} variant="ghost" size="sm" className="text-white hover:bg-white/20"><SkipBack className="w-4 h-4" /></Button>
          <Button onClick={onPlayPause} className="bg-purple-500 hover:bg-purple-600 text-white" size="sm">{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
          <Button onClick={onNext} variant="ghost" size="sm" className="text-white hover:bg-white/20"><SkipForward className="w-4 h-4" /></Button>
          <Button onClick={handleRepeat} variant="ghost" size="sm" className={`text-white hover:bg-white/20 ${repeatMode !== 'off' ? 'text-purple-400' : ''}`}><Repeat className="w-4 h-4" /></Button>
          {song.is_karaoke_track && <Button onClick={toggleKaraokeMode} variant="ghost" size="sm" className={`text-white hover:bg-white/20 ${isKaraokeMode ? 'text-green-400' : ''}`}><Mic className="w-4 h-4" /></Button>}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={toggleMute} variant="ghost" size="sm" className="text-white hover:bg-white/20">{isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</Button>
          <div className="w-20">
            <Slider 
              value={[volumePercentage]} 
              onValueChange={handleVolumeSliderChange} 
              max={100} 
              step={1} 
              className="w-full" 
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 w-full">
        <Slider 
          value={[progressPercentage]} 
          onValueChange={handleProgressChange} 
          max={100} 
          step={0.1} 
          className="w-full" 
        />
      </div>

      <div className="mt-2 flex gap-2 justify-center">
        <select value={playerSize} onChange={(e) => setPlayerSize(e.target.value)} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 text-white text-xs">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <select value={playerShape} onChange={(e) => setPlayerShape(e.target.value)} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 text-white text-xs">
          <option value="rounded">Rounded</option>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </div>
    </motion.div>
  );
};

export default DynamicPlayer;