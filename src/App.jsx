import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import WeekLesson from './pages/WeekLesson';

const STORAGE_KEY = 'oopUser';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setCurrentPage('home');
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const calculateGrade = (progress) => {
    const scores = Object.values(progress).filter(p => p.completed).map(p => p.score);
    if (scores.length === 0) return { grade: 'N/A', avg: 0 };
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    let grade = 'F';
    if (avg >= 95) grade = 'A+';
    else if (avg >= 90) grade = 'A';
    else if (avg >= 85) grade = 'B+';
    else if (avg >= 80) grade = 'B';
    else if (avg >= 75) grade = 'C+';
    else if (avg >= 70) grade = 'C';
    else if (avg >= 65) grade = 'D+';
    else if (avg >= 60) grade = 'D';
    return { grade, avg };
  };

  const handleLogin = async (studentNumber, password) => {
    if (studentNumber === 'admin' && password === 'Saad@1234') {
      const adminUser = { isAdmin: true, studentName: 'Admin', studentNumber: 'admin' };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setCurrentPage('admin');
      return true;
    }

    try {
      const { data, error } = await supabase
        .from('oop_students')
        .select('*')
        .eq('student_number', studentNumber)
        .eq('password', password)
        .single();

      if (error || !data) return false;

      const progress = data.progress || {};
      const { grade, avg } = calculateGrade(progress);
      const userData = {
        id: data.id,
        studentName: data.student_name,
        studentNumber: data.student_number,
        sectionNumber: data.section_number,
        progress: progress,
        overallGrade: grade,
        totalScore: avg
      };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setCurrentPage('home');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const handleRegister = async (formData) => {
    try {
      const { data: existing } = await supabase
        .from('oop_students')
        .select('id')
        .eq('student_number', formData.studentNumber)
        .single();

      if (existing) return false;

      const { data, error } = await supabase
        .from('oop_students')
        .insert([{
          student_name: formData.studentName,
          student_number: formData.studentNumber,
          section_number: formData.sectionNumber,
          password: formData.password,
          progress: {}
        }])
        .select()
        .single();

      if (error) return false;

      const userData = {
        id: data.id,
        studentName: data.student_name,
        studentNumber: data.student_number,
        sectionNumber: data.section_number,
        progress: {},
        overallGrade: 'N/A',
        totalScore: 0
      };
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setTimeout(() => setCurrentPage('home'), 1500);
      return true;
    } catch (err) {
      console.error('Register error:', err);
      return false;
    }
  };

  const handleExerciseComplete = async (weekNum, score) => {
    if (!user || user.isAdmin) return;
    
    const newProgress = {
      ...user.progress,
      [`week${weekNum}`]: { completed: true, score, completedAt: new Date().toISOString() }
    };

    try {
      await supabase
        .from('oop_students')
        .update({ progress: newProgress })
        .eq('id', user.id);

      const { grade, avg } = calculateGrade(newProgress);
      const updatedUser = { ...user, progress: newProgress, overallGrade: grade, totalScore: avg };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'login') return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
  if (currentPage === 'register') return <RegisterPage onRegister={handleRegister} onNavigate={handleNavigate} />;
  if (currentPage === 'admin' && user?.isAdmin) return <AdminDashboard onLogout={handleLogout} />;
  if (currentPage === 'home' && user) return <HomePage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
  if (currentPage === 'profile' && user) return <ProfilePage user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
  if (currentPage.startsWith('week') && user) {
    const weekNum = parseInt(currentPage.replace('week', ''));
    return <WeekLesson weekNum={weekNum} user={user} onNavigate={handleNavigate} onExerciseComplete={handleExerciseComplete} onLogout={handleLogout} />;
  }

  return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
}

export default App;
