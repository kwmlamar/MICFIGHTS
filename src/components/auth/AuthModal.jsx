import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2,
  LogIn,
  UserPlus,
  Key,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const { signIn, signUp, signInWithMagicLink, resetPassword } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let error;

      if (mode === 'login') {
        const result = await signIn(formData.email, formData.password);
        error = result.error;
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const result = await signUp(formData.email, formData.password, {
          data: {
            name: formData.name
          }
        });
        error = result.error;
      } else if (mode === 'forgot') {
        const result = await resetPassword(formData.email);
        error = result.error;
      }

      if (!error) {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setLoading(true);
    try {
      const { error } = await signInWithMagicLink(formData.email);
      if (!error) {
        onClose();
      }
    } catch (error) {
      console.error('Magic link error:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass-effect rounded-2xl p-8 ios-shadow w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Demo Notice for Signup */}
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white"
            >
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span className="font-semibold">Venue Testing</span>
              </div>
              <p className="text-sm mt-1 opacity-90">
                We're bringing on a venue tomorrow for testing. Your account will be created with Supabase Auth for our venue testing session.
              </p>
            </motion.div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-gray-600 text-sm">
                {mode === 'login' && 'Sign in to your account'}
                {mode === 'signup' && 'Join Micfights today'}
                {mode === 'forgot' && 'Enter your email to reset password'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={mode === 'signup'}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
              />
            </div>

            {mode !== 'forgot' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={mode !== 'forgot'}
                  className="w-full pl-12 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {mode === 'login' && <LogIn className="w-5 h-5 mr-2" />}
                    {mode === 'signup' && <UserPlus className="w-5 h-5 mr-2" />}
                    {mode === 'forgot' && <Key className="w-5 h-5 mr-2" />}
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Link'}
                  </>
                )}
              </Button>

              {mode === 'login' && (
                <Button
                  type="button"
                  onClick={handleMagicLink}
                  disabled={loading || !formData.email}
                  variant="outline"
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Sign in with Magic Link
                </Button>
              )}
            </div>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center">
            {mode === 'login' && (
              <div className="space-y-2">
                <button
                  onClick={() => switchMode('signup')}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Don't have an account? Sign up
                </button>
                <div>
                  <button
                    onClick={() => switchMode('forgot')}
                    className="text-gray-600 hover:text-gray-700 text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <button
                onClick={() => switchMode('login')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Already have an account? Sign in
              </button>
            )}

            {mode === 'forgot' && (
              <button
                onClick={() => switchMode('login')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal; 