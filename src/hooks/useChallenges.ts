import { useState, useEffect } from 'react';
import { Challenge, ChallengeProgress, Difficulty } from '../types/challenges';
import { pythonChallenges } from '../data/challenges/pythonChallenges';
import { javaChallenges } from '../data/challenges/javaChallenges';

const QUESTIONS_PER_DAY = {
  python: {
    beginner: 1,
    intermediate: 3,
    advanced: 5
  },
  java: {
    beginner: 1,
    intermediate: 2,
    advanced: 5
  }
};

export function useChallenges() {
  const [progress, setProgress] = useState<ChallengeProgress | null>(() => {
    const saved = localStorage.getItem('challengeProgress');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (progress) {
      localStorage.setItem('challengeProgress', JSON.stringify(progress));
    }
  }, [progress]);

  const initializeProgress = (language: 'python' | 'java', difficulty: Difficulty) => {
    const newProgress: ChallengeProgress = {
      language,
      difficulty,
      completedQuestions: [],
      lastUpdated: new Date().toISOString().split('T')[0],
      questionsPerDay: QUESTIONS_PER_DAY[language][difficulty],
      questionsCompletedToday: 0
    };
    setProgress(newProgress);
    return newProgress;
  };

  const getAvailableChallenges = () => {
    if (!progress) return [];
    
    const allChallenges = progress.language === 'python' ? pythonChallenges : javaChallenges;
    return allChallenges.filter(challenge => 
      challenge.difficulty === progress.difficulty &&
      !progress.completedQuestions.includes(challenge.id)
    );
  };

  const getDailyChallenges = () => {
    if (!progress) return [];
    
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastUpdated !== today) {
      setProgress({
        ...progress,
        lastUpdated: today,
        questionsCompletedToday: 0
      });
      return [];
    }

    const remaining = progress.questionsPerDay - progress.questionsCompletedToday;
    if (remaining <= 0) return [];

    const available = getAvailableChallenges();
    return available.slice(0, remaining);
  };

  const markChallengeComplete = (challengeId: number) => {
    if (!progress) return;

    setProgress({
      ...progress,
      completedQuestions: [...progress.completedQuestions, challengeId],
      questionsCompletedToday: progress.questionsCompletedToday + 1
    });
  };

  const resetProgress = () => {
    localStorage.removeItem('challengeProgress');
    setProgress(null);
  };

  return {
    progress,
    initializeProgress,
    getDailyChallenges,
    markChallengeComplete,
    resetProgress
  };
}