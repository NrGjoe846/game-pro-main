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

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {
          type: 'error',
          content: 'Invalid response from server. Expected JSON.'
        };
      }

      const result = await response.json();
      
      if (!response.ok) {
        return {
          type: 'error',
          content: result.error || `HTTP Error: ${response.status}`
        };
      }

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
        content: `Execution Error: ${error.message}`
      };
    }
  }
}
