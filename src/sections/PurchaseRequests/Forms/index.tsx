'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import PurchaseRequestForm from './BasicInformation';
import React from 'react';
import StylishDocumentUpload from './Attachment';
import { useRouter } from 'next/navigation';

function PRForm() {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: '100vh',
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
            title="Purchase Requests"
            paths={[
              { label: 'Home', href: '/dashboard' },
              { label: 'PR', href: '/purchase-requests/purchase-request' },
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
                  onClick={() => router.push('/purchase-requests/purchase-request/items')}
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
              <PurchaseRequestForm />
              <StylishDocumentUpload />
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
  );
}

export default PRForm;
