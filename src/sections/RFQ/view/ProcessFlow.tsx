'use client';

import { Box, Chip, Paper, Stack, Avatar, Typography } from '@mui/material';

import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import React from 'react';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const steps = [
  {
    id: '01',
    title: 'RFQ Published',
    description: 'Buyer publishes RFQ with scope, BOM, attachments, and deadlines.',
    icon: <DescriptionRoundedIcon fontSize="small" />,
    color: '#2563EB',
    status: 'Completed',
  },
  {
    id: '02',
    title: 'Vendor Review',
    description: 'Vendor reviews technical requirements, documents, and timelines.',
    icon: <VisibilityRoundedIcon fontSize="small" />,
    color: '#7C3AED',
    status: 'Completed',
  },
  {
    id: '03',
    title: 'Clarifications',
    description: 'Questions and responses are exchanged through the portal.',
    icon: <QuizRoundedIcon fontSize="small" />,
    color: '#EA580C',
    status: 'In Progress',
  },
  {
    id: '04',
    title: 'Quote Preparation',
    description: 'Vendor prepares pricing, lead time, taxes, and compliance.',
    icon: <RequestQuoteRoundedIcon fontSize="small" />,
    color: '#0F766E',
    status: 'Pending',
  },
  {
    id: '05',
    title: 'Quotation Submission',
    description: 'Final quotation and attachments are submitted digitally.',
    icon: <UploadFileRoundedIcon fontSize="small" />,
    color: '#DC2626',
    status: 'Pending',
  },
  {
    id: '06',
    title: 'Evaluation & Award',
    description: 'Buyer evaluates offers and awards the RFQ to selected vendor.',
    icon: <FactCheckRoundedIcon fontSize="small" />,
    color: '#0891B2',
    status: 'Pending',
  },
  {
    id: '07',
    title: 'PO & Delivery',
    description: 'Purchase order is issued and delivery execution begins.',
    icon: <LocalShippingRoundedIcon fontSize="small" />,
    color: '#16A34A',
    status: 'Pending',
  },
];

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, any> = {
    Completed: {
      bgcolor: 'rgba(34,197,94,0.12)',
      color: '#15803D',
    },
    'In Progress': {
      bgcolor: 'rgba(249,115,22,0.12)',
      color: '#C2410C',
    },
    Pending: {
      bgcolor: 'rgba(148,163,184,0.12)',
      color: '#475569',
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        fontWeight: 700,
        borderRadius: '999px',
        ...styles[status],
      }}
    />
  );
}

export default function RFQProcessFlow() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 1,
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <Typography
            sx={{
              fontsize: 15,
              fontWeight: 700,
              color: '#0F172A',
              mb: 0.5,
            }}
          >
            Track RFQ
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              lineHeight: 1.6,
            }}
          >
            Vendor quotation lifecycle and submission process.
          </Typography>
        </Box>

        {/* Vertical Flow */}
        <Stack spacing={0} sx={{ px: 2, py: 2 }}>
          {steps.map((step, index) => (
            <Box
              key={step.id}
              sx={{
                display: 'flex',
                gap: 2,
                position: 'relative',
                pb: index !== steps.length - 1 ? 2.5 : 0,
              }}
            >
              {/* Timeline */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: `${step.color}15`,
                    color: step.color,
                    border: `1px solid ${step.color}30`,
                  }}
                >
                  {step.icon}
                </Avatar>

                {index !== steps.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      flex: 1,
                      minHeight: 48,
                      bgcolor: '#E2E8F0',
                      mt: 1,
                    }}
                  />
                )}
              </Box>

              {/* Content */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(15,23,42,0.06)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={1}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#0F172A',
                        mb: 0.5,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#94A3B8',
                        fontWeight: 700,
                      }}
                    >
                      STEP {step.id}
                    </Typography>
                  </Box>

                  <StatusChip status={step.status} />
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748B',
                    lineHeight: 1.7,
                    fontSize: 13,
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
