import React from 'react';
import { Star, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DailyChallenge = () => {
  const navigate = useNavigate();

  const handleStartChallenge = () => {
    navigate('/challenges/language-select');
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-bold">Daily Challenge</h2>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>12:00:00</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Programming Challenge
        </h3>
        <p className="text-gray-300">
          Test your programming skills with our daily coding challenges. Complete
          these challenges to earn XP and special badges!
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>100 XP</span>
          </div>
          <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400">
            Multiple Languages
          </div>
        </div>
        <button
          onClick={handleStartChallenge}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;