import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { useMediaQuery } from '.';

type MockMediaQueryListEvent = Pick<MediaQueryListEvent, 'matches' | 'media'>;

class MockMediaQueryList {
  matches = false;

  media: string;

  onchange: ((this: MediaQueryList, ev: MockMediaQueryListEvent) => any) | null = null;

  private listeners = new Set<(event: MockMediaQueryListEvent) => void>();

  constructor(media: string) {
    this.media = media;
  }

  addEventListener(_: 'change', listener: (event: MockMediaQueryListEvent) => void) {
    this.listeners.add(listener);
  }

  removeEventListener(_: 'change', listener: (event: MockMediaQueryListEvent) => void) {
    this.listeners.delete(listener);
  }

  dispatch(matches: boolean) {
    this.matches = matches;
    const event: MockMediaQueryListEvent = { matches, media: this.media };
    this.listeners.forEach((listener) => listener(event));
    this.onchange?.call(this as MediaQueryList, event);
  }
}

const mediaQueryLists = new Map<string, MockMediaQueryList>();

function getMediaQueryList(query: string) {
  let mediaQueryList = mediaQueryLists.get(query);
  if (!mediaQueryList) {
    mediaQueryList = new MockMediaQueryList(query);
    mediaQueryLists.set(query, mediaQueryList);
  }

  return mediaQueryList;
}

function Demo({ query }: { query: string }) {
  const matched = useMediaQuery(query);
  return <div>{matched ? 'matched' : 'unmatched'}</div>;
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    mediaQueryLists.clear();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn((query: string) => getMediaQueryList(query) as unknown as MediaQueryList),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns current query state', async () => {
    getMediaQueryList('(max-width: 767px)').matches = true;
    render(<Demo query="(max-width: 767px)" />);
    await screen.findByText('matched');
  });

  it('updates when query state changes', async () => {
    render(<Demo query="(prefers-color-scheme: dark)" />);
    await screen.findByText('unmatched');

    act(() => {
      getMediaQueryList('(prefers-color-scheme: dark)').dispatch(true);
    });
    await screen.findByText('matched');
  });
});
