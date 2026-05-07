'use client';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import P2PAnalyticsSection from './P2PAnalyticsSection';
import P2PFlowGraph from './Visual';

function Dashboard() {
  return (
    <Box component="main" sx={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="center">
          {/* LEFT CONTENT */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              {/* Glow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -80,
                  right: -80,
                  width: 250,
                  height: 250,
                  background: 'primary.main',
                  opacity: 0.15,
                  borderRadius: '50%',
                  filter: 'blur(80px)',
                }}
              />

              <Stack spacing={3} sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    letterSpacing: '0.25em',
                    fontWeight: 700,
                  }}
                >
                  OPTIMA VENDOR PORTAL
                </Typography>

                <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  From Purchase Request to Payment —{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    All in One
                  </Box>
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Manage requisitions, vendors, approvals, invoices, and payments in one powerful
                  Procure-to-Pay platform.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    href="/purchase_requests"
                    sx={{ px: 4, py: 1.4, fontWeight: 700 }}
                  >
                    Purchase Requests
                  </Button>

                  <Button
                    variant="outlined"
                    component={Link}
                    href="/"
                    sx={{
                      px: 4,
                      py: 1.4,
                      fontWeight: 600,
                      borderColor: 'grey.400',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      },
                    }}
                  >
                    Analytics
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT FLOATING CARDS */}
          <Grid size={{ xs: 12, md: 5 }}>
            {/* <Box
              sx={{
                position: 'relative',
                height: 380,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${theme.palette.primary.main}40 0%, transparent 70%)`,
                  filter: 'blur(60px)',
                  zIndex: 0,
                })}
              />

              {slides.map((item, index) => {
                const isActive = index === active;

                const positions = [
                  { top: 20, left: 110 }, // top center
                  { top: 160, left: 20 }, // bottom left
                  { top: 160, left: 200 }, // bottom right
                ];

                const pos = positions[index];

                return (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      width: 180,
                      p: 1.5,
                      borderRadius: 2,

                      backdropFilter: 'blur(14px)',
                      background: 'rgba(255,255,255,0.7)',

                      transition: 'all 0.5s ease',

                      transform: isActive ? 'translateY(-10px) scale(1.05)' : 'scale(0.92)',

                      opacity: isActive ? 1 : 0.55,

                      boxShadow: isActive
                        ? '0 12px 30px rgba(0,0,0,0.12)'
                        : '0 6px 18px rgba(0,0,0,0.06)',

                      border: '1px solid rgba(255,255,255,0.4)',

                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          background: isActive
                            ? theme.palette.primary.main
                            : theme.palette.grey[200],

                          color: isActive
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,

                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography fontSize={15} fontWeight={700}>
                        {item.title}
                      </Typography>

                      <Typography fontSize={12.5} color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })}
            </Box> */}
            <P2PFlowGraph />
          </Grid>
        </Grid>
      </Container>

      <P2PAnalyticsSection />
    </Box>
  );
}

export default Dashboard;
