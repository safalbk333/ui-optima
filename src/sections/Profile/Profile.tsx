'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

const documents = [
  {
    title: 'Zimbabwe National ID',
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Certificate of Incorporation',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'ZIMRA Tax Clearance',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Bank Verification Letter',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
  },
];

function TabPanel({ children, value, index }: any) {
  return value === index ? <Box>{children}</Box> : null;
}

export default function ZimbabweVendorProfilePage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="My Profile & KYC"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'ZimTrade Supplies', href: '/profile' },
          ]}
        />
      </Box>
      <Box mb={2.5} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Grid container spacing={2}>
        {/* SIDEBAR */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 1,
              border: '1px solid #E2E8F0',
              position: 'sticky',
              top: 16,
            }}
          >
            <Stack spacing={2}>
              {/* Profile */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    bgcolor: 'primary.main',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  ZV
                </Avatar>

                <Box>
                  <Typography fontSize={15} fontWeight={700}>
                    ZimTrade Supplies
                  </Typography>

                  <Stack direction="row" spacing={0.5} alignItems="center" mt={0.3}>
                    <PlaceRoundedIcon sx={{ fontSize: 14, color: '#64748B' }} />

                    <Typography fontSize={11} color="text.secondary">
                      Harare, Zimbabwe
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* Progress */}
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  border: '1px solid #E2E8F0',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 45%, #EEF6FF 100%)',
                }}
              >
                <Stack spacing={1}>
                  <Typography fontSize={12} fontWeight={700} color="#0F172A">
                    KYC Verification
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={24} fontWeight={800} color="#0F172A">
                      100%
                    </Typography>

                    <CheckCircleRoundedIcon
                      sx={{
                        color: 'primary.main',
                        fontSize: 22,
                      }}
                    />
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: 6,
                      borderRadius: 999,
                      bgcolor: 'rgba(15,23,42,0.08)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.main',
                      },
                    }}
                  />

                  <Typography fontSize={11} color="text.secondary">
                    All compliance checks completed successfully.
                  </Typography>
                </Stack>
              </Paper>

              {/* Status */}
              <Stack spacing={1}>
                <StatusItem title="Business Registration" />
                <StatusItem title="Tax Clearance" />
                <StatusItem title="Director Identity" />
                <StatusItem title="Bank Validation" />
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* MAIN */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
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
                bgcolor: '#FFFFFF',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontSize={16} fontWeight={700}>
                    Vendor Profile & KYC
                  </Typography>

                  <Typography fontSize={12} color="text.secondary" mt={0.5}>
                    Verified company compliance and uploaded documents.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Tabs */}
            <Box px={1.5}>
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: 42,
                  '& .MuiTab-root': {
                    fontSize: 12,
                    minHeight: 42,
                    textTransform: 'none',
                    fontWeight: 700,
                  },
                }}
              >
                <Tab label="Company" />
                <Tab label="KYC" />
                <Tab label="Banking" />
                <Tab label="Documents" />
              </Tabs>
            </Box>

            <Divider />

            {/* COMPANY */}
            <TabPanel value={tab} index={0}>
              <Box p={2}>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Company Name" value="ZimTrade Supplies Pvt Ltd" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Registration Number" value="ZW-REG-293944" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Business Type" value="Industrial Supplier" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Tax Number" value="ZIMRA-992933" />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <ModernField label="Business Address" value="12 Samora Machel Avenue, Harare" />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* KYC */}
            <TabPanel value={tab} index={1}>
              <Box p={2}>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <KycCard icon={<BadgeRoundedIcon />} title="Director National ID" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <KycCard icon={<BusinessRoundedIcon />} title="Certificate of Incorporation" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <KycCard icon={<DescriptionRoundedIcon />} title="ZIMRA Tax Clearance" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <KycCard icon={<AccountBalanceRoundedIcon />} title="Bank Verification" />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* BANKING */}
            <TabPanel value={tab} index={2}>
              <Box p={2}>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Bank Name" value="CBZ Bank Zimbabwe" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="Account Number" value="********2201" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <ModernField label="SWIFT Code" value="COBZZWHAXXX" />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* DOCUMENTS */}
            <TabPanel value={tab} index={3}>
              <Box p={2}>
                <Grid container spacing={2}>
                  {documents.map((doc) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={doc.title}>
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <Box
                          component="img"
                          src={doc.image}
                          alt={doc.title}
                          sx={{
                            width: '100%',
                            height: 160,
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />

                        <Box p={1.5}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          >
                            <Box>
                              <Typography fontSize={13} fontWeight={700}>
                                {doc.title}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function ModernField({ label, value }: any) {
  return (
    <Box>
      <Typography fontSize={11} fontWeight={700} color="#64748B" mb={0.7}>
        {label}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          px: 1.5,
          py: 1.3,
          borderRadius: 1,
          border: '1px solid #E2E8F0',
          bgcolor: '#fff',
        }}
      >
        <Typography fontSize={13} fontWeight={600}>
          {value}
        </Typography>
      </Paper>
    </Box>
  );
}

function StatusItem({ title }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.2,
        borderRadius: 1,
        border: '1px solid #E2E8F0',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <CheckCircleRoundedIcon
          sx={{
            fontSize: 18,
            color: 'primary.main',
          }}
        />

        <Box>
          <Typography fontSize={12} fontWeight={700}>
            {title}
          </Typography>

          <Typography fontSize={11} color="text.secondary">
            Verified
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function KycCard({ icon, title }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 1,
        border: '1px solid #E2E8F0',
        height: '100%',
      }}
    >
      <Stack spacing={1.5}>
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor: '#EFF6FF',
            color: 'primary.main',
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography fontSize={14} fontWeight={700}>
            {title}
          </Typography>

          <Typography fontSize={11} color="text.secondary" mt={0.5}>
            Compliance document verified successfully.
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip
            label="Verified"
            size="small"
            color="success"
            sx={{
              borderRadius: 1,
              fontSize: 11,
            }}
          />

          <Typography
            fontSize={12}
            fontWeight={700}
            color="#0F172A"
            sx={{
              cursor: 'pointer',
            }}
          >
            View
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
