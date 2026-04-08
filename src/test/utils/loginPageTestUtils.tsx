import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../../app/components/finance/LoginPage';

export const renderLoginPage = (onNavigate: ReturnType<typeof vi.fn>) => {
  render(<LoginPage onNavigate={onNavigate} />);
};

export const fillLoginForm = ({
  email = 'user@example.com',
  password = 'secret123',
  mfa = '123456',
}: {
  email?: string;
  password?: string;
  mfa?: string;
}) => {
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/mfa code/i), { target: { value: mfa } });
};

export const submitLoginForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
};