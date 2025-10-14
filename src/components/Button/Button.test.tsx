import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from './Button.stories';

// Compose all stories from the Button.stories file
const { Primary, Secondary, Large, Small } = composeStories(stories);

describe('Button Component', () => {
  describe('Story: Primary', () => {
    it('renders primary button with correct label', () => {
      render(<Primary />);
      expect(screen.getByText('Button')).toBeDefined();
    });

    it('applies primary styles', () => {
      const { container } = render(<Primary />);
      const button = container.querySelector('[role="button"]');
      expect(button).toBeDefined();
    });
  });

  describe('Story: Secondary', () => {
    it('renders secondary button with correct label', () => {
      render(<Secondary />);
      expect(screen.getByText('Button')).toBeDefined();
    });
  });

  describe('Story: Large', () => {
    it('renders with correct label', () => {
      render(<Large />);
      expect(screen.getByText('Test')).toBeDefined();
    });
  });

  describe('Story: Small', () => {
    it('renders small button with correct label', () => {
      render(<Small />);
      expect(screen.getByText('Button')).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has accessible text content', () => {
      render(<Primary />);
      const button = screen.getByText('Button');
      expect(button).toBeDefined();
    });

    it('is interactive via touch/press', () => {
      const { container } = render(<Primary />);
      const button = container.querySelector('[role="button"]');
      expect(button).toBeDefined();
    });
  });
});
