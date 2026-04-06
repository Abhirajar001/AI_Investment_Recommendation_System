import { KeyRound, LifeBuoy, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

import { requestPasswordReset, resetPassword } from '../../../../services';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const handleRequestToken = () => {
    setMessage('');

    if (!email.trim()) {
      setMessage('Enter your email to request a reset token.');
      return;
    }

    setIsBusy(true);
    requestPasswordReset(email.trim())
      .then((response) => {
        const maybeToken = response.data?.dev_reset_token;
        if (maybeToken) {
          setToken(maybeToken);
          setMessage(`Reset token generated. Token: ${maybeToken}`);
        } else {
          setMessage('Password reset instructions sent to your email.');
        }
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Unable to request password reset.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
      })
      .finally(() => setIsBusy(false));
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!token.trim()) {
      setMessage('Enter the reset token first.');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsBusy(true);
    resetPassword(token.trim(), newPassword)
      .then(() => {
        setMessage('Password reset successful. You can now sign in.');
        setToken('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.detail || 'Unable to reset password.');
        } else {
          setMessage('Something went wrong. Please try again.');
        }
      })
      .finally(() => setIsBusy(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700">
            <KeyRound className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600">Request a token and set a new password securely.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {message ? (
            <p className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">{message}</p>
          ) : null}

          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleRequestToken}
              disabled={isBusy}
              className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LifeBuoy size={18} />
              Request Reset Token
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleResetPassword}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reset Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token here"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              {isBusy ? 'Submitting...' : 'Reset Password'}
            </button>
          </form>

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
