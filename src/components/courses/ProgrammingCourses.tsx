import React from 'react';
import { Code2, BookOpen, Trophy, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  xp: number;
  progress: number;
  language: string;
  chapters: Chapter[];
  path?: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: number;
  completed: number;
  unlocked: boolean;
}

const courses: Course[] = [
  {
    id: 'python-101',
    title: 'Python Fundamentals',
    description: 'Master Python basics to advanced concepts with hands-on projects',
    level: 'Beginner',
    duration: '8 weeks',
    xp: 1200,
    progress: 45,
    language: 'Python',
    path: '/courses/python-fundamentals',
    chapters: [
      {
        id: 'py-ch1',
        title: 'Getting Started with Python',
        lessons: 5,
        completed: 5,
        unlocked: true
      },
      {
        id: 'py-ch2',
        title: 'Data Types and Variables',
        lessons: 8,
        completed: 6,
        unlocked: true
      },
      {
        id: 'py-ch3',
        title: 'Control Flow and Loops',
        lessons: 10,
        completed: 0,
        unlocked: false
      }
    ]
  },
  {
    id: 'java-mastery',
    title: 'Java Programming Mastery',
    description: 'Learn Java from ground up with object-oriented principles',
    level: 'Intermediate',
    duration: '12 weeks',
    xp: 1500,
    progress: 25,
    language: 'Java',
    path: '/courses/java-programming',
    chapters: [
      {
        id: 'java-ch1',
        title: 'Java Basics and Environment Setup',
        lessons: 6,
        completed: 6,
        unlocked: true
      },
      {
        id: 'java-ch2',
        title: 'Object-Oriented Programming',
        lessons: 12,
        completed: 3,
        unlocked: true
      }
    ]
  },
  {
    id: 'c-programming',
    title: 'C Programming Journey',
    description: 'Deep dive into system programming with C',
    level: 'Advanced',
    duration: '10 weeks',
    xp: 2000,
    progress: 10,
    language: 'C',
    path: '/courses/c-programming',
    chapters: [
      {
        id: 'c-ch1',
        title: 'Introduction to C',
        lessons: 5,
        completed: 2,
        unlocked: true
      },
      {
        id: 'c-ch2',
        title: 'Memory Management',
        lessons: 8,
        completed: 0,
        unlocked: false
      }
    ]
  }
];

const ProgrammingCourses = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Programming Courses</h2>
        <p className="text-gray-400">Master your coding skills with our interactive courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <div className="relative backdrop-blur-md bg-white/10 rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Course Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Chapters Preview */}
                <div className="space-y-3 mb-6">
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        chapter.unlocked ? 'bg-white/10' : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium">{chapter.title}</p>
                          <p className="text-xs text-gray-400">
                            {chapter.completed}/{chapter.lessons} lessons
                          </p>
                        </div>
                      </div>
                      {chapter.unlocked ? (
                        <Trophy className={`w-4 h-4 ${
                          chapter.completed === chapter.lessons ? 'text-yellow-400' : 'text-gray-600'
                        }`} />
                      ) : (
                        <div className="w-4 h-4 text-gray-600">🔒</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Course Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{course.xp} XP</span>
                  </div>
                  {course.path ? (
                    <Link
                      to={course.path}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      className="px-4 py-2 bg-gray-500/50 cursor-not-allowed rounded-lg"
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingCourses;