import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './HeldPrimaryButtonProveScreen.stories';

const { ReadyToProve, WaitingForScroll, NoSession } = composeStories(stories);

describe('HeldPrimaryButtonProveScreen', () => {
  it('renders ready to prove state', () => {
    const { container } = render(<ReadyToProve />);
    expect(container).toBeDefined();
  });

  it('renders waiting for scroll state', () => {
    const { container } = render(<WaitingForScroll />);
    expect(container).toBeDefined();
  });

  it('renders no session state', () => {
    const { container } = render(<NoSession />);
    expect(container).toBeDefined();
  });
});
