'use client';

import React from 'react';

import { Box, Stack, Avatar, Typography, Divider } from '@mui/material';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const company = {
  name: 'ABC Manufacturing Ltd',
  buyerId: 'BUY-00124',
  address: 'Harare, Zimbabwe',
  paymentTerms: 'Net 30 Days',
  currency: 'USD',
};

const Item = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box
      sx={{
        color: 'text.secondary',
        display: 'flex',
      }}
    >
      {icon}
    </Box>

    <Box>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default function CompanySidebarCard() {
  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor: 'primary.main',
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          A
        </Avatar>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {company.name}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Buyer Company
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Details */}
      <Stack spacing={1.4}>
        <Item
          icon={<BusinessOutlinedIcon fontSize="small" />}
          label="Buyer ID"
          value={company.buyerId}
        />

        <Item
          icon={<LocationOnOutlinedIcon fontSize="small" />}
          label="Location"
          value={company.address}
        />

        <Item
          icon={<PaymentsOutlinedIcon fontSize="small" />}
          label="Terms"
          value={`${company.paymentTerms} • ${company.currency}`}
        />
      </Stack>
    </Box>
  );
}
