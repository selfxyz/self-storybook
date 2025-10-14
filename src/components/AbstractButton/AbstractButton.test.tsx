import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as stories from './AbstractButton.stories';

// Mock SelfClient context
vi.mock('@selfxyz/mobile-sdk-alpha', () => ({
  useSelfClient: () => ({ trackEvent: vi.fn() }),
  AbstractButton: ({ children, onPress, ...props }: Record<string, unknown>) => (
    <button type="button" onClick={onPress as () => void} {...props}>
      {children as React.ReactNode}
    </button>
  ),
}));

const { Default } = composeStories(stories);

describe('AbstractButton', () => {
  it('renders correctly', () => {
    render(<Default />);
    expect(screen.getByText('Custom Button')).toBeDefined();
  });
});
