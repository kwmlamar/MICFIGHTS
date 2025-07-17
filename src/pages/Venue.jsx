
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Music, 
  Mic, 
  Trophy, 
  BarChart3,
  Calendar,
  Settings,
  Star,
  Plus,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Venue = () => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const venueStats = {
    totalCustomers: 1247,
    activeSubscriptions: 89,
    monthlyRevenue: 15420,
    averageRating: 4.8,
    micfightNominations: 12,
    eventsHosted: 34
  };

  const recentActivity = [
    { id: 1, type: 'nomination', artist: 'Sarah Johnson', song: 'Bohemian Rhapsody', time: '2 hours ago' },
    { id: 2, type: 'subscription', customer: 'Mike Chen', plan: 'Music + Karaoke', time: '4 hours ago' },
    { id: 3, type: 'event', name: 'Friday Night Karaoke', attendees: 45, time: '1 day ago' },
    { id: 4, type: 'review', customer: 'Emma Davis', rating: 5, time: '2 days ago' }
  ];

  const upcomingEvents = [
    { id: 1, name: 'Saturday Karaoke Night', date: '2024-01-20', time: '8:00 PM', capacity: 60, registered: 42 },
    { id: 2, name: 'Micfight Competition', date: '2024-01-25', time: '7:00 PM', capacity: 100, registered: 78 },
    { id: 3, name: 'Live Music Session', date: '2024-01-27', time: '9:00 PM', capacity: 80, registered: 23 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Venue Portal</h1>
            <p className="text-gray-600">Manage your venue's music and entertainment services</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => showHelp('venue portal')}
              className="text-gray-600 hover:text-blue-600"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Link to="/venue-portal">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Venue Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-2 mb-8 inline-flex"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'subscriptions', label: 'Subscriptions', icon: Users },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'micfight', label: 'Micfight', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Customers', value: venueStats.totalCustomers.toLocaleString(), icon: Users, color: 'from-blue-500 to-cyan-500' },
                { label: 'Active Subscriptions', value: venueStats.activeSubscriptions, icon: Music, color: 'from-green-500 to-emerald-500' },
                { label: 'Monthly Revenue', value: `$${venueStats.monthlyRevenue.toLocaleString()}`, icon: BarChart3, color: 'from-purple-500 to-pink-500' },
                { label: 'Average Rating', value: venueStats.averageRating, icon: Star, color: 'from-yellow-500 to-orange-500' },
                { label: 'Micfight Nominations', value: venueStats.micfightNominations, icon: Trophy, color: 'from-red-500 to-pink-500' },
                { label: 'Events Hosted', value: venueStats.eventsHosted, icon: Calendar, color: 'from-indigo-500 to-purple-500' }
              ].map((stat, index) => {
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

            {/* Recent Activity */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'nomination' ? 'bg-yellow-100 text-yellow-600' :
                      activity.type === 'subscription' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'event' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'nomination' && <Trophy className="w-5 h-5" />}
                      {activity.type === 'subscription' && <Users className="w-5 h-5" />}
                      {activity.type === 'event' && <Calendar className="w-5 h-5" />}
                      {activity.type === 'review' && <Star className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      {activity.type === 'nomination' && (
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.artist}</span> nominated for Micfight with "{activity.song}"
                        </p>
                      )}
                      {activity.type === 'subscription' && (
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.customer}</span> subscribed to {activity.plan}
                        </p>
                      )}
                      {activity.type === 'event' && (
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.name}</span> completed with {activity.attendees} attendees
                        </p>
                      )}
                      {activity.type === 'review' && (
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.customer}</span> left a {activity.rating}-star review
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Subscription Management</h3>
                <Button
                  onClick={() => handleFeature('Add new subscription')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subscription
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Current Plan</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Type:</span>
                      <span className="font-medium">Venue Full Package</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Cost:</span>
                      <span className="font-medium">$99.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Billing:</span>
                      <span className="font-medium">Jan 25, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Usage Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Music Streams:</span>
                      <span className="font-medium">12,450 this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Karaoke Sessions:</span>
                      <span className="font-medium">234 this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Staff Accounts:</span>
                      <span className="font-medium">8 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Satisfaction:</span>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
                <Button
                  onClick={() => handleFeature('Create new event')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-800">{event.name}</h4>
                      <span className="text-sm text-gray-500">{event.date} at {event.time}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-gray-600 text-sm">Capacity</span>
                        <p className="font-medium">{event.capacity} people</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Registered</span>
                        <p className="font-medium">{event.registered} people</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Availability</span>
                        <p className="font-medium">{event.capacity - event.registered} spots left</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeature('Edit event')}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeature('View registrations')}
                      >
                        View Registrations
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Micfight Tab */}
        {activeTab === 'micfight' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Micfight Management</h3>
                <Button
                  onClick={() => handleFeature('Nominate new artist')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Nominate Artist
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Active Nominations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">Bohemian Rhapsody</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                        Pending Review
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <p className="font-medium">Mike Chen</p>
                        <p className="text-sm text-gray-600">Don't Stop Believin'</p>
                      </div>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        Approved
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-4">Competition Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Nominations:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approved:</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In Competition:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Winners:</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="glass-effect rounded-2xl p-8 ios-shadow">
            <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of venues already using SoundWave to enhance their customer experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/subscribe">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3">
                  View Pricing Plans
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => showHelp('venue demo')}
                className="border-gray-300 px-8 py-3"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Venue;
