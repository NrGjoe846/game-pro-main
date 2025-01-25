export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface TestCase {
  input: any[];
  expected: any;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  input: string;
  output: string;
  hint: string;
  difficulty: Difficulty;
  starterCode: string;
  testCases: TestCase[];
}

export interface ChallengeProgress {
  language: 'python' | 'java';
  difficulty: Difficulty;
  completedQuestions: number[];
  lastUpdated: string;
  questionsPerDay: number;
  questionsCompletedToday: number;
}