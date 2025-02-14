export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    hover: string;
    border: string;
    borderHover: string;
    timeline: string;
    gradient: {
      start: string;
      end: string;
      timeline: {
        start: string;
        end: string;
      };
    };
  };
  background: {
    default: string;
    paper: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
} 