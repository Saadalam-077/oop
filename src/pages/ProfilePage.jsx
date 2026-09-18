import React from 'react';

const ProfilePage = ({ user, onNavigate, onLogout }) => {
  const completedWeeks = Object.entries(user.progress).filter(([key, val]) => val.completed).length;

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-violet-400';
    if (grade === 'B+' || grade === 'B') return 'text-blue-400';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-400';
    if (grade === 'D+' || grade === 'D') return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900/30">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-slate-400 hover:text-white"><span>←</span> Back to Course</button>
            <button onClick={onLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-violet-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold">{user.studentName.charAt(0)}</div>
            <div>
              <h1 className="text-3xl font-bold text-white">{user.studentName}</h1>
              <p className="text-slate-400">Student ID: {user.studentNumber}</p>
              <p className="text-violet-400">Section: {user.sectionNumber}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-xl p-5 text-center">
              <p className="text-slate-400 text-sm mb-2">Overall Grade</p>
              <p className={`text-4xl font-bold ${getGradeColor(user.overallGrade)}`}>{user.overallGrade}</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-5 text-center">
              <p className="text-slate-400 text-sm mb-2">Average Score</p>
              <p className="text-4xl font-bold text-white">{user.totalScore}%</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-5 text-center">
              <p className="text-slate-400 text-sm mb-2">Progress</p>
              <p className="text-4xl font-bold text-violet-400">{completedWeeks}/8</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Week Progress | تقدم الأسابيع</h2>
          <div className="space-y-3">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((week) => {
              const weekData = user.progress[`week${week}`];
              const isCompleted = weekData?.completed;
              const score = weekData?.score || 0;
              return (
                <div key={week} className={`flex items-center justify-between p-4 rounded-xl ${isCompleted ? 'bg-violet-900/30 border border-violet-500/30' : 'bg-slate-700/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-violet-600' : 'bg-slate-600'}`}>{isCompleted ? '✓' : week}</div>
                    <span className="text-white">Week {week}</span>
                  </div>
                  {isCompleted ? (<span className={`font-bold ${score >= 90 ? 'text-violet-400' : score >= 75 ? 'text-blue-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{score}%</span>) : (<span className="text-slate-500">Not completed</span>)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
