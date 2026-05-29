'use client';

import { Box, Stack, Typography } from '@mui/material';

export default function AbstractHero() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        py: 14,
        px:5
      }}
    >
      {/* Background Abstract Image */}
      <Box
        component="img"
        src="/Copilot_20260528_093954.png" // replace with your image
        alt="abstract"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: { xs: '140%', md: '90%' },
          opacity: 0.40,
          objectFit: 'cover',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Content */}
      <Stack
        spacing={3}
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 700,
        }}
      >


        <Typography
          sx={{
            fontSize: { xs: 64, md: 120 },
            lineHeight: 0.9,
            fontWeight: 900,
            color: '#000',
            letterSpacing: '-5px',
          }}
        >
          Authen
          <Box component="span" sx={{ color: 'primary.main' }}>
            tik.
          </Box>
        </Typography>
        <Typography
          sx={{
            mt:-3,
            fontSize: { xs: 42, md: 14 },
            // lineHeight: 0.85,
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'primary.main',
          }}
        >
          optima procur-to-pay{' '}
        </Typography>
        {/* <Typography
          sx={{
            maxWidth: 520,
            fontSize: 14,
            fontWeight: 200,
            color: 'primary.secondary',
            lineHeight: 1.8,
            letterSpacing: 1,
          }}
        >
          Smart procurement-to-pay solutions designed for modern business operations.{' '}
        </Typography> */}

        {/* <Stack direction="row" spacing={2} pt={1}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#000',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 0,
              fontWeight: 700,
              '&:hover': {
                bgcolor: '#111',
              },
            }}
          >
            START YOUR JOURNEY
          </Button>

          <Button
            variant="text"
            sx={{
              color: '#777',
              fontWeight: 600,
              letterSpacing: 1,
              '&:hover': {
                bgcolor: 'transparent',
                color: '#000',
              },
            }}
          >
            LEARN MORE →
          </Button>
        </Stack> */}
      </Stack>
    </Box>
  );
}
