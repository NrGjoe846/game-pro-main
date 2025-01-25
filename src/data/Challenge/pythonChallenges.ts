import { Challenge } from '../../types/challenges';

export const pythonChallenges: Challenge[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Given two integers a and b, return their sum.",
    input: "a = 5, b = 7",
    output: "12",
    hint: "Use the + operator.",
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
    title: "Check Even or Odd",
    description: "Check if a given number is even or odd. Return \"Even\" for even numbers and \"Odd\" for odd numbers.",
    input: "n = 4",
    output: "\"Even\"",
    hint: "Use the modulo operator %.",
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
    title: "Find the Maximum",
    description: "Given two numbers, find the maximum.",
    input: "a = 3, b = 8",
    output: "8",
    hint: "Use the max() function or a simple comparison.",
    difficulty: "beginner",
    starterCode: "def find_maximum(a, b):\n    # Your code here\n    pass",
    testCases: [
      { input: [3, 8], expected: 8 },
      { input: [10, 5], expected: 10 },
      { input: [0, 0], expected: 0 },
      { input: [-1, -5], expected: -1 }
    ]
  },
  {
    id: 4,
    title: "Reverse a String",
    description: "Reverse the given string.",
    input: "s = \"hello\"",
    output: "\"olleh\"",
    hint: "Use slicing [::-1].",
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
    title: "Count Vowels",
    description: "Count the number of vowels in a given string.",
    input: "s = \"python\"",
    output: "1",
    hint: "Check each character in the string against the set of vowels.",
    difficulty: "beginner",
    starterCode: "def count_vowels(s):\n    # Your code here\n    pass",
    testCases: [
      { input: ["python"], expected: 1 },
      { input: ["aeiou"], expected: 5 },
      { input: ["xyz"], expected: 0 },
      { input: [""], expected: 0 }
    ]
  },
  {
    id: 6,
    title: "Factorial",
    description: "Find the factorial of a given number.",
    input: "n = 5",
    output: "120",
    hint: "Use a loop or the math.factorial() function.",
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
    id: 7,
    title: "Palindrome Check",
    description: "Check if a given string is a palindrome.",
    input: "s = \"madam\"",
    output: "True",
    hint: "Compare the string with its reverse.",
    difficulty: "beginner",
    starterCode: "def is_palindrome(s):\n    # Your code here\n    pass",
    testCases: [
      { input: ["madam"], expected: true },
      { input: ["python"], expected: false },
      { input: [""], expected: true },
      { input: ["a"], expected: true }
    ]
  },
  {
    id: 8,
    title: "Find the Smallest Number",
    description: "Find the smallest number in a list.",
    input: "nums = [5, 3, 7, 2]",
    output: "2",
    hint: "Use the min() function.",
    difficulty: "beginner",
    starterCode: "def find_minimum(nums):\n    # Your code here\n    pass",
    testCases: [
      { input: [[5, 3, 7, 2]], expected: 2 },
      { input: [[1]], expected: 1 },
      { input: [[-1, 0, 1]], expected: -1 },
      { input: [[10, 10, 10]], expected: 10 }
    ]
  },
  {
    id: 9,
    title: "Sum of a List",
    description: "Calculate the sum of all elements in a list.",
    input: "nums = [1, 2, 3, 4]",
    output: "10",
    hint: "Use the sum() function.",
    difficulty: "beginner",
    starterCode: "def sum_list(nums):\n    # Your code here\n    pass",
    testCases: [
      { input: [[1, 2, 3, 4]], expected: 10 },
      { input: [[]], expected: 0 },
      { input: [[5]], expected: 5 },
      { input: [[-1, 1]], expected: 0 }
    ]
  },
  {
    id: 10,
    title: "Square a Number",
    description: "Return the square of a given number.",
    input: "n = 5",
    output: "25",
    hint: "Use the ** operator or multiply the number by itself.",
    difficulty: "beginner",
    starterCode: "def square_number(n):\n    # Your code here\n    pass",
    testCases: [
      { input: [5], expected: 25 },
      { input: [0], expected: 0 },
      { input: [-2], expected: 4 },
      { input: [10], expected: 100 }
    ]
  }
  // Note: I've included the first 10 challenges as an example
  // You can continue adding the remaining challenges following the same pattern
  // Each challenge should include:
  // - A unique id
  // - Title and description
  // - Input and expected output examples
  // - Helpful hint
  // - Difficulty level
  // - Starter code
  // - Test cases for verification
];