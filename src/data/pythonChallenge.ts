import { Challenge } from '../../types/challenges';

export const pythonChallenges: Challenge[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Write a function that takes two numbers as input and returns their sum.",
    input: "a = 5, b = 7",
    output: "12",
    hint: "Use the + operator to add the numbers.",
    difficulty: "beginner",
    starterCode: "def sum_numbers(a, b):\n    # Your code here\n    pass",
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
    description: "Write a function that determines if a number is even or odd. Return 'Even' for even numbers and 'Odd' for odd numbers.",
    input: "n = 4",
    output: "\"Even\"",
    hint: "Use the modulo operator % to check if a number is divisible by 2.",
    difficulty: "beginner",
    starterCode: "def check_even_odd(n):\n    # Your code here\n    pass",
    testCases: [
      { input: [4], expected: "Even" },
      { input: [7], expected: "Odd" },
      { input: [0], expected: "Even" },
      { input: [-3], expected: "Odd" }
    ]
  },
  {
    id: 3,
    title: "Factorial Calculator",
    description: "Write a function that calculates the factorial of a given number. The factorial of n is the product of all positive integers less than or equal to n.",
    input: "n = 5",
    output: "120",
    hint: "Use a loop or recursion to multiply all numbers from 1 to n.",
    difficulty: "intermediate",
    starterCode: "def factorial(n):\n    # Your code here\n    pass",
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [3], expected: 6 },
      { input: [10], expected: 3628800 }
    ]
  },
  {
    id: 4,
    title: "String Reversal",
    description: "Write a function that reverses a given string.",
    input: "s = \"hello\"",
    output: "\"olleh\"",
    hint: "You can use string slicing with a step of -1 or convert to list and reverse.",
    difficulty: "beginner",
    starterCode: "def reverse_string(s):\n    # Your code here\n    pass",
    testCases: [
      { input: ["hello"], expected: "olleh" },
      { input: ["python"], expected: "nohtyp" },
      { input: [""], expected: "" },
      { input: ["a"], expected: "a" }
    ]
  },
  {
    id: 5,
    title: "List Maximum",
    description: "Write a function that finds the maximum value in a list of numbers.",
    input: "numbers = [1, 3, 2, 5, 4]",
    output: "5",
    hint: "You can use the built-in max() function or implement your own logic.",
    difficulty: "beginner",
    starterCode: "def find_maximum(numbers):\n    # Your code here\n    pass",
    testCases: [
      { input: [[1, 3, 2, 5, 4]], expected: 5 },
      { input: [[-1, -3, -2, -5, -4]], expected: -1 },
      { input: [[1]], expected: 1 },
      { input: [[1, 1, 1]], expected: 1 }
    ]
  }
];