import { ArrowLeft, KeyRound, LifeBuoy, ShieldCheck, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import axios from 'axios';

import { requestPasswordReset, resetPassword } from '../../../../services';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const defaultEmail = useMemo(() => localStorage.getItem('pendingResetEmail') || '', []);

  const [email, setEmail] = useState(defaultEmail);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
  const [isBusy, setIsBusy] = useState(false);

  const handleRequestToken = () => {
    setMessage('');
    setMessageType('info');

    if (!email.trim()) {
      setMessage('Enter your email to request a reset token.');
      setMessageType('error');
      return;
    }

    setIsBusy(true);
    requestPasswordReset(email.trim())
      .then((response) => {
        localStorage.setItem('pendingResetEmail', email.trim());
        const maybeToken = response.data?.dev_reset_token;
        if (maybeToken) {
          setToken(maybeToken);
          setMessage(`Reset token generated. Token: ${maybeToken}`);
        } else {
          setMessage('Password reset instructions sent to your email.');
        }
        setMessageType('info');
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Unable to request password reset.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
        setMessageType('error');
      })
      .finally(() => setIsBusy(false));
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setMessageType('info');

    if (!token.trim()) {
      setMessage('Enter the reset token first.');
      setMessageType('error');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    setIsBusy(true);
    resetPassword(token.trim(), newPassword)
      .then(() => {
        localStorage.setItem('authFlashMessage', 'Password reset successful. Sign in with your new password.');
        localStorage.setItem('authFlashType', 'success');
        setMessage('Password reset successful. You can now sign in.');
        setMessageType('success');
        setToken('');
        setNewPassword('');
        setConfirmPassword('');
        localStorage.removeItem('pendingResetEmail');
        window.setTimeout(() => onNavigate('login'), 1200);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Unable to reset password.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
        setMessageType('error');
      })
      .finally(() => setIsBusy(false));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#f0f9ff_100%)] px-5 py-10 text-slate-900 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-3xl border border-amber-200 bg-slate-900 p-8 text-white shadow-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
            <Sparkles size={14} />
            Step 3 of 3
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
            <KeyRound className="text-white" size={28} />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight">Reset and get back to learning.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Update your password and return to your starter portfolio with confidence.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-200">
            {['Request a token in seconds', 'Set a stronger password', 'Keep your progress safe'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <ShieldCheck className="text-emerald-300" size={18} />
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="mb-8">
            <button onClick={() => onNavigate('login')} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600">
              <ArrowLeft size={16} /> Back to sign in
            </button>
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Reset your password</h3>
            <p className="mt-2 text-slate-600">Request a token, then set a new password securely.</p>
          </div>

          {message ? (
            <p
              className={`mb-4 rounded-2xl border px-4 py-3 text-sm font-medium ${
                messageType === 'error'
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : messageType === 'success'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {message}
            </p>
          ) : null}

          <div className="mb-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
            />
            <button
              type="button"
              onClick={handleRequestToken}
              disabled={isBusy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 font-bold text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <LifeBuoy size={18} />
              Request Reset Token
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Reset Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token here"
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <ShieldCheck size={18} />
              {isBusy ? 'Submitting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => onNavigate('login')} className="text-sm font-bold text-orange-600 hover:text-orange-700">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
