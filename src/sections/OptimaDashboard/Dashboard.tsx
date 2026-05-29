'use client';

import { alpha, useTheme } from '@mui/material/styles';

import AbstractHero from './Image';
import AppStoreCards from './StoreCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FeatureCards from './Ext';
import Grid from '@mui/material/Grid';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import OptimaLandingPage from './Modern';
import Paper from '@mui/material/Paper';
import ProcessSection from './One';
import RecentActivityCard from './RecentActivity';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: { xs: 4, md: 6 } }}>
        {/* <SchoolBanner /> */}
        <AbstractHero />
        {/* <OptmaHero /> */}

        <OptimaLandingPage />

        <Box mb={3} />
        {/* Teams */}
        {/* <TrendingTeams /> */}

        {/* App Cards */}
        <ProcessSection />
        <Grid container spacing={2} sx={{ mb: 3, mt: 0.5 }}>
          <Grid size={{ xs: 12 }}>
            <AppStoreCards />
          </Grid>
        </Grid>

        {/* Heading */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            mb: 2,
          }}
        >
          Quick Info in your optima
        </Typography>

        {/* Info Cards */}
        <Grid container spacing={3} mb={3}>
          {/* Recent Activity */}
          <Grid size={{ xs: 12, md: 6 }}>
            <RecentActivityCard />
          </Grid>

          {/* Spend Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                px: 1.5,
                py: 1.15,
                borderRadius: 0,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: '0.25s',
                minHeight: 82,
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'transparent',
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
                      fontWeight: 600,
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
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <FeatureCards />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
