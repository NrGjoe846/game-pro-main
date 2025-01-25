import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code2, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeEditor from './components/CodeEditor/CodeEditor';
import LevelSelection from './components/LevelSelection';
import { pythonQuestions } from './data/questions';
import { PythonQuestion, DifficultyLevel, UserProgress } from './types';

const QUESTIONS_PER_DAY = {
  beginner: 1,
  intermediate: 3,
  advanced: 5,
};

const PythonChallenge = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      level: null,
      questionsCompletedToday: 0,
      lastCompletedDate: null,
    };
  });

  const [currentQuestion, setCurrentQuestion] = useState<PythonQuestion | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showLevelSelection, setShowLevelSelection] = useState(!userProgress.level);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    if (userProgress.level) {
      const today = new Date().toDateString();
      if (userProgress.lastCompletedDate !== today) {
        setUserProgress(prev => ({
          ...prev,
          questionsCompletedToday: 0,
          lastCompletedDate: today,
        }));
      }
    }
  }, [userProgress.level]);

  const handleLevelSelect = (level: DifficultyLevel) => {
    setUserProgress({
      level,
      questionsCompletedToday: 0,
      lastCompletedDate: new Date().toDateString(),
    });
    setShowLevelSelection(false);
    loadNextQuestion(level);
  };

  const loadNextQuestion = (level: DifficultyLevel) => {
    const availableQuestions = pythonQuestions.filter(q => 
      q.difficulty === level && 
      !q.completed
    );
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      setCurrentQuestion(availableQuestions[randomIndex]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      const success = data.output.trim() === currentQuestion?.output.trim();
      
      if (success) {
        setUserProgress(prev => ({
          ...prev,
          questionsCompletedToday: prev.questionsCompletedToday + 1,
        }));
      }

      setResult({
        success,
        message: success ? 'Correct! Well done!' : 'Incorrect. Try again!',
      });

      if (success && userProgress.level) {
        setTimeout(() => {
          const questionsRemaining = QUESTIONS_PER_DAY[userProgress.level] - userProgress.questionsCompletedToday;
          if (questionsRemaining > 0) {
            loadNextQuestion(userProgress.level);
          }
        }, 1500);
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Error executing code. Please try again.',
      });
    }
  };

  if (showLevelSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Choose Your Level</h1>
          <LevelSelection onSelectLevel={handleLevelSelect} />
        </div>
      </div>
    );
  }

  const questionsRemaining = userProgress.level 
    ? QUESTIONS_PER_DAY[userProgress.level] - userProgress.questionsCompletedToday 
    : 0;

  if (questionsRemaining === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Great job! 🎉</h2>
          <p className="text-xl mb-8">You've completed all your questions for today.</p>
          <p className="text-gray-400">Come back tomorrow for more challenges!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Python Challenge</h1>
            <p className="text-gray-400">
              Level: {userProgress.level?.charAt(0).toUpperCase() + userProgress.level.slice(1)} • 
              Questions remaining today: {questionsRemaining}
            </p>
          </div>
        </div>

        {currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Question Panel */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold">{currentQuestion.title}</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Problem:</h3>
                  <p className="text-gray-300">{currentQuestion.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Example:</h3>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-gray-300">Input: {currentQuestion.input}</p>
                    <p className="text-gray-300">Output: {currentQuestion.output}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Hint:</h3>
                  <p className="text-gray-300">{currentQuestion.hint}</p>
                </div>
              </div>

              {/* Result Display */}
              {result && (
                <div className={`p-4 rounded-lg ${
                  result.success ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span>{result.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
              <CodeEditor value={code} onChange={setCode} onSubmit={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonChallenge;
