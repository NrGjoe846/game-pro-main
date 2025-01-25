import type { CodeExecutor, ExecutionResult } from '../types';

export class JavaScriptExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    try {
      // Create a new function with console.log capture
      let output = '';
      const originalLog = console.log;
      console.log = (...args) => {
        output += args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
      };

      // Execute the code in a try-catch block
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction(code);
      const result = await fn();

      // Restore original console.log
      console.log = originalLog;

      // If there's a return value, add it to the output
      if (result !== undefined) {
        output += String(result);
      }

      return {
        type: 'success',
        content: output.trim() || 'Code executed successfully with no output'
      };
    } catch (error) {
      return {
        type: 'error',
        content: `${error.name}: ${error.message}`
      };
    }
  }
}
