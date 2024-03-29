import {DefaultTheme} from 'styled-components/native';

const palette = {
  white: '#ffffff',
  antiFlashWhite: '#efefef',
  ghostWhite: '#f4f4f9',
  lightBlue: '#b8dbd9',
  payneGray: '#586f7c',
  charcoal: '#2f4550',
  black: '#000000',

  dutchWhite: '#dccca3',
  oldRose: '#aa767c',
};

const theme: DefaultTheme = {
  gaps: {
    tiny: '7px',
    small: '14px',
    medium: '21px',
    big: '28px',
  },

  text: {
    size: {
      medium: '25px',
      small: '20px',
    },
    primary: {
      color: palette.black,
    },
    weight: {
      bold: '500',
    },
  },

  messages: {
    error: {
      backgroundColor: palette.oldRose,
    },
    warn: {
      backgroundColor: palette.dutchWhite,
    },
    info: {
      backgroundColor: palette.lightBlue,
    },
  },

  buttons: {
    primary: {
      background: palette.charcoal,
      text: palette.white,
    },
    secondary: {
      background: palette.payneGray,
      text: palette.black,
    },
    height: {
      medium: '40px',
    },
  },

  border: {
    primary: {
      color: palette.charcoal,
    },
    secondary: {
      color: palette.antiFlashWhite,
    },
    radius: '20px',
    width: '1px',
  },

  background: {
    primary: palette.ghostWhite,
    secondary: palette.antiFlashWhite,
  },
};

export {theme};
