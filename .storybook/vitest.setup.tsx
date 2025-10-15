import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import type React from 'react';
import { vi } from 'vitest';
import * as projectAnnotations from './preview';

// Type definitions for mock components
interface MockButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  [key: string]: unknown;
}

interface MockHeldButtonProps {
  children?: React.ReactNode;
  onLongPress?: () => void;
  [key: string]: unknown;
}

interface MockProveButtonProps {
  onVerify?: () => void;
  [key: string]: unknown;
}

interface MockTextProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface MockFlagProps {
  countryCode?: string;
  [key: string]: unknown;
}

// Mock @selfxyz/mobile-sdk-alpha components for testing
vi.mock('@selfxyz/mobile-sdk-alpha/components', () => ({
  // Mock all button components
  AbstractButton: ({ children, onPress, ...props }: MockButtonProps) => (
    <button type="button" onClick={onPress} {...props}>
      {children}
    </button>
  ),
  PrimaryButton: ({ children, onPress, ...props }: MockButtonProps) => (
    <button type="button" className="primary" onClick={onPress} {...props}>
      {children}
    </button>
  ),
  SecondaryButton: ({ children, onPress, ...props }: MockButtonProps) => (
    <button type="button" className="secondary" onClick={onPress} {...props}>
      {children}
    </button>
  ),
  HeldPrimaryButton: ({ children, onLongPress, ...props }: MockHeldButtonProps) => (
    <button type="button" className="held-primary" onMouseDown={onLongPress} {...props}>
      {children}
    </button>
  ),
  HeldPrimaryButtonProveScreen: ({ onVerify, ...props }: MockProveButtonProps) => (
    <button type="button" className="held-prove" onClick={onVerify} {...props}>
      Generate Proof
    </button>
  ),
  // Mock text components
  Title: ({ children, ...props }: MockTextProps) => <h1 {...props}>{children}</h1>,
  SubHeader: ({ children, ...props }: MockTextProps) => <h2 {...props}>{children}</h2>,
  BodyText: ({ children, ...props }: MockTextProps) => <p {...props}>{children}</p>,
  Caption: ({ children, ...props }: MockTextProps) => (
    <span className="caption" {...props}>
      {children}
    </span>
  ),
  Additional: ({ children, ...props }: MockTextProps) => (
    <span className="additional" {...props}>
      {children}
    </span>
  ),
  Description: ({ children, ...props }: MockTextProps) => (
    <p className="description" {...props}>
      {children}
    </p>
  ),
  DescriptionTitle: ({ children, ...props }: MockTextProps) => (
    <h3 className="description-title" {...props}>
      {children}
    </h3>
  ),
  Caution: ({ children, ...props }: MockTextProps) => (
    <div className="caution" {...props}>
      {children}
    </div>
  ),
  // Mock other components
  RoundFlag: ({ countryCode, ...props }: MockFlagProps) => (
    <div className="round-flag" data-country={countryCode} {...props}>
      {countryCode}
    </div>
  ),
}));

// Mock @selfxyz/mobile-sdk-alpha for tests
// Note: preview.tsx uses these in decorators, so we need to mock them
vi.mock('@selfxyz/mobile-sdk-alpha', () => ({
  useSelfClient: () => ({
    trackEvent: vi.fn(),
  }),
  createListenersMap: () => ({
    map: new Map(),
    addListener: vi.fn(),
  }),
  defaultConfig: {
    timeouts: { scanMs: 60000 },
    features: {},
  },
  SelfClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock requireNativeComponent for React Native components
vi.mock('react-native', async () => {
  const actual = await vi.importActual<typeof import('react-native-web')>('react-native-web');
  return {
    ...actual,
    requireNativeComponent: vi.fn((name: string) => {
      // Return a mock component that renders a div with the component name
      return ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
        <div data-native-component={name} {...props}>
          {children}
        </div>
      );
    }),
  };
});

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
