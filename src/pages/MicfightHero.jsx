import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import HeroHeader from '@/components/micfight-hero/HeroHeader';
import HeroActions from '@/components/micfight-hero/HeroActions';
import FundingCard from '@/components/micfight-hero/FundingCard';
import AchievementsCard from '@/components/micfight-hero/AchievementsCard';
import Sidebar from '@/components/micfight-hero/Sidebar';

const MicfightHero = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock artist data
  const artist = { id: 1, name: "Sarah Johnson", venue: "The Music Lounge", song: "Bohemian Rhapsody", genre: "Rock", location: "Nashville, TN", joinDate: "January 2024", bio: "Sarah is a passionate vocalist with over 10 years of experience performing in local venues. Her powerful voice and emotional delivery have captivated audiences across Nashville. She dreams of recording her first album and sharing her music with the world.", stats: { votes: 1247, rating: 4.8, supporters: 89, performances: 23 }, funding: { goal: 5000, raised: 3200, supporters: 67, daysLeft: 45 }, media: { videoUrl: "#", audioUrl: "#", photos: ["#", "#", "#"] }, achievements: [ "Winner - Winter Vocal Championship 2024", "Venue Favorite - The Music Lounge", "Top 10 - Nashville Rising Stars" ], upcomingShows: [ { date: "2024-01-25", venue: "The Music Lounge", time: "8:00 PM" }, { date: "2024-02-01", venue: "Sound Stage", time: "9:00 PM" } ] };

  const handleAction = (feature) => {
    toast({
      title: "Feature Request",
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroHeader artist={artist} onAction={handleAction} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-6 ios-shadow"
            >
              <HeroActions onAction={handleAction} />
            </motion.div>
            
            <FundingCard artist={artist} onSupport={(amount) => handleAction(`Support with $${amount}`)} />
            
            <AchievementsCard achievements={artist.achievements} />
          </div>

          <Sidebar artist={artist} onAction={handleAction} />
        </div>
      </div>
    </div>
  );
};

export default MicfightHero;