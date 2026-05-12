'use client';

import React from 'react';
import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Divider,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const threads = [
  {
    id: 'RFQ-2024-089',
    title: 'Steel Infrastructure Component Supply',
    message:
      'Hello, we would like to clarify the technical specifications for the tensile strength required fo...',
    initials: 'AW',
    time: '12:45 PM',
    status: 'PENDING',
    statusColor: 'warning',
  },
  {
    id: 'RFQ-2024-072',
    title: 'HVAC Systems Maintenance - Phase 2',
    message:
      'The revised quotation has been uploaded. Please review the updated maintenance schedule...',
    initials: 'MB',
    time: 'Yesterday',
    status: 'REPLIED',
    statusColor: 'info',
  },
  {
    id: 'RFQ-2024-045',
    title: 'Custom Fasteners & Connectors',
    message:
      'Confirmed. We can meet the delivery timeline for the requested quantities by the end of Q3.',
    initials: 'SD',
    time: 'Monday',
    status: 'REPLIED',
    statusColor: 'info',
  },
];

export default function RFQThreads() {
  return (
    <Box
      sx={{
        height: '80vh',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ py: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            mb: 2,
            fontSize: 14,
            letterSpacing: 1,
          }}
        >
          RFQs Threads
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search threads..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: '#F3F4F6',
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Divider />

      {/* Thread List */}
      <Stack spacing={0}>
        {threads.map((thread, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              px: 2,
              py: 2,
              borderRadius: 0,
              bgcolor: index === 0 ? '#EEF2FF' : '#FFFFFF',
              borderLeft: index === 0 ? '3px solid #4F46E5' : '3px solid transparent',
              borderBottom: '1px solid #F3F4F6',
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': {
                bgcolor: '#F9FAFB',
              },
            }}
          >
            {/* Top Row */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography
                variant="caption"
                sx={{
                  color: '#6B7280',
                  fontWeight: 600,
                  letterSpacing: 0.3,
                }}
              >
                {thread.id}
              </Typography>

              <Chip
                label={thread.status}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: 1,
                }}
              />
            </Stack>

            {/* Title */}
            <Typography
              variant="subtitle2"
              color="primary.main"
              sx={{
                fontWeight: 700,
                lineHeight: 1.4,
                mb: 0.7,
              }}
            >
              {thread.title}
            </Typography>

            {/* Message */}
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '12px',
                lineHeight: 1.5,
                mb: 1.5,
              }}
            >
              {thread.message}
            </Typography>

            {/* Footer */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '11px',
                  bgcolor: '#E5E7EB',
                  color: '#374151',
                  fontWeight: 700,
                }}
              >
                {thread.initials}
              </Avatar>

              <Typography
                variant="caption"
                sx={{
                  color: '#9CA3AF',
                  fontSize: '11px',
                }}
              >
                {thread.time}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
