import React from 'react';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCompiler = () => {
  return (
    <Link
      to="/compiler"
      className="fixed bottom-8 right-8 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 group"
    >
      <Terminal className="w-6 h-6" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Open Code Editor
      </span>
    </Link>
  );
};

export default FloatingCompiler;