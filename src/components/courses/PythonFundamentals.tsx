import React, { useState } from 'react';
import { Book, Code, Play, CheckCircle, Lock, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Topic {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  locked: boolean;
  subtopics?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface Phase {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  expanded?: boolean;
}

const coursePhases: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: Python Basics and Core Concepts',
    description: 'Understanding Python syntax, basic operations, and foundational topics that are critical for proficiency in Python.',
    topics: [
      {
        id: 'intro',
        title: '1. Introduction to Python Programming',
        description: 'Learn about Python installation, IDE setup, and write your first program.',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'setup', title: 'Installing Python (Anaconda, PyCharm, or basic Python)', completed: false },
          { id: 'ide', title: 'Setting up the IDE', completed: false },
          { id: 'first-program', title: 'Writing your first Python program: print("Hello, World!")', completed: false },
          { id: 'syntax', title: 'Python syntax, keywords, and comments', completed: false },
          { id: 'interpreter', title: 'Python\'s interpreter vs. compiled languages', completed: false }
        ]
      },
      {
        id: 'data-types',
        title: '2. Basic Data Types and Variables',
        description: 'Master Python\'s fundamental data types and variable system.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'numbers', title: 'Numbers (integers, floats, complex)', completed: false },
          { id: 'strings', title: 'Strings', completed: false },
          { id: 'booleans', title: 'Booleans', completed: false },
          { id: 'type-conversion', title: 'Type conversion (int to float, string to int)', completed: false },
          { id: 'variables', title: 'Variable naming conventions and dynamic typing', completed: false }
        ]
      },
      {
        id: 'operators',
        title: '3. Operators and Expressions',
        description: 'Learn about different types of operators in Python.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'arithmetic', title: 'Arithmetic operators: +, -, *, /, //, %, **', completed: false },
          { id: 'comparison', title: 'Comparison operators: ==, !=, >, <, >=, <=', completed: false },
          { id: 'logical', title: 'Logical operators: and, or, not', completed: false },
          { id: 'assignment', title: 'Assignment operators: =, +=, -=', completed: false },
          { id: 'bitwise', title: 'Bitwise operators (optional for beginners)', completed: false }
        ]
      },
      {
        id: 'control-flow',
        title: '4. Control Flow: Conditionals and Loops',
        description: 'Master program flow control using conditions and loops.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'if-else', title: 'Conditionals: if, elif, else', completed: false },
          { id: 'loops', title: 'Loops: for and while loops', completed: false },
          { id: 'loop-control', title: 'Loop control: break, continue, pass', completed: false },
          { id: 'nested', title: 'Nested loops and conditionals', completed: false }
        ]
      },
      {
        id: 'functions',
        title: '5. Functions and Modular Code',
        description: 'Learn about function definition and usage.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'def', title: 'Defining functions using def', completed: false },
          { id: 'params', title: 'Function parameters and return values', completed: false },
          { id: 'scope', title: 'Function scope: local vs global variables', completed: false },
          { id: 'lambda', title: 'Lambda functions', completed: false },
          { id: 'recursion', title: 'Understanding recursion (optional)', completed: false }
        ]
      },
      {
        id: 'io',
        title: '6. Basic Input and Output',
        description: 'Learn to handle input and output operations.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'input', title: 'User input using input()', completed: false },
          { id: 'print', title: 'Output formatting using print()', completed: false },
          { id: 'format', title: 'String interpolation (f-strings, % formatting)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Data Structures and Collections',
    description: 'Learn how to store, manipulate, and process collections of data in Python.',
    topics: [
      {
        id: 'lists',
        title: '7. Lists',
        description: 'Master Python lists and their operations.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'list-basics', title: 'Creating and modifying lists', completed: false },
          { id: 'list-ops', title: 'List indexing, slicing, and iteration', completed: false },
          { id: 'list-methods', title: 'List methods: append(), extend(), insert(), remove()', completed: false },
          { id: 'comprehensions', title: 'List comprehensions', completed: false }
        ]
      },
      {
        id: 'tuples',
        title: '8. Tuples',
        description: 'Understanding immutable sequences.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'tuple-basics', title: 'Creating tuples and understanding immutability', completed: false },
          { id: 'packing', title: 'Tuple packing and unpacking', completed: false },
          { id: 'dict-keys', title: 'Using tuples as dictionary keys', completed: false }
        ]
      },
      {
        id: 'dictionaries',
        title: '9. Dictionaries',
        description: 'Working with key-value pairs.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'dict-basics', title: 'Creating and modifying dictionaries', completed: false },
          { id: 'dict-ops', title: 'Dictionary methods and operations', completed: false },
          { id: 'dict-comp', title: 'Dictionary comprehensions', completed: false }
        ]
      },
      {
        id: 'sets',
        title: '10. Sets',
        description: 'Understanding set operations.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'set-basics', title: 'Creating and using sets', completed: false },
          { id: 'set-ops', title: 'Set operations: union, intersection, difference', completed: false },
          { id: 'set-methods', title: 'Set methods: add(), remove(), discard()', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Intermediate Topics',
    description: 'Explore deeper Python features for writing cleaner, more efficient code.',
    topics: [
      {
        id: 'file-handling',
        title: '11. File Handling',
        description: 'Learn to work with files in Python.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'file-ops', title: 'Reading from and writing to text files', completed: false },
          { id: 'file-modes', title: 'File modes: r, w, a, x', completed: false },
          { id: 'context', title: 'Context managers with with open()', completed: false },
          { id: 'csv', title: 'Handling CSV files (optional)', completed: false }
        ]
      },
      {
        id: 'exceptions',
        title: '12. Error and Exception Handling',
        description: 'Understanding and handling exceptions.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'try-except', title: 'Try-except blocks for catching exceptions', completed: false },
          { id: 'raise', title: 'Raising exceptions with raise', completed: false },
          { id: 'finally', title: 'Using finally for clean-up actions', completed: false },
          { id: 'custom', title: 'Custom exceptions (optional)', completed: false }
        ]
      },
      {
        id: 'oop',
        title: '13. Object-Oriented Programming',
        description: 'Learn OOP concepts in Python.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'classes', title: 'Defining and using classes', completed: false },
          { id: 'inheritance', title: 'Inheritance and method overriding', completed: false },
          { id: 'encapsulation', title: 'Encapsulation and private members', completed: false },
          { id: 'polymorphism', title: 'Polymorphism and abstract classes', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Working with Data and Basic Algorithms',
    description: 'Learn to work with data and implement basic algorithms.',
    topics: [
      {
        id: 'data-structures',
        title: '14. Advanced Data Structures',
        description: 'Implement complex data structures.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'stacks', title: 'Implementing stacks using lists', completed: false },
          { id: 'queues', title: 'Working with queues and deques', completed: false },
          { id: 'linked-lists', title: 'Understanding linked lists', completed: false }
        ]
      },
      {
        id: 'algorithms',
        title: '15. Basic Algorithms',
        description: 'Learn fundamental algorithms.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'sorting', title: 'Sorting algorithms', completed: false },
          { id: 'searching', title: 'Searching algorithms', completed: false },
          { id: 'built-in', title: 'Built-in functions and algorithms', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Advanced Beginner Topics',
    description: 'Bridge the gap between beginner and intermediate levels.',
    topics: [
      {
        id: 'regex',
        title: '16. Regular Expressions',
        description: 'Master pattern matching with regex.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 're-basics', title: 'Using the re module', completed: false },
          { id: 'patterns', title: 'Common regex patterns', completed: false },
          { id: 'text-processing', title: 'Text processing with regex', completed: false }
        ]
      },
      {
        id: 'testing',
        title: '17. Debugging and Testing',
        description: 'Learn testing and debugging techniques.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'print-debug', title: 'Print debugging', completed: false },
          { id: 'logging', title: 'Using the logging module', completed: false },
          { id: 'unittest', title: 'Unit testing with unittest', completed: false }
        ]
      },
      {
        id: 'databases',
        title: '18. Basic Database Operations',
        description: 'Introduction to databases with Python.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'sqlite', title: 'Working with SQLite', completed: false },
          { id: 'crud', title: 'Basic CRUD operations', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    title: 'Phase 6: Project Development and Version Control',
    description: 'Apply your knowledge in real-world projects.',
    topics: [
      {
        id: 'git',
        title: '19. Version Control with Git',
        description: 'Learn Git basics for project management.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'git-basics', title: 'Basic Git commands', completed: false },
          { id: 'branching', title: 'Working with branches', completed: false },
          { id: 'github', title: 'Collaborating with GitHub', completed: false }
        ]
      },
      {
        id: 'projects',
        title: '20. Building Projects',
        description: 'Create real-world Python applications.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'calculator', title: 'Simple calculator app', completed: false },
          { id: 'todo', title: 'To-do list manager', completed: false },
          { id: 'scraper', title: 'Basic web scraper', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    title: 'Phase 7: Continuous Learning and Practice',
    description: 'Continue your learning journey with advanced topics.',
    topics: [
      {
        id: 'challenges',
        title: '21. Coding Challenges',
        description: 'Practice with coding challenges.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'hackerrank', title: 'HackerRank challenges', completed: false },
          { id: 'leetcode', title: 'LeetCode problems', completed: false }
        ]
      },
      {
        id: 'specialization',
        title: '22. Specialized Areas',
        description: 'Explore Python specializations.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'web-dev', title: 'Web Development (Flask/Django)', completed: false },
          { id: 'data-science', title: 'Data Science (NumPy/Pandas)', completed: false },
          { id: 'automation', title: 'Automation (Selenium/PyAutoGUI)', completed: false }
        ]
      }
    ]
  }
];

const PythonFundamentals = () => {
  const [phases, setPhases] = useState(coursePhases.map(phase => ({ ...phase, expanded: false })));

  const togglePhase = (phaseId: string) => {
    setPhases(prevPhases =>
      prevPhases.map(phase => ({
        ...phase,
        expanded: phase.id === phaseId ? !phase.expanded : phase.expanded
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Python Fundamentals</h1>
            <p className="text-gray-400">
              A comprehensive course covering Python programming from basics to advanced concepts
            </p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">5% Complete</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[5%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">1 Topic Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">24 Topics Remaining</span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.id} className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 overflow-hidden">
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full p-6 text-left hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                          <Book className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{phase.title}</h3>
                          <p className="text-gray-400 text-sm">{phase.description}</p>
                        </div>
                      </div>
                      {phase.expanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Phase Content */}
                  {phase.expanded && (
                    <div className="border-t border-white/10">
                      {phase.topics.map((topic) => (
                        <div key={topic.id} className="p-6 border-b border-white/10 last:border-b-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${
                                topic.locked ? 'bg-gray-700/50' : 'bg-blue-500/20'
                              }`}>
                                {topic.locked ? (
                                  <Lock className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <Code className="w-5 h-5 text-blue-400" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">{topic.title}</h4>
                                {topic.description && (
                                  <p className="text-sm text-gray-400">{topic.description}</p>
                                )}
                              </div>
                            </div>
                            {!topic.locked && (
                              <Link
                                to={`/compiler`}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 flex items-center gap-2"
                              >
                                <Play className="w-4 h-4" />
                                <span>Start</span>
                              </Link>
                            )}
                          </div>

                          {/* Subtopics */}
                          {topic.subtopics && (
                            <div className="ml-12 space-y-3">
                              {topic.subtopics.map((subtopic) => (
                                <div
                                  key={subtopic.id}
                                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    {subtopic.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border border-gray-500" />
                                    )}
                                    <span className="text-sm">{subtopic.title}</span>
                                  </div>
                                  {!topic.locked && !subtopic.completed && (
                                    <Link
                                      to={`/compiler`}
                                      className="px-3 py-1 text-sm bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300"
                                    >
                                      Start
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PythonFundamentals;