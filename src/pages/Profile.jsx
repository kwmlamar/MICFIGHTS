import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Crown, 
  Settings, 
  CreditCard,
  Shield,
  Bell,
  LogOut,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // Here you would update the user profile in Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.user_metadata?.name || '',
      email: user.email || ''
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-8 ios-shadow text-center"
        >
          <h2 className="text-2xl font-bold gradient-text mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your profile.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Your Profile</h1>
          <p className="text-xl text-gray-600">
            Manage your account settings and subscription
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-2xl p-8 ios-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.name || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-gray-800">{formData.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-800">Free Plan</span>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Subscription Card */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-800">Subscription</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                You're currently on the free plan. Upgrade to unlock premium features.
              </p>
              <Button
                onClick={() => window.location.href = '/subscribe'}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Account Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Privacy & Security</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-colors text-left">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Notifications</span>
                </button>
              </div>
            </div>

            {/* Sign Out */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 