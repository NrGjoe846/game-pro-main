import React from 'react';
import { Code2, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../BackButton';

const ChallengeCategories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Programming Challenges</h1>
          <p className="text-gray-400">
            Choose your preferred programming language to start the challenge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Link
              to="/challenges/python"
              className="relative block backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Python Challenge</h3>
              <p className="text-gray-400 text-sm mb-4">
                Test your Python programming skills with daily coding challenges
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">Up to 5 questions per day</span>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg">
                  Start Challenge
                </button>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Link
              to="/challenges/java"
              className="relative block backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="p-3 bg-orange-500/20 rounded-lg w-fit mb-4">
                <Coffee className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Java Challenge</h3>
              <p className="text-gray-400 text-sm mb-4">
                Master Java programming with our daily coding exercises
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-400">Up to 5 questions per day</span>
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg">
                  Start Challenge
                </button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCategories;