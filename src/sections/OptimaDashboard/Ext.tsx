'use client';

import { Box, Grid, Paper, Stack, alpha, useTheme, Typography } from '@mui/material';

import React from 'react';

const cards = [
  {
    title: 'Project management made easy...',
    description: 'Efficiently manage projects with these Teams apps.',
    image:
      'https://img.freepik.com/free-vector/task-management-concept-illustration_114360-149.jpg',
  },
  {
    title: 'Manage recognition with ease',
    description: 'Foster appreciation and motivation in the workplace.',
    image:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
  },
];

export default function FeatureCards() {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                transition: '0.25s',
                bgcolor: 'transparent',
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                {/* Image */}
                <Box
                  component="img"
                  src={card.image}
                  alt={card.title}
                  sx={{
                    width: 125,
                    height: 125,
                    objectFit: 'cover',
                    borderRadius: 1.5,
                    bgcolor: '#ede7f6',
                  }}
                />

                {/* Text */}
                <Box>
                  <Typography fontSize={15} fontWeight={600} gutterBottom>
                    {card.title}
                  </Typography>

                  <Typography
                    fontSize={14}
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      maxWidth: 320,
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
