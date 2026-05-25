'use client';

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import React from 'react';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

const cards = [
  {
    title: 'Purchase Request',
    desc: 'Create and approve procurement requests across departments.',
    icon: <DashboardOutlinedIcon fontSize="small" />,
    color: '#14B88A',
    active: true,
  },
  {
    title: 'Purchase Order',
    desc: 'Generate and track supplier purchase orders with approval workflows.',
    icon: <StorageRoundedIcon fontSize="small" />,
    color: '#E8B63E',
  },
  {
    title: 'Goods Receipts',
    desc: 'Monitor received items, delivery status, and warehouse confirmations.',
    icon: <Inventory2OutlinedIcon fontSize="small" />,
    color: '#E46C86',
  },
];

function AbstractShape({ color }: { color: string }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: -8,
        bottom: -8,
        width: 120,
        height: 80,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 85,
          height: 36,
          borderRadius: '24px 24px 10px 10px',
          bgcolor: alpha(color, 0.18),
          border: `1px solid ${alpha(color, 0.22)}`,
          backdropFilter: 'blur(10px)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 14,
          right: 54,
          width: 42,
          height: 42,
          borderRadius: '50%',
          bgcolor: alpha(color, 0.55),
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 22,
          width: 18,
          height: 62,
          borderRadius: 20,
          bgcolor: alpha(color, 0.3),
          transform: 'rotate(24deg)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 6,
          right: 92,
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: alpha(color, 0.28),
        }}
      />
    </Box>
  );
}

export default function AbstractCards() {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 0,
              p: 3,
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: '#fff',
              color: '#111827',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              transition: 'all .25s ease',

              '&:hover': {
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    mb: 1,
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    lineHeight: 1.7,
                    maxWidth: 220,
                    color: '#6B7280',
                  }}
                >
                  {card.desc}
                </Typography>
              </Box>

              <Avatar
                variant="rounded"
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  bgcolor: alpha(card.color, 0.12),
                  color: card.color,
                }}
              >
                {card.icon}
              </Avatar>
            </Stack>

            <IconButton
              sx={{
                width: 40,
                height: 40,
                borderRadius: 3,
                color: '#111827',
                bgcolor: alpha(theme.palette.grey[500], 0.06),

                '&:hover': {
                  bgcolor: alpha(theme.palette.grey[500], 0.1),
                },
              }}
            >
              <ArrowOutwardRoundedIcon fontSize="small" />
            </IconButton>

            {/* <AbstractShape color={card.color} /> */}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
