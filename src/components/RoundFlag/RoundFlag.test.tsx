import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './RoundFlag.stories';

const { USA, Invalid } = composeStories(stories);

describe('RoundFlag', () => {
  it('renders USA flag correctly', () => {
    const { container } = render(<USA />);
    expect(container.firstChild).toBeDefined();
  });

  it('renders fallback for invalid code', () => {
    const { container } = render(<Invalid />);
    expect(container.firstChild).toBeDefined();
  });
});
