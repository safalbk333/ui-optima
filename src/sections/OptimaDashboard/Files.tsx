'use client';

import { Box, Grid, Paper, Stack, alpha, useTheme, Typography } from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Image from 'next/image';
import React from 'react';

const apps = [
  {
    id: 1,
    title: 'Create a Purchase Request',
    description: 'Create PR instantly',
    image: '/NA_SEP._29.jpg',
  },
  {
    id: 2,
    title: 'Purchase Orders',
    description: 'Create and track purchase orders',
    image: '/87.jpg',
  },
  {
    id: 3,
    title: 'Shipment Tracking',
    description: 'Monitor deliveries and logistics',
    image: '/20943859.jpg',
  },
  {
    id: 4,
    title: 'Invoice Management',
    description: 'Manage invoices and payments',
    image:
      '/inventory-control-illustration-concept-illustration-websites-landing-pages-mobile-applications-posters-banners_108061-773.avif',
  },
];

export default function TrendingTeams() {
  const theme = useTheme();

  return (
    <Box mb={3}>
      {/* Header */}
      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Trending in Optima
        </Typography>

        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          See all
        </Typography>
      </Stack> */}

      {/* Cards */}
      <Grid container spacing={2}>
        {apps.map((app) => (
          <Grid size={{ xs: 12, md: 6 }} key={app.id}>
            <Paper
              elevation={0}
              sx={{
                p: 2.2,
                borderRadius: 1,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                minHeight: 150,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

                '&:hover': {
                  transform: 'translateY(-1px)',
                  borderColor: alpha(theme.palette.primary.main, 0.28),
                },
              }}
            >
              {/* Top */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                {/* Image */}
                <Box
                  sx={{
                    width: 92,
                    height: 92,
                    // borderRadius: 3,
                    // border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                  }}
                >
                  <Image
                    src={app.image}
                    alt={app.title}
                    width={92}
                    height={92}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                {/* Arrow */}
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                  }}
                >
                  <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </Stack>

              {/* Content */}
              <Box mt={1}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    mb: 0.2,
                    color: 'primary.main',
                  }}
                >
                  {app.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#6B7280',
                    fontSize: 13,
                    lineHeight: 1.6,
                    maxWidth: '90%',
                  }}
                >
                  {app.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
