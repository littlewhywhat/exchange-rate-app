#!/bin/bash

# ExchangeRateApp Dependency Migration Script
# This script automates the dependency update process

set -e

echo "🚀 Starting ExchangeRateApp Dependency Migration..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check Node.js version
echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Current Node.js version: $NODE_VERSION"

# Extract major version number
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | cut -d'v' -f2)

if [ "$NODE_MAJOR" -lt 20 ]; then
    print_error "Node.js version $NODE_VERSION is not supported. Please upgrade to Node.js 20 or higher."
    exit 1
fi

print_status "Node.js version is compatible"

# Backup current state
echo "📦 Creating backup branch..."
git checkout -b "dependency-updates-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || echo "Already on a branch, continuing..."
git add .
git commit -m "Backup before dependency updates" 2>/dev/null || echo "No changes to commit"

print_status "Backup created"

# Clean old dependencies
echo "🧹 Cleaning old dependencies..."
rm -f package-lock.json
rm -f yarn.lock
rm -rf node_modules

print_status "Old dependencies cleaned"

# Install new dependencies
echo "📥 Installing updated dependencies..."
if command -v yarn &> /dev/null; then
    print_status "Using Yarn..."
    yarn install
else
    print_status "Using npm..."
    npm install
fi

print_status "JavaScript dependencies updated"

# Update iOS dependencies
echo "🍎 Updating iOS dependencies..."
if [ -f "ios/Gemfile" ]; then
    cd ios
    
    # Check if bundler is available
    if ! command -v bundle &> /dev/null; then
        print_warning "Bundler not found. Installing..."
        gem install bundler
    fi
    
    # Update Ruby gems
    bundle install
    bundle update
    
    # Clean and reinstall pods
    print_status "Cleaning CocoaPods..."
    if command -v pod &> /dev/null; then
        pod deintegrate 2>/dev/null || echo "No existing pods to deintegrate"
        pod install --repo-update
    else
        print_error "CocoaPods not found. Please install with: gem install cocoapods"
        cd ..
        exit 1
    fi
    
    cd ..
    print_status "iOS dependencies updated"
else
    print_warning "No Gemfile found in ios directory"
fi

# Update Android dependencies
echo "🤖 Updating Android dependencies..."
if [ -f "android/gradlew" ]; then
    cd android
    ./gradlew clean
    cd ..
    print_status "Android dependencies cleaned"
else
    print_warning "No gradlew found in android directory"
fi

# Reset Metro cache
echo "⚡ Resetting Metro cache..."
if command -v npx &> /dev/null; then
    npx react-native start --reset-cache &
    METRO_PID=$!
    sleep 3
    kill $METRO_PID 2>/dev/null || true
    print_status "Metro cache reset"
fi

# Run basic tests
echo "🧪 Running basic checks..."

# Check if TypeScript compiles
if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
        print_status "TypeScript compilation successful"
    else
        print_warning "TypeScript compilation has issues. Check DEPENDENCY_MIGRATION_GUIDE.md for help"
    fi
fi

echo ""
echo "🎉 Migration Complete!"
echo "====================="
echo ""
echo "Next steps:"
echo "1. Review the changes in DEPENDENCY_MIGRATION_GUIDE.md"
echo "2. Update your React Query usage (see migration guide)"
echo "3. Test iOS build: npx react-native run-ios"
echo "4. Test Android build: npx react-native run-android"
echo "5. Run your test suite"
echo ""
echo "If you encounter issues, check the troubleshooting section in DEPENDENCY_MIGRATION_GUIDE.md"
echo ""

print_status "Migration script completed successfully!"