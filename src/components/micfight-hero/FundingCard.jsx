import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FundingCard = ({ artist, onSupport }) => {
  const [supportAmount, setSupportAmount] = useState(25);
  const fundingPercentage = (artist.funding.raised / artist.funding.goal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-effect rounded-2xl p-6 ios-shadow"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Support {artist.name}'s Journey</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-800">${artist.funding.raised.toLocaleString()} raised</span>
          <span className="text-gray-600">of ${artist.funding.goal.toLocaleString()} goal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: `${fundingPercentage}%` }}></div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{Math.round(fundingPercentage)}% funded</span>
          <span>{artist.funding.daysLeft} days left</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center"><div className="text-2xl font-bold text-gray-800">{artist.funding.supporters}</div><div className="text-sm text-gray-600">Supporters</div></div>
        <div className="text-center"><div className="text-2xl font-bold text-gray-800">{artist.stats.performances}</div><div className="text-sm text-gray-600">Performances</div></div>
        <div className="text-center"><div className="text-2xl font-bold text-gray-800">{artist.funding.daysLeft}</div><div className="text-sm text-gray-600">Days Left</div></div>
      </div>

      <div className="bg-white/50 rounded-xl p-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Support Amount</label>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[10, 25, 50, 100].map((amount) => (
            <button key={amount} onClick={() => setSupportAmount(amount)} className={`p-3 rounded-lg border-2 transition-all duration-200 ${supportAmount === amount ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-200 hover:border-gray-300'}`}>
              ${amount}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <input type="number" value={supportAmount} onChange={(e) => setSupportAmount(parseInt(e.target.value) || 0)} className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Custom amount" />
        </div>
      </div>

      <Button onClick={() => onSupport(supportAmount)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 text-lg">
        <Heart className="w-5 h-5 mr-2" /> Support with ${supportAmount}
      </Button>
    </motion.div>
  );
};

export default FundingCard;