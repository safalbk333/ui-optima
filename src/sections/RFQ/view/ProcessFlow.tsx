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
    icon: <DescriptionRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#2563EB',
    status: 'Completed',
  },
  {
    id: '02',
    title: 'Vendor Review',
    description: 'Vendor reviews technical requirements, documents, and timelines.',
    icon: <VisibilityRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#7C3AED',
    status: 'Completed',
  },
  {
    id: '03',
    title: 'Clarifications',
    description: 'Questions and responses are exchanged through the portal.',
    icon: <QuizRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#EA580C',
    status: 'In Progress',
  },
  {
    id: '04',
    title: 'Quote Preparation',
    description: 'Vendor prepares pricing, lead time, taxes, and compliance.',
    icon: <RequestQuoteRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#0F766E',
    status: 'Pending',
  },
  {
    id: '05',
    title: 'Quotation Submission',
    description: 'Final quotation and attachments are submitted digitally.',
    icon: <UploadFileRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#DC2626',
    status: 'Pending',
  },
  {
    id: '06',
    title: 'Evaluation & Award',
    description: 'Buyer evaluates offers and awards the RFQ to selected vendor.',
    icon: <FactCheckRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#0891B2',
    status: 'Pending',
  },
  {
    id: '07',
    title: 'PO & Delivery',
    description: 'Purchase order is issued and delivery execution begins.',
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 16 }} />,
    color: '#16A34A',
    status: 'Pending',
  },
];

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, any> = {
    Completed: {
      bgcolor: 'rgba(34,197,94,0.10)',
      color: '#15803D',
    },
    'In Progress': {
      bgcolor: 'rgba(249,115,22,0.10)',
      color: '#C2410C',
    },
    Pending: {
      bgcolor: 'rgba(148,163,184,0.10)',
      color: '#475569',
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        height: 22,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: '999px',
        ...styles[status],
        '& .MuiChip-label': {
          px: 1,
        },
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
          mt: 1.5,
          borderRadius: 1.5,
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: '#0F172A',
              mb: 0.3,
            }}
          >
            Track RFQ
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              lineHeight: 1.5,
              fontSize: 11.5,
            }}
          >
            Vendor quotation lifecycle and submission process.
          </Typography>
        </Box>

        {/* Vertical Flow */}
        <Stack spacing={0} sx={{ px: 1.5, py: 1.5 }}>
          {steps.map((step, index) => (
            <Box
              key={step.id}
              sx={{
                display: 'flex',
                gap: 1.5,
                position: 'relative',
                pb: index !== steps.length - 1 ? 1.8 : 0,
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
                    width: 32,
                    height: 32,
                    bgcolor: `${step.color}12`,
                    color: step.color,
                    border: `1px solid ${step.color}25`,
                  }}
                >
                  {step.icon}
                </Avatar>

                {index !== steps.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      flex: 1,
                      minHeight: 36,
                      bgcolor: '#E2E8F0',
                      mt: 0.8,
                    }}
                  />
                )}
              </Box>

              {/* Content */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(15,23,42,0.05)',
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={0.7}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#0F172A',
                        mb: 0.2,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: '#94A3B8',
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: 0.3,
                      }}
                    >
                      STEP {step.id}
                    </Typography>
                  </Box>

                  <StatusChip status={step.status} />
                </Stack>

                <Typography
                  sx={{
                    color: '#64748B',
                    lineHeight: 1.5,
                    fontSize: 11.5,
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
