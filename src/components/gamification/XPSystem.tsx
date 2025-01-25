import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';

interface XPEvent {
  type: 'lesson' | 'challenge' | 'streak' | 'achievement';
  points: number;
  description: string;
  timestamp: Date;
}

const XPSystem = () => {
  const recentXP: XPEvent[] = [
    {
      type: 'lesson',
      points: 50,
      description: 'Completed Python Basics Lesson',
      timestamp: new Date()
    },
    {
      type: 'challenge',
      points: 100,
      description: 'Solved Daily Coding Challenge',
      timestamp: new Date()
    },
    {
      type: 'streak',
      points: 75,
      description: '7-Day Learning Streak',
      timestamp: new Date()
    }
  ];

  const getXPIcon = (type: XPEvent['type']) => {
    switch (type) {
      case 'lesson':
        return <Star className="w-5 h-5 text-yellow-400" />;
      case 'challenge':
        return <Zap className="w-5 h-5 text-blue-400" />;
      case 'streak':
        return <Trophy className="w-5 h-5 text-purple-400" />;
      default:
        return <Star className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">Recent XP Gains</h3>
      <div className="space-y-4">
        {recentXP.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {getXPIcon(event.type)}
              <div>
                <p className="font-medium">{event.description}</p>
                <p className="text-sm text-gray-400">
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">+{event.points}</span>
              <span className="text-yellow-400">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XPSystem;