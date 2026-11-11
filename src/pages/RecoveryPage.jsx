import React, { useState } from 'react';

const RecoveryPage = ({ onRecover, onNavigate }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!/^\d{8}$/.test(studentNumber)) return setError('Student number must be 8 digits | الرقم الجامعي يجب أن يتكون من 8 أرقام');
    if (!recoveryCode.trim()) return setError('Enter the recovery code | أدخل رمز الاستعادة');
    if (password.length < 8) return setError('Password must be at least 8 characters | كلمة المرور يجب ألا تقل عن 8 أحرف');
    if (password !== confirmPassword) return setError('Passwords do not match | كلمتا المرور غير متطابقتين');

    setLoading(true);
    try {
      const result = await onRecover(studentNumber, recoveryCode, password);
      if (result) {
        setSuccess('Password changed successfully. You can now log in. | تم تغيير كلمة المرور بنجاح، يمكنك تسجيل الدخول الآن.');
        setRecoveryCode('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('The student number or recovery code is incorrect, or the code has already been used. | الرقم الجامعي أو رمز الاستعادة غير صحيح، أو سبق استخدام الرمز.');
      }
    } catch {
      setError('Recovery failed. Please try again. | تعذرت الاستعادة، حاول مرة أخرى.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900/30 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4"><span className="text-white font-black text-xl">OOP</span></div>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-violet-300/70 font-arabic">استعادة كلمة المرور</p>
          <p className="text-slate-400 text-sm mt-3">Use your student number and the recovery code.</p>
          <p className="text-slate-400 text-sm font-arabic">أدخل رقمك الجامعي ورمز الاستعادة المخصص لك.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">❌ {error}</div>}
          {success && <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-300 text-sm">✅ {success}</div>}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Student Number | الرقم الجامعي</label>
            <input value={studentNumber} onChange={e => setStudentNumber(e.target.value.replace(/\D/g, '').slice(0, 8))} inputMode="numeric" maxLength={8} required disabled={loading} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" placeholder="8 digits" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-2">Recovery Code | رمز الاستعادة</label>
            <input value={recoveryCode} onChange={e => setRecoveryCode(e.target.value.replace(/\s/g, ''))} autoComplete="off" required disabled={loading} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500 font-mono" placeholder="Recovery code" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-2">New Password | كلمة المرور الجديدة</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} autoComplete="new-password" required disabled={loading} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-2">Confirm Password | تأكيد كلمة المرور</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} autoComplete="new-password" required disabled={loading} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Resetting... | جارٍ التغيير...' : 'Reset Password | تغيير كلمة المرور'}</button>
        </form>
        <p className="text-center text-slate-400 mt-6"><button onClick={() => onNavigate('login')} className="text-violet-400 hover:underline">Back to Login | العودة لتسجيل الدخول</button></p>
      </div>
    </div>
  );
};

export default RecoveryPage;
