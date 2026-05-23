'use client';

import { Box, Button, Paper, Stack } from '@mui/material';

import EOIHeroBanner from './Header';
import EOISidebar from './Sidebar';
import MaterialLineItems from './Table';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import ProjectOverview from './Overview';
import React from 'react';
import { useRouter } from 'next/navigation';

function Preview() {
  const router = useRouter();
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Preview"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'PR', href: '/purchase-requests/purchase-request' },
            { label: 'Preview', href: '/purchase-requests/preview/' },
          ]}
          action={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1.2,
              }}
            >
              <Button
                onClick={() => router.back()}
                color="primary"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderRadius: 0.5,
                  px: 2.2,
                  py: 0.7,
                  fontSize: 13,
                  minWidth: 100,
                  fontWeight: 600,
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => router.push('/purchase-requests')}
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'none',
                  borderRadius: 0.5,
                  px: 2.5,
                  py: 0.7,
                  fontSize: 13,
                  minWidth: 110,
                  fontWeight: 600,
                  boxShadow: 0,
                }}
              >
                Submit PR
              </Button>
            </Box>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <EOIHeroBanner />

      {/* Main Content */}
      <Box

      >
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="flex-start">
          {/* LEFT SIDE - MORE SPACE */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
            }}
          >
            <Paper elevation={0}>
              <ProjectOverview />
              <MaterialLineItems />
            </Paper>
          </Box>

          {/* RIGHT SIDE - SMALLER */}
          <Box
            sx={{
              width: { xs: '100%', lg: 360 },
              flexShrink: 0,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                position: 'sticky',
                top: 20,
                borderRadius: 0,
              }}
            >
              <EOISidebar />
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Preview;
