import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Crown,
  Music,
  Mic
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleSubscriptionClick = () => {
    setIsOpen(false);
    navigate('/subscribe');
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getSubscriptionType = () => {
    // This would be determined by user metadata or database query
    // For now, we'll show a default
    return 'Free Plan';
  };

  const getSubscriptionIcon = () => {
    // This would be determined by user's actual subscription
    return Music;
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/20 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getUserInitials()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-800">
            {getUserDisplayName()}
          </div>
          <div className="text-xs text-gray-600 flex items-center">
            <Music className="w-3 h-3 mr-1" />
            {getSubscriptionType()}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-64 glass-effect rounded-2xl p-4 ios-shadow z-50"
          >
            {/* User Info */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                {getUserInitials()}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  {getUserDisplayName()}
                </div>
                <div className="text-sm text-gray-600">
                  {user.email}
                </div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Music className="w-3 h-3 mr-1" />
                  {getSubscriptionType()}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Profile</span>
              </button>

              <button
                onClick={handleSubscriptionClick}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left"
              >
                <Crown className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Subscription</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </button>

              <div className="border-t border-gray-200 my-2"></div>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile; 