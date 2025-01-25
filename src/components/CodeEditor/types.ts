export type Language = 'javascript' | 'python' | 'java';

export interface ExecutionResult {
  type: 'success' | 'error';
  content: string;
}

export interface CodeExecutor {
  execute: (code: string) => Promise<ExecutionResult>;
}

export interface ExecutionError {
  line?: number;
  column?: number;
  message: string;
}
