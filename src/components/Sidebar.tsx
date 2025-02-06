import Box from '@mui/material/Box';

  <Box
    sx={{
      position: 'fixed',
      bottom: 0,
      left: { xs: '20px', md: '40px' },
      width: '1px',
      height: '90px',
      background: 'rgba(255, 215, 0, 0.3)',
      '&::after': {
        content: '""',
        display: 'block',
        width: '1px',
        height: '90px',
        background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0))',
        transform: 'translateY(-100%)',
      },
    }}
  /> 