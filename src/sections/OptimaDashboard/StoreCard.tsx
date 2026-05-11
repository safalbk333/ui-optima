'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  Stack,
  alpha,
  useTheme,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';

import { Bar, Area, Line, BarChart, AreaChart, LineChart, ResponsiveContainer } from 'recharts';

const kpis = [
  {
    type: 'line',
    label: 'Pending RFQs',
    value: '16',
    detail: 'Straight-through processing, no manual touch',
    data: [
      { value: 20 },
      { value: 30 },
      { value: 28 },
      { value: 45 },
      { value: 60 },
      { value: 75 },
      { value: 87 },
    ],
  },
  {
    type: 'bar',
    label: 'Open POs',
    value: '4',
    detail: 'End-to-end within policy thresholds',
    data: [{ value: 9 }, { value: 7 }, { value: 6 }, { value: 5 }, { value: 4.1 }],
  },
  {
    type: 'progress',
    label: 'Pending Invoices',
    value: '23',
    detail: 'PO, receipt, and invoice aligned first time',
    progress: 96,
  },
  {
    type: 'area',
    label: 'Payments Processed',
    value: '1.2K',
    detail: 'Onboarded with catalog & contract rates',
    data: [
      { value: 120 },
      { value: 240 },
      { value: 380 },
      { value: 520 },
      { value: 760 },
      { value: 980 },
      { value: 1240 },
    ],
  },
] as const;

export default function CompactKpiCards() {
  const theme = useTheme();

  const primary = theme.palette.primary.main;

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Insight in your optima
      </Typography>
      <Grid container spacing={2}>
        {kpis.map((item, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card
              elevation={0}
              sx={{
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                borderRadius: 1,
                overflow: 'hidden',
                height: '100%',
                transition: '0.2s ease',
                boxShadow: 0,

                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {/* Preview */}
              <Box
                sx={{
                  height: 120,
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: alpha(primary, 0.03),
                  borderBottom: `1px solid ${alpha(primary, 0.08)}`,
                }}
              >
                {/* LINE */}
                {item.type === 'line' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={item.data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={primary}
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {/* BAR */}
                {item.type === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={item.data}>
                      <Bar dataKey="value" fill={primary} radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {/* AREA */}
                {item.type === 'area' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.data}>
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={primary} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={primary}
                        strokeWidth={2.5}
                        fill={`url(#gradient-${index})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {/* PROGRESS */}
                {item.type === 'progress' && (
                  <Box width="100%">
                    <Stack spacing={1.5}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        Match Accuracy
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          height: 12,
                          borderRadius: 999,
                          bgcolor: alpha(primary, 0.12),

                          '& .MuiLinearProgress-bar': {
                            borderRadius: 999,
                            background: `linear-gradient(90deg,
                              ${primary} 0%,
                              ${alpha(primary, 0.7)} 100%)`,
                          },
                        }}
                      />

                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Process health
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item.progress}%
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* Content */}
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 30,
                      lineHeight: 1,
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12.5,
                      color: theme.palette.text.secondary,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.detail}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
