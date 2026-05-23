'use client';

import { Box, Paper, Stack, alpha, useTheme, Typography } from '@mui/material';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import React from 'react';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const stats = [
  {
    label: 'RFQs',
    value: '24',
    icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: 'POs',
    value: '128',
    icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: 'Suppliers',
    value: '46',
    icon: <BusinessOutlinedIcon sx={{ fontSize: 16 }} />,
  },
];

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        p: { xs: 2.5, md: 3.5 },
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        background: theme.palette.background.paper,
      }}
    >
      {/* subtle grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(${theme.palette.primary.main} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.palette.primary.main} 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <Stack
        spacing={3}
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* top */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                letterSpacing: '0.18em',
                fontWeight: 700,
                display: 'block',
                lineHeight: 1,
              }}
            >
              Optima Procur-to-pay
            </Typography>

            {/* vertical gap */}
            <Box sx={{ height: { xs: 18, md: 28 } }} />

            <Typography
              sx={{
                fontSize: { xs: 24, md: 32 },
                fontWeight: 800,
                letterSpacing: -0.8,
                lineHeight: 1.2,
              }}
            >
              Welcome back,
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
                mt: 1.2,
                color: 'text.secondary',
                fontSize: 14,
                maxWidth: 520,
              }}
            >
              Manage procurement operations, approvals and supplier activities.
            </Typography>
          </Box>

          {/* right summary */}
        </Stack>

        {/* stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3,1fr)',
              md: 'repeat(3,180px)',
            },
            gap: 1.5,
          }}
        >
          {stats.map((item) => (
            <Box
              key={item.label}
              sx={{
                p: 1.75,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: 'text.secondary',
                    mt: 0.25,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
}
