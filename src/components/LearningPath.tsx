import React from 'react';

interface LearningPathProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: number;
}

const LearningPath: React.FC<LearningPathProps> = ({ icon, title, description, progress }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02]">
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
        
        <div className="relative">
          <div className="mb-4 text-blue-400">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-400 mt-2 block">{progress}% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;