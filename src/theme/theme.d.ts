import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    shadow: {
      default: string;
      primary: string;
    };
    border: {
      default: string;
      hover: string;
      disabled: string;
    };
  }

  interface PaletteOptions {
    shadow?: {
      default: string;
      primary: string;
    };
    border?: {
      default: string;
      hover: string;
      disabled: string;
    };
  }
} 