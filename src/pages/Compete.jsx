import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/compete/PageHeader';
import CompetitionStats from '@/components/compete/CompetitionStats';
import CategoryFilter from '@/components/compete/CategoryFilter';
import CompetitionList from '@/components/compete/CompetitionList';
import FeaturedArtists from '@/components/compete/FeaturedArtists';
import HowItWorks from '@/components/compete/HowItWorks';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Compete = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const handleFeature = (feature) => {
    toast({
      title: feature,
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const competitions = [
    { id: 1, title: "Winter Vocal Championship", status: "active", endDate: "2024-02-15", prizePool: "$10,000", participants: 156, category: "vocal" },
    { id: 2, title: "Rock Legends Battle", status: "upcoming", startDate: "2024-02-01", prizePool: "$5,000", participants: 89, category: "rock" },
    { id: 3, title: "Pop Star Rising", status: "completed", winner: "Sarah Johnson", prizePool: "$7,500", participants: 234, category: "pop" }
  ];

  const featuredArtists = [
    { id: 1, name: "Sarah Johnson", venue: "The Music Lounge", song: "Bohemian Rhapsody", votes: 1247, rating: 4.8, videoUrl: "#", audioUrl: "#", fundingGoal: 5000, fundingRaised: 3200, isWinner: true },
    { id: 2, name: "Mike Chen", venue: "Karaoke Palace", song: "Don't Stop Believin'", votes: 892, rating: 4.6, videoUrl: "#", audioUrl: "#", fundingGoal: 3000, fundingRaised: 1800, isWinner: false },
    { id: 3, name: "Emma Davis", venue: "Sound Stage", song: "I Will Always Love You", votes: 1156, rating: 4.9, videoUrl: "#", audioUrl: "#", fundingGoal: 4000, fundingRaised: 2900, isWinner: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader />
        <CompetitionStats />
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Active Competitions</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => showHelp('competitions')}
              className="text-gray-600 hover:text-blue-600"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
          <CompetitionList competitions={competitions} onAction={handleFeature} />
        </motion.div>

        <FeaturedArtists artists={featuredArtists} onAction={handleFeature} />
        <HowItWorks />
      </div>
    </div>
  );
};

export default Compete;