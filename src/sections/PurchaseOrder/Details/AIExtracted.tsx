import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import React from 'react';

const insights = [
  {
    title: 'Delivery Compliance',
    points: [
      'Notify warehouse manager 24 hours before delivery.',
      'Dock scheduling is mandatory before shipment.',
    ],
  },
  {
    title: 'Quality Requirements',
    points: [
      'All items must comply with ISO-9001 standards.',
      'Calibration certificate required during inspection.',
    ],
  },
  {
    title: 'Commercial Terms',
    points: [
      'Late deliveries may incur a 2% weekly penalty.',
      'Purchase governed by Standard Procurement Agreement v2.1.',
    ],
  },
  {
    title: 'Documentation',
    points: ['PO copy must accompany shipment.', 'Invoice should reference PO number clearly.'],
  },
];

const AIExtractedKeyPoints = () => (
  <Grid container spacing={2}>
    {insights.map((item) => (
      <Grid size={{ xs: 12, md: 6 }} key={item.title}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            border: '1px solid #dcdce3',
            height: '100%',
            background: 'linear-gradient(180deg, #ffffff 0%, #fafbff 100%)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                bgcolor: '#eef2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AutoAwesomeRoundedIcon
                sx={{
                  fontSize: 16,
                  color: '#4f46e5',
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: '#1f2937',
              }}
            >
              {item.title}
            </Typography>

            <Chip
              label="AI Extracted"
              size="small"
              sx={{
                height: 22,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: '#eef2ff',
                color: '#4338ca',
              }}
            />
          </Stack>

          <Stack spacing={1}>
            {item.points.map((point) => (
              <Typography
                key={point}
                sx={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#4b5563',
                }}
              >
                • {point}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default AIExtractedKeyPoints;
