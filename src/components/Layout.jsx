import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Music, 
  Mic, 
  MapPin, 
  CreditCard, 
  Trophy, 
  Info, 
  Mail, 
  Settings,
  Menu,
  X,
  HelpCircle,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserProfile from '@/components/auth/UserProfile';

const MICFIGHTS_LOGO_URL = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/5c156093-52e4-4e9a-b2aa-b9cc34235b05/9b6014bf79b17f3b4a8d50494881ffbe.png';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Songs', path: '/songs', icon: Music },
    { name: 'Karaoke', path: '/karaoke', icon: Mic },
    { name: 'Venue', path: '/venue', icon: MapPin },
    { name: 'Subscribe', path: '/subscribe', icon: CreditCard },
    { name: 'Compete', path: '/compete', icon: Trophy },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Admin', path: '/admin', icon: Settings }
  ];

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    toast({
      title: "Welcome to Micfights!",
      description: "You're now signed in and ready to explore.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <img src={MICFIGHTS_LOGO_URL} alt="Micfights Logo" className="h-16 object-contain"/>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-white/50 hover:text-orange-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => showHelp('general navigation')}
                className="hidden lg:flex text-gray-600 hover:text-orange-600"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>

              {/* Auth Buttons / User Profile */}
              {user ? (
                <UserProfile />
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 hover:text-orange-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-white/20 bg-white/90 backdrop-blur-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                          : 'text-gray-700 hover:bg-white/70'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="mt-4 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      openAuthModal('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-gray-700 hover:text-orange-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="glass-effect border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
               <Link to="/" className="flex items-center space-x-2">
                 <img src={MICFIGHTS_LOGO_URL} alt="Micfights Logo" className="h-16 object-contain"/>
              </Link>
              <p className="text-gray-600 text-sm">
                The ultimate music competition platform for artists, venues, and music lovers.
              </p>
            </div>

            <div>
              <span className="font-semibold text-gray-800 mb-4 block">Platform</span>
              <div className="space-y-2">
                <Link to="/songs" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Music Library</Link>
                <Link to="/karaoke" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Karaoke Tracks</Link>
                <Link to="/compete" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Micfights Competition</Link>
              </div>
            </div>

            <div>
              <span className="font-semibold text-gray-800 mb-4 block">For Venues</span>
              <div className="space-y-2">
                <Link to="/venue" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Venue Portal</Link>
                <Link to="/subscribe" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Pricing Plans</Link>
                <button 
                  onClick={() => showHelp('venue support')}
                  className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left"
                >
                  Support
                </button>
              </div>
            </div>

            <div>
              <span className="font-semibold text-gray-800 mb-4 block">Support</span>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">About Us</Link>
                <Link to="/contact" className="block text-gray-600 hover:text-orange-600 text-sm transition-colors">Contact</Link>
                <button 
                  onClick={() => showHelp('help center')}
                  className="block text-gray-600 hover:text-orange-600 text-sm transition-colors text-left"
                >
                  Help Center
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Micfights. All rights reserved. Empowering music experiences worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Layout;