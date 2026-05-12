'use client';

import React from 'react';
import { Avatar, Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material';

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

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
        background:
          'radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 30%), linear-gradient(180deg, #F8FAFC 0%, #EEF4FF 100%)',
        boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
        backdropFilter: 'blur(16px)',
        color: '#0F172A',
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(96,165,250,0.28)',
          filter: 'blur(55px)',
        }}
      />

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

            <Stack direction="row" spacing={0.7} alignItems="center" mt={1}>
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 15,
                  color: '#22C55E',
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,
                  color: '#475569',
                  fontWeight: 500,
                }}
              >
                Competitive pricing submitted
              </Typography>
            </Stack>
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              width: 50,
              height: 50,
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(148,163,184,0.16)',
              backdropFilter: 'blur(12px)',
              color: '#2563EB',
              boxShadow: '0 4px 18px rgba(37,99,235,0.08)',
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
                fontSize: 17,
                fontWeight: 600,
                color: '#0F172A',
                letterSpacing: -0.5,
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
          variant="contained"
          endIcon={<ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />}
          sx={{
            height: 44,
            borderRadius: '14px',
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            boxShadow: '0 10px 24px rgba(37,99,235,0.22)',
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
