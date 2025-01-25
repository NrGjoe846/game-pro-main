import { PythonQuestion } from '../types';

export const pythonQuestions: PythonQuestion[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Given two integers a and b, return their sum.",
    input: "a = 5, b = 7",
    output: "12",
    hint: "Use the + operator.",
    difficulty: "beginner"
  },
  {
    id: 2,
    title: "Check Even or Odd",
    description: "Check if a given number is even or odd. Return \"Even\" for even numbers and \"Odd\" for odd numbers.",
    input: "n = 4",
    output: "\"Even\"",
    hint: "Use the modulo operator %.",
    difficulty: "beginner"
  },
  {
    id: 3,
    title: "Factorial Calculator",
    description: "Calculate the factorial of a given number n.",
    input: "n = 5",
    output: "120",
    hint: "Use a loop or recursion.",
    difficulty: "intermediate"
  },
  {
    id: 4,
    title: "Prime Number Check",
    description: "Determine if a given number is prime.",
    input: "n = 7",
    output: "True",
    hint: "Check divisibility up to square root of n.",
    difficulty: "intermediate"
  },
  {
    id: 5,
    title: "Binary Search",
    description: "Implement binary search algorithm.",
    input: "arr = [1, 2, 3, 4, 5], target = 3",
    output: "2",
    hint: "Divide and conquer approach.",
    difficulty: "advanced"
  }
];