'use client';

import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

import React from 'react';

const infoItem = (label: string, value: string) => (
  <Box>
    <Typography
      sx={{
        fontSize: 11,
        color: 'text.secondary',
        fontWeight: 500,
        mb: 0.4,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 600,
        color: 'text.primary',
        lineHeight: 1.5,
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default function VendorHeroBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      {/* TOP HEADER */}
      <Box
        sx={{
          py: 2.2,
        }}
      >
        <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={2}>
          {/* LEFT */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Typography
                sx={{
                  fontSize: 11,
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Vendor ID: VND-2026-084
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: '1.2rem', md: '1.55rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 0.5,
              }}
            >
              Acme Industrial Solutions Pvt Ltd
            </Typography>

            <Typography
              sx={{
                fontSize: 12.5,
                color: 'text.secondary',
                maxWidth: 700,
                lineHeight: 1.6,
              }}
            >
              Strategic supplier partner for engineering, maintenance, and industrial procurement
              services.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* DETAILS */}
      <Box
        sx={{
          py: 2.5,
        }}
      >
        <Grid container spacing={3}>
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {infoItem('Company Name', 'Acme Industrial Solutions Pvt Ltd')}

              {infoItem('Vendor Type', 'Industrial Equipment Supplier')}

              {infoItem('GST / Tax ID', '29ABCDE1234F1Z5')}

              {infoItem('Website', 'www.acmeindustrial.com')}
            </Stack>
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {infoItem('Contact Person', 'John Mathew')}

              {infoItem('Email Address', 'john@acmeindustrial.com')}

              {infoItem('Phone Number', '+91 98765 43210')}

              {infoItem('Address', 'Infopark Road, Kochi, Kerala 682042, India')}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5 }} />

        {/* BANK DETAILS */}
        <Box mb={2}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: 0.3,
            }}
          >
            Banking Information
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>{infoItem('Bank Name', 'HDFC Bank')}</Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              {infoItem('Account Name', 'Acme Industrial Solutions')}
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>{infoItem('IFSC Code', 'HDFC0000123')}</Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>{infoItem('Routing Number', '021000021')}</Grid>
          </Grid>
        </Box>
        <Paper
          elevation={0}
          sx={{
            minWidth: { xs: '100%', md: 320 },
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: 0.3,
            }}
          >
            Payment Preferences
          </Typography>


          <Stack spacing={1.5}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: '1px solid #eaeaea',
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  mb: 0.4,
                  pr: 8,
                }}
              >
                Early Payment (Dynamic Discounting)
              </Typography>

              <Typography
                sx={{
                  fontSize: 11.5,
                  color: 'text.secondary',
                  lineHeight: 1.5,
                }}
              >
                Get paid in as little as 5 days for a small dynamic fee.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
}
