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
    title: 'Phase 1: Java Basics and Core Concepts',
    description: 'Master the fundamentals of the Java programming language and build a strong foundation.',
    topics: [
      {
        id: 'intro',
        title: '1. Introduction to Java Programming',
        description: 'Learn about Java installation, IDE setup, and write your first program.',
        completed: false,
        locked: false,
        subtopics: [
          { id: 'setup', title: 'Installing JDK and setting up the environment (Eclipse, IntelliJ, VS Code)', completed: false },
          { id: 'first-program', title: 'Writing your first Java program', completed: false },
          { id: 'compilation', title: 'Compilation and execution process', completed: false },
          { id: 'structure', title: 'Structure of a Java program', completed: false }
        ]
      },
      {
        id: 'data-types',
        title: '2. Data Types and Variables',
        description: 'Understanding Java data types, variables, and type modifiers.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'primitive-types', title: 'Primitive data types: int, float, char, boolean, double', completed: false },
          { id: 'modifiers', title: 'Type modifiers: short, long, byte', completed: false },
          { id: 'variables', title: 'Variable declaration and initialization', completed: false },
          { id: 'constants', title: 'Constants and literals', completed: false },
          { id: 'type-conversion', title: 'Type conversions and casting', completed: false }
        ]
      },
      {
        id: 'operators',
        title: '3. Control Flow and Operators',
        description: 'Learn about operators and control flow statements in Java.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'arithmetic', title: 'Arithmetic operators: +, -, *, /, %', completed: false },
          { id: 'relational', title: 'Relational operators: ==, !=, >, <, >=, <=', completed: false },
          { id: 'logical', title: 'Logical operators: &&, ||, !', completed: false },
          { id: 'control-flow', title: 'Control flow statements: if, else, switch', completed: false },
          { id: 'loops', title: 'Loops: for, while, do-while', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Working with Data Collections',
    description: 'Learn to store and manipulate collections of data in Java.',
    topics: [
      {
        id: 'arrays',
        title: '4. Arrays and Strings',
        description: 'Master arrays and string handling in Java.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'array-basics', title: 'Declaring and initializing arrays', completed: false },
          { id: 'array-ops', title: 'Array operations and manipulation', completed: false },
          { id: 'strings', title: 'String handling methods', completed: false },
          { id: 'string-builder', title: 'StringBuilder and StringBuffer', completed: false }
        ]
      },
      {
        id: 'collections',
        title: '5. Collections Framework',
        description: 'Working with Java collections and data structures.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'lists', title: 'ArrayList and LinkedList', completed: false },
          { id: 'sets-maps', title: 'HashSet and HashMap', completed: false },
          { id: 'iteration', title: 'Iterating over collections', completed: false },
          { id: 'algorithms', title: 'Sorting and searching in collections', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Object-Oriented Programming',
    description: 'Master object-oriented programming concepts in Java.',
    topics: [
      {
        id: 'oop-basics',
        title: '6. OOP Fundamentals',
        description: 'Learn core OOP concepts and their implementation.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'classes-objects', title: 'Classes and objects', completed: false },
          { id: 'constructors', title: 'Constructors and this keyword', completed: false },
          { id: 'inheritance', title: 'Inheritance and method overriding', completed: false },
          { id: 'polymorphism', title: 'Polymorphism and encapsulation', completed: false }
        ]
      },
      {
        id: 'advanced-oop',
        title: '7. Advanced OOP',
        description: 'Advanced object-oriented programming concepts.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'abstraction', title: 'Abstract classes and methods', completed: false },
          { id: 'interfaces', title: 'Interfaces and default methods', completed: false },
          { id: 'nested', title: 'Nested and inner classes', completed: false },
          { id: 'generics', title: 'Generics in Java', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Exception Handling and I/O',
    description: 'Learn to handle errors and perform input/output operations.',
    topics: [
      {
        id: 'exception-handling',
        title: '8. Exception Handling',
        description: 'Master error handling in Java.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'try-catch', title: 'Try-catch blocks', completed: false },
          { id: 'throw', title: 'Throwing exceptions', completed: false },
          { id: 'custom', title: 'Custom exceptions', completed: false },
          { id: 'finally', title: 'Finally block and resources', completed: false }
        ]
      },
      {
        id: 'io-operations',
        title: '9. Input/Output Operations',
        description: 'Working with files and I/O streams.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'file-io', title: 'File handling basics', completed: false },
          { id: 'streams', title: 'Input and output streams', completed: false },
          { id: 'readers-writers', title: 'Readers and writers', completed: false },
          { id: 'nio', title: 'NIO.2 file operations', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Multithreading and Concurrency',
    description: 'Understanding concurrent programming in Java.',
    topics: [
      {
        id: 'multithreading',
        title: '10. Multithreading Basics',
        description: 'Learn the basics of multithreading.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'threads', title: 'Creating and managing threads', completed: false },
          { id: 'runnable', title: 'Implementing Runnable interface', completed: false },
          { id: 'sync', title: 'Thread synchronization', completed: false },
          { id: 'deadlocks', title: 'Avoiding deadlocks', completed: false }
        ]
      },
      {
        id: 'concurrent-api',
        title: '11. Concurrent API',
        description: 'Advanced concurrency concepts.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'executor', title: 'Executor framework', completed: false },
          { id: 'futures', title: 'Future and CompletableFuture', completed: false },
          { id: 'collections', title: 'Concurrent collections', completed: false },
          { id: 'atomic', title: 'Atomic operations', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    title: 'Phase 6: Libraries and Tools',
    description: 'Working with essential Java libraries and development tools.',
    topics: [
      {
        id: 'standard-libs',
        title: '12. Standard Libraries',
        description: 'Essential Java standard libraries.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'date-time', title: 'Date and Time API', completed: false },
          { id: 'optional', title: 'Optional class', completed: false },
          { id: 'stream-api', title: 'Stream API', completed: false },
          { id: 'regex', title: 'Regular expressions', completed: false }
        ]
      },
      {
        id: 'dev-tools',
        title: '13. Development Tools',
        description: 'Tools for Java development.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'maven', title: 'Apache Maven basics', completed: false },
          { id: 'junit', title: 'Unit testing with JUnit', completed: false },
          { id: 'logging', title: 'Logging frameworks', completed: false },
          { id: 'debugging', title: 'Debugging techniques', completed: false }
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    title: 'Phase 7: Project Development',
    description: 'Apply your knowledge in real-world projects.',
    topics: [
      {
        id: 'projects',
        title: '14. Practical Projects',
        description: 'Build real-world applications.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'banking', title: 'Banking system project', completed: false },
          { id: 'todo', title: 'Todo list manager', completed: false },
          { id: 'inventory', title: 'Inventory management system', completed: false },
          { id: 'chat', title: 'Chat application', completed: false }
        ]
      },
      {
        id: 'best-practices',
        title: '15. Best Practices',
        description: 'Professional Java development practices.',
        completed: false,
        locked: true,
        subtopics: [
          { id: 'clean-code', title: 'Clean code principles', completed: false },
          { id: 'design-patterns', title: 'Common design patterns', completed: false },
          { id: 'git', title: 'Version control with Git', completed: false },
          { id: 'deployment', title: 'Application deployment', completed: false }
        ]
      }
    ]
  }
];

const JavaProgramming = () => {
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
            <h1 className="text-3xl font-bold mb-2">Java Programming Mastery</h1>
            <p className="text-gray-400">
              A comprehensive course covering Java programming from basics to advanced concepts
            </p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Course Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">0% Complete</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">0 Topics Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">15 Topics Remaining</span>
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
                                to="/compiler"
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
                                      to="/compiler"
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

export default JavaProgramming;