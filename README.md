# self-storybook

Storybook configured for React Native components using React Native Web. Built for designer-developers working with Cursor AI and Figma MCP.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start Storybook development server
yarn storybook

# Start Vite dev server (for app)
yarn dev
```

Visit `http://localhost:6006` to view Storybook.

## 🎨 Designer-Developer Workflow

### Figma → Component → Story → Test

1. **Design in Figma**: Create or receive component designs
2. **Use Figma MCP**: Extract design tokens and component structure via Cursor
3. **Implement Component**: Build using React Native primitives
4. **Create Stories**: Document variants and states in Storybook
5. **Write Tests**: Ensure components work as expected
6. **Validate**: Run `yarn validate` before considering work complete

## 📋 Development Commands

### Core Development

```bash
yarn install            # Install dependencies (run after cloning or adding packages)
yarn storybook          # Start Storybook dev server (port 6006)
yarn dev                # Start Vite dev server for app
yarn build              # Build production app
yarn build-storybook    # Build static Storybook
yarn preview-storybook  # Preview built Storybook
```

### Quality Checks

```bash
# Individual checks
yarn nice               # Lint + format with auto-fix (Biome)
yarn types              # TypeScript type checking
yarn test               # Run tests in watch mode
yarn test:run           # Run tests once (CI mode)
yarn test:coverage      # Run tests with coverage report

# Combined validation (REQUIRED before commits)
yarn validate           # Runs: nice + types + test:run
yarn ci                 # Same as validate, for CI/CD
```

### ✅ Before You Commit

**Always run:**
```bash
yarn validate
```

This ensures:
- ✅ Code is properly formatted (Biome)
- ✅ No linting errors
- ✅ No TypeScript errors
- ✅ All tests pass

**All checks must pass before work is considered complete.**

## 🧩 Component Structure

### File Organization

Create components in `src/components/` with this structure:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Vitest tests
└── index.ts                   # Exports
```

### Example Component

**ComponentName.tsx**
```tsx
import type React from 'react';
import { StyleSheet, Text, TouchableOpacity, type ViewStyle } from 'react-native';

export interface ComponentNameProps {
  /** Button text to display */
  label: string;
  /** Optional press handler */
  onPress?: () => void;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  label,
  onPress,
  variant = 'primary',
}) => {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
  ].filter(Boolean) as ViewStyle[];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 16, borderRadius: 8 },
  primary: { backgroundColor: '#1ea7fd' },
  secondary: { backgroundColor: '#f0f0f0' },
  text: { fontSize: 16, fontWeight: 'bold' },
});
```

**ComponentName.stories.tsx**
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'React Native/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onPress: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: 'Primary Button', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary Button', variant: 'secondary' },
};
```

**ComponentName.test.tsx**
```tsx
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { describe, expect, it } from 'vitest';
import * as stories from './ComponentName.stories';

const { Primary, Secondary } = composeStories(stories);

describe('ComponentName', () => {
  it('renders primary variant', () => {
    render(<Primary />);
    expect(screen.getByText('Primary Button')).toBeDefined();
  });

  it('renders secondary variant', () => {
    render(<Secondary />);
    expect(screen.getByText('Secondary Button')).toBeDefined();
  });
});
```

**index.ts**
```tsx
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## 🎯 React Native Web Guidelines

### Use React Native Primitives

| ❌ Don't Use (Web) | ✅ Use (React Native) |
|--------------------|----------------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<img>` | `<Image>` from `react-native` |
| `className` | `style` prop |
| CSS-in-JS strings | `StyleSheet.create()` objects |
| `onClick` | `onPress` |

### Styling Best Practices

```tsx
import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';

// Define styles with StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

// Type your dynamic styles
const dynamicStyle: ViewStyle = {
  backgroundColor: isActive ? '#1ea7fd' : '#f0f0f0',
};

// Combine styles properly
const combinedStyles: ViewStyle[] = [
  styles.container,
  isActive && styles.active,
  customStyle,
].filter(Boolean) as ViewStyle[];
```

## 🧪 Testing Strategy

### Use Storybook Portable Stories

Test your Storybook stories directly using Vitest:

```tsx
import { composeStories } from '@storybook/react';
import * as stories from './Component.stories';

// Compose stories for testing
const { Primary, Secondary } = composeStories(stories);

describe('Component', () => {
  it('renders primary story', () => {
    render(<Primary />);
    // assertions
  });
});
```

**Benefits:**
- Single source of truth for component states
- Test the same code users see in Storybook
- Automatic prop mocking via `fn()`
- Full Storybook decorators and parameters applied

### Test Coverage

Run coverage reports:
```bash
yarn test:coverage
```

Coverage reports are generated in `coverage/` directory.

## 🛠 Tool Configuration

### Biome (Linting & Formatting)

- **Config**: `biome.json`
- **Auto-format on save**: Enabled in `.vscode/settings.json`
- **Format**: 2 spaces, single quotes for JS, double quotes for JSX
- **Rules**: Recommended + a11y + complexity + correctness

