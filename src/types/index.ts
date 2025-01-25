export interface PythonQuestion {
    id: number;
    title: string;
    description: string;
    input: string;
    output: string;
    hint: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }
  
  export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
  
  export interface UserProgress {
    level: DifficultyLevel;
    questionsCompletedToday: number;
    lastCompletedDate: string;
  }