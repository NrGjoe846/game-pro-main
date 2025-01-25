import React from 'react';
import { DifficultyLevel } from '../types';
import { ArrowRight } from 'lucide-react';

interface LevelSelectionProps {
  onSelectLevel: (level: DifficultyLevel) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel }) => {
  const levels = [
    {
      title: 'Beginner',
      description: '1 question per day',
      value: 'beginner' as DifficultyLevel,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Intermediate',
      description: '3 questions per day',
      value: 'intermediate' as DifficultyLevel,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Advanced',
      description: '5 questions per day',
      value: 'advanced' as DifficultyLevel,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onSelectLevel(level.value)}
          className={`bg-gradient-to-br ${level.color} p-6 rounded-2xl text-white hover:scale-105 transition-transform duration-300`}
        >
          <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
          <p className="text-white/80 mb-4">{level.description}</p>
          <div className="flex items-center justify-end">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default LevelSelection;