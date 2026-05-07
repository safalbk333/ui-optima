'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  Chip,
  Stack,
  Paper,
  Button,
  AppBar,
  Avatar,
  Toolbar,
  Divider,
  Container,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  threshold?: number;
};
// ── THEME ──
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8' },
    secondary: { main: '#0EA5E9' },
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
    error: { main: '#EF4444' },
    background: { default: '#F8FAFF', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#475569' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 100, padding: '10px 24px', fontSize: '0.92rem' },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
          boxShadow: '0 4px 24px rgba(37,99,235,0.25)',
          '&:hover': {
            boxShadow: '0 6px 32px rgba(37,99,235,0.38)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid rgba(148,163,184,0.12)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 40px rgba(37,99,235,0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500, fontSize: '0.75rem' },
      },
    },
  },
});

// ── ANIMATION HOOK (IntersectionObserver) ──
function useReveal(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ── ANIMATED WRAPPER ──
function Reveal({ children, delay = 0, direction = 'up', threshold = 0.15 }: RevealProps) {
  const [ref, visible] = useReveal(threshold);
  const transforms = {
    up: 'translateY(36px)',
    left: 'translateX(-36px)',
    right: 'translateX(36px)',
    scale: 'scale(0.94)',
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── COUNT UP ──
function CountUp({ target, suffix = '', prefix = '' }: any) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.5);
  useEffect(() => {
    if (!visible) return undefined;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ── ANIMATED PROGRESS BAR ──
function AnimatedBar({ value, color }: any) {
  const [ref, visible] = useReveal(0.5);
  return (
    <Box ref={ref}>
      <LinearProgress
        variant="determinate"
        value={visible ? value : 0}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: alpha(color, 0.12),
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            borderRadius: 4,
            transition: 'transform 1.8s cubic-bezier(0.22,1,0.36,1) !important',
          },
        }}
      />
    </Box>
  );
}

// ── DATA ──
const steps = [
  {
    icon: '📋',
    num: '01',
    title: 'Purchase Requisition',
    desc: 'Employees submit needs with auto budget validation and policy checks',
  },
  {
    icon: '✅',
    num: '02',
    title: 'Approval Workflow',
    desc: 'AI-routed multi-level approvals with mobile notifications',
  },
  {
    icon: '📦',
    num: '03',
    title: 'Purchase Order',
    desc: 'Auto-generated POs dispatched directly to approved suppliers',
  },
  {
    icon: '🧾',
    num: '04',
    title: 'Invoice Matching',
    desc: '3-way match against PO and goods receipt in milliseconds',
  },
  {
    icon: '💳',
    num: '05',
    title: 'Payment Execution',
    desc: 'Scheduled, compliant payments with full reconciliation',
  },
];

const features = [
  {
    icon: '🤖',
    color: '#2563EB',
    title: 'AI Invoice Processing',
    desc: 'Extract and validate data from any invoice format with 99.2% accuracy. Auto-match POs and route exceptions intelligently.',
    tags: ['OCR Extraction', '3-Way Match'],
    stat: { label: 'Automation Rate', value: 99, color: '#2563EB' },
  },
  {
    icon: '📊',
    color: '#0EA5E9',
    title: 'Real-time Spend Analytics',
    desc: 'Drill-down dashboards across category, department, and supplier with predictive budget forecasting.',
    tags: ['Live Dashboards', 'Forecasting', 'Custom Reports'],
    stat: { label: 'Faster Decisions', value: 82, color: '#0EA5E9' },
  },
  {
    icon: '🔐',
    color: '#10B981',
    title: 'Compliance & Controls',
    desc: 'Built-in SOD, policy enforcement, and audit trails. SOC 2, ISO 27001, and GDPR compliant by default.',
    tags: ['SOC 2', 'Audit Trail', 'GDPR Ready'],
    stat: { label: 'Policy Compliance', value: 100, color: '#10B981' },
  },
  {
    icon: '🌐',
    color: '#F59E0B',
    title: 'Supplier Portal',
    desc: 'Suppliers self-serve: submit invoices, track payments, update bank details — reducing your AP workload significantly.',
    tags: ['Self-Service', 'Payment Tracking', 'E-Invoicing'],
    stat: { label: 'Supplier Satisfaction', value: 94, color: '#F59E0B' },
  },
  {
    icon: '⚡',
    color: '#8B5CF6',
    title: 'Smart Approvals',
    desc: 'Configure workflows once. Delegation, out-of-office routing, spend thresholds, and mobile approvals built in.',
    tags: ['Mobile App', 'Delegation', 'Thresholds'],
    stat: { label: 'Faster Approval Cycle', value: 76, color: '#8B5CF6' },
  },
  {
    icon: '🔗',
    color: '#EF4444',
    title: '150+ Integrations',
    desc: 'Pre-built connectors for SAP, Oracle, Dynamics, NetSuite, Workday, QuickBooks and more. Live in days.',
    tags: ['SAP', 'Oracle', 'NetSuite', 'Workday'],
    stat: { label: 'Integration Coverage', value: 91, color: '#EF4444' },
  },
];

const metrics = [
  { label: 'Reduction in cycle time', value: 68, suffix: '%' },
  { label: 'Invoice automation rate', value: 99, suffix: '%' },
  { label: 'Annual savings per client', value: 2, prefix: '$', suffix: 'M+' },
  { label: 'Enterprise customers', value: 500, suffix: '+' },
];

const integrations = [
  { name: 'SAP S/4HANA', bg: '#0070D2' },
  { name: 'Oracle NetSuite', bg: '#C74634' },
  { name: 'MS Dynamics', bg: '#00A4EF' },
  { name: 'Workday', bg: '#F6821F' },
  { name: 'QuickBooks', bg: '#2CA01C' },
  { name: 'Xero', bg: '#13B5EA' },
  { name: 'Sage Intacct', bg: '#009B77' },
  { name: 'Coupa', bg: '#D52B1E' },
];

// ── HERO BADGE PULSE ──
const pulseDot = `
  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.7); opacity: 0.5; }
  }
  @keyframes floatUp {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

// ── MAIN COMPONENT ──
export default function P2PLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.textContent = pulseDot;
    document.head.appendChild(style);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ background: '#F8FAFF', minHeight: '100vh' }}>
        {/* ── NAVBAR ── */}
        <AppBar
          elevation={0}
          sx={{
            background: scrolled ? 'rgba(248,250,255,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(148,163,184,0.15)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>
                  P
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ color: '#0F172A', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                ProcureFlow
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {['Workflow', 'Features', 'Integrations', 'Pricing'].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item}
                </Typography>
              ))}
              <Button variant="contained" size="small">
                Get a Demo
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* ── HERO ── */}
<Box
  sx={{
    pt: { xs: 6, md: 8 },
    pb: { xs: 10, md: 14 },
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
  }}
>
  {/* Gradient Glow Background */}
  <Box
    sx={{
      position: 'absolute',
      top: -150,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 900,
      height: 900,
      background:
        'radial-gradient(circle at center, rgba(37,99,235,0.15), transparent 70%)',
      filter: 'blur(60px)',
    }}
  />

  <Container maxWidth="lg">
    <Grid container spacing={{ xs: 8, md: 10 }} alignItems="center">
      
      {/* LEFT */}
      <Grid size={{ xs: 12, md: 6 }}>
        
        {/* Badge */}
        <Box
          sx={{
            display: 'inline-flex',
            px: 2.2,
            py: 0.8,
            borderRadius: 999,
            background: 'rgba(37,99,235,0.08)',
            border: '1px solid rgba(37,99,235,0.2)',
            mb: 3,
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'primary.main',
            }}
          >
            AI-POWERED PROCUREMENT PLATFORM
          </Typography>
        </Box>

        {/* Headline */}
        <Reveal delay={100}>
        <Typography
          sx={{
            fontSize: { xs: '2.8rem', md: '4.2rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            mb: 3,
          }}
        >
          Procurement,
          <br />
          but{' '}
          <Box
            component="span"
            sx={{
              background:
                'linear-gradient(135deg, #2563EB, #0EA5E9, #10B981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            intelligent
          </Box>
        </Typography>
</Reveal>
        {/* Subtext */}
        <Typography
          sx={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.8,
            mb: 5,
            maxWidth: 520,
          }}
        >
          Automate your entire procure-to-pay lifecycle with AI-driven insights,
          real-time spend tracking, and seamless supplier collaboration.
        </Typography>

        {/* CTA */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4.5,
              py: 1.5,
              borderRadius: 2.5,
              fontWeight: 600,
              fontSize: '0.95rem',
              background:
                'linear-gradient(135deg, #2563EB, #0EA5E9)',
              boxShadow: '0 10px 30px rgba(37,99,235,0.35)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 40px rgba(37,99,235,0.45)',
              },
            }}
          >
            Start Free Trial
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2.5,
              fontSize: '0.95rem',
              borderColor: 'rgba(148,163,184,0.4)',
              '&:hover': {
                background: 'rgba(37,99,235,0.05)',
                borderColor: 'primary.main',
              },
            }}
          >
            Book Demo →
          </Button>
        </Stack>

        {/* Trust */}
        <Stack direction="row" spacing={2} alignItems="center" mt={5}>
          <Stack direction="row" spacing={-1}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Avatar
                key={i}
                sx={{
                  width: 30,
                  height: 30,
                  border: '2px solid white',
                }}
              />
            ))}
          </Stack>

          <Typography sx={{ fontSize: '0.85rem', color: '#64748B' }}>
            Trusted by <b style={{ color: '#0F172A' }}>500+ companies</b>
          </Typography>
        </Stack>
      </Grid>

      {/* RIGHT */}
{/* RIGHT */}
<Grid size={{ xs: 12, md: 6 }}>
  <Reveal delay={200} direction="right">
  <Box sx={{ position: 'relative' }}>

    {/* Main Glass Dashboard */}
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        backdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(148,163,184,0.2)',
        boxShadow: '0 30px 80px rgba(2,6,23,0.12)',
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography fontWeight={600}>Optima AI Insights</Typography>
        <Chip label="Live" size="small" color="success" />
      </Stack>

      {/* Chart-like bars */}
      <Stack direction="row" spacing={1} alignItems="flex-end" height={120}>
        {[40, 70, 55, 90, 65, 80].map((h, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: `${h}%`,
              borderRadius: 2,
              background:
                'linear-gradient(180deg, #2563EB, #0EA5E9)',
              opacity: 0.9,
            }}
          />
        ))}
      </Stack>

      {/* Stats */}
      <Stack direction="row" justifyContent="space-between" mt={3}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Spend Optimized
          </Typography>
          <Typography fontWeight={700}>₹8.2Cr</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Cost Reduction
          </Typography>
          <Typography fontWeight={700}>23%</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            AI Accuracy
          </Typography>
          <Typography fontWeight={700}>96%</Typography>
        </Box>
      </Stack>
    </Paper>

    {/* Floating AI Tag */}
    <Paper
      sx={{
        position: 'absolute',
        top: -20,
        right: -20,
        px: 2,
        py: 1,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
        color: '#fff',
        fontWeight: 600,
        boxShadow: '0 10px 30px rgba(37,99,235,0.35)',
      }}
    >
      AI Powered
    </Paper>

    {/* Floating Savings Card */}
    <Paper
      sx={{
        position: 'absolute',
        bottom: -30,
        left: -20,
        p: 2,
        borderRadius: 3,
        background: '#fff',
        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
      }}
    >
      <Typography fontSize="0.75rem" color="text.secondary">
        Monthly Savings
      </Typography>
      <Typography fontWeight={700} color="primary.main">
        ₹12.4L
      </Typography>
    </Paper>
  </Box>
  </Reveal>
</Grid>
    </Grid>
  </Container>
</Box>
        {/* ── METRICS BAND ── */}
        <Box
          sx={{
            background: '#fff',
            borderTop: '1px solid rgba(148,163,184,0.12)',
            borderBottom: '1px solid rgba(148,163,184,0.12)',
            py: 5,
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              {metrics.map((m, i) => (
                <Grid size={{ xs: 6, md: 3 }} key={i}>
                  <Reveal delay={i * 100}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 2,
                        borderRight: i < 3 ? '1px solid rgba(148,163,184,0.15)' : 'none',
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: '2.6rem',
                          fontWeight: 800,
                          color: 'primary.main',
                          lineHeight: 1,
                          mb: 0.5,
                        }}
                      >
                        <CountUp target={m.value} prefix={m.prefix} suffix={m.suffix} />
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.84rem', color: 'text.secondary', fontWeight: 400 }}
                      >
                        {m.label}
                      </Typography>
                    </Box>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── WORKFLOW STEPS ── */}
        <Box sx={{ py: { xs: 8, md: 12 }, background: '#F8FAFF' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={8}>
              <Reveal>
                <Chip
                  label="HOW IT WORKS"
                  sx={{
                    mb: 2,
                    background: alpha('#2563EB', 0.08),
                    color: 'primary.main',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                />
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
                  End-to-end P2P workflow
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
                >
                  A seamless, automated journey from the moment a need is identified to final
                  payment cleared.
                </Typography>
              </Reveal>
            </Box>

            {/* Timeline */}
            <Box sx={{ position: 'relative' }}>
              {/* Connector line */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  top: 40,
                  left: '10%',
                  right: '10%',
                  height: 2,
                  background: 'linear-gradient(90deg, #2563EB, #0EA5E9, #10B981)',
                  borderRadius: 1,
                  zIndex: 0,
                }}
              />

              <Grid container spacing={3}>
                {steps.map((s, i) => (
                  <Grid size={{ xs: 12, md: (12 / 5) * 1 }} key={i} sx={{ flex: '1 1 0' }}>
                    <Reveal delay={i * 120}>
                      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        {/* Icon circle */}
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            mx: 'auto',
                            mb: 2.5,
                            background: '#fff',
                            border: '2px solid',
                            borderColor:
                              i === 0 ? '#2563EB' : i === 4 ? '#10B981' : 'rgba(148,163,184,0.3)',
                            boxShadow: `0 4px 20px ${alpha('#2563EB', 0.1)}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            position: 'relative',
                            animation: `floatUp ${2 + i * 0.3}s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        >
                          {s.icon}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -6,
                              right: -6,
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography
                              sx={{ fontSize: '0.55rem', fontWeight: 800, color: '#fff' }}
                            >
                              {s.num}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: '0.92rem', mb: 0.8, color: '#0F172A' }}
                        >
                          {s.title}
                        </Typography>
                        <Typography
                          sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.6 }}
                        >
                          {s.desc}
                        </Typography>
                      </Box>
                    </Reveal>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ── FEATURES ── */}
        <Box sx={{ py: { xs: 8, md: 12 }, background: '#fff' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={8}>
              <Reveal>
                <Chip
                  label="CORE FEATURES"
                  sx={{
                    mb: 2,
                    background: alpha('#10B981', 0.08),
                    color: '#10B981',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                />
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
                  Everything you need to control spend
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}
                >
                  Powerful features designed for modern finance and procurement teams.
                </Typography>
              </Reveal>
            </Box>

            <Grid container spacing={3}>
              {features.map((f, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                  <Reveal delay={i * 80}>
                    <Card sx={{ height: '100%', borderRadius: 1, p: 0.5 }}>
                      <CardContent sx={{ p: 3 }}>
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: 2.5,
                            mb: 2.5,
                            background: alpha(f.color, 0.1),
                            border: `1px solid ${alpha(f.color, 0.2)}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                          }}
                        >
                          {f.icon}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 700, fontSize: '1.05rem' }}
                        >
                          {f.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: 'text.secondary',
                            lineHeight: 1.75,
                            mb: 2.5,
                          }}
                        >
                          {f.desc}
                        </Typography>

                        {/* Progress */}
                        <Box mb={2}>
                          <Stack direction="row" justifyContent="space-between" mb={0.8}>
                            <Typography
                              sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'text.secondary' }}
                            >
                              {f.stat.label}
                            </Typography>
                            <Typography
                              sx={{ fontSize: '0.72rem', fontWeight: 700, color: f.stat.color }}
                            >
                              {f.stat.value}%
                            </Typography>
                          </Stack>
                          <AnimatedBar value={f.stat.value} color={f.stat.color} />
                        </Box>

                        {/* Tags */}
                        <Stack direction="row" flexWrap="wrap" gap={0.8}>
                          {f.tags.map((t) => (
                            <Chip
                              key={t}
                              label={t}
                              size="small"
                              sx={{
                                background: alpha(f.color, 0.07),
                                color: f.color,
                                border: `1px solid ${alpha(f.color, 0.18)}`,
                                fontSize: '0.7rem',
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ── INVOICE SHOWCASE ── */}
        <Box sx={{ py: { xs: 8, md: 12 }, background: '#F8FAFF' }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Reveal direction="left">
                  <Chip
                    label="AI AUTOMATION"
                    sx={{
                      mb: 2,
                      background: alpha('#8B5CF6', 0.08),
                      color: '#8B5CF6',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  />
                  <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2 }}>
                    Touchless invoice processing at scale
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
                    Our AI processes over 1.8 million invoices monthly with a 94% touchless rate.
                    Your team only sees what truly needs attention.
                  </Typography>
                  {[
                    { label: 'Auto-matched invoices', val: 94, color: '#2563EB' },
                    { label: 'Rule-based processing', val: 78, color: '#0EA5E9' },
                    { label: 'Exception resolution', val: 88, color: '#10B981' },
                  ].map((bar, i) => (
                    <Box key={i} mb={2.5}>
                      <Stack direction="row" justifyContent="space-between" mb={0.8}>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                          {bar.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: bar.color }}>
                          {bar.val}%
                        </Typography>
                      </Stack>
                      <AnimatedBar value={bar.val} color={bar.color} />
                    </Box>
                  ))}
                </Reveal>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Reveal direction="right">
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 1,
                      border: '1px solid rgba(148,163,184,0.15)',
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(37,99,235,0.08)',
                    }}
                  >
                    {/* Header */}
                    <Box sx={{ background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', p: 2.5 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                          Invoice Processing — Live View
                        </Typography>
                        <Chip
                          label="● LIVE"
                          size="small"
                          sx={{
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                          }}
                        />
                      </Stack>
                    </Box>

                    <Box sx={{ p: 3 }}>
                      {/* Invoice card */}
                      <Box
                        sx={{
                          background: '#F8FAFF',
                          borderRadius: 1,
                          p: 2.5,
                          mb: 2.5,
                          border: '1px solid rgba(148,163,184,0.15)',
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>
                              INV-2024-04821
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                              Acme Supplies Inc.
                            </Typography>
                          </Box>
                          <Chip
                            label="✓ Auto-Matched"
                            size="small"
                            sx={{
                              background: alpha('#10B981', 0.1),
                              color: '#10B981',
                              border: `1px solid ${alpha('#10B981', 0.25)}`,
                              fontWeight: 600,
                            }}
                          />
                        </Stack>
                        <Divider sx={{ my: 1.5 }} />
                        {[
                          ['PO Reference', 'PO-9842', '#2563EB'],
                          ['Service', 'Cloud Infrastructure Q1', null],
                          ['Subtotal', '$18,400.00', null],
                          ['Tax (8%)', '$1,472.00', null],
                        ].map(([k, v, c]) => (
                          <Stack key={k} direction="row" justifyContent="space-between" py={0.7}>
                            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                              {k}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: c || 'text.primary',
                              }}
                            >
                              {v}
                            </Typography>
                          </Stack>
                        ))}
                        <Divider sx={{ my: 1.5 }} />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                            Total Due
                          </Typography>
                          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#10B981' }}>
                            $19,872.00
                          </Typography>
                        </Stack>
                      </Box>

                      {/* AI processing steps */}
                      <Stack spacing={1.5}>
                        {[
                          { label: 'Document extracted', done: true, color: '#10B981' },
                          { label: 'Vendor verified', done: true, color: '#10B981' },
                          { label: '3-way match complete', done: true, color: '#10B981' },
                          { label: 'Routed for payment', done: true, color: '#2563EB' },
                        ].map((step, i) => (
                          <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                            <Box
                              sx={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                background: alpha(step.color, 0.12),
                                border: `1.5px solid ${step.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6rem',
                                color: step.color,
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </Box>
                            <Typography
                              sx={{ fontSize: '0.8rem', color: 'text.primary', fontWeight: 500 }}
                            >
                              {step.label}
                            </Typography>
                            <Box sx={{ flex: 1 }} />
                            <Typography sx={{ fontSize: '0.68rem', color: 'text.disabled' }}>
                              0.{i + 1}s
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  </Paper>
                </Reveal>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── INTEGRATIONS ── */}
        <Box sx={{ py: { xs: 8, md: 12 }, background: '#fff' }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={7}>
              <Reveal>
                <Chip
                  label="INTEGRATIONS"
                  sx={{
                    mb: 2,
                    background: alpha('#F59E0B', 0.08),
                    color: '#F59E0B',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                />
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}>
                  Works with your existing stack
                </Typography>
                <Typography sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto' }}>
                  Pre-built connectors for 150+ ERP, accounting, and banking systems. Go live in
                  days, not months.
                </Typography>
              </Reveal>
            </Box>

            <Grid container spacing={2} justifyContent="center">
              {integrations.map((int, i) => (
                <Grid key={i}>
                  <Reveal delay={i * 60} direction="scale">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        background: '#F8FAFF',
                        border: '1px solid rgba(148,163,184,0.15)',
                        borderRadius: 3,
                        px: 2.5,
                        py: 1.5,
                        cursor: 'default',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: alpha('#2563EB', 0.03),
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 20px ${alpha('#2563EB', 0.1)}`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: int.bg,
                        }}
                      />
                      <Typography
                        sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.primary' }}
                      >
                        {int.name}
                      </Typography>
                    </Box>
                  </Reveal>
                </Grid>
              ))}
              <Grid>
                <Reveal delay={integrations.length * 60}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      border: '1px dashed rgba(148,163,184,0.3)',
                      borderRadius: 3,
                      px: 2.5,
                      py: 1.5,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled' }}>
                      + 142 more
                    </Typography>
                  </Box>
                </Reveal>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ── FOOTER ── */}
        <Box sx={{ py: 3, borderTop: '1px solid rgba(148,163,184,0.12)', background: '#fff' }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.75rem' }}>
                    P
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>ProcureFlow</Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                © 2024 ProcureFlow Inc. All rights reserved.
              </Typography>
              <Stack direction="row" spacing={3}>
                {['Privacy', 'Terms', 'Security'].map((l) => (
                  <Typography
                    key={l}
                    sx={{
                      fontSize: '0.82rem',
                      color: 'text.secondary',
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {l}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
