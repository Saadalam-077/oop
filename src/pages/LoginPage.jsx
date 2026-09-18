import React, { useState } from 'react';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await onLogin(studentNumber, password);
      if (!result) {
        setError('Invalid student number or password | الرقم الجامعي أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('Login failed. Please try again. | فشل تسجيل الدخول. حاول مرة أخرى.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900/30 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-xl">OOP</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Object Oriented Programming</h1>
          <p className="text-violet-300/70 font-arabic">البرمجة الشيئية</p>
          <p className="text-slate-400 text-sm mt-2">Taif University</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm flex items-center gap-2">
              <span>❌</span> {error}
            </div>
          )}
          
          <div>
            <label className="block text-slate-300 text-sm mb-2">Student Number | الرقم الجامعي</label>
            <input type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" placeholder="Enter student number" required disabled={loading} />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-2">Password | كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" placeholder="Enter password" required disabled={loading} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Logging in...</>) : ('Login | تسجيل الدخول')}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account? <button onClick={() => onNavigate('register')} className="text-violet-400 hover:underline">Register</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
