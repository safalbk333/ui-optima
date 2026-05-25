'use client';

import { Box, Stack, alpha, useTheme, Typography } from '@mui/material';

import React from 'react';

export default function GettingStartedBanner() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 170,
        px: { xs: 3, md: 2 },
        py: { xs: 3.5, md: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 0,
        bgcolor: alpha(theme.palette.background.paper, 0.9),
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: alpha(theme.palette.primary.main, 0.06),
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <Stack spacing={1.4} sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            letterSpacing: '0.16em',
            fontWeight: 700,
            lineHeight: 1,
            fontSize: 11,
          }}
        >
          Welcome to Optima Procure-to-Pay
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            letterSpacing: -0.8,
            lineHeight: 1.2,
          }}
        >
          Hi,
          <Box
            component="span"
            sx={{
              color: 'primary.main',
              ml: 1,
            }}
          >
            Mr. John
          </Box>
        </Typography>

        <Typography
          sx={{
            maxWidth: 480,
            color: alpha(theme.palette.text.primary, 0.65),
            fontSize: 13,
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Simplify procurement operations with a seamless procure-to-pay experience. Manage vendors,
          approvals, purchasing, and invoices — all in one intelligent platform.
        </Typography>
      </Stack>

      {/* Abstract Artwork */}
      <Box
        sx={{
          position: 'relative',
          width: 160,
          height: 160,
          display: { xs: 'none', md: 'block' },
          mr: 1,
        }}
      >
        {/* Top Diamond */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 48,
            width: 42,
            height: 42,
            bgcolor: '#0037A5',
            borderRadius: '0 100% 0 100%',
            transform: 'rotate(45deg)',
          }}
        />

        {/* Orange Square */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 0,
            width: 42,
            height: 42,
            bgcolor: '#FF7A59',
            borderRadius: 1,
          }}
        />

        {/* Cyan Shape */}
        <Box
          sx={{
            position: 'absolute',
            top: 62,
            left: 54,
            width: 46,
            height: 46,
            bgcolor: '#69D2E7',
            borderRadius: '0 0 100% 0',
          }}
        />

        {/* Blue Shape */}
        <Box
          sx={{
            position: 'absolute',
            top: 62,
            right: 0,
            width: 46,
            height: 46,
            bgcolor: '#0037A5',
            borderRadius: '100% 0 100% 0',
            transform: 'rotate(45deg)',
          }}
        />

        {/* Grey Blocks */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 18,
            width: 56,
            height: 56,
            bgcolor: '#ECEDEF',
            borderRadius: '0 0 0 100%',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 16,
            width: 56,
            height: 56,
            bgcolor: '#ECEDEF',
            borderRadius: '0 0 100% 0',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 62,
            left: 6,
            width: 38,
            height: 38,
            bgcolor: '#F3F4F6',
            borderRadius: '0 0 100% 0',
          }}
        />
      </Box>
    </Box>
  );
}
