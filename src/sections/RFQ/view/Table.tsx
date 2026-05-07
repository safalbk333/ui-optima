import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';

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
        border: '1px solid #E5E7EB',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr 80px 80px',
          alignItems: 'center',
          px: 2,
          py: 1.2,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {['Item Code', 'Description', 'Qty', 'Unit'].map((item) => (
          <Typography
            key={item}
            sx={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Rows */}
      {rows.map((row, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 80px 80px',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderBottom: index !== rows.length - 1 ? '1px solid #F3F4F6' : 'none',
            transition: '0.2s',
            '&:hover': {
              bgcolor: '#FAFAFA',
            },
          }}
        >
          {/* Code */}
          <Box>
            <Chip
              label={row.code}
              size="small"
              sx={{
                height: 24,
                fontSize: '11px',
                fontWeight: 600,
                bgcolor: '#EEF2FF',
                color: '#4338CA',
                borderRadius: '6px',
              }}
            />
          </Box>

          {/* Description */}
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.4,
              pr: 2,
            }}
          >
            {row.description}
          </Typography>

          {/* Qty */}
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#111827',
            }}
          >
            {row.qty}
          </Typography>

          {/* Unit */}
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#4B5563',
            }}
          >
            {row.unit}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}
