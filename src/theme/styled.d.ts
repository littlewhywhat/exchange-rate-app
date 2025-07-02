import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    gaps: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      // Legacy support
      tiny: string;
      small: string;
      medium: string;
      big: string;
    };

    text: {
      size: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        // Legacy support
        small: string;
        medium: string;
      };
      primary: {
        color: string;
      };
      secondary: {
        color: string;
      };
      weight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
      lineHeight: {
        tight: string;
        normal: string;
        relaxed: string;
      };
    };

    messages: {
      error: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
      };
      warn: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
      };
      info: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
      };
      success: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
      };
    };

    buttons: {
      primary: {
        background: string;
        backgroundHover: string;
        text: string;
        borderColor: string;
      };
      secondary: {
        background: string;
        backgroundHover: string;
        text: string;
        borderColor: string;
      };
      outline: {
        background: string;
        backgroundHover: string;
        text: string;
        borderColor: string;
      };
      height: {
        sm: string;
        md: string;
        lg: string;
        // Legacy support
        medium: string;
      };
    };

    border: {
      primary: {
        color: string;
      };
      secondary: {
        color: string;
      };
      focus: {
        color: string;
      };
      radius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        full: string;
        // Legacy support
        default: string;
      };
      width: {
        thin: string;
        thick: string;
        // Legacy support
        default: string;
      };
    };

    background: {
      primary: string;
      secondary: string;
      surface: string;
      surfaceVariant: string;
    };

    shadows: {
      sm: {
        shadowColor: string;
        shadowOffset: {width: number; height: number};
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      md: {
        shadowColor: string;
        shadowOffset: {width: number; height: number};
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      lg: {
        shadowColor: string;
        shadowOffset: {width: number; height: number};
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
      xl: {
        shadowColor: string;
        shadowOffset: {width: number; height: number};
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
      };
    };

    gradients: {
      primary: string;
      secondary: string;
      surface: string;
    };
  }
}
