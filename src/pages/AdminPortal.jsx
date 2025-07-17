
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  Music, 
  Users, 
  Trophy, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SongManagement from '@/components/admin/SongManagement';
import UserManagement from '@/components/admin/UserManagement';
import MicfightReviews from '@/components/admin/MicfightReviews';
import PlatformSettings from '@/components/admin/PlatformSettings';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: <AdminDashboard /> },
    { id: 'songs', label: 'Song Management', icon: Music, component: <SongManagement /> },
    { id: 'users', label: 'User Management', icon: Users, component: <UserManagement /> },
    { id: 'micfight', label: 'Micfight Reviews', icon: Trophy, component: <MicfightReviews /> },
    { id: 'settings', label: 'Platform Settings', icon: Settings, component: <PlatformSettings /> }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Portal</h1>
            <p className="text-gray-600">Manage the entire Micfights platform</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => showHelp('admin portal')}
            className="text-gray-600 hover:text-orange-600"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-2 mb-8 inline-flex overflow-x-auto"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        <div>
          {ActiveComponent}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
