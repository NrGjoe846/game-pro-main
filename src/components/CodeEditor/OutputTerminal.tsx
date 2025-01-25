import React from 'react';
import { Terminal, Loader } from 'lucide-react';
import type { ExecutionResult } from './types';

interface OutputTerminalProps {
  output: ExecutionResult[];
  isExecuting: boolean;
}

const OutputTerminal: React.FC<OutputTerminalProps> = ({ output, isExecuting }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b border-white/10 flex items-center px-4 space-x-2">
        <Terminal className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-medium">Output</span>
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        {output.map((result, index) => (
          <div
            key={index}
            className={`mb-2 ${
              result.type === 'error' ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {result.type === 'error' ? '❌ Error: ' : '✓ Output: '}
            {result.content}
          </div>
        ))}
        {isExecuting && (
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Executing code...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputTerminal;