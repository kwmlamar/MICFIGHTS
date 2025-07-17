import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithMagicLink } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signInWithMagicLink(email);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-2xl p-8 ios-shadow text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Micfights</h1>
            <p className="text-gray-600">Admin Portal Access</p>
          </div>
          
          <p className="text-gray-700 mb-6">
            Enter your email to receive a secure, passwordless login link.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="admin@micfights.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Send Magic Link
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;