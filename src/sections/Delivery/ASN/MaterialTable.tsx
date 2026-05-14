import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

import React from 'react';

const rows = [
  {
    code: 'MAT-99021',
    description: 'Precision Ball Bearings X200',
    ordered: 500,
    shipping: 500,
  },
  {
    code: 'MAT-99025',
    description: 'Stainless Housing Unit - Large',
    ordered: 200,
    shipping: 150,
  },
  {
    code: 'MAT-10220',
    description: 'Gasket Sealant Ultra-Bond',
    ordered: 100,
    shipping: 50,
  },
];

function MaterialLineItems() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: '#fff',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: '#111827',
          }}
        >
          Material Line Items
        </Typography>

        <Chip
          label="Expected Delivery • 15 Oct 2024"
          size="small"
          sx={{
            mt: 1,
            height: 24,
            borderRadius: 2,
            fontSize: 10.5,
            fontWeight: 600,
            bgcolor: '#F8FAFC',
            color: '#475569',
            border: '1px solid #E2E8F0',
          }}
        />
      </Box>

      {/* Items */}
      <Stack spacing={1} sx={{ p: 1.5 }}>
        {rows.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #EEF2F7',
              borderRadius: 1,
              p: 1.5,
              transition: 'all .2s ease',
              '&:hover': {
                borderColor: '#D7DEE7',
              },
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.4,
              }}
            >
              {item.description}
            </Typography>

            {/* Code */}
            <Typography
              sx={{
                fontSize: 11,
                color: '#64748B',
                mt: 0.4,
              }}
            >
              {item.code}
            </Typography>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                mt: 1.3,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: '#94A3B8',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Ordered Qty
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  {item.ordered}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: '#94A3B8',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Shipping Qty
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 13,
                    fontWeight: 700,
                    color: item.shipping === item.ordered ? '#16A34A' : '#2563EB',
                  }}
                >
                  {item.shipping}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default MaterialLineItems;
