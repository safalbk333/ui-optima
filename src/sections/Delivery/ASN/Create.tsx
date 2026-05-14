'use client';

import { Box, Paper, Stack, Button, Divider } from '@mui/material';

import DocumentsSection from './Document';
import MaterialLineItems from './MaterialTable';
import OrderInformationCard from './OrderInfo';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import { useRouter } from 'next/navigation';

function Create() {
  const router = useRouter();

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Advance Shipment Notice. (ASN)"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'ASN Lists', href: '/delivery' },
            { label: 'ASN', href: '/delivery/asn' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                sx={{ borderRadius: 0.5, fontWeight: 600 }}
                variant="outlined"
                onClick={() => {
                  router.push('/delivery/tracking');
                }}
              >
                Shipment Tracking
              </Button>
              <Button
                sx={{ borderRadius: 0.5, fontWeight: 600 }}
                variant="contained"
                color="primary"
              >
                Confirm Dispatch
              </Button>
            </Stack>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box display="flex" gap={2}>
        {/* Left Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 2.5,
            overflow: 'auto',
          }}
        >
          <Box>
            <OrderInformationCard />

            <Divider
              sx={{
                my: 2,
                borderColor: '#e5e7eb',
              }}
            />

            <MaterialLineItems />
          </Box>
        </Paper>

        {/* Right Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            overflow: 'auto',
            borderRadius: 0,
          }}
        >
          <DocumentsSection />
        </Paper>
      </Box>
    </Box>
  );
}

export default Create;
