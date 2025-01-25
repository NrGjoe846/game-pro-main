import React from 'react';
import { Trophy } from 'lucide-react';

const ProgressCard = () => {
  return (
    <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        <Trophy className="w-6 h-6 text-yellow-400" />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Daily Streak</span>
            <span className="text-blue-400">12 days</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>XP Today</span>
            <span className="text-blue-400">450/500</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[90%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;