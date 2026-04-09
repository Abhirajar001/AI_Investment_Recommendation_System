import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileSectionSwitcher } from './MobileSectionSwitcher';

const { prefetchSidebarRouteMock } = vi.hoisted(() => ({
  prefetchSidebarRouteMock: vi.fn(),
}));

vi.mock('../../routePrefetch', () => ({
  prefetchSidebarRoute: prefetchSidebarRouteMock,
}));

describe('MobileSectionSwitcher', () => {
  const onNavigate = vi.fn();

  beforeEach(() => {
    onNavigate.mockClear();
    prefetchSidebarRouteMock.mockClear();
  });

  it('renders current section badge and primary controls', () => {
    render(<MobileSectionSwitcher currentPage="market-trends" onNavigate={onNavigate} />);

    expect(screen.getByText(/your starter workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/market trends/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ideas/i })).toBeInTheDocument();
  });

  it('prefetches and navigates when a section is interacted with', () => {
    render(<MobileSectionSwitcher currentPage="dashboard" onNavigate={onNavigate} />);

    const ideasButton = screen.getByRole('button', { name: /ideas/i });

    fireEvent.mouseEnter(ideasButton);
    fireEvent.focus(ideasButton);
    fireEvent.click(ideasButton);

    expect(prefetchSidebarRouteMock).toHaveBeenCalledWith('recommendations');
    expect(onNavigate).toHaveBeenCalledWith('recommendations');
  });
});
