import React, { createContext, useContext, useState, useMemo } from 'react';
import { COLORS } from '../constants/theme';
import { INITIAL_LABS } from '../constants/labData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Global Theme State ('light' | 'dark')
  const [themeMode, setThemeMode] = useState('dark');

  // Global Student Pair Profile State
  const [profile, setProfile] = useState({
    student1: 'RM',
    studentId1: '1005742',
    student2: 'Belle',
    studentId2: '1006592',
    course: 'BS in Computer Science',
    section: 'BSCS 4B',
    subject: 'Mobile Computing 2',
    academicYear: 'AY 2026-2027',
    term: '1st Semester',
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
