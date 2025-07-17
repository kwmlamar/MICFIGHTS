import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const PlatformSettings = () => {
  const [adminFeePercentage, setAdminFeePercentage] = useState(15);
  const { toast } = useToast();

  const handleFeature = (feature) => {
    toast({
      title: feature,
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="glass-effect rounded-2xl p-6 ios-shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Artist Funding Management</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Fee Percentage
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={adminFeePercentage}
                  onChange={(e) => setAdminFeePercentage(e.target.value)}
                  className="flex-1"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-gray-800">{adminFeePercentage}</span>
                  <Percent className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Percentage of artist funding that goes to platform management
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Fee Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Artist receives:</span>
                  <span className="font-medium">{100 - adminFeePercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Platform fee:</span>
                  <span className="font-medium">{adminFeePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Funding Features</h4>
            <div className="space-y-3">
              {[
                { label: 'Enable artist funding pages', enabled: true },
                { label: 'Allow venue sponsorships', enabled: true },
                { label: 'Automatic payout processing', enabled: false },
                { label: 'Funding goal recommendations', enabled: true }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">{feature.label}</span>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => handleFeature(`Toggle ${feature.label}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-6 ios-shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Micfight Competition Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Competition Rules</h4>
            <div className="space-y-3">
              {[
                { label: 'Auto-approve venue nominations', enabled: false },
                { label: 'Require video submissions', enabled: true },
                { label: 'Allow public voting', enabled: true },
                { label: 'Enable live streaming', enabled: false }
              ].map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">{rule.label}</span>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => handleFeature(`Toggle ${rule.label}`)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Prize Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Winner Prize Pool
                </label>
                <input
                  type="text"
                  placeholder="$5,000"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Runner-up Prize
                </label>
                <input
                  type="text"
                  placeholder="$1,000"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlatformSettings;