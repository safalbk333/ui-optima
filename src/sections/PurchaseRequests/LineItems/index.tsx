'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LineItemsTable from '../Forms/LineItems';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import { useRouter } from 'next/navigation';

// import PRPreviewScreen from './Preview';

function PRLineItem() {
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
              { label: 'Add items', href: '/purchase-requests/purchase-request/items' },
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
                  onClick={() => router.push('/purchase-requests/preview')}
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
                    boxShadow: 'none',
                  }}
                >
                  Review
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
        <LineItemsTable />
      </Box>
    </Box>
  );
}

export default PRLineItem;
