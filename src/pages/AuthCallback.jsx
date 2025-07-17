import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Successfully authenticated! Redirecting...');
          setTimeout(() => navigate('/'), 2000);
        } else {
          setStatus('error');
          setMessage('No session found. Please try signing in again.');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-8 ios-shadow text-center max-w-md w-full"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold gradient-text mb-2">Authenticating...</h2>
            <p className="text-gray-600">Please wait while we verify your authentication.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold gradient-text mb-2">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold gradient-text mb-2">Authentication Failed</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback; 