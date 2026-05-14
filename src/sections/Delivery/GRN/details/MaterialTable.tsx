import { Box, Paper, Stack, Typography } from '@mui/material';

import React from 'react';

const rows = [
  {
    sku: 'IC-092-B',
    description: 'Industrial Controller V2',
    ordered: 850,
    shipped: 840,
    received: 840,
    accepted: 828,
    rejected: 12,
  },
  {
    sku: 'SN-441-X',
    description: 'Smart Network Gateway',
    ordered: 420,
    shipped: 420,
    received: 418,
    accepted: 410,
    rejected: 8,
  },
  {
    sku: 'PX-778-A',
    description: 'Power Distribution Module',
    ordered: 300,
    shipped: 295,
    received: 292,
    accepted: 287,
    rejected: 5,
  },
  {
    sku: 'TR-220-Z',
    description: 'Thermal Regulator Unit',
    ordered: 150,
    shipped: 145,
    received: 145,
    accepted: 142,
    rejected: 3,
  },
  {
    sku: 'CM-510-Q',
    description: 'Control Monitoring Panel',
    ordered: 600,
    shipped: 590,
    received: 585,
    accepted: 576,
    rejected: 9,
  },
];

function MaterialLineItems() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(5, 1fr)',
          px: 1.5,
          py: 1,
          bgcolor: '#f3f4f68b',
          borderRadius: 0.5,
        }}
      >
        {['SKU / Description', 'Ordered', 'Shipped', 'Received', 'Accepted', 'Rejected'].map(
          (head) => (
            <Typography
              key={head}
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: '#4B5563',
              }}
            >
              {head}
            </Typography>
          )
        )}
      </Box>

      {/* Rows */}
      <Stack spacing={1} sx={{ mt: 1 }}>
        {rows.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr repeat(5, 1fr)',
              alignItems: 'center',
              border: '1px solid #EEF2F7',
              borderRadius: 0,
              p: 1.5,
              transition: 'all .2s ease',
              '&:hover': {
                borderColor: '#D7DEE7',
              },
            }}
          >
            {/* SKU + Description */}
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'primary.main',
                  lineHeight: 1.3,
                }}
              >
                {item.sku}
              </Typography>

              <Typography
                sx={{
                  fontSize: 10.5,
                  color: '#6B7280',
                  mt: 0.2,
                }}
              >
                {item.description}
              </Typography>
            </Box>

            {/* Ordered */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: '#374151',
              }}
            >
              {item.ordered}
            </Typography>

            {/* Shipped */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: '#374151',
              }}
            >
              {item.shipped}
            </Typography>

            {/* Received */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: '#374151',
              }}
            >
              {item.received}
            </Typography>

            {/* Accepted */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#3F51B5',
              }}
            >
              {item.accepted}
            </Typography>

            {/* Rejected */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#DC2626',
              }}
            >
              {item.rejected}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default MaterialLineItems;
