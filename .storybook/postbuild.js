#!/usr/bin/env node
/**
 * Post-build script to remove vitest browser mode mocker from production build
 */
import { readFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const storybookStatic = join(__dirname, '../storybook-static');

console.log('🧹 Cleaning up vitest mocker from production build...');

try {
  // Find and remove vite-inject-mocker-entry.js and vendor files with mocker
  const mockerFiles = glob.sync(join(storybookStatic, '**/vite-inject-mocker*.js'));
  mockerFiles.forEach((file) => {
    console.log(`  ✓ Removed ${file}`);
    unlinkSync(file);
  });

  // Also check for large vendor files that might contain the mocker code
  const vendorFiles = glob.sync(join(storybookStatic, 'assets/vendor-*.js'));
  vendorFiles.forEach((file) => {
    const content = readFileSync(file, 'utf-8');
    // Check if file contains mocker code by looking for mocker-specific strings
    if (content.includes('vite-inject-mocker') || content.includes('__vi_mocker__')) {
      console.log(
        `  ⚠️  Warning: ${file} contains mocker code (${(content.length / 1024).toFixed(0)}KB)`,
      );
    }
  });

  console.log('✅ Cleanup complete!');
} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
  process.exit(1);
}
