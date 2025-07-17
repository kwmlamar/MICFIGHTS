import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Music, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArtistStats = ({ stats }) => (
  <div className="space-y-4">
    {[
      { label: 'Total Votes', value: stats.votes, icon: Heart, color: 'text-red-500' },
      { label: 'Rating', value: stats.rating, icon: Star, color: 'text-yellow-500' },
      { label: 'Supporters', value: stats.supporters, icon: Users, color: 'text-blue-500' },
      { label: 'Performances', value: stats.performances, icon: Music, color: 'text-purple-500' }
    ].map((stat, index) => {
      const Icon = stat.icon;
      return (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className={`w-4 h-4 ${stat.color}`} />
            <span className="text-gray-600 text-sm">{stat.label}</span>
          </div>
          <span className="font-bold text-gray-800">{stat.value}</span>
        </div>
      );
    })}
  </div>
);

const UpcomingShows = ({ shows, onAction }) => (
  <>
    <div className="space-y-3">
      {shows.map((show, index) => (
        <div key={index} className="bg-white/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-800">{show.venue}</span>
            <span className="text-sm text-gray-500">{show.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-sm text-gray-600">{show.date}</span>
          </div>
        </div>
      ))}
    </div>
    <Button onClick={() => onAction('View all shows')} variant="outline" className="w-full mt-4 border-gray-300">
      View All Shows
    </Button>
  </>
);

const FundingGoal = ({ name, goal }) => (
  <>
    <div className="text-center mb-4">
      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
        <Target className="w-8 h-8 text-white" />
      </div>
      <p className="text-sm text-gray-600">
        Help {name} reach her goal to record her first professional album and launch her music career.
      </p>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span className="text-gray-600">Studio Recording:</span><span className="font-medium">$2,500</span></div>
      <div className="flex justify-between"><span className="text-gray-600">Music Production:</span><span className="font-medium">$1,500</span></div>
      <div className="flex justify-between"><span className="text-gray-600">Marketing & Promotion:</span><span className="font-medium">$1,000</span></div>
      <div className="border-t pt-2 flex justify-between font-bold"><span>Total Goal:</span><span>${goal.toLocaleString()}</span></div>
    </div>
  </>
);

const Sidebar = ({ artist, onAction }) => (
  <div className="lg:col-span-1 space-y-6">
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-effect rounded-2xl p-6 ios-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Artist Stats</h3>
      <ArtistStats stats={artist.stats} />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-effect rounded-2xl p-6 ios-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Shows</h3>
      <UpcomingShows shows={artist.upcomingShows} onAction={onAction} />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="glass-effect rounded-2xl p-6 ios-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Funding Goal</h3>
      <FundingGoal name={artist.name} goal={artist.funding.goal} />
    </motion.div>
  </div>
);

export default Sidebar;