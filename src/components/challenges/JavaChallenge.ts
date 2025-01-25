import { Challenge } from '../../types/challenges';

export const javaChallenges: Challenge[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Create a method that takes two integers as parameters and returns their sum.",
    input: "a = 5, b = 7",
    output: "12",
    hint: "Use the + operator to add the numbers.",
    difficulty: "beginner",
    starterCode: `public class Solution {
    public int sumNumbers(int a, int b) {
        // Your code here
        return 0;
    }
}`,
    testCases: [
      { input: [5, 7], expected: 12 },
      { input: [3, 2], expected: 5 },
      { input: [-1, 1], expected: 0 },
      { input: [0, 0], expected: 0 }
    ]
  },
  {
    id: 2,
    title: "Even or Odd",
    description: "Create a method that determines if a number is even or odd. Return \"Even\" for even numbers and \"Odd\" for odd numbers.",
    input: "n = 4",
    output: "\"Even\"",
    hint: "Use the modulo operator (%) to check if a number is divisible by 2.",
    difficulty: "beginner",
    starterCode: `public class Solution {
    public String checkEvenOdd(int n) {
        // Your code here
        return "";
    }
}`,
    testCases: [
      { input: [4], expected: "Even" },
      { input: [7], expected: "Odd" },
      { input: [0], expected: "Even" },
      { input: [-3], expected: "Odd" }
    ]
  }
];