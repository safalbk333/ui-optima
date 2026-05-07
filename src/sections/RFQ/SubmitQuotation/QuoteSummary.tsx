'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';

export default function QuoteSummaryCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 260,
        p: 1.5,
        border: '1px solid #E5E7EB',
        borderRadius: 1,
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        Quote Summary
      </Typography>

      {/* Summary Rows */}
      <Stack spacing={0.8}>
        <SummaryRow
          label="Subtotal"
          value="$21,250.00"
        />

        <SummaryRow
          label="Discount"
          value="- $652.50"
          valueColor="#DC2626"
        />

        <SummaryRow
          label="Tax (15%)"
          value="$3,089.62"
        />
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          borderTop: '1px solid #E5E7EB',
          my: 1.3,
        }}
      />

      {/* Grand Total */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: '#111827',
          }}
        >
          Grand Total
        </Typography>

        <Box textAlign="right">
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 800,
              lineHeight: 1,
              color: '#0F172A',
            }}
          >
            $26,295.90
          </Typography>

          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 600,
              color: '#94A3B8',
              mt: 0.2,
            }}
          >
            USD (Estimated)
          </Typography>
        </Box>
      </Box>

      {/* Buttons */}
      <Stack spacing={0.7}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            height: 32,
            borderRadius: 0.8,
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: 'none',
          }}
        >
          Submit Quotation
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 600,
            color: '#64748B',
            minHeight: 24,
            p: 0,
          }}
        >
          Save Draft
        </Button>
      </Stack>
    </Paper>
  );
}

/* ----------------------------- */
/* Reusable Summary Row */
/* ----------------------------- */

function SummaryRow({
  label,
  value,
  valueColor = '#334155',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: '#64748B',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: valueColor,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}