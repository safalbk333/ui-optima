'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import VendorDocuments from './Documents';
import { useRouter } from 'next/navigation';

function Documents() {
  const router = useRouter();
  return (
    <div>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <Box mb={2}>
            <PremiumBreadcrumbs
              title="Documents Upload"
              paths={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Vendor Onboarding', href: '/vendor-onboarding' },
                { label: 'Registration', href: '/vendor-onboarding/vendor' },
                { label: 'Documents', href: '/vendor-onboarding/vendor/documents' },
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
                    onClick={() => router.push('/vendor-onboarding/preview')}
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
                    Save & Next
                  </Button>
                </Box>
              }
            />
          </Box>

          <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 0.5,
            pb: 3,

            /* Optional nice scrollbar */
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#cbd5e1',
              borderRadius: 10,
            },
          }}
        >
          <Grid container spacing={3} mb={3}>
            {/* Left Side */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Box>
                <VendorDocuments />
              </Box>
            </Grid>

            {/* Right Side */}
            <Grid size={{ xs: 12, md: 3 }}>
              {/* <Box>
              {' '}
              <AttachmentSection />{' '}
            </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default Documents;
