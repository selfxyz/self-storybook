#!/bin/bash
set -e

echo "📦 Installing Mobile SDK from GitHub..."

# Create temp directory
TEMP_DIR=$(mktemp -d)
echo "Cloning self repository..."

# Clone the self repo
git clone --depth 1 https://github.com/selfxyz/self.git "$TEMP_DIR"

# Build common package
echo "Building @selfxyz/common..."
cd "$TEMP_DIR/common"
yarn install --ignore-engines || true
yarn build || echo "Build failed, continuing..."
cd -

# Build mobile-sdk-alpha
echo "Building @selfxyz/mobile-sdk-alpha..."
cd "$TEMP_DIR/packages/mobile-sdk-alpha"
# Fix workspace dependency first
sed -i.bak 's/"@selfxyz\/common": "workspace:\^"/"@selfxyz\/common": "file:..\/..\/common"/g' package.json
rm -f package.json.bak
yarn install --ignore-engines || true
yarn build || echo "Build failed, continuing..."
cd -

# Create local packages directory
mkdir -p .local-packages

# Copy built packages
echo "Copying built packages..."
cp -r "$TEMP_DIR/common" .local-packages/common
cp -r "$TEMP_DIR/packages/mobile-sdk-alpha" .local-packages/mobile-sdk-alpha

# Fix workspace dependencies in mobile-sdk-alpha for final use
sed -i.bak 's/"@selfxyz\/common": "file:.*"/"@selfxyz\/common": "file:..\/common"/g' .local-packages/mobile-sdk-alpha/package.json
rm -f .local-packages/mobile-sdk-alpha/package.json.bak

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ SDK packages installed to .local-packages/"

