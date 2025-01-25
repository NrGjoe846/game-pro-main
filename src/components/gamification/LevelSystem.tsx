import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

interface LevelSystemProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
}

const LevelSystem: React.FC<LevelSystemProps> = ({
  currentLevel,
  currentXP,
  nextLevelXP,
  totalXP,
}) => {
  const progress = (currentXP / nextLevelXP) * 100;

  const levelBenefits = [
    'Access to advanced challenges',
    'Custom profile badge',
    'Community mentor status',
    'Early access to new content'
  ];

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold">Level {currentLevel}</h3>
            <p className="text-sm text-gray-400">Master Coder</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{totalXP}</p>
          <p className="text-sm text-gray-400">Total XP</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>{currentXP} XP</span>
          <span>{nextLevelXP} XP</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          {nextLevelXP - currentXP} XP until next level
        </p>
      </div>

      {/* Level Benefits */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Level {currentLevel} Benefits
        </h4>
        {levelBenefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
          >
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSystem;