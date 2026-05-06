'use client';

import React from 'react';
import { Box, Typography, Grid, Stack, Paper, Chip } from '@mui/material';
import { keyframes } from '@mui/system';

const integrations = [
  {
    title: 'Purchase Requests',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    title: 'Vendor Management',
    icon: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
  },
  {
    title: 'Invoice Processing',
    icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
  },
  {
    title: 'Payment Automation',
    icon: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png',
  },
];

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export default function ProcureToPayBanner() {
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        p: { xs: 2.5, md: 3 },

        background: `
          linear-gradient(
            135deg,
            ${theme.palette.primary.main},
            ${theme.palette.primary.dark},
            ${theme.palette.primary.main},
            ${theme.palette.primary.darker || '#050044'}
          )
        `,
        backgroundSize: '300% 300%',
        animation: `${gradientMove} 10s ease infinite`,
      })}
    >
      {/* Glow Shape */}
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: -80,
          left: -100,
          width: 320,
          height: 320,
          borderRadius: '42%',
          background: `radial-gradient(circle,
            ${theme.palette.primary.light}55 0%,
            transparent 70%)`,
          filter: 'blur(10px)',
          animation: `${gradientMove} 12s ease infinite`,
        })}
      />

      {/* Extra Blur Glow */}
      <Box
        sx={(theme) => ({
          position: 'absolute',
          bottom: -120,
          right: -80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `${theme.palette.primary.light}22`,
          filter: 'blur(50px)',
        })}
      />

      <Grid container spacing={3} alignItems="center">
        {/* Left Content */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2} sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.75)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
              }}
            >
              Optima Procure-to-Pay
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: 'common.white',
                fontWeight: 800,
                maxWidth: 520,
                lineHeight: 1.1,
                fontSize: {
                  xs: '1.8rem',
                  md: '2.7rem',
                },
              }}
            >
              From Purchase Request to Payment — All in One
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              {[
                'Smart Approvals',
                'Vendor Portal',
                'Invoice Matching',
                'Payment Tracking',
              ].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'common.white',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>

        {/* Right Cards */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={1.5}>
            {integrations.map((item) => (
              <Grid size={{ xs: 6 }} key={item.title}>
                <Paper
                  elevation={0}
                  sx={{
                    height: 95,
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.2,
                    backdropFilter: 'blur(8px)',
                    p: 1,
                    position: 'relative',
                    zIndex: 2,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.title}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1.5,
                      objectFit: 'contain',
                      bgcolor: 'white',
                      p: 0.8,
                    }}
                  />

                  <Typography
                    sx={{
                      color: 'common.white',
                      fontWeight: 600,
                      textAlign: 'center',
                      px: 0.5,
                      fontSize: '0.85rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}