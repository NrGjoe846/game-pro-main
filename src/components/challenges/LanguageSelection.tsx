import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../BackButton';

interface ProgrammingLanguage {
  id: 'python' | 'java';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

const languages: ProgrammingLanguage[] = [
  {
    id: 'python',
    title: 'Python',
    description: 'Perfect for beginners and data science enthusiasts',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    path: '/challenges/level-select'
  },
  {
    id: 'java',
    title: 'Java',
    description: 'Great for object-oriented programming and enterprise applications',
    icon: <Coffee className="w-6 h-6" />,
    color: 'from-red-500/20 to-orange-500/20',
    path: '/challenges/java'
  }
];

const LanguageSelection = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    localStorage.setItem('selectedLanguage', language.id);
    navigate(language.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Language</h1>
          <p className="text-gray-400">
            Select your preferred programming language for today's challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((language) => (
            <motion.button
              key={language.id}
              onClick={() => handleLanguageSelect(language)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${language.color} rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  {language.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{language.title}</h3>
                <p className="text-gray-400 text-sm">{language.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;