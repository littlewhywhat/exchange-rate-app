import {DefaultTheme} from 'styled-components/native';

const palette = {
  // Primary Brand Colors
  primary: '#2563eb', // Modern blue
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  
  // Secondary Colors
  secondary: '#10b981', // Emerald green
  secondaryLight: '#34d399',
  secondaryDark: '#059669',
  
  // Neutral Colors
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  black: '#000000',

  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Surface Colors
  surface: '#ffffff',
  surfaceVariant: '#f8fafc',
  background: '#f1f5f9',
  backgroundSecondary: '#ffffff',
  
  // Accent Colors
  accent: '#8b5cf6', // Purple
  accentLight: '#a78bfa',
};

const theme: DefaultTheme = {
  gaps: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    // Legacy support
    tiny: '8px',
    small: '16px',
    medium: '24px',
    big: '32px',
  },

  text: {
    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      // Legacy support
      small: '16px',
      medium: '20px',
    },
    primary: {
      color: palette.gray900,
    },
    secondary: {
      color: palette.gray600,
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  messages: {
    error: {
      backgroundColor: palette.error,
      textColor: palette.white,
      borderColor: '#fecaca',
    },
    warn: {
      backgroundColor: palette.warning,
      textColor: palette.white,
      borderColor: '#fed7aa',
    },
    info: {
      backgroundColor: palette.info,
      textColor: palette.white,
      borderColor: '#bfdbfe',
    },
    success: {
      backgroundColor: palette.success,
      textColor: palette.white,
      borderColor: '#bbf7d0',
    },
  },

  buttons: {
    primary: {
      background: palette.primary,
      backgroundHover: palette.primaryDark,
      text: palette.white,
      borderColor: palette.primary,
    },
    secondary: {
      background: palette.surface,
      backgroundHover: palette.gray100,
      text: palette.gray700,
      borderColor: palette.gray300,
    },
    outline: {
      background: 'transparent',
      backgroundHover: palette.gray50,
      text: palette.primary,
      borderColor: palette.primary,
    },
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      // Legacy support
      medium: '44px',
    },
  },

  border: {
    primary: {
      color: palette.gray300,
    },
    secondary: {
      color: palette.gray200,
    },
    focus: {
      color: palette.primary,
    },
    radius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
      full: '9999px',
      // Legacy support
      default: '12px',
    },
    width: {
      thin: '1px',
      thick: '2px',
      // Legacy support
      default: '1px',
    },
  },

  background: {
    primary: palette.background,
    secondary: palette.backgroundSecondary,
    surface: palette.surface,
    surfaceVariant: palette.surfaceVariant,
  },

  shadows: {
    sm: {
      shadowColor: palette.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: palette.black,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: palette.black,
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
    xl: {
      shadowColor: palette.black,
      shadowOffset: {width: 0, height: 20},
      shadowOpacity: 0.25,
      shadowRadius: 25,
      elevation: 8,
    },
  },

  gradients: {
    primary: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight} 100%)`,
    secondary: `linear-gradient(135deg, ${palette.secondary} 0%, ${palette.secondaryLight} 100%)`,
    surface: `linear-gradient(135deg, ${palette.surface} 0%, ${palette.surfaceVariant} 100%)`,
  },
};

export {theme};
