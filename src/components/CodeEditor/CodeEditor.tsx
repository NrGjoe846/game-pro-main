import React, { useState, useEffect } from 'react';
import { Play, Save, RotateCcw, Code2, Terminal, Copy, Check, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import EditorControls from './EditorControls';
import OutputTerminal from './OutputTerminal';
import { codeTemplates } from './codeTemplates';
import type { Language, ExecutionResult } from './types';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [output, setOutput] = useState<ExecutionResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && code) {
      const timer = setTimeout(() => {
        localStorage.setItem(`code-${language}`, code);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [code, language, autoSaveEnabled]);

  // Load saved code on language change
  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(codeTemplates[language]);
    }
  }, [language]);

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput([]);

    // Simulate code execution
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let result: ExecutionResult;
      if (language === 'javascript') {
        try {
          // Safely evaluate JavaScript code
          const func = new Function(code);
          const output = func();
          result = { type: 'success', content: String(output) };
        } catch (error) {
          result = { type: 'error', content: error.message };
        }
      } else {
        // Simulate other language execution
        result = {
          type: 'success',
          content: `[${language.toUpperCase()} Output] Program executed successfully\n> Hello, World!`
        };
      }
      
      setOutput(prev => [...prev, result]);
    } catch (error) {
      setOutput(prev => [...prev, { type: 'error', content: error.message }]);
    } finally {
      setIsExecuting(false);
    }
  };

  const resetCode = () => {
    setCode(codeTemplates[language]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full h-[80vh] bg-[#1a1a2e]/50 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
      {/* Editor Header */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <Code2 className="w-5 h-5 text-blue-400 ml-4" />
          <span className="text-sm font-medium">Code Editor</span>
        </div>
        <LanguageSelector language={language} onLanguageChange={setLanguage} />
      </div>

      {/* Main Editor Area */}
      <div className="flex h-[calc(100%-3rem)]">
        {/* Editor Panel */}
        <div className="w-1/2 border-r border-white/10">
          <div className="h-full flex flex-col">
            <EditorControls
              onExecute={executeCode}
              onReset={resetCode}
              onCopy={handleCopy}
              isExecuting={isExecuting}
              isSaved={isSaved}
              autoSaveEnabled={autoSaveEnabled}
              onAutoSaveToggle={() => setAutoSaveEnabled(!autoSaveEnabled)}
            />
            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent resize-none focus:outline-none text-sm font-mono text-gray-300"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-1/2">
          <OutputTerminal output={output} isExecuting={isExecuting} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;