import React, { createContext, useContext, useState, useMemo } from 'react';
import { COLORS } from '../constants/theme';
import { INITIAL_LABS } from '../constants/labData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Global Theme State ('light' | 'dark')
  const [themeMode, setThemeMode] = useState('dark');

  // Global Student Pair Profile State
  const [profile, setProfile] = useState({
    student1: 'Alex Rivera',
    studentId1: '2023-10492',
    role1: 'Lead Frontend & State Architect',
    student2: 'Jordan Cruz',
    studentId2: '2023-10884',
    role2: 'UI/UX & Component Specialist',
    course: 'BS in Information Technology',
    section: 'BSIT 3-A',
    subject: 'Mobile Application Development',
    academicYear: 'AY 2026-2027',
    term: '1st Semester',
    repositoryUrl: 'https://github.com/pair-students/react-native-master-compilation',
  });

  // Global Labs Data State
  const [labs, setLabs] = useState(INITIAL_LABS);

  // Toggle Theme function
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Update Profile function
  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // Toggle Lab completion status
  const toggleLabStatus = (labId) => {
    setLabs((prevLabs) =>
      prevLabs.map((lab) => {
        if (lab.id === labId) {
          const nextStatus = lab.status === 'Completed' ? 'In Progress' : 'Completed';
          return {
            ...lab,
            status: nextStatus,
            grade: nextStatus === 'Completed' ? '100%' : 'Pending Review',
          };
        }
        return lab;
      })
    );
  };

  // Derived current color palette
  const colors = useMemo(() => COLORS[themeMode], [themeMode]);
  const isDark = themeMode === 'dark';

  // Derived statistics (reactive to lab status toggles)
  const stats = useMemo(() => {
    const total = labs.length;
    const completed = labs.filter((l) => l.status === 'Completed').length;
    const inProgress = labs.filter((l) => l.status === 'In Progress').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      inProgress,
      percent,
    };
  }, [labs]);

  const value = {
    themeMode,
    isDark,
    colors,
    toggleTheme,
    setThemeMode,
    profile,
    updateProfile,
    labs,
    toggleLabStatus,
    stats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook for consuming App Context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
