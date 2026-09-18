import React, { useState } from 'react';

const RegisterPage = ({ onRegister, onNavigate }) => {
  const [form, setForm] = useState({ studentName: '', studentNumber: '', sectionNumber: '224', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match | كلمات المرور غير متطابقة');
      return;
    }
    if (form.studentNumber.length !== 8) {
      setError('Student number must be 8 digits | الرقم الجامعي يجب أن يكون 8 أرقام');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters | كلمة المرور يجب أن تكون 4 أحرف على الأقل');
      return;
    }

    setLoading(true);
    try {
      const result = await onRegister(form);
      if (result === true) {
        setSuccess('Registration successful! Redirecting... | تم التسجيل بنجاح! جاري التحويل...');
      } else {
        setError('Student number already exists | الرقم الجامعي مسجل مسبقاً');
      }
    } catch (err) {
      setError('Registration failed. Please try again. | فشل التسجيل. حاول مرة أخرى.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-xl">OOP</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Register</h1>
          <p className="text-violet-300/70 font-arabic">تسجيل حساب جديد</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm flex items-center gap-2"><span>❌</span> {error}</div>)}
          {success && (<div className="bg-violet-500/20 border border-violet-500/50 rounded-lg p-3 text-violet-300 text-sm flex items-center gap-2"><span>✅</span> {success}</div>)}
          
          <div>
            <label className="block text-slate-300 text-sm mb-2">Full Name | الاسم الكامل</label>
            <input type="text" value={form.studentName} onChange={(e) => setForm({...form, studentName: e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" required disabled={loading} />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-2">Student Number (8 digits) | الرقم الجامعي</label>
            <input type="text" value={form.studentNumber} onChange={(e) => setForm({...form, studentNumber: e.target.value.replace(/\D/g, '').slice(0, 8)})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" required disabled={loading} />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-2">Section | الشعبة</label>
            <select value={form.sectionNumber} onChange={(e) => setForm({...form, sectionNumber: e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" disabled={loading}>
              <option value="224">224</option>
              <option value="323">323</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-2">Password | كلمة المرور</label>
            <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" required disabled={loading} />
          </div>

          <div>
            <label className="block text-slate-300 text-sm mb-2">Confirm Password | تأكيد كلمة المرور</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" required disabled={loading} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Registering...</>) : ('Register | تسجيل')}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account? <button onClick={() => onNavigate('login')} className="text-violet-400 hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
