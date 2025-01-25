import React, { useEffect, useState } from 'react';
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
    questionsPerDay: 3,
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

const ChallengeSelection = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Load saved progress from localStorage
    const savedLevel = localStorage.getItem('challengeLevel');
    const savedProgress = localStorage.getItem('challengeProgress');
    const lastUpdated = localStorage.getItem('challengeLastUpdated');

    if (savedLevel) {
      setSelectedLevel(savedLevel);
    }

    // Reset progress if it's a new day
    if (lastUpdated) {
      const lastDate = new Date(lastUpdated).toDateString();
      const today = new Date().toDateString();

      if (lastDate !== today) {
        setQuestionsCompleted(0);
        localStorage.setItem('challengeProgress', '0');
        localStorage.setItem('challengeLastUpdated', new Date().toISOString());
      } else if (savedProgress) {
        setQuestionsCompleted(parseInt(savedProgress));
      }
    }
  }, []);

  const handleLevelSelect = (level: DifficultyLevel) => {
    const currentLevel = localStorage.getItem('challengeLevel');
    
    if (currentLevel && currentLevel !== level.id) {
      setShowWarning(true);
      setSelectedLevel(level.id);
      return;
    }

    setSelectedLevel(level.id);
    localStorage.setItem('challengeLevel', level.id);
    localStorage.setItem('challengeProgress', '0');
    localStorage.setItem('challengeLastUpdated', new Date().toISOString());
    navigate('/challenges/python');
  };

  const confirmLevelChange = () => {
    if (selectedLevel) {
      localStorage.setItem('challengeLevel', selectedLevel);
      localStorage.setItem('challengeProgress', '0');
      localStorage.setItem('challengeLastUpdated', new Date().toISOString());
      setShowWarning(false);
      navigate('/challenges/python');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Challenge Level</h1>
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-400">
                    {level.questionsPerDay} questions per day
                  </span>
                  {selectedLevel === level.id && (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1a1a2e] rounded-xl p-6 max-w-md w-full border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold">Change Difficulty Level?</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Changing your difficulty level will reset your daily progress. Are you sure you want to continue?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={confirmLevelChange}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-lg py-2 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowWarning(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 rounded-lg py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeSelection;