import { javaChallenges } from "../../data/javaChallenges";


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
  },
  {
    id: 3,
    title: "Factorial Calculator",
    description: "Create a method that calculates the factorial of a given number. The factorial of n is the product of all positive integers less than or equal to n.",
    input: "n = 5",
    output: "120",
    hint: "Use a loop or recursion to multiply all numbers from 1 to n.",
    difficulty: "intermediate",
    starterCode: `public class Solution {
    public long factorial(int n) {
        // Your code here
        return 0;
    }
}`,
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
    description: "Create a method that reverses a given string. For example, \"hello\" should become \"olleh\".",
    input: "str = \"hello\"",
    output: "\"olleh\"",
    hint: "Convert the string to a char array or use StringBuilder's reverse method.",
    difficulty: "beginner",
    starterCode: `public class Solution {
    public String reverseString(String str) {
        // Your code here
        return "";
    }
}`,
    testCases: [
      { input: ["hello"], expected: "olleh" },
      { input: ["Java"], expected: "avaJ" },
      { input: [""], expected: "" },
      { input: ["a"], expected: "a" }
    ]
  },
  {
    id: 5,
    title: "Prime Number Checker",
    description: "Create a method that determines whether a given number is prime. A prime number is only divisible by 1 and itself.",
    input: "n = 17",
    output: "true",
    hint: "Check for divisibility up to the square root of the number.",
    difficulty: "intermediate",
    starterCode: `public class Solution {
    public boolean isPrime(int n) {
        // Your code here
        return false;
    }
}`,
    testCases: [
      { input: [17], expected: true },
      { input: [4], expected: false },
      { input: [2], expected: true },
      { input: [1], expected: false }
    ]
  },
  {
    id: 6,
    title: "Array Maximum",
    description: "Create a method that finds the maximum value in an array of integers.",
    input: "arr = [1, 3, 2, 5, 4]",
    output: "5",
    hint: "Initialize max with the first element and compare with remaining elements.",
    difficulty: "beginner",
    starterCode: `public class Solution {
    public int findMax(int[] arr) {
        // Your code here
        return 0;
    }
}`,
    testCases: [
      { input: [[1, 3, 2, 5, 4]], expected: 5 },
      { input: [[-1, -3, -2, -5, -4]], expected: -1 },
      { input: [[1]], expected: 1 },
      { input: [[1, 1, 1]], expected: 1 }
    ]
  },
  {
    id: 7,
    title: "Palindrome Check",
    description: "Create a method that checks if a given string is a palindrome (reads the same forwards and backwards), ignoring case.",
    input: "str = \"Racecar\"",
    output: "true",
    hint: "Convert to lowercase and compare characters from both ends moving inward.",
    difficulty: "intermediate",
    starterCode: `public class Solution {
    public boolean isPalindrome(String str) {
        // Your code here
        return false;
    }
}`,
    testCases: [
      { input: ["Racecar"], expected: true },
      { input: ["hello"], expected: false },
      { input: [""], expected: true },
      { input: ["a"], expected: true }
    ]
  },
  {
    id: 8,
    title: "FizzBuzz",
    description: "Create a method that returns \"Fizz\" for multiples of 3, \"Buzz\" for multiples of 5, and \"FizzBuzz\" for multiples of both. Return the number as a string for other cases.",
    input: "n = 15",
    output: "\"FizzBuzz\"",
    hint: "Use the modulo operator and check for divisibility by both 3 and 5.",
    difficulty: "beginner",
    starterCode: `public class Solution {
    public String fizzBuzz(int n) {
        // Your code here
        return "";
    }
}`,
    testCases: [
      { input: [15], expected: "FizzBuzz" },
      { input: [3], expected: "Fizz" },
      { input: [5], expected: "Buzz" },
      { input: [7], expected: "7" }
    ]
  },
  {
    id: 9,
    title: "Binary Search",
    description: "Implement binary search to find the position of a target value in a sorted array. Return -1 if the target is not found.",
    input: "arr = [1, 2, 3, 4, 5], target = 3",
    output: "2",
    hint: "Compare the middle element with the target and narrow down the search range.",
    difficulty: "advanced",
    starterCode: `public class Solution {
    public int binarySearch(int[] arr, int target) {
        // Your code here
        return -1;
    }
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 3], expected: 2 },
      { input: [[1, 2, 3, 4, 5], 6], expected: -1 },
      { input: [[1], 1], expected: 0 },
      { input: [[], 1], expected: -1 }
    ]
  },
  {
    id: 10,
    title: "Matrix Diagonal Sum",
    description: "Calculate the sum of the main diagonal and secondary diagonal of a square matrix. If an element is part of both diagonals, count it only once.",
    input: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
    output: "25",
    hint: "Main diagonal: elements where row = column. Secondary diagonal: row + column = matrix length - 1",
    difficulty: "advanced",
    starterCode: `public class Solution {
    public int diagonalSum(int[][] matrix) {
        // Your code here
        return 0;
    }
}`,
    testCases: [
      { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: 25 },
      { input: [[[1, 1], [1, 1]]], expected: 4 },
      { input: [[[1]]], expected: 1 },
      { input: [[[1, 2], [3, 4]]], expected: 10 }
    ]
  }
];