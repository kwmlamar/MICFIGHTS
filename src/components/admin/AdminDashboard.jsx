import React from 'react';
import { motion } from 'framer-motion';
import { Users, Settings, Music, DollarSign, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleFeature = (feature) => {
    toast({
      title: feature,
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const adminStats = [
    { label: 'Total Users', value: '12,450', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Venues', value: '234', icon: Settings, color: 'from-green-500 to-emerald-500' },
    { label: 'Songs Library', value: '15,678', icon: Music, color: 'from-purple-500 to-pink-500' },
    { label: 'Monthly Revenue', value: '$45,230', icon: DollarSign, color: 'from-yellow-500 to-orange-500' }
  ];

  const pendingReviews = [
    { id: 1, type: 'micfight', artist: 'Sarah Johnson', venue: 'The Music Lounge', song: 'Bohemian Rhapsody', status: 'pending' },
    { id: 2, type: 'hero_page', artist: 'Mike Chen', venue: 'Karaoke Palace', song: 'Don\'t Stop Believin\'', status: 'pending' },
    { id: 3, type: 'final_submission', artist: 'Emma Davis', venue: 'Sound Stage', song: 'I Will Always Love You', status: 'pending' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 ios-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <h3 className="font-medium text-gray-600">{stat.label}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-effect rounded-2xl p-6 ios-shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Pending Reviews</h3>
        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <div key={review.id} className="bg-white/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{review.artist}</h4>
                  <p className="text-gray-600 text-sm">
                    {review.type === 'micfight' && 'Micfight Nomination'}
                    {review.type === 'hero_page' && 'Hero Page Review'}
                    {review.type === 'final_submission' && 'Final Competition Submission'}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Venue: {review.venue} • Song: {review.song}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleFeature('Approve submission')}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFeature('Reject submission')}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;