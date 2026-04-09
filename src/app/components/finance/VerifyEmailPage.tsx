import { ArrowLeft, MailCheck, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import axios from 'axios';

import { resendVerification, verifyEmail } from '../../../../services';

interface VerifyEmailPageProps {
  onNavigate: (page: string) => void;
}

export function VerifyEmailPage({ onNavigate }: VerifyEmailPageProps) {
  const defaultEmail = useMemo(() => localStorage.getItem('pendingVerificationEmail') || '', []);

  const [email, setEmail] = useState(defaultEmail);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
  const [isBusy, setIsBusy] = useState(false);

  const handleVerify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setMessageType('info');

    if (!token.trim()) {
      setMessage('Enter verification token first.');
      setMessageType('error');
      return;
    }

    setIsBusy(true);
    verifyEmail(token.trim())
      .then(() => {
        localStorage.setItem('authFlashMessage', 'Email verified successfully. Sign in to continue.');
        localStorage.setItem('authFlashType', 'success');
        setMessage('Email verified successfully. You can now sign in.');
        setMessageType('success');
        localStorage.removeItem('pendingVerificationEmail');
        window.setTimeout(() => onNavigate('login'), 1200);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Verification failed.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
        setMessageType('error');
      })
      .finally(() => setIsBusy(false));
  };

  const handleResend = () => {
    setMessage('');
    setMessageType('info');

    if (!email.trim()) {
      setMessage('Enter your email to resend verification.');
      setMessageType('error');
      return;
    }

    setIsBusy(true);
    resendVerification(email.trim())
      .then((response) => {
        const maybeToken = response.data?.dev_verification_token;
        if (maybeToken) {
          setToken(maybeToken);
          setMessage(`Verification token resent. Token: ${maybeToken}`);
        } else {
          setMessage('Verification email resent. Check your inbox.');
        }
        setMessageType('info');
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Unable to resend verification email.');
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
            Step 2 of 3
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
            <MailCheck className="text-white" size={28} />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight">Verify and unlock your starter plan.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Verify your email so we can keep your account secure and send your first beginner-friendly investment roadmap.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-200">
            {['Secure account access', 'Keep your learning progress saved', 'Get onboarding tips by email'].map((item) => (
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
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Verify your email</h3>
            <p className="mt-2 text-slate-600">Enter the verification token sent to your inbox.</p>
          </div>

          <form className="space-y-4" onSubmit={handleVerify}>
            {message ? (
              <p
                className={`rounded-lg border px-4 py-3 text-sm ${
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Verification Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token here"
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <ShieldCheck size={18} />
              {isBusy ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleResend}
            disabled={isBusy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-3 font-bold text-slate-700 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw size={18} />
            Resend Verification
          </button>

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
