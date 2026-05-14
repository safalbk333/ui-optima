'use client';

import { Box, Paper, Stack, Button, Divider, Typography } from '@mui/material';

import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import React from 'react';

export default function GrnCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        transition: '0.25s ease',
        overflow: 'hidden',
      }}
    >
      <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={2}>
        {/* LEFT */}
        <Box flex={1}>
          {/* Top */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  GRN-2023-8841
                </Typography>

                <Typography
                  sx={{
                    fontSize: '11px',
                    color: '#64748B',
                    mt: 0.2,
                  }}
                >
                  Goods Receipt Note
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          {/* Info Grid */}
          <Stack direction="row" flexWrap="wrap" gap={2.5}>
            {/* Shipment */}
            <Stack direction="row" spacing={0.9} alignItems="center">
              <Box>
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  Shipment Ref
                </Typography>

                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  SHP-OC-3310
                </Typography>
              </Box>
            </Stack>

            {/* Date */}
            <Stack direction="row" spacing={0.9} alignItems="center">
              <Box>
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  Received On
                </Typography>

                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  Oct 24, 2023
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* RIGHT */}
        <Stack direction={{ xs: 'row', sm: 'row' }} spacing={1} alignItems="center">
          <Button
            variant="outlined"
            sx={{
              height: 36,
              px: 1.5,
              borderRadius: '10px',
              borderColor: '#CBD5E1',
              color: '#0F172A',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 'unset',
              '&:hover': {
                borderColor: '#94A3B8',
                background: '#F8FAFC',
              },
            }}
          >
            PDF
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              height: 36,
              px: 1.8,
              borderRadius: '10px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            Print
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
