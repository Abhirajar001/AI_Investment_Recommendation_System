import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';

const { prefetchAuthenticatedRoutesMock, prefetchSidebarRouteMock } = vi.hoisted(() => ({
  prefetchAuthenticatedRoutesMock: vi.fn(),
  prefetchSidebarRouteMock: vi.fn(),
}));

vi.mock('../../routePrefetch', () => ({
  prefetchAuthenticatedRoutes: prefetchAuthenticatedRoutesMock,
  prefetchSidebarRoute: prefetchSidebarRouteMock,
}));

describe('Sidebar', () => {
  const onNavigate = vi.fn();

  beforeEach(() => {
    onNavigate.mockClear();
    prefetchAuthenticatedRoutesMock.mockClear();
    prefetchSidebarRouteMock.mockClear();
  });

  it('prefetches authenticated routes on mount', () => {
    render(<Sidebar currentPage="dashboard" onNavigate={onNavigate} />);

    expect(prefetchAuthenticatedRoutesMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/build your first portfolio/i)).toBeInTheDocument();
  });

  it('navigates and prefetches sidebar routes on hover and focus', () => {
    render(<Sidebar currentPage="dashboard" onNavigate={onNavigate} />);

    const recommendationsButton = screen.getByRole('button', { name: /ai recommendations/i });
    fireEvent.mouseEnter(recommendationsButton);
    fireEvent.focus(recommendationsButton);
    fireEvent.click(recommendationsButton);

    expect(prefetchSidebarRouteMock).toHaveBeenCalledWith('recommendations');
    expect(onNavigate).toHaveBeenCalledWith('recommendations');
  });
});
