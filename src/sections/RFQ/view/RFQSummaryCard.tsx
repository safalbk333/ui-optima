'use client';

import { Box, Paper, Button, Typography } from '@mui/material';

import React from 'react';

function RFQHeaderCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        maxWidth: 900,
      }}
    >
      {/* Top Section */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Box>
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 600,
              letterSpacing: 0.6,
              mb: 0.7,
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
            }}
          >
            RFQ #2024-0892
            <Box
              component="span"
              sx={{
                color: '#B45309',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              ( Pending )
            </Box>
          </Typography>

          <Typography
            color="primary"
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: 500,
            }}
          >
            Office Furniture Supply
          </Typography>
        </Box>
        <Button
          sx={{ borderRadius: 0.5, fontWeight: 600 }}
          variant="outlined"
          color="primary"
          size="small"
          href="/quotations/clarifications"
        >
          Ask Clarification
        </Button>
      </Box>
      {/* Bottom Info Section */}
      <Box display="flex" gap={5} flexWrap="wrap">
        <Box>
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              mb: 0.4,
              fontSize: '11px',
            }}
          >
            Release Date
          </Typography>

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            Oct 12, 2024
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              mb: 0.4,
              fontSize: '11px',
            }}
          >
            Submission Deadline
          </Typography>

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#DC2626',
              lineHeight: 1.3,
            }}
          >
            Oct 28, 2024 (14:00 GMT)
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              mb: 0.4,
              fontSize: '11px',
            }}
          >
            Estimated Value
          </Typography>

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            $450,000.00
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default RFQHeaderCard;
