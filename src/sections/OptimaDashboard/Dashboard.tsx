'use client';

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { alpha, useTheme } from '@mui/material/styles';

import InventoryIcon from '@mui/icons-material/Inventory2Outlined';

import TrendingTeams from './Files';
import AppStoreCards from './StoreCard';
import SupportBanner from './MainCard';
import RecentActivityCard from './RecentActivity';
import FeatureCards from './Ext';
import DeploymentCard from './DeploymentCard';
import HeroSection from './DeploymentCard';
import ProcureToPayHero from './En';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: RevealDirection;
  threshold?: number;
}

/* ─────────────────────────────────────────────
   ANIMATION HOOK
───────────────────────────────────────────── */

function useReveal(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */

function Reveal({ children, delay = 0, direction = 'up', threshold = 0.15 }: RevealProps) {
  const [ref, visible] = useReveal(threshold);

  const transforms = {
    up: 'translateY(36px)',
    left: 'translateX(-36px)',
    right: 'translateX(16px)',
    scale: 'scale(0.94)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `
          opacity 0.7s ease ${delay}ms,
          transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms
        `,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 } }}>
        {/* Banner */}
        {/* <Reveal direction="up">
          <SupportBanner />
        </Reveal> */}
        {/* <Reveal direction="up">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 2, md: 2 },
            display: { md: 'block' },
          }}
        >
         
          <Stack spacing={2} maxWidth={720} sx={{ pb: 2, position: 'relative', zIndex: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: '0.2em' }}>
              Optima Procure-to-Pay
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                maxWidth: 600,
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.15,
                color: 'text.primary',
              }}
            >
              From Purchase Request to Payment — All in One
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              Manage purchase requests, approvals, invoices, and payments in one simple platform
              with faster workflows and better visibility.
            </Typography>
          </Stack>
        </Box>
        </Reveal> */}
        <HeroSection />
        <Box
          sx={{
            mt: 3,
            borderBottom: `0.5px dashed ${alpha(theme.palette.primary.main, 0.25)}`,
          }}
        />
        <Box mb={3} />

        {/* Teams */}
        <Reveal direction="up" delay={100}>
          <TrendingTeams />
        </Reveal>

        {/* App Cards */}
        <Grid container spacing={2} sx={{ mb: 3, mt: 0.5 }}>
          <Grid size={{ xs: 12 }}>
            <Reveal direction="up" delay={180}>
              <AppStoreCards />
            </Reveal>
          </Grid>
        </Grid>

        {/* Heading */}
        <Reveal direction="left" delay={200}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              mb: 2,
            }}
          >
            Quick Info in your optima
          </Typography>
        </Reveal>

        {/* Info Cards */}
        <Grid container spacing={2} mb={2}>
          {/* Recent Activity */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal direction="left" delay={300}>
              <RecentActivityCard />
            </Reveal>
          </Grid>

          {/* Spend Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal direction="right" delay={400}>
              <Paper
                elevation={0}
                sx={{
                  px: 1.5,
                  py: 1.15,
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: '0.25s',
                  minHeight: 82,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',

                  '&:hover': {
                    boxShadow: `0 8px 22px ${alpha(theme.palette.primary.main, 0.12)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {/* LEFT */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <InventoryIcon
                      sx={{
                        fontSize: 21,
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>

                  {/* Text */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: theme.palette.text.primary,
                        lineHeight: 1.2,
                        mb: 0.35,
                      }}
                    >
                      Top Suppliers by Spend
                    </Typography>

                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: 12,
                        lineHeight: 1.35,
                        mb: 0.8,
                      }}
                    >
                      Highest spend across key vendors this month.
                    </Typography>
                  </Box>
                </Stack>

                {/* BUTTON */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: 70,
                    height: 32,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 12,
                    px: 1.5,
                    ml: 1,
                    borderColor: alpha(theme.palette.primary.main, 0.3),

                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  View
                </Button>
              </Paper>
            </Reveal>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <FeatureCards />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