### TypeScript

- **Config**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Mode**: Strict mode enabled
- **Module**: ESNext with bundler resolution
- **Checks**: Run `yarn types` to validate

### Vitest

- **Config**: `vitest.config.ts`
- **Environment**: jsdom (for React components)
- **Coverage**: v8 provider with HTML reports
- **Setup**: `.storybook/vitest.setup.ts` (includes Storybook annotations)

## 🎨 Accessibility (a11y)

Storybook includes the **@storybook/addon-a11y** addon for accessibility testing.

**In your components:**
- Provide meaningful labels and text
- Use semantic structure (Views, Text, Touchables)
- Ensure sufficient color contrast
- Support keyboard/touch navigation
- Test with the a11y panel in Storybook

## 🤖 AI Assistant Integration

### Cursor AI Configuration

This project includes `.cursorrules` for Cursor AI integration. The rules ensure:
- Components follow React Native Web patterns
- Quality gates are enforced (`yarn validate`)
- Proper testing patterns are used
- Accessibility is considered

### Agent Instructions

See `AGENTS.md` for comprehensive guidelines for AI coding assistants.

### Figma MCP Integration

When using Figma MCP with Cursor:
1. Extract design tokens (colors, typography, spacing)
2. Identify component structure and variants
3. Map Figma variants to component props
4. Implement using React Native primitives
5. Create stories for each Figma variant
6. Run `yarn validate` to ensure quality

## 📚 Tech Stack

- **React** 19.1.1
- **React Native Web** 0.21.1 - Run React Native components on web
- **Storybook** 9.1.10 - Component development and documentation
- **Vite** 7.1.7 - Fast build tool and dev server
- **TypeScript** 5.9.3 - Type safety
- **Vitest** 3.2.4 - Unit testing framework
- **Biome** 2.2.6 - Fast linting and formatting

## 📦 Adding New Packages

**IMPORTANT: Always run `yarn install` after adding packages!**

### Adding a New Dependency

```bash
# Method 1: Use yarn add (automatically installs)
yarn add package-name           # Production dependency
yarn add -D package-name        # Development dependency

# Method 2: Edit package.json manually
# 1. Add package to dependencies or devDependencies
# 2. Run yarn install (REQUIRED!)
yarn install

# 3. Verify installation
yarn validate
```

### Why This Matters

- **Updates lock file**: `yarn.lock` tracks exact versions
- **Resolves dependencies**: Ensures all peer deps are met
- **Prevents errors**: Catches conflicts before runtime
- **Team consistency**: Everyone uses same versions

### After Adding Packages

1. ✅ Run `yarn install`
2. ✅ Test the new functionality works
3. ✅ Run `yarn validate` to check for issues
4. ✅ Commit both `package.json` AND `yarn.lock`

## 🚨 Troubleshooting

### Module not found errors

```bash
# First, always try reinstalling
yarn install

# Clear cache if needed
rm -rf node_modules
yarn install
```

### TypeScript errors about React Native types

```bash
# Ensure types are installed
yarn install
yarn types
```

### Tests not running

```bash
# Reinstall test dependencies
yarn install

# Check vitest config
cat vitest.config.ts
```

### Storybook not displaying components

- Check that components use React Native primitives (`View`, `Text`, etc.)
- Verify `.storybook/preview.tsx` configuration
- Clear cache: `yarn build-storybook --no-cache`

### Biome formatting conflicts

```bash
# Auto-fix most issues
yarn nice

# Check config
cat biome.json
```

### React Native Web aliasing issues

The project includes proper aliasing in both `vite.config.ts` and `vitest.config.ts` for React Native Web. If you encounter import issues:

1. Check `resolve.alias` in configs
2. Ensure `react-native-web` is installed
3. Restart dev server

## 📁 Project Structure

```
self-storybook/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   ├── preview.tsx
│   └── vitest.setup.ts
├── .vscode/                 # VS Code settings
│   └── settings.json
├── src/
│   ├── components/          # React Native components
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Page/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/                  # Static assets
├── AGENTS.md               # AI assistant guidelines
├── biome.json              # Biome configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── README.md               # This file
```

## 🤝 Contributing

1. Create new component in `src/components/ComponentName/`
2. If adding new packages: Edit `package.json` → Run `yarn install`
3. Implement component with TypeScript and React Native
4. Add Storybook stories
5. Write tests using portable stories pattern
6. Run `yarn validate` (must pass!)
7. Commit changes (including `yarn.lock` if packages changed)

## 📄 License

Private project for internal use.

## 💡 Tips for Designer-Developers

- **Start with Storybook**: Develop components in isolation
- **Use Controls**: Add argTypes for interactive props
- **Test Accessibility**: Use the a11y addon in Storybook
- **Mobile-First**: Think in React Native primitives
- **Validate Often**: Run `yarn validate` frequently during development
- **Ask AI**: Use Cursor AI with the guidelines in `AGENTS.md`

---

**Happy Coding! 🎉**

For questions or issues, check `AGENTS.md` for detailed development guidelines.
