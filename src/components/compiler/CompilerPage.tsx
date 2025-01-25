import React, { useState } from 'react';
import { Code2, Terminal } from 'lucide-react';
import BackButton from '../BackButton';
import { Language } from '../CodeEditor/types';

const CompilerPage = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Default code templates for each language
  const codeTemplates = {
    javascript: `// JavaScript Example
console.log("Hello, World!");`,
    python: `# Python Example
print("Hello, World!")`,
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
    setOutput('');
    setError(null);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput('');

    try {
      const response = await fetch('http://localhost:3000/api/compiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute code');
      }

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">Code Editor</h1>
          </div>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor Panel */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Editor</span>
              </div>
              <button
                onClick={executeCode}
                disabled={isExecuting}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 rounded-lg transition-colors"
              >
                {isExecuting ? 'Running...' : 'Run Code'}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[calc(100vh-20rem)] bg-transparent p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder={`Write your ${language} code here...`}
              spellCheck="false"
            />
          </div>

          {/* Output Panel */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Output</span>
            </div>
            <div className="p-4 font-mono text-sm h-[calc(100vh-20rem)] overflow-auto">
              {isExecuting && (
                <div className="text-blue-400 animate-pulse">
                  Executing code...
                </div>
              )}
              {error && (
                <div className="text-red-400 whitespace-pre-wrap">
                  Error: {error}
                </div>
              )}
              {output && (
                <div className="text-green-400 whitespace-pre-wrap">
                  {output}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerPage;
