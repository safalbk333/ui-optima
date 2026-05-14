'use client';

import { Box, Chip, Paper, Stack, Avatar, Button, Divider, Typography } from '@mui/material';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import React from 'react';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

export default function QuoteSummaryCard() {
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        width: 300,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 1,
        border: '1px solid rgba(148,163,184,0.16)',
        color: '#0F172A',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          px: 1.8,
          pt: 1.8,
          pb: 1.2,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Chip
              label="RFQ #48291"
              size="small"
              sx={{
                height: 22,
                borderRadius: '7px',
                fontSize: 10,
                fontWeight: 700,
                color: '#1D4ED8',
                background: 'rgba(59,130,246,0.10)',
                border: '1px solid rgba(59,130,246,0.14)',
              }}
            />

            <Typography
              sx={{
                mt: 1.1,
                fontSize: 10,
                letterSpacing: 1,
                fontWeight: 700,
                color: '#64748B',
              }}
            >
              QUOTATION SUMMARY
            </Typography>
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              width: 50,
              height: 50,
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(148,163,184,0.16)',
              color: '#2563EB',
            }}
          >
            <ReceiptLongRoundedIcon sx={{ fontSize: 22 }} />
          </Avatar>
        </Stack>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          px: 1.8,
          pb: 1.8,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Stack spacing={1}>
          <SummaryItem
            icon={<LocalShippingRoundedIcon sx={{ fontSize: 14 }} />}
            label="Delivery"
            value="7 Business Days"
          />
        </Stack>

        <Divider
          sx={{
            my: 1.6,
            borderColor: 'rgba(148,163,184,0.14)',
          }}
        />

        {/* Total */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              sx={{
                fontSize: 10.5,
                color: '#64748B',
                fontWeight: 700,
              }}
            >
              Final Payable
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              $26,295.90
            </Typography>
          </Box>

          <Chip
            label="Tax Included"
            size="small"
            sx={{
              height: 26,
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: 10,
              color: '#334155',
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(148,163,184,0.14)',
            }}
          />
        </Stack>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 1.3,
          background: 'rgba(255,255,255,0.55)',
          borderTop: '1px solid rgba(148,163,184,0.12)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Button
          fullWidth
          onClick={() => {
            router.push(paths.quotations.submit);
          }}
          variant="outlined"
          color="primary"
          endIcon={<ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />}
          sx={{
            height: 44,
            borderRadius: '14px',
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Submit Final Quote
        </Button>

        <Stack direction="row" justifyContent="space-between" mt={1.2}>
          <Typography
            sx={{
              fontSize: 10,
              color: '#64748B',
            }}
          >
            Auto-saved 2 mins ago
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              color: '#2563EB',
            }}
          >
            Valid till 24 May
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

/* -------------------------------- */
/* Summary Row */
/* -------------------------------- */

function SummaryItem({
  label,
  value,
  icon,
  green = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  green?: boolean;
}) {
  return (
    <Box
      sx={{
        px: 1.2,
        py: 1,
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.68)',
        border: '1px solid rgba(148,163,184,0.12)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.8} alignItems="center">
          {icon && (
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(59,130,246,0.08)',
                color: '#2563EB',
              }}
            >
              {icon}
            </Box>
          )}

          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              color: '#475569',
            }}
          >
            {label}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 11.5,
            fontWeight: 700,
            color: green ? '#22C55E' : '#0F172A',
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
}
