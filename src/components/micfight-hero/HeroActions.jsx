import React from 'react';
import { Video, Music, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroActions = ({ onAction }) => (
  <>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button onClick={() => onAction('Play live video')} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white h-12">
        <Video className="w-5 h-5 mr-2" /> Watch Live Performance
      </Button>
      <Button onClick={() => onAction('Play audio version')} variant="outline" className="border-gray-300 h-12">
        <Music className="w-5 h-5 mr-2" /> Listen to Audio
      </Button>
    </div>
    <div className="flex space-x-4">
      <Button onClick={() => onAction('Vote for artist')} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
        <Heart className="w-4 h-4 mr-2" /> Vote & Support
      </Button>
      <Button onClick={() => onAction('Share artist')} variant="outline" className="border-gray-300">
        <Share2 className="w-4 h-4 mr-2" /> Share
      </Button>
    </div>
  </>
);

export default HeroActions;