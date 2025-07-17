import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Music, 
  Mic, 
  MapPin, 
  Trophy, 
  Star,
  Users,
  Zap,
  Crown,
  HelpCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthModal from '@/components/auth/AuthModal';

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState('individual');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const { toast } = useToast();
  const { user } = useAuth();

  const individualPlans = [
    {
      id: 'music-only',
      name: 'Music Only',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Perfect for music lovers',
      features: [
        'Unlimited music streaming',
        'Dynamic resizable player',
        'Create unlimited playlists',
        'Multiple music libraries',
        'High-quality audio',
        'Mobile & desktop access'
      ],
      icon: Music,
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'music-karaoke',
      name: 'Music + Karaoke',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'Complete entertainment package',
      features: [
        'Everything in Music Only',
        'Unlimited karaoke tracks',
        'Vocal guide controls',
        'Key change functionality',
        'Difficulty ratings',
        'Micfights competition access',
        'Hero page creation'
      ],
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      popular: true
    }
  ];

  const venuePlans = [
    {
      id: 'venue-music',
      name: 'Venue Music',
      price: { monthly: 49.99, yearly: 499.99 },
      description: 'Music streaming for venues',
      features: [
        'Commercial music license',
        'Multiple simultaneous streams',
        'Venue management portal',
        'Customer analytics',
        'Playlist scheduling',
        'Volume controls',
        'Staff accounts (up to 5)'
      ],
      icon: MapPin,
      color: 'from-green-500 to-emerald-500',
      popular: false
    },
    {
      id: 'venue-full',
      name: 'Venue Full Package',
      price: { monthly: 99.99, yearly: 999.99 },
      description: 'Complete venue entertainment',
      features: [
        'Everything in Venue Music',
        'Karaoke licensing',
        'Micfights nominations',
        'Artist management tools',
        'Competition hosting',
        'Revenue sharing program',
        'Priority support',
        'Unlimited staff accounts'
      ],
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      popular: true
    }
  ];

  const handleSubscribe = (plan) => {
    if (!user) {
      // Show auth modal for signup
      setAuthMode('signup');
      setAuthModalOpen(true);
      toast({
        title: "Account Required",
        description: "Please create an account to subscribe to our plans.",
        duration: 3000,
      });
    } else {
      // User is logged in, proceed with subscription
      toast({
        title: "Venue Testing",
        description: `We're bringing on a venue tomorrow for testing purposes. All authentication and subscription flows are fully functional using Supabase Auth, but payment processing is simulated for our venue testing session.`,
        duration: 5000,
      });
    }
  };

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const handleAuthSuccess = () => {
    toast({
      title: "Account Created!",
      description: "Your account has been created successfully. You can now subscribe to our plans.",
    });
  };

  const currentPlans = selectedPlan === 'individual' ? individualPlans : venuePlans;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Info className="w-6 h-6" />
              <h3 className="text-xl font-bold">Venue Testing Tomorrow</h3>
            </div>
            <p className="text-sm opacity-90 max-w-2xl mx-auto">
              We're bringing on a venue tomorrow for testing purposes. All authentication and subscription flows are fully functional using Supabase Auth, but payment processing is simulated for our venue testing session.
            </p>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold gradient-text mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the full potential of music streaming and karaoke entertainment on Micfights.
            </p>
            {user && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl inline-block">
                <p className="text-green-700 text-sm">
                  Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}! You're ready to subscribe.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Plan Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-effect rounded-2xl p-2 inline-flex">
            <button
              onClick={() => setSelectedPlan('individual')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedPlan === 'individual'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Individual Plans
            </button>
            <button
              onClick={() => setSelectedPlan('venue')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedPlan === 'venue'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <MapPin className="w-5 h-5 inline mr-2" />
              Venue Plans
            </button>
          </div>
        </motion.div>

        {/* Billing Cycle Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-effect rounded-2xl p-2 inline-flex items-center">
            <span className={`px-4 py-2 text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-600' : 'text-gray-800'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`px-4 py-2 text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-600' : 'text-gray-800'}`}>
              Yearly
              <span className="ml-1 text-green-600 font-semibold">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {currentPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative glass-effect rounded-2xl p-8 ios-shadow ${
                  plan.popular ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-800">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && (
                    <p className="text-green-600 text-sm mt-2">
                      Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3 text-lg font-medium rounded-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {user ? 'Subscribe Now' : 'Get Started'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => showHelp(`${plan.name} features`)}
                    className="w-full text-gray-600 hover:text-orange-600"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-4">Why Choose Micfights?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the most advanced music and karaoke platform with features designed for both individuals and venues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Dynamic Player",
                description: "Resizable, customizable player that adapts to your needs",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Trophy,
                title: "Micfights Competitions",
                description: "Participate in artist competitions and build your fanbase",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "High-quality audio and professional karaoke tracks",
                color: "from-blue-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Can I switch between plans anytime?",
              "What's included in the venue licensing?",
              "How does the Micfights competition work?",
              "Is there a free trial available?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => showHelp('FAQ')}
                className="w-full glass-effect rounded-xl p-4 text-left hover:bg-white/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{question}</span>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

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

export default Subscribe;