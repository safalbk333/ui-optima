import { Box, Chip, Paper, Stack, Divider, Typography } from '@mui/material';

import React from 'react';

const rows = [
  {
    code: 'EQ-901-C',
    description: 'High-Speed Industrial Centrifuge (Model X-500)',
    qty: 4,
    unit: 'Units',
  },
  {
    code: 'AC-102-S',
    description: 'Stabilized Power Supply Unit (15kVA)',
    qty: 4,
    unit: 'Units',
  },
  {
    code: 'MT-005-K',
    description: 'Annual Maintenance Kit & Spare Parts Bundle',
    qty: 1,
    unit: 'Kit',
  },
];

export default function CompactModernTable() {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        // bgcolor: '#FBFCFE',
        // px: 0.5,
        borderRadius: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          py: 1.4,
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          Material Line Items
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          Here are the details of the materials requested for quotation. Each item includes a
          description, code, quantity, and unit of measurement for your reference.
        </Typography>
      </Box>

      {rows.map((row, index) => (
        <Box key={index}>
          <Box
            sx={{
              py: 1.8,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              transition: '0.2s',
            }}
          >
            {/* LEFT */}
            <Box flex={1}>
              {/* Description */}
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  letterSpacing: 0.1,
                }}
              >
                {row.description}
              </Typography>

              {/* Bottom Info */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                sx={{ mt: 1.2 }}
              >
                <Chip
                  label={row.code}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 10,
                    fontWeight: 700,
                    bgcolor: '#EEF2FF',
                    color: '#4338CA',
                    borderRadius: '6px',
                  }}
                />

                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: '#CBD5E1',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    color: '#64748B',
                    fontWeight: 500,
                  }}
                >
                  Qty :
                  <Box
                    component="span"
                    sx={{
                      color: '#111827',
                      fontWeight: 700,
                      ml: 0.5,
                    }}
                  >
                    {row.qty}
                  </Box>
                </Typography>

                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: '#CBD5E1',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    color: '#64748B',
                    fontWeight: 500,
                  }}
                >
                  Unit :
                  <Box
                    component="span"
                    sx={{
                      color: '#2563EB',
                      fontWeight: 700,
                      ml: 0.5,
                    }}
                  >
                    {row.unit}
                  </Box>
                </Typography>
              </Stack>
            </Box>
          </Box>

          {index !== rows.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
        </Box>
      ))}
    </Paper>
  );
}
