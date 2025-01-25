import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Target, Trophy, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DifficultyLevel {
  id: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  questionsPerDay: number;
  icon: React.ReactNode;
  color: string;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Perfect for those just starting their coding journey',
    questionsPerDay: 1,
    icon: <Book className="w-6 h-6" />,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'For coders with some experience under their belt',
    questionsPerDay: 2,
    icon: <Target className="w-6 h-6" />,
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Challenge yourself with complex problems',
    questionsPerDay: 5,
    icon: <Trophy className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

const LevelSelection = () => {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem('selectedLanguage');

  useEffect(() => {
    if (!selectedLanguage) {
      navigate('/challenges/language-select');
    }
  }, [selectedLanguage, navigate]);

  const handleLevelSelect = (level: DifficultyLevel) => {
    localStorage.setItem('selectedLevel', level.id);
    localStorage.setItem('questionsPerDay', level.questionsPerDay.toString());
    localStorage.setItem('questionsCompleted', '0');
    localStorage.setItem('lastChallengeDate', new Date().toISOString().split('T')[0]);
    navigate('/challenges/daily');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span className="text-sm mt-2">Language</span>
            </div>
            <div className="flex-1 h-1 bg-blue-500 mx-2" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                2
              </div>
              <span className="text-sm mt-2">Level</span>
            </div>
            <div className="flex-1 h-1 bg-white/10 mx-2" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                3
              </div>
              <span className="text-sm mt-2">Challenge</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Level</h1>
          <p className="text-gray-400">
            Select a difficulty level that matches your coding expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyLevels.map((level) => (
            <motion.button
              key={level.id}
              onClick={() => handleLevelSelect(level)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${level.color} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  {level.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{level.description}</p>
                <div className="text-sm text-blue-400">
                  {level.questionsPerDay} {level.questionsPerDay === 1 ? 'question' : 'questions'} per day
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;