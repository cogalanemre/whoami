export const STYLE = {
  CONTAINER: {
    mb: 6,
  },
  TITLE: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    // Responsive font boyutu
    fontSize: {
      xs: '1.5rem', // Mobil
      sm: '1.75rem', // Tablet
      md: '1.75rem', // Desktop
    },
    position: 'relative',
  },
  ICON: {
    color: (theme) => theme.palette.primary.main,
    fontSize: '2rem',
  },
  SUBTITLE: {
    ml: 2,
    color: 'primary.main',
    fontStyle: 'italic',
  },
} as const; 