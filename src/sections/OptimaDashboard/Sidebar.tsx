'use client';

import * as React from 'react';

import {
  Box,
  Chip,
  Paper,
  Stack,
  Avatar,
  Divider,
  Typography,
  LinearProgress,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

const vendors = [
  {
    name: 'Nova Supplies',
    category: 'Industrial Equipment',
    rating: 4.9,
    deliveries: '1.2k',
    growth: '+18%',
    progress: 92,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Vertex Global',
    category: 'Raw Materials',
    rating: 4.8,
    deliveries: '980',
    growth: '+12%',
    progress: 84,
    logo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Prime Logistics',
    category: 'Logistics Partner',
    rating: 4.7,
    deliveries: '2.4k',
    growth: '+21%',
    progress: 88,
    logo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=200&auto=format&fit=crop',
  },
];

export default function TopVendorsSidebar() {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      //   sx={{
      //     borderRadius: 1,
      //     p: 2,
      //     border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
      //     background: `
      //       linear-gradient(
      //         180deg,
      //         ${alpha(theme.palette.primary.light, 0.09)} 0%,
      //         ${theme.palette.background.paper} 25%
      //       )
      //     `,
      //     backdropFilter: 'blur(10px)',
      //   }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              mb: 0.5,
              letterSpacing: 0.3,
            }}
          >
            Vendor Insights
          </Typography>

          <Typography variant="h6" fontWeight={700} sx={{ fontSize: 20 }}>
            Top Vendors
          </Typography>
        </Box>

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: alpha(theme.palette.warning.main, 0.12),
            color: 'warning.main',
          }}
        >
          <WorkspacePremiumRoundedIcon />
        </Box>
      </Stack>

      {/* Premium Banner */}
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          mb: 2.5,
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(
              135deg,
              ${theme.palette.primary.main},
              ${theme.palette.primary.dark}
            )
          `,
          color: '#fff',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: -20,
            top: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: alpha('#fff', 0.08),
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <StarRoundedIcon sx={{ fontSize: 18 }} />
          <Typography fontWeight={700} fontSize={14}>
            Preferred Partners
          </Typography>
        </Stack>

        <Typography
          sx={{
            opacity: 0.9,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          Vendors with highest delivery performance and procurement value.
        </Typography>
      </Box>

      {/* Vendor Cards */}
      <Stack spacing={1.5}>
        {vendors.map((vendor, index) => (
          <Paper
            key={vendor.name}
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 1,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              transition: '0.25s ease',
              backgroundColor: alpha(theme.palette.background.paper, 0.9),

              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
              },
            }}
          >
            <Stack direction="row" spacing={1.5}>
              <Avatar
                src={vendor.logo}
                variant="rounded"
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 1,
                }}
              />

              <Box flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
                  <Typography fontWeight={700} noWrap sx={{ fontSize: 14 }}>
                    {vendor.name}
                  </Typography>

                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: alpha(theme.palette.success.main, 0.12),
                      color: 'success.main',
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={0.7} alignItems="center" mb={1}>
                  <BusinessOutlinedIcon
                    sx={{
                      fontSize: 15,
                      color: 'text.secondary',
                    }}
                  />

                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                    {vendor.category}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <StarRoundedIcon
                      sx={{
                        fontSize: 15,
                        color: 'warning.main',
                      }}
                    />

                    <Typography fontWeight={600} sx={{ fontSize: 12 }}>
                      {vendor.rating}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LocalShippingOutlinedIcon
                      sx={{
                        fontSize: 15,
                        color: 'info.main',
                      }}
                    />

                    <Typography fontWeight={600} sx={{ fontSize: 12 }}>
                      {vendor.deliveries}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TrendingUpRoundedIcon
                      sx={{
                        fontSize: 15,
                        color: 'success.main',
                      }}
                    />

                    <Typography fontWeight={700} color="success.main" sx={{ fontSize: 12 }}>
                      {vendor.growth}
                    </Typography>
                  </Stack>
                </Stack>

                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={0.5}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Performance Score
                    </Typography>

                    <Typography variant="caption" fontWeight={700}>
                      {vendor.progress}%
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={vendor.progress}
                    sx={{
                      height: 6,
                      borderRadius: 10,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),

                      '& .MuiLinearProgress-bar': {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
          Procurement Efficiency
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Top vendors contributed 68% of successful procurement deliveries this quarter.
        </Typography>
      </Box>
    </Paper>
  );
}
