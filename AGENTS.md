# AI Agent Development Guidelines

This document provides instructions for AI coding assistants (Cursor, GitHub Copilot, etc.) working on this Storybook project with designer-developers.

## 🎯 Primary Goal

Help designer-developers create high-quality React Native components that work seamlessly on both web and mobile with minimal errors.

## ✅ Quality Gates (CRITICAL)

Before marking any component work as complete, you MUST:

```bash
yarn validate
```

This single command runs:
1. `yarn nice` - Lint and format with Biome (auto-fixes issues)
2. `yarn types` - TypeScript type checking
3. `yarn test:run` - Run all tests

**All three must pass with zero errors before work is considered complete.**

## 📋 Component Development Workflow

### 1. Create Component File Structure

```
src/components/ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx    # Vitest tests
└── index.ts                  # Export file
```

### 2. Component Implementation (.tsx)

**Use React Native primitives:**
- `View` instead of `div`
- `Text` instead of `span`, `p`, `h1`, etc.
- `TouchableOpacity` or `Pressable` instead of `button`
- `StyleSheet.create()` for styles
- `Image` from `react-native` for images

**TypeScript Requirements:**
- Define proper `Props` interface with JSDoc comments
- Export interface for reusability
- Use `React.FC<PropsType>` for component typing
- Provide default values for optional props

**Example:**
```tsx
import type React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface MyComponentProps {
  /**
   * The label to display
   */
  label: string;
  /**
   * Optional callback when pressed
   */
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  label,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // styles here
});
```

### 3. Storybook Stories (.stories.tsx)

**Requirements:**
- Use `satisfies Meta<typeof Component>` pattern
- Include JSDoc descriptions for stories
- Set up proper argTypes with controls
- Add `tags: ['autodocs']` for auto-documentation
- Use `fn()` from `@storybook/test` for action handlers

**Example:**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'React Native/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of what this component does.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onPress: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing basic usage
 */
export const Default: Story = {
  args: {
    label: 'Click me',
  },
};
```

### 4. Component Tests (.test.tsx)

**Use Storybook Portable Stories pattern:**
- Import and compose stories for testing
- Test each story variant
- Include accessibility checks
- Use Vitest and Testing Library

**Example:**
```tsx
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from './MyComponent.stories';

const { Default } = composeStories(stories);

describe('MyComponent', () => {
  it('renders with correct label', () => {
    render(<Default />);
    expect(screen.getByText('Click me')).toBeDefined();
  });
});
```

### 5. Index Export (index.ts)

```tsx
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

## 🚨 Common Pitfalls & Solutions

### React Native vs Web Differences

| ❌ Wrong (Web) | ✅ Correct (React Native) |
|----------------|---------------------------|
| `<div>` | `<View>` |
| `<span>`, `<p>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `style={{...}}` directly | `StyleSheet.create()` |
| `className` | `style` prop |
| CSS strings | Style objects |

### Style Props Typing

```tsx
// ❌ Wrong
const buttonStyle = [styles.button, customStyle];

// ✅ Correct
import type { ViewStyle } from 'react-native';

const buttonStyle: ViewStyle[] = [
  styles.button,
  customStyle,
].filter(Boolean) as ViewStyle[];
```

### Conditional Styles

```tsx
// ✅ Good pattern
const containerStyle: ViewStyle[] = [
  styles.container,
  isActive && styles.active,
  customStyle && { ...customStyle },
].filter(Boolean) as ViewStyle[];
```

## 🎨 Design System Best Practices

### Accessibility First
- Always include descriptive labels
- Use semantic component structure
- Test with Storybook's a11y addon (installed)
- Ensure sufficient color contrast
- Provide keyboard/touch interaction

### Figma → Component Translation

When working with Figma MCP:
1. **Extract design tokens** (colors, spacing, typography)
2. **Identify component hierarchy** (Views, Texts, Touchables)
3. **Create prop interface** matching Figma variants
4. **Implement styles** using StyleSheet
5. **Add stories** for each Figma variant
6. **Write tests** ensuring variants render correctly

### Prop Naming Conventions

- Use `onPress` not `onClick` (React Native convention)
- Use `label` or `title` for text content
- Use `variant` for style variants
- Use `size` for size variants
- Boolean props: `isDisabled`, `isActive`, `isLoading`

## 🛠 Development Commands

```bash
# Development
yarn storybook          # Start Storybook dev server
yarn dev                # Start Vite dev server

