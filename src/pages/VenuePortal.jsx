import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Music, 
  Trophy, 
  Calendar,
  Settings,
  Bell,
  Star,
  TrendingUp,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MICFIGHTS_LOGO_URL = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/5c156093-52e4-4e9a-b2aa-b9cc34235b05/9b6014bf79b17f3b4a8d50494881ffbe.png';

const VenuePortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { toast } = useToast();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'music', label: 'Music Library', icon: Music },
    { id: 'micfight', label: 'Micfight', icon: Trophy },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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

  const dashboardStats = [
    { label: 'Today\'s Revenue', value: '$1,247', change: '+12%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Customers', value: '89', change: '+5%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Songs Played', value: '342', change: '+18%', icon: Music, color: 'from-purple-500 to-pink-500' },
    { label: 'Customer Rating', value: '4.8', change: '+0.2', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  const recentNotifications = [
    { id: 1, type: 'nomination', message: 'New Micfights nomination from Sarah Johnson', time: '5 min ago' },
    { id: 2, type: 'subscription', message: 'Customer upgraded to Premium plan', time: '15 min ago' },
    { id: 3, type: 'event', message: 'Karaoke Night event is 80% full', time: '1 hour ago' },
    { id: 4, type: 'review', message: 'New 5-star review received', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-72 min-h-screen glass-effect border-r border-white/20"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
               <img src={MICFIGHTS_LOGO_URL} alt="Micfights Logo" className="h-16 object-contain"/>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="glass-effect border-b border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {sidebarItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
                </h1>
                <p className="text-gray-600">Venue: The Music Lounge</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showHelp('venue portal')}
                  className="text-gray-600 hover:text-orange-600"
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFeature('Notifications')}
                  className="text-gray-600 hover:text-orange-600 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => {
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
                          <Icon className="w-6 h-6 text-white"/>
                        </div>
                        <span className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity & Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-effect rounded-2xl p-6 ios-shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Notifications</h3>
                  <div className="space-y-3">
                    {recentNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-white/50 rounded-xl">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'nomination' ? 'bg-yellow-100 text-yellow-600' :
                          notification.type === 'subscription' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'event' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {notification.type === 'nomination' && <Trophy className="w-4 h-4" />}
                          {notification.type === 'subscription' && <Users className="w-4 h-4" />}
                          {notification.type === 'event' && <Calendar className="w-4 h-4" />}
                          {notification.type === 'review' && <Star className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-sm">{notification.message}</p>
                          <p className="text-gray-500 text-xs">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 ios-shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Nominate Artist', icon: Trophy, action: 'Nominate new artist' },
                      { label: 'Create Event', icon: Calendar, action: 'Create new event' },
                      { label: 'View Analytics', icon: BarChart3, action: 'View detailed analytics' },
                      { label: 'Manage Staff', icon: Users, action: 'Manage staff accounts' }
                    ].map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleFeature(action.action)}
                          className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-300 hover:bg-white/70"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Sections */}
          {activeSection !== 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="glass-effect rounded-2xl p-8 ios-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {React.createElement(sidebarItems.find(item => item.id === activeSection)?.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {sidebarItems.find(item => item.id === activeSection)?.label}
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is coming soon! We're working hard to bring you the best venue management experience.
                </p>
                <Button
                  onClick={() => handleFeature(sidebarItems.find(item => item.id === activeSection)?.label)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Request Feature
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenuePortal;