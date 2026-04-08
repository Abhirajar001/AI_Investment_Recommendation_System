import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { loginMock, setTokenMock, isAxiosErrorMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  setTokenMock: vi.fn(),
  isAxiosErrorMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    isAxiosError: isAxiosErrorMock,
  },
}));

vi.mock('../../../../services', () => ({
  authStorage: {
    setToken: setTokenMock,
  },
  login: loginMock,
}));

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  const onNavigate = vi.fn();

  const renderLoginPage = () => {
    render(<LoginPage onNavigate={onNavigate} />);
  };

  const fillLoginForm = ({
    email = 'user@example.com',
    password = 'secret123',
    mfa = '123456',
  }: {
    email?: string;
    password?: string;
    mfa?: string;
  }) => {
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });
    fireEvent.change(screen.getByLabelText(/mfa code/i), {
      target: { value: mfa },
    });
  };

  const submitLoginForm = () => {
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  };

  beforeEach(() => {
    onNavigate.mockClear();
    loginMock.mockReset();
    setTokenMock.mockReset();
    isAxiosErrorMock.mockReset();
    localStorage.clear();
  });

  it('renders the login page', () => {
    renderLoginPage();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mfa code/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', () => {
    renderLoginPage();
    submitLoginForm();

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('validates MFA code format', () => {
    renderLoginPage();
    fillLoginForm({ mfa: '12' });
    submitLoginForm();

    expect(screen.getByText(/mfa code must be a 6-digit number/i)).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('submits successfully and navigates to dashboard', async () => {
    loginMock.mockResolvedValueOnce({
      data: { access_token: 'token-123' },
    });

    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'User@Example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'secret123' },
    });

    submitLoginForm();

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('user@example.com', 'secret123', undefined);
    });

    expect(setTokenMock).toHaveBeenCalledWith('token-123');
    expect(localStorage.getItem('userEmail')).toBe('user@example.com');
    expect(onNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('submits with valid MFA code when provided', async () => {
    loginMock.mockResolvedValueOnce({
      data: { access_token: 'token-456' },
    });

    renderLoginPage();
    fillLoginForm({ mfa: '654321' });
    submitLoginForm();

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('user@example.com', 'secret123', '654321');
    });

    expect(setTokenMock).toHaveBeenCalledWith('token-456');
    expect(onNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('shows API error message on failed login', async () => {
    isAxiosErrorMock.mockReturnValue(true);
    loginMock.mockRejectedValueOnce({
      response: { data: { detail: 'Bad credentials' } },
    });

    renderLoginPage();
    fillLoginForm({ mfa: '' });
    submitLoginForm();

    expect(await screen.findByText(/bad credentials/i)).toBeInTheDocument();
  });

  it('handles API error without detail', async () => {
    isAxiosErrorMock.mockReturnValue(true);
    loginMock.mockRejectedValueOnce({
      response: { data: {} },
    });

    renderLoginPage();
    fillLoginForm({ mfa: '' });
    submitLoginForm();

    await waitFor(() => expect(loginMock).toHaveBeenCalled());
    expect(setTokenMock).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate when API times out', async () => {
    isAxiosErrorMock.mockReturnValue(true);
    loginMock.mockRejectedValueOnce({ code: 'ECONNABORTED', message: 'timeout' });

    renderLoginPage();
    fillLoginForm({});
    submitLoginForm();

    await waitFor(() => expect(loginMock).toHaveBeenCalled());
    expect(setTokenMock).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate if token is missing in success response', async () => {
    loginMock.mockResolvedValueOnce({
      data: {},
    });

    renderLoginPage();
    fillLoginForm({ mfa: '' });
    submitLoginForm();

    await waitFor(() => expect(loginMock).toHaveBeenCalled());
    expect(setTokenMock).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not submit when MFA code is invalid', async () => {
    renderLoginPage();
    fillLoginForm({ mfa: '12' });
    submitLoginForm();

    await waitFor(() => {
      expect(loginMock).not.toHaveBeenCalled();
    });
  });

  it('shows flash success message from storage and clears flash keys', () => {
    localStorage.setItem('authFlashMessage', 'Password reset successful');
    localStorage.setItem('authFlashType', 'success');

    renderLoginPage();

    expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
    expect(localStorage.removeItem).toHaveBeenCalledWith('authFlashMessage');
    expect(localStorage.removeItem).toHaveBeenCalledWith('authFlashType');
  });

  it('shows flash info style for unknown flash type', () => {
    localStorage.setItem('authFlashMessage', 'Heads up');
    localStorage.setItem('authFlashType', 'anything');

    renderLoginPage();

    expect(screen.getByText(/heads up/i)).toBeInTheDocument();
  });

  it('handles non-axios error with generic message', async () => {
    isAxiosErrorMock.mockReturnValue(false);
    loginMock.mockRejectedValueOnce(new Error('boom'));

    renderLoginPage();
    fillLoginForm({ mfa: '' });
    submitLoginForm();

    expect(await screen.findByText(/something went wrong\. please try again\./i)).toBeInTheDocument();
  });

  it('navigates to reset-password and stores pending email', () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'resetme@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /forgot password\?/i }));

    expect(localStorage.setItem).toHaveBeenCalledWith('pendingResetEmail', 'resetme@example.com');
    expect(onNavigate).toHaveBeenCalledWith('reset-password');
  });

  it('navigates to reset-password without storing email when empty', () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /forgot password\?/i }));

    expect(localStorage.setItem).not.toHaveBeenCalledWith('pendingResetEmail', expect.any(String));
    expect(onNavigate).toHaveBeenCalledWith('reset-password');
  });

  it('navigates via Sign Up and Back to Home buttons', () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    fireEvent.click(screen.getByRole('button', { name: /back to home/i }));

    expect(onNavigate).toHaveBeenCalledWith('signup');
    expect(onNavigate).toHaveBeenCalledWith('landing');
  });

  it('supports remember me toggle', () => {
    renderLoginPage();

    const checkbox = screen.getByLabelText(/remember me/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});