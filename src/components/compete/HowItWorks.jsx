import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Trophy, Heart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Venue Nomination",
      description: "Venues nominate talented artists they discover",
      icon: MapPin,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Hero Page Creation",
      description: "Artists build their profile and showcase their talent",
      icon: Star,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "Competition Entry",
      description: "Submit live performances and compete with others",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500"
    },
    {
      step: 4,
      title: "Fan Support",
      description: "Fans vote and support artists through funding",
      icon: Heart,
      color: "from-green-500 to-emerald-500"
    }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold gradient-text mb-4">How Micfight Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From venue nomination to competition winner - here's how artists can build their careers
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="glass-effect rounded-2xl p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-gray-600">{step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HowItWorks;