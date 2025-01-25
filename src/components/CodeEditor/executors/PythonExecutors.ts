import type { CodeExecutor, ExecutionResult } from '../types';

export class PythonExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    try {
      const response = await fetch('/api/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        return {
          type: 'error',
          content: result.error
        };
      }

      return {
        type: 'success',
        content: result.output || 'Code executed successfully with no output'
      };
    } catch (error) {
      return {
        type: 'error',
        content: `Execution Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}