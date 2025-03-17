import '@mui/material/styles';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface CustomPaletteOptions {
    shadow: {
      default: string;
      primary: string;
    };
  }

  interface Palette extends CustomPaletteOptions {
    mode: PaletteMode;
  }

  interface PaletteOptions extends Partial<CustomPaletteOptions> {
    mode?: PaletteMode;
  }

  interface Theme {
    palette: Palette;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
} 