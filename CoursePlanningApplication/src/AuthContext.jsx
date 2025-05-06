import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudentState] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('student');
    if (stored) {
      setStudentState(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when student changes
  const setStudent = (data) => {
    setStudentState(data);
    localStorage.setItem('student', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ student, setStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
