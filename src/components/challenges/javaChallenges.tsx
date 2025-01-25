import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor';
import { Challenge, Difficulty } from '../../types/challenges';
import { javaChallenges } from '../../data/challenges/javaChallenges';
import BackButton from '../BackButton';

interface JavaChallengeProgress {
  level: Difficulty | null;
  questionsCompletedToday: number;
  lastCompletedDate: string | null;
  completedQuestionIds: number[];
}

const QUESTIONS_PER_DAY = {
  beginner: 1,
  intermediate: 2,
  advanced: 5,
};

const JavaChallenge = () => {
  const [progress, setProgress] = useState<JavaChallengeProgress>(() => {
    const saved = localStorage.getItem('javaProgress');
    return saved ? JSON.parse(saved) : {
      level: null,
      questionsCompletedToday: 0,
      lastCompletedDate: null,
      completedQuestionIds: [],
    };
  });

  const [currentQuestion, setCurrentQuestion] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showLevelSelection, setShowLevelSelection] = useState(!progress.level);

  useEffect(() => {
    localStorage.setItem('javaProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (progress.level) {
      const today = new Date().toDateString();
      if (progress.lastCompletedDate !== today) {
        setProgress(prev => ({
          ...prev,
          questionsCompletedToday: 0,
          lastCompletedDate: today,
        }));
      }
      if (!currentQuestion) {
        loadNextQuestion(progress.level);
      }
    }
  }, [progress.level]);

  const handleLevelSelect = (level: Difficulty) => {
    setProgress({
      level,
      questionsCompletedToday: 0,
      lastCompletedDate: new Date().toDateString(),
      completedQuestionIds: [],
    });
    setShowLevelSelection(false);
    loadNextQuestion(level);
  };

  const loadNextQuestion = (level: Difficulty) => {
    const availableQuestions = javaChallenges.filter(q => 
      q.difficulty === level && 
      !progress.completedQuestionIds.includes(q.id)
    );
    
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const question = availableQuestions[randomIndex];
      setCurrentQuestion(question);
      setCode(question.starterCode);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestion) return;

    try {
      const response = await fetch('/api/java', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          testCases: currentQuestion.testCases 
        }),
      });

      const data = await response.json();
      const success = data.success;
      
      if (success) {
        setProgress(prev => ({
          ...prev,
          questionsCompletedToday: prev.questionsCompletedToday + 1,
          completedQuestionIds: [...prev.completedQuestionIds, currentQuestion.id],
        }));
      }

      setResult({
        success,
        message: success ? 'All test cases passed! Well done!' : 'Some test cases failed. Try again!',
      });

      if (success && progress.level) {
        setTimeout(() => {
          const questionsRemaining = QUESTIONS_PER_DAY[progress.level!] - progress.questionsCompletedToday - 1;
          if (questionsRemaining > 0) {
            loadNextQuestion(progress.level!);
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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This will clear all completed questions.')) {
      setProgress({
        level: null,
        questionsCompletedToday: 0,
        lastCompletedDate: null,
        completedQuestionIds: [],
      });
      setShowLevelSelection(true);
      setCurrentQuestion(null);
      setCode('');
      setResult(null);
    }
  };

  const handleLevelChange = () => {
    if (window.confirm('Change difficulty level? Your daily progress will be reset, but completed questions will be saved.')) {
      setShowLevelSelection(true);
      setCurrentQuestion(null);
      setCode('');
      setResult(null);
    }
  };

  if (showLevelSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Java Programming Challenge</h1>
            <p className="text-gray-400">Choose your difficulty level to begin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(QUESTIONS_PER_DAY).map(([level, questions]) => (
              <button
                key={level}
                onClick={() => handleLevelSelect(level as Difficulty)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 capitalize">{level}</h3>
                  <p className="text-gray-400 mb-4">
                    {questions} {questions === 1 ? 'question' : 'questions'} per day
                  </p>
                  <div className="text-sm text-blue-400">
                    Click to start
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const questionsRemaining = progress.level 
    ? QUESTIONS_PER_DAY[progress.level] - progress.questionsCompletedToday 
    : 0;

  if (questionsRemaining === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Great job! 🎉</h2>
          <p className="text-xl mb-8">You've completed all your Java challenges for today.</p>
          <p className="text-gray-400 mb-8">Come back tomorrow for more challenges!</p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
          >
            Reset Progress
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Java Programming Challenge</h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-400">
                Level: {progress.level?.charAt(0).toUpperCase() + progress.level?.slice(1)} • 
                Questions remaining today: {questionsRemaining}
              </p>
              <button
                onClick={handleLevelChange}
                className="text-sm px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300"
              >
                Change Level
              </button>
              <button
                onClick={handleReset}
                className="text-sm px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>
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
              <CodeEditor 
                value={code} 
                onChange={setCode} 
                onSubmit={handleSubmit}
                language="java"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JavaChallenge;
