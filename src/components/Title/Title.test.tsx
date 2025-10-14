import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Title.stories';

const { Default, Large, MultiLine } = composeStories(stories);

describe('Title', () => {
  it('renders default variant correctly', () => {
    render(<Default />);
    expect(screen.getByText('Welcome Back')).toBeDefined();
  });

  it('renders large variant correctly', () => {
    render(<Large />);
    expect(screen.getByText('Get Started')).toBeDefined();
  });

  it('renders multi-line text correctly', () => {
    render(<MultiLine />);
    expect(screen.getByText('Prove Your Identity Securely')).toBeDefined();
  });
});
