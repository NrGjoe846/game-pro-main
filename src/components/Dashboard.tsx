import React from 'react';
import { GraduationCap, Code, Atom, Trophy, Users, Activity, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import LearningPath from './LearningPath';
import ProgressCard from './ProgressCard';
import NextLessonCard from './NextLessonCard';
import DailyChallenge from './DailyChallenge';
import AchievementBadge from './gamification/AchievementBadge';
import FloatingCompiler from './FloatingCompiler';
import ProgrammingCourses from './courses/ProgrammingCourses';

const Dashboard = () => {
  const recentAchievements = [
    { id: 1, title: 'First Code', icon: '🚀', description: 'Wrote your first line of code' },
    { id: 2, title: '7 Day Streak', icon: '🔥', description: 'Coded for 7 days in a row' },
    { id: 3, title: 'Bug Hunter', icon: '🐛', description: 'Fixed 10 coding errors' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section with Floating Elements */}
      <div className="relative min-h-[90vh] pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="particles-container" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              UNAI Verse
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The Next Generation of Learning
            </p>
          </div>

          {/* Daily Challenge Section */}
          <div className="mb-12">
            <DailyChallenge />
          </div>

          {/* Recent Achievements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentAchievements.map((achievement) => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </div>
          </div>

          {/* Programming Courses Section */}
          <div className="mb-12">
            <ProgrammingCourses />
          </div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <LearningPath 
              icon={<Code className="w-8 h-8" />}
              title="Programming"
              description="Master modern programming languages and frameworks"
              progress={65}
            />
            <LearningPath 
              icon={<Atom className="w-8 h-8" />}
              title="Computer Science"
              description="Deep dive into algorithms and computer science fundamentals"
              progress={42}
            />
            <LearningPath 
              icon={<Activity className="w-8 h-8" />}
              title="Data Science"
              description="Learn data analysis and machine learning"
              progress={28}
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <ProgressCard />
            <NextLessonCard />
          </div>
        </div>
      </div>

      {/* Floating Compiler Button */}
      <FloatingCompiler />
    </div>
  );
};

export default Dashboard;