# Package Management
yarn install            # Install dependencies (REQUIRED after adding new packages)
yarn add <package>      # Add new dependency (always run yarn install after)
yarn add -D <package>   # Add dev dependency (always run yarn install after)

# Quality Checks
yarn nice               # Lint + format (auto-fix)
yarn types              # Type check
yarn test               # Run tests in watch mode
yarn test:run           # Run tests once
yarn test:coverage      # Run tests with coverage

# Validation (run before completing work)
yarn validate           # Run all quality checks
yarn ci                 # Same as validate, for CI

# Build
yarn build              # Build app
yarn build-storybook    # Build Storybook
```

## 📝 Commit Message Guidelines

When making commits on behalf of designer-developers:

```
feat: add Button component with variants

- Implement Button with primary/secondary variants
- Add Storybook stories with controls
- Include accessibility tests
- All quality gates passing ✅
```

## 🔍 Debugging Common Errors

### TypeScript Errors

```bash
yarn types              # See all type errors
```

Common fixes:
- Add missing type imports
- Define proper interfaces for props
- Use type assertions carefully with `as`
- Check React Native type definitions

### Linter Errors

```bash
yarn nice               # Auto-fix most issues
```

If issues persist:
- Check biome.json configuration
- Ensure proper imports organization
- Remove unused variables/imports

### Test Failures

```bash
yarn test               # Watch mode for debugging
```

Common issues:
- Missing test setup (check vitest.setup.ts)
- Incorrect story imports
- Missing Testing Library queries
- React Native Web not rendering correctly

## 📦 File Organization

```
src/
├── components/
│   ├── ComponentA/
│   │   ├── ComponentA.tsx
│   │   ├── ComponentA.stories.tsx
│   │   ├── ComponentA.test.tsx
│   │   └── index.ts
│   ├── ComponentB/
│   │   └── ...
│   └── index.ts              # Barrel export
├── App.tsx
└── main.tsx
```

## 🎓 Learning Resources

- **React Native Docs**: https://reactnative.dev/docs/components-and-apis
- **React Native Web**: https://necolas.github.io/react-native-web/
- **Storybook React**: https://storybook.js.org/docs/react/get-started/introduction
- **Vitest**: https://vitest.dev/guide/
- **Testing Library**: https://testing-library.com/docs/react-testing-library/intro/

## 📦 Adding New Packages

**CRITICAL: Always run `yarn install` after adding packages to package.json**

When adding new functionality that requires packages:

1. Add package to `package.json` dependencies or devDependencies
2. **Run `yarn install`** to install and update lock file
3. Verify the package works as expected
4. Run `yarn validate` to ensure no conflicts

**Example workflow:**
```bash
# Add a new package
yarn add react-native-gesture-handler

# Or manually edit package.json, then:
yarn install

# Verify it works
yarn validate
```

**Why this matters:**
- Updates `yarn.lock` with exact versions
- Ensures dependencies resolve correctly
- Catches peer dependency issues early
- Prevents "module not found" errors in development

## ⚡ Quick Reference

**Must-have for every component:**
1. ✅ TypeScript Props interface with JSDoc
2. ✅ React Native primitives (View, Text, etc.)
3. ✅ Storybook story with controls
4. ✅ Test file with story composition
5. ✅ Export in index.ts
6. ✅ `yarn validate` passes

**Before saying "done":**
```bash
yarn validate
```

If this passes, the component is ready! 🎉

