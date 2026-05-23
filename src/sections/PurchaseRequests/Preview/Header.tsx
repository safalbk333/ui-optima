'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';

import React from 'react';

export default function EOIHeroBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        color: 'primary.main',
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 0 },
          py: { xs: 2.5, md: 1 },
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          spacing={2}
        >
          {/* LEFT */}
          <Box maxWidth="760px">
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                Ref: EOI/FAC/2024/084
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  md: '1.5rem',
                },
                lineHeight: 1.15,
                fontWeight: 700,
                mb: 2,
              }}
            >
              HVAC Maintenance — 4 Network
              <br />
              Operation Centres (NOC)
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
