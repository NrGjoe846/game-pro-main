import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSystem from './components/AuthSystem';
import Dashboard from './components/Dashboard';
import ProfileDashboard from './components/profile/ProfileDashboard';
import CompilerPage from './components/compiler/CompilerPage';
import PythonFundamentals from './components/courses/PythonFundamentals';
import CProgramming from './components/courses/CProgramming';
import JavaProgramming from './components/courses/JavaProgramming';
import ChallengeCategories from './components/challenges/ChallengeCategories';
import LanguageSelection from './components/challenges/LanguageSelection';
import LevelSelection from './components/challenges/LevelSelection';
import DailyChallenge from './components/challenges/DailyChallenge';
import JavaChallenge from './components/challenges/JavaChallenge.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthSystem />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compiler"
            element={
              <ProtectedRoute>
                <CompilerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/python-fundamentals"
            element={
              <ProtectedRoute>
                <PythonFundamentals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/c-programming"
            element={
              <ProtectedRoute>
                <CProgramming />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/java-programming"
            element={
              <ProtectedRoute>
                <JavaProgramming />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <ChallengeCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/language-select"
            element={
              <ProtectedRoute>
                <LanguageSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/level-select"
            element={
              <ProtectedRoute>
                <LevelSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/daily"
            element={
              <ProtectedRoute>
                <DailyChallenge />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/java"
            element={
              <ProtectedRoute>
                <JavaChallenge />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;