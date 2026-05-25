'use client';

import * as React from 'react';

import { Box, Card, Stack, Typography } from '@mui/material';

const cards = [
  {
    title: 'My Company',
    time: 'Optima Procure-to-Pay',
    desc: `Streamline procurement, approvals, invoicing, and vendor collaboration through one unified digital platform.`,
    image: '/p2p.jpeg',
  },
  {
    title: 'Smart Procurement',
    time: 'Automation & Insights',
    desc: `Simplify sourcing, purchase requests, approvals, and invoice workflows with intelligent automation and real-time visibility.`,
    icon: '⚡',
  },
  {
    title: 'AI Integrations',
    time: 'Powered by Intelligence',
    desc: `Leverage AI-driven invoice extraction, smart recommendations, anomaly detection, and predictive procurement insights.`,
    icon: '🤖',
  },
];

export default function SchoolBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#234B74',
          height: 190,
          px: { xs: 1.5, md: 3 },
          pt: 1.5,
          borderRadius: 0,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            variant="overline"
            sx={{
              color: '#fff',
              letterSpacing: '0.18em',
              fontWeight: 700,
              lineHeight: 1,
              fontSize: 11,
            }}
          >
            Welcome to Optima Procure-to-Pay
          </Typography>
        </Stack>

        {/* Cards */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          sx={{
            position: 'absolute',
            left: { xs: 10, md: 24 },
            right: { xs: 10, md: 24 },
            bottom: -60,
          }}
        >
          {cards.map((item, index) => (
            <Card
              key={item.title}
              elevation={0}
              sx={{
                flex: 1,
                borderRadius: 2,
                p: 1.5,
                minHeight: 145,
                bgcolor: '#fff',
                boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
              }}
            >
              {/* Top */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.2}>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: '#94A3B8',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {item.time}
                </Typography>

                {index === 0 ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt="p2p"
                    sx={{
                      width: 84,
                      height: 34,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#EEF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 15,
                    }}
                  >
                    {item.icon}
                  </Box>
                )}
              </Stack>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#0F172A',
                  mb: 0.8,
                }}
              >
                {item.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: 11,
                  lineHeight: 1.6,
                  mb: 1.8,
                }}
              >
                {item.desc}
              </Typography>

              {/* Bottom Avatars */}
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Bottom Space */}
      <Box sx={{ height: 110 }} />
    </Box>
  );
}
