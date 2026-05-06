'use client';

import React from 'react';
import { Box, Typography, Button, Stack, Grid, Paper, useTheme, alpha } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const apps = [
  {
    id: 1,
    title: 'Purchase Requisition',
    company: 'ProcureFlow Solutions',
    action: 'Open',
    color: '#2D2D35',
    icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 2,
    title: 'Vendor Management',
    company: 'SupplySphere Technologies',
    action: 'Open',
    color: '#635BFF',
    icon: <BusinessOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 3,
    title: 'Invoice Processing',
    company: 'FinEdge Systems',
    action: 'Open',
    color: '#0094FF',
    icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 4,
    title: 'Purchase Orders',
    company: 'Enterprise Procurement Suite',
    action: 'Open',
    color: '#7B1FA2',
    icon: <Inventory2OutlinedIcon sx={{ fontSize: 20 }} />,
  },
];

export default function TrendingTeams() {
  const theme = useTheme();

  return (
    <Box mb={3}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Trending in your optima
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
      </Stack>

      {/* Cards */}
      <Grid container spacing={1.5}>
        {apps.map((app) => (
          <Grid size={{ xs: 12, md: 6 }} key={app.id}>
            <Paper
              elevation={0}
              sx={{
                px: 1.5,
                py: 1.15,
                borderRadius: 1,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                minHeight: 82,
                bgcolor: '#fff',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                },
              }}
            >
              {/* Left */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ flex: 1, minWidth: 0 }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1), // same background for all
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.primary.main, // same icon color for all
                    flexShrink: 0,
                  }}
                >
                  {app.icon}
                </Box>

                {/* Content */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#2B2B2B',
                      mb: 0.4,
                    }}
                  >
                    {app.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#666',
                      fontSize: 12,
                      lineHeight: 1.3,
                    }}
                  >
                    {app.company}
                  </Typography>
                </Box>
              </Stack>

              {/* Action */}
              <Button
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 68,
                  height: 32,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 12,
                  color: '#2B2B2B',
                  borderColor: alpha(theme.palette.primary.main, 0.25),
                  px: 1.5,
                  ml: 1,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                {app.action}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
