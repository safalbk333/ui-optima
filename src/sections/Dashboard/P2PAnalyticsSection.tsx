'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/ArticleOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmberOutlined';
import RecentNotifications, {
  PendingApprovals,
  DepartmentWiseSpend,
  TopSuppliersBySpend,
  ContractExpiryTracker,
} from './Flow';

const feedItems = [
  {
    title: 'Payment released — Acme Supplies',
    sub: 'INV-2041 · $14,200.00 via bank transfer',
    badge: 'Payment',
    time: '2 min ago',
    dotBg: '#EAF3DE',
    badgeBg: '#EAF3DE',
    badgeColor: '#27500A',
    icon: <CheckIcon sx={{ fontSize: 13, color: '#3B6D11' }} />,
  },
  {
    title: 'Invoice matched — TechParts Co.',
    sub: '3-way match passed · PO-3382 · INV-2039',
    badge: 'Invoice',
    time: '41 min ago',
    dotBg: '#E6F1FB',
    badgeBg: '#E6F1FB',
    badgeColor: '#0C447C',
    icon: <InventoryIcon sx={{ fontSize: 13, color: '#185FA5' }} />,
  },
  {
    title: 'PR approved — Office furniture',
    sub: 'Approved by R. Sharma · PR-1128 · $3,450',
    badge: 'Approval',
    time: '1 hr ago',
    dotBg: '#E1F5EE',
    badgeBg: '#E1F5EE',
    badgeColor: '#085041',
    icon: <AccessTimeIcon sx={{ fontSize: 13, color: '#0F6E56' }} />,
  },
  {
    title: 'New purchase request submitted',
    sub: 'K. Menon · Lab equipment · $8,900',
    badge: 'Request',
    time: '2 hr ago',
    dotBg: '#EEEDFE',
    badgeBg: '#EEEDFE',
    badgeColor: '#3C3489',
    icon: <ArticleIcon sx={{ fontSize: 13, color: '#534AB7' }} />,
  },
  {
    title: 'Invoice exception flagged',
    sub: 'Amount mismatch · INV-2037 · GlobalPrint Ltd',
    badge: 'Exception',
    time: '3 hr ago',
    dotBg: '#FAEEDA',
    badgeBg: '#FAEEDA',
    badgeColor: '#633806',
    icon: <WarningAmberIcon sx={{ fontSize: 13, color: '#BA7517' }} />,
  },
];

const kpis = [
  {
    label: 'Touchless invoice rate',
    value: '87%',
    detail: 'Straight-through processing, no manual touch',
    icon: VerifiedIcon,
  },
  {
    label: 'Avg. requisition-to-PO cycle',
    value: '4.1 days',
    detail: 'End-to-end within policy thresholds',
    icon: SpeedIcon,
  },
  {
    label: 'First-pass 3-way match',
    value: '96.2%',
    detail: 'PO, receipt, and invoice aligned first time',
    icon: CheckCircleOutlineIcon,
  },
  {
    label: 'Suppliers on platform',
    value: '1,240',
    detail: 'Onboarded with catalog & contract rates',
    icon: GroupsIcon,
  },
  // {
  //   label: 'Spend under management',
  //   value: '92%',
  //   detail: 'Total spend routed through approved P2P channels',
  //   icon: AccountBalanceWalletIcon, // or any relevant icon
  // },
] as const;

export default function P2PAnalyticsSection() {
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;
  const ACCENT_DARK = theme.palette.primary.main;

  return (
    <Box component="section">
      <Container maxWidth="lg">
        <Box mb={3} sx={{ borderTop: `1px solid ${ACCENT}` }} />

        <Stack spacing={1} sx={{ mb: 4, maxWidth: 800 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              letterSpacing: '0.22em',
              fontWeight: 700,
            }}
          >
            Analytics & insights
          </Typography>
          {/* <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 800, color: "text.primary" }}
          >
            Procure-to-pay visibility that scales with your operation
          </Typography> */}
          <Typography variant="body1" color="text.secondary">
            Monitor cycle times, spend under management, and supplier adoption in one place. Align
            finance and procurement on a single source of truth—from requisition through
            payment—with audit-ready trails and policy controls at every step.
          </Typography>
        </Stack>

        {/* KPI cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {kpis.map((k) => {
            const KpiIcon = k.icon;
            return (
              <Grid key={k.label} size={{ xs: 12, md: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    height: '100%',
                    border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    // borderTop: `5px solid ${ACCENT}`,
                    bgcolor: 'transparent',
                    borderRadius: 0.5,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box sx={{ color: ACCENT_DARK, display: 'flex' }}>
                      <KpiIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      {k.value}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {k.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {k.detail}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Charts */}
        {/* <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                height: '100%',
                border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                bgcolor: 'transparent',
                borderRadius: 0.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                Invoice-to-pay cycle time (days)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Average calendar days from invoice receipt to scheduled payment. Trend reflects
                automation, matching rules, and exception reduction.
              </Typography>
              <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cycleTimeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                    <XAxis
                      dataKey="period"
                      tick={{ fill: CHART_AXIS, fontSize: 12 }}
                      axisLine={{ stroke: CHART_GRID }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: CHART_AXIS, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 'auto']}
                      label={{
                        value: 'Days',
                        angle: -90,
                        position: 'insideLeft',
                        style: { fill: CHART_AXIS, fontSize: 11 },
                      }}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar
                      dataKey="days"
                      name="Cycle days"
                      fill={ACCENT}
                      radius={[0, 0, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                height: '100%',
                border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                bgcolor: 'transparent',
                borderRadius: 0.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                Spend by category
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Share of addressable spend flowing through the P2P platform by procurement category
                (demo profile).
              </Typography>
              <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={88}
                      paddingAngle={2}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value) => (
                        <span style={{ color: theme.palette.text.primary }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                bgcolor: 'transparent',
                borderRadius: 0.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                Spend under management (USD millions)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Through-platform spend versus off-contract / maverick spend. Moving volume into P2P
                improves compliance, leverage, and forecast accuracy.
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={spendTrendData}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="p2pFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: CHART_AXIS, fontSize: 12 }}
                      axisLine={{ stroke: CHART_GRID }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: CHART_AXIS, fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value) => (
                        <span style={{ color: theme.palette.text.primary }}>{value}</span>
                      )}
                    />
                    <Area
                      type="monotone"
                      dataKey="throughP2P"
                      name="Through P2P"
                      stroke={theme.palette.text.primary}
                      strokeWidth={2}
                      fill="url(#p2pFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="maverick"
                      name="Maverick / off-platform"
                      stroke={ACCENT_DARK}
                      strokeWidth={2}
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} mb={3}>
          {/* RIGHT - Activity Feed */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                background: 'transparent',
                border: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                borderRadius: 0.5,
                overflow: 'hidden',
                mb: 3,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: '0.5px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                    }}
                  />
                  <Typography fontSize={13} fontWeight={500}>
                    Recent activity
                  </Typography>
                </Stack>
                <Typography fontSize={11} color="text.disabled">
                  Today
                </Typography>
              </Box>

              {/* Feed Items */}
              {feedItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 1.75,
                    px: 2,
                    py: 1.75,
                    borderTop: index === 0 ? 'none' : '0.5px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    '&:not(:last-child)::after': {
                      content: '""',
                      position: 'absolute',
                      left: 30,
                      top: 46,
                      bottom: -14,
                      width: '1px',
                      bgcolor: 'divider',
                      display: 'block',
                    },
                  }}
                >
                  {/* Dot */}
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: item.dotBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: '2px',
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Body */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontSize={13} fontWeight={500} mb={0.25} lineHeight={1.4}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary" lineHeight={1.4}>
                      {item.sub}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.75} mt={0.75}>
                      <Box
                        sx={{
                          fontSize: 11,
                          fontWeight: 500,
                          px: 1,
                          py: '2px',
                          borderRadius: 20,
                          bgcolor: item.badgeBg,
                          color: item.badgeColor,
                        }}
                      >
                        {item.badge}
                      </Box>
                      <Typography
                        fontSize={11}
                        color="text.disabled"
                        sx={{ ml: 'auto !important' }}
                      >
                        {item.time}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
            <ContractExpiryTracker />
            <RecentNotifications />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <TopSuppliersBySpend />
            <PendingApprovals />
            {/* <ActivityTimeline/> */}
            <DepartmentWiseSpend />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            mb: 3,
            borderTop: `0.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 900 }}>
            <strong>Three-way match &amp; controls:</strong> Every payment ties back to an approved
            PO and verified receipt, reducing fraud risk and audit findings.{' '}
            <strong>Early payment programs:</strong> Dynamic discounting and negotiated terms are
            surfaced at approval so treasury can optimize cash.{' '}
            <strong>Supplier experience:</strong> Self-service portals and predictable payment
            status lower inquiry volume and strengthen partner relationships—all on infrastructure
            designed for global scale.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
