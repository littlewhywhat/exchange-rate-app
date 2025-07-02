# Dependency Migration Guide

This guide covers the major dependency updates and required code changes for updating the ExchangeRateApp project.

## 🚨 Breaking Changes Overview

### 1. React Query → TanStack Query Migration

**What Changed:**
- `react-query` v3.39.3 → `@tanstack/react-query` v5.62.8
- Package name and API have changed significantly

**Required Changes:**

#### Install & Import Updates
```diff
- import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
+ import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
```

#### API Changes
```diff
// Query configuration
- useQuery('users', fetchUsers)
+ useQuery({ queryKey: ['users'], queryFn: fetchUsers })

// Error handling
- onError: (error) => console.log(error)
+ throwOnError: true // or handle in error boundaries

// Success handling  
- onSuccess: (data) => console.log(data)
+ // Use useEffect or other side effect patterns
```

### 2. Android SDK Updates

**What Changed:**
- Android SDK: 34 → 35 (Android 15)
- Min SDK: 21 → 24 (Android 7.0 minimum)
- Build Tools: 34.0.0 → 35.0.0

**Required Changes:**
- Update target device configurations if using API 21-23
- Test on Android 15 devices/emulators
- Verify permissions and behavior changes for Android 15

### 3. React Native Updates

**What Changed:**
- React Native: 0.73.0 → 0.76.12
- React: 18.2.0 → 18.3.1

**Required Changes:**
- Follow React Native 0.76 upgrade guide
- Update iOS deployment target to 13.4+ (if not already)
- Test New Architecture compatibility

### 4. TypeScript Updates

**What Changed:**
- TypeScript: 5.0.4 → 5.6.3

**Potential Issues:**
- Stricter type checking may reveal previously hidden issues
- New TypeScript features available

### 5. Node.js Version Requirement

**What Changed:**
- Node: >=18 → >=20

**Required Changes:**
- Update development environment to Node 20 LTS
- Update CI/CD pipelines
- Verify all team members use Node 20+

## 📱 Platform-Specific Changes

### iOS

**CocoaPods Updates:**
- CocoaPods: ~> 1.13 → ~> 1.15
- Ruby: >= 2.6.10 → >= 3.0.0

**Migration Steps:**
```bash
# 1. Update Ruby (if needed)
rbenv install 3.1.0  # or latest stable
rbenv global 3.1.0

# 2. Update gems
bundle update

# 3. Clean and reinstall pods
cd ios
pod deintegrate
pod install
```

### Android

**Gradle Updates:**
- NDK: 25.1.8937393 → 26.1.10909125
- Kotlin: 1.8.0 → 1.9.25

**Migration Steps:**
```bash
# Clean build
cd android
./gradlew clean

# Test build
cd ..
npx react-native run-android
```

## 🔄 Migration Process

### Step 1: Backup Current State
```bash
git checkout -b dependency-updates
git add .
git commit -m "Backup before dependency updates"
```

### Step 2: Update Dependencies
```bash
# Remove old lock files
rm package-lock.json
rm yarn.lock  # if using yarn

# Install new dependencies
npm install
# or
yarn install
```

### Step 3: Update Platform Dependencies

**iOS:**
```bash
cd ios
bundle install
pod install --repo-update
cd ..
```

**Android:**
```bash
cd android
./gradlew clean
cd ..
```

### Step 4: Code Migration

1. **Update React Query imports and usage** (see above)
2. **Update any deprecated React Native APIs**
3. **Fix TypeScript errors** that may appear with stricter checking

### Step 5: Testing

```bash
# Clean everything
npx react-native start --reset-cache

# Test iOS
npx react-native run-ios

# Test Android  
npx react-native run-android
```

## ⚠️ Common Issues & Solutions

### 1. Metro Build Errors
```bash
npx react-native start --reset-cache
```

### 2. iOS Build Errors
```bash
cd ios
xcodebuild clean
pod install
cd ..
```

### 3. Android Build Errors
```bash
cd android
./gradlew clean
./gradlew build
```

### 4. React Query Migration Issues
- Review all `useQuery` calls and update to object syntax
- Replace `onSuccess`/`onError` callbacks with appropriate patterns
- Update error handling strategy

## 📚 Additional Resources

- [React Native 0.76 Release Notes](https://reactnative.dev/blog/2024/10/15/react-native-0.76)
- [TanStack Query v5 Migration Guide](https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5)
- [Android 15 Migration Guide](https://developer.android.com/about/versions/15/migration)
- [TypeScript 5.6 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/)

## 🎯 Post-Migration Checklist

- [ ] All dependencies updated successfully
- [ ] iOS builds and runs correctly
- [ ] Android builds and runs correctly  
- [ ] All React Query usage migrated
- [ ] TypeScript compiles without errors
- [ ] Tests pass
- [ ] App functionality verified on both platforms
- [ ] Performance regression testing completed

---

⚡ **Pro Tip:** Update dependencies incrementally in production apps. Consider updating in smaller batches to isolate potential issues.