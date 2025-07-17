import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, ArrowRight } from 'lucide-react';

const CompetitionList = ({ competitions, onAction }) => (
  <div className="space-y-4">
    {competitions.map((comp, index) => (
      <motion.div
        key={comp.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-effect rounded-2xl p-6 ios-shadow flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              comp.status === 'active' ? 'bg-green-100 text-green-700' :
              comp.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {comp.status.charAt(0).toUpperCase() + comp.status.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-gray-800">{comp.title}</h3>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {comp.status === 'upcoming' ? `Starts: ${comp.startDate}` : `Ends: ${comp.endDate}`}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{comp.participants} Participants</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{comp.prizePool} Prize Pool</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => onAction(`View ${comp.title}`)}
          variant="outline"
          className="ml-4 border-gray-300"
        >
          View Details <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    ))}
  </div>
);

export default CompetitionList;