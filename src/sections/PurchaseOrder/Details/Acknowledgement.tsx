'use client';

import React from 'react';

import { Box, Stack, TextField, Typography, Divider } from '@mui/material';

import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

export default function VendorAttestationCard() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Vendor Attestation & Signature
      </Typography>

      {/* Content */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
        {/* Left Text */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            lineHeight: 1.7,
            flex: 1,
            maxWidth: 420,
          }}
        >
          By signing this document, the Vendor acknowledges receipt of PO-2024-0812 and commits to
          the quantities and delivery dates specified above. Any deviation must be communicated via
          the buyer notes section.
        </Typography>

        {/* Signature Box */}
        <Box
          sx={{
            width: 180,
            height: 90,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <DrawOutlinedIcon
            sx={{
              fontSize: 28,
              color: 'text.secondary',
              mb: 1,
            }}
          />

          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textAlign: 'center',
            }}
          >
            CLICK TO SIGN
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Authorized Signatory */}
      <Box sx={{ maxWidth: 320 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            display: 'block',
            mb: 0.8,
          }}
        >
          AUTHORIZED SIGNATORY NAME
        </Typography>

        <TextField fullWidth size="small" placeholder="Full Legal Name" />
      </Box>
    </Box>
  );
}
