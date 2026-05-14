'use client';

import { Box, Chip, Paper, Stack, Button, Typography } from '@mui/material';

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { useRouter } from 'next/navigation';

const eoiList = [
  {
    id: 'EOI-2026-0019',
    title: 'HVAC Maintenance — 4 NOC Sites',
    description:
      'Econet Zimbabwe invites expressions of interest for comprehensive HVAC preventive & corrective maintenance across 4 Network Operation Centres in Harare, Bulawayo, Gweru and Mutare.',
    tags: ['Facilities', '2,000+ Sites', '12-Month Contract'],
    closing: 'Closes 20 May 2026',
  },
  {
    id: 'EOI-2026-0022',
    title: 'Generator Servicing & AMC — Rural Sites',
    description:
      'Annual maintenance contract for 80 diesel generators across rural telecom sites. Includes quarterly servicing, emergency breakdown cover, fuel management and compliance testing.',
    tags: ['Generators', '80 Sites', 'Annual AMC'],
    closing: 'Closes 25 May 2026',
  },
];

export default function VendorEOIWhiteUI() {
  const router = useRouter();
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Expression of Interest (EOI)"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'EOI', href: '/expression-of-interest' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Stack spacing={2}>
        {eoiList.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: 1,
              border: '1px solid #e6edf5',
              transition: '0.25s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Row */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              spacing={1.5}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#94a3b8',
                    letterSpacing: 0.8,
                    mb: 0.8,
                  }}
                >
                  {item.id}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.25,
                    mb: 1.2,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 1000,
                    color: '#64748b',
                    fontSize: 13.5,
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>

              {/* Closing Badge */}
              <Chip
                label={item.closing}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: '#fff8e6',
                  color: '#b7791f',
                  fontWeight: 700,
                  borderRadius: '999px',
                  height: 30,
                  fontSize: 12,
                  border: '1px solid #fde68a',
                }}
              />
            </Stack>

            {/* Tags */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
              {item.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: '#f1f5f9',
                    color: '#334155',
                    fontWeight: 600,
                    borderRadius: '999px',
                    fontSize: 11,
                    border: '1px solid #e2e8f0',
                  }}
                />
              ))}
            </Stack>

            {/* Divider */}
            <Box
              sx={{
                height: 1,
                bgcolor: '#edf2f7',
                my: 2,
              }}
            />

            {/* Actions */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
              <Button
                variant="contained"
                size="small"
                startIcon={<ThumbUpOffAltRoundedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  bgcolor: '#06b6d4',
                  color: '#fff',
                  px: 2,
                  py: 0.9,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 13,
                  boxShadow: 'none',

                  '&:hover': {
                    bgcolor: '#0891b2',
                    boxShadow: 'none',
                  },
                }}
              >
                Express Interest
              </Button>

              <Button
                variant="outlined"
                size="small"
                startIcon={<CloseRoundedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  borderColor: '#dbe3ec',
                  color: '#475569',
                  px: 2,
                  py: 0.9,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 13,

                  '&:hover': {
                    borderColor: '#94a3b8',
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                Decline
              </Button>

              <Button
                onClick={() => router.push('/expression-of-interest/clarifications')}
                variant="outlined"
                size="small"
                startIcon={<ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  borderColor: '#dbe3ec',
                  color: '#475569',
                  px: 2,
                  py: 0.9,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 13,

                  '&:hover': {
                    borderColor: '#94a3b8',
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                Ask Clarification
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
