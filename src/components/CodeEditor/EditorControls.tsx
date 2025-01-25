import React from 'react';
import { Play, Save, RotateCcw, Copy } from 'lucide-react';

interface EditorControlsProps {
  onExecute: () => void;
  onReset: () => void;
  onCopy: () => void;
  isExecuting: boolean;
  isSaved: boolean;
  autoSaveEnabled: boolean;
  onAutoSaveToggle: () => void;
}

const EditorControls: React.FC<EditorControlsProps> = ({
  onExecute,
  onReset,
  onCopy,
  isExecuting,
  isSaved,
  autoSaveEnabled,
  onAutoSaveToggle,
}) => {
  return (
    <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300 disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          <span className="text-sm">Run</span>
        </button>
        <button
          onClick={onReset}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onCopy}
          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoSave"
            checked={autoSaveEnabled}
            onChange={onAutoSaveToggle}
            className="rounded border-white/20 bg-white/10"
          />
          <label htmlFor="autoSave" className="text-sm">Auto-save</label>
        </div>
        {isSaved && (
          <span className="text-sm text-green-400">Saved</span>
        )}
      </div>
    </div>
  );
};

export default EditorControls;