'use client';

import * as React from 'react';

import { Box, Chip, Paper, Radio, Stack, Typography } from '@mui/material';

import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function PayoutPreferences() {
  const [selected, setSelected] = React.useState('early');

  const options = [
    {
      id: 'standard',
      title: 'Standard (Net 30)',
      description: 'Full payment delivered 30 days after invoice approval.',
      icon: <CheckCircleRoundedIcon sx={{ fontSize: 15 }} />,
    },
    {
      id: 'early',
      title: 'Early Payment (Dynamic Discounting)',
      description: 'Get paid in as little as 5 days for a small dynamic fee.',
      recommended: true,
      icon: <BoltRoundedIcon sx={{ fontSize: 15 }} />,
    },
  ];

  return (
    <Box>
      <Typography
        fontWeight={600}
        sx={{
          fontSize: 13,
          mb: 0.3,
        }}
      >
        Payout Preferences
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          fontSize: 12.5,
          mb: 1.8,
        }}
      >
        Select your preferred payment schedule and terms.
      </Typography>

      <Stack spacing={1.2}>
        {options.map((option) => {
          const active = selected === option.id;

          return (
            <Paper
              key={option.id}
              onClick={() => setSelected(option.id)}
              elevation={0}
              sx={{
                p: 1.4,
                borderRadius: 1,
                border: '1px solid',
                borderColor: active ? 'primary.light' : 'divider',
                bgcolor: active ? 'primary.lighter' : 'background.paper',
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="flex-start">
                <Radio
                  checked={active}
                  size="small"
                  sx={{
                    p: 0.3,
                    mt: -0.2,
                  }}
                />

                <Box flex={1}>
                  <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap" mb={0.2}>
                    <Typography
                      fontWeight={700}
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.2,
                      }}
                    >
                      {option.title}
                    </Typography>

                    {option.recommended && (
                      <Chip
                        label="RECOMMENDED"
                        size="small"
                        color="success"
                        sx={{
                          height: 18,
                          fontSize: 9,
                          fontWeight: 700,
                          borderRadius: 1,
                          '& .MuiChip-label': {
                            px: 0.8,
                          },
                        }}
                      />
                    )}
                  </Stack>

                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: 11.5,
                      lineHeight: 1.4,
                    }}
                  >
                    {option.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
