import { JavaScriptExecutor } from './executors/JavaScriptExecutor';
import { PythonExecutor } from './executors/PythonExecutor';
import { JavaExecutor } from './executors/JavaExecutor';
import type { Language, CodeExecutor } from './types';

export class ExecutorFactory {
  private static executors: Map<Language, CodeExecutor> = new Map([
    ['javascript', new JavaScriptExecutor()],
    ['python', new PythonExecutor()],
    ['java', new JavaExecutor()]
  ]);

  static getExecutor(language: Language): CodeExecutor {
    const executor = this.executors.get(language);
    if (!executor) {
      throw new Error(`No executor found for language: ${language}`);
    }
    return executor;
  }
}
