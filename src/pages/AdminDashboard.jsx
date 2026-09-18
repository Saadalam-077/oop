import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('oop_students').select('*').order('student_name');
    if (!error && data) setStudents(data);
    setLoading(false);
  };

  const calculateGrade = (progress) => {
    const scores = Object.values(progress || {}).filter(p => p.completed).map(p => p.score);
    if (scores.length === 0) return { grade: 'N/A', avg: 0 };
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    let grade = 'F';
    if (avg >= 95) grade = 'A+'; else if (avg >= 90) grade = 'A'; else if (avg >= 85) grade = 'B+';
    else if (avg >= 80) grade = 'B'; else if (avg >= 75) grade = 'C+'; else if (avg >= 70) grade = 'C';
    else if (avg >= 65) grade = 'D+'; else if (avg >= 60) grade = 'D';
    return { grade, avg };
  };

  const filteredStudents = filter === 'all' ? students : students.filter(s => s.section_number === filter);
  const sections = [...new Set(students.map(s => s.section_number))].sort();

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-violet-400';
    if (grade === 'B+' || grade === 'B') return 'text-blue-400';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-400';
    if (grade === 'D+' || grade === 'D') return 'text-orange-400';
    if (grade === 'F') return 'text-red-400';
    return 'text-slate-400';
  };

  const deleteStudent = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    const { error } = await supabase.from('oop_students').delete().eq('id', id);
    if (!error) setStudents(students.filter(s => s.id !== id));
  };

  const resetProgress = async (id, name) => {
    if (!confirm(`Reset all progress for ${name}?`)) return;
    const { error } = await supabase.from('oop_students').update({ progress: {} }).eq('id', id);
    if (!error) setStudents(students.map(s => s.id === id ? { ...s, progress: {} } : s));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900/30">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white font-black">👑</span></div>
              <div><h1 className="text-white font-bold">Admin Dashboard</h1><p className="text-violet-300/70 text-xs">OOP Course</p></div>
            </div>
            <button onClick={onLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Sections</h3>
            <p className="text-4xl font-bold text-violet-400">{sections.length}</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Completed Course</h3>
            <p className="text-4xl font-bold text-blue-400">{students.filter(s => Object.values(s.progress || {}).filter(p => p.completed).length >= 8).length}</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Average Score</h3>
            <p className="text-4xl font-bold text-yellow-400">{students.length > 0 ? Math.round(students.reduce((sum, s) => sum + calculateGrade(s.progress).avg, 0) / students.length) : 0}%</p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Students</h2>
            <div className="flex items-center gap-3">
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                <option value="all">All Sections</option>
                {sections.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
              <button onClick={fetchStudents} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg">Refresh</button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center"><div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div><p className="text-slate-400 mt-4">Loading students...</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredStudents.map((student) => {
                    const { grade, avg } = calculateGrade(student.progress);
                    const completedWeeks = Object.values(student.progress || {}).filter(p => p.completed).length;
                    return (
                      <tr key={student.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4"><div><p className="text-white font-medium">{student.student_name}</p><p className="text-slate-400 text-sm">{student.student_number}</p></div></td>
                        <td className="px-6 py-4"><span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">{student.section_number}</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-violet-500" style={{ width: `${(completedWeeks / 8) * 100}%` }} /></div>
                            <span className="text-slate-400 text-sm">{completedWeeks}/8</span>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className={`font-bold ${getGradeColor(grade)}`}>{grade}</span><span className="text-slate-500 text-sm ml-2">({avg}%)</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => resetProgress(student.id, student.student_name)} className="px-3 py-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded text-sm">Reset</button>
                            <button onClick={() => deleteStudent(student.id, student.student_name)} className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredStudents.length === 0 && <div className="p-12 text-center text-slate-400">No students found</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
