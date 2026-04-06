import { MailCheck, RefreshCw, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700">
            <MailCheck className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">Enter the verification token sent to your inbox.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token here"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              {isBusy ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleResend}
            disabled={isBusy}
            className="mt-4 w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Resend Verification
          </button>

          <div className="text-center mt-6">
            <button onClick={() => onNavigate('login')} className="text-blue-600 hover:text-blue-700 font-semibold">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
