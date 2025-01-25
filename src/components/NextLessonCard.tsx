import React from 'react';
import { Play } from 'lucide-react';

const NextLessonCard = () => {
  return (
    <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
      
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
        
        <div className="relative bg-gray-800/50 p-4 rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Introduction to Algorithms</h4>
              <p className="text-sm text-gray-400">Chapter 3: Sorting Algorithms</p>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextLessonCard;