import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LandingPage } from './LandingPage';

const { prefetchLandingRoutesMock, prefetchPublicRouteMock } = vi.hoisted(() => ({
  prefetchLandingRoutesMock: vi.fn(),
  prefetchPublicRouteMock: vi.fn(),
}));

vi.mock('../../routePrefetch', () => ({
  prefetchLandingRoutes: prefetchLandingRoutesMock,
  prefetchPublicRoute: prefetchPublicRouteMock,
}));

describe('LandingPage', () => {
  const onNavigate = vi.fn();

  beforeEach(() => {
    onNavigate.mockClear();
    prefetchLandingRoutesMock.mockClear();
    prefetchPublicRouteMock.mockClear();
  });

  it('renders the hero content and prefetches landing routes on mount', async () => {
    render(<LandingPage onNavigate={onNavigate} />);

    expect(screen.getByText(/investment journey/i)).toBeInTheDocument();
    await waitFor(() => expect(prefetchLandingRoutesMock).toHaveBeenCalledTimes(1));
  });

  it('navigates to login and signup and prefetches on hover', () => {
    render(<LandingPage onNavigate={onNavigate} />);

    fireEvent.mouseEnter(screen.getByRole('button', { name: /login/i }));
    fireEvent.focus(screen.getByRole('button', { name: /join free/i }));
    fireEvent.click(screen.getByRole('button', { name: /start in 2 minutes/i }));

    expect(prefetchPublicRouteMock).toHaveBeenCalledWith('login');
    expect(prefetchPublicRouteMock).toHaveBeenCalledWith('signup');
    expect(onNavigate).toHaveBeenCalledWith('signup');
  });

  it('exposes accessible navigation and primary actions', () => {
    render(<LandingPage onNavigate={onNavigate} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join free/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start in 2 minutes/i })).toBeInTheDocument();
  });
});
