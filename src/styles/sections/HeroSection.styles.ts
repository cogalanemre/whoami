const ALIGNMENT = {
  xs: 'center',
  md: 'left',
} as const;

const AVATAR_SIZES = {
  xs: 200,
  sm: 250,
  md: 300,
} as const;

const HEADER_HEIGHTS = {
  xs: 96,
  md: 128,
} as const;

export const heroSectionStyles = {
  HERO_CONTAINER: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: {
      xs: `calc(100vh - ${HEADER_HEIGHTS.xs}px)`,
      md: `calc(100vh - ${HEADER_HEIGHTS.md}px)`,
    },
  },
  AVATAR: {
    width: AVATAR_SIZES,
    height: AVATAR_SIZES,
    bgcolor: 'transparent',
    alignSelf: 'center',
    ml: { md: 8 },
  },
  STACK: {
    position: 'relative',
    pb: { xs: 8, md: 12 },
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'flex-start' },
    alignItems: 'center',
    gap: { xs: 4, md: 8 },
    px: { xs: 2, md: 4 },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '0.5px',
      background: theme =>
        `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    },
  },
  CONTENT_BOX: {
    textAlign: ALIGNMENT,
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: 2,
  },
  NAME: {
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
    textAlign: ALIGNMENT,
    fontWeight: 'normal',
    fontFamily: 'Nunito, Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    justifyContent: { xs: 'center', md: 'flex-start' },
    color: 'primary.main',
  },
  TYPEWRITER_CONTAINER: {
    minHeight: '60px',
    textAlign: ALIGNMENT,
    width: '100%',
  },
  SOCIAL_BUTTONS_CONTAINER: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: { xs: -4, md: -6 },
    mb: { xs: 4, md: 6 },
  },
} as const; 