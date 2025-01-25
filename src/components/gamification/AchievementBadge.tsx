import React from 'react';

interface AchievementBadgeProps {
  title: string;
  icon: string;
  description: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ title, icon, description }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
          New!
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;