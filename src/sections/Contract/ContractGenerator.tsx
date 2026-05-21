'use client';

import React, { useState, useRef, useReducer, useCallback } from 'react';
import {
  Box,
  Stack,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Alert,
  CircularProgress,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Paper,
  Fade,
  Backdrop,
  Badge,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

// ─── Icons (inline SVG components to avoid import issues) ────────────────────
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const CheckIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const WarnIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const PrinterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);
const MaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);
const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VENDOR_OPTIONS = [
  'Zimbabwe Cooling Ltd',
  'TechNova Solutions',
  'Prime Industrial Supplies',
  'GreenLeaf Traders',
  'Skyline Logistics',
  'Delta Security Systems',
  'Vertex Infra Pvt Ltd',
  'ClearWave Telecom',
  'PowerGen Services',
];

const CONTRACT_TYPE_OPTIONS = [
  'Service Level Agreement',
  'Service Agreement',
  'Supply Contract',
  'Annual Maintenance Contract (AMC)',
  'Lease Agreement',
  'Non-Disclosure Agreement (NDA)',
  'Master Service Agreement (MSA)',
  'Statement of Work (SOW)',
  'Framework Agreement',
];

const GOVERNING_LAW_OPTIONS = [
  'Zimbabwe (Chapter 8:01)',
  'South Africa (Companies Act 71 of 2008)',
  'Kenya (Contract Act Cap 23)',
  'Nigeria (Contract Law)',
  'UAE (Civil Transactions Law)',
  'India (Indian Contract Act 1872)',
  'UK (Contracts Act 1999)',
];

const CURRENCY_OPTIONS = ['ZIG', 'USD', 'ZWL', 'ZAR', 'EUR', 'GBP', 'KES'];

type ContractValues = {
  vendor: string;
  contractType: string;
  contractValue: string;
  currency: string;
  startDate: string;
  endDate: string;
  governingLaw: string;
  clientName: string;
  scope: string;
  paymentTerms: string;
  contractValueWords: string;
};

type ValidationSeverity = 'warning' | 'success' | 'default';

type ValidationCardProps = {
  severity?: ValidationSeverity;
};

// ─── STYLED COMPONENTS ────────────────────────────────────────────────────────
const GreenChip = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '3px 10px',
  borderRadius: 20,
  backgroundColor: alpha('#16a34a', 0.12),
  color: '#16a34a',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.04em',
}));

const ValidationCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<ValidationCardProps>(({ theme, severity }) => ({
  padding: '10px 12px',
  borderRadius: 8,
  border: `1px solid ${
    severity === 'warning'
      ? alpha(theme.palette.warning.main, 0.35)
      : severity === 'success'
        ? alpha(theme.palette.success.main, 0.3)
        : alpha(theme.palette.text.primary, 0.08)
  }`,
  backgroundColor:
    severity === 'warning'
      ? alpha(theme.palette.warning.main, 0.05)
      : severity === 'success'
        ? alpha(theme.palette.success.main, 0.04)
        : 'transparent',
  marginBottom: 8,
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 13,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: 10,
  marginTop: 22,
}));

const HighlightSpan = styled('span')({
  backgroundColor: '#fef9c3',
  borderBottom: '1.5px solid #ca8a04',
  borderRadius: 2,
  padding: '0 1px',
});

// ─── CONTRACT DOCUMENT PREVIEW ────────────────────────────────────────────────
function ContractDocument({ values }: { values: ContractValues }) {
  const contractId = `CTR-2026-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`;
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box sx={{ fontFamily: '"Times New Roman", serif', lineHeight: 1.75, color: '#1a1a1a' }}>
      <Box
        mb={2}
        sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        {/* Header */}
        <Typography
          align="center"
          sx={{ fontWeight: 800, fontSize: 17, letterSpacing: '0.08em', mb: 0.5 }}
        >
          {values.contractType?.toUpperCase() || 'SERVICE LEVEL AGREEMENT'}
        </Typography>
        <Typography align="center" sx={{ fontSize: 11, color: '#555', mb: 3 }}>
          {contractId} · {values.clientName || 'Econet Zimbabwe'} ·{' '}
          {values.vendor || 'Zimbabwe Cooling Ltd'} · {today}
        </Typography>

        <SectionHeading>1. Parties &amp; Definitions</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 2 }}>
          This {values.contractType || 'Service Level Agreement'} (&quot;Agreement&quot;) is entered
          into as of {today} between{' '}
          <strong>{values.clientName || 'Econet Wireless Zimbabwe Limited'}</strong>, a company
          registered under the laws of Zimbabwe (Registration No. ZW-CR-1998-00001), having its
          principal place of business at 2 Old Mutual Centre, Jason Moyo Avenue, Harare (&quot;the
          Client&quot;), and <strong>{values.vendor || 'Zimbabwe Cooling Ltd'}</strong>, a company
          registered under the laws of Zimbabwe (Registration No. ZW-CR-2009-04417), having its
          principal place of business at 14 Industrial Drive, Workington, Harare (&quot;the Service
          Provider&quot;).
        </Typography>

        <SectionHeading>2. Scope of Services</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 2 }}>
          {values.scope ||
            "The Service Provider shall provide comprehensive HVAC maintenance services across the Client's four (4) Network Operation Centre facilities located in Harare, Bulawayo, Gweru and Mutare as detailed in Schedule A attached hereto. Services include preventive maintenance (monthly), deep service (quarterly), emergency corrective maintenance (24/7), and annual certification submissions."}
        </Typography>

        <SectionHeading>3. Service Levels &amp; KPIs</SectionHeading>
        <Box
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: 1.5,
            p: 2,
            mb: 2,
            bgcolor: '#fafafa',
            fontSize: 12.5,
          }}
        >
          <Typography sx={{ fontSize: 12.5 }}>
            Emergency callout response: <strong>2 hours maximum</strong> from notification to
            technician on-site, applicable to all four NOC locations. Preventive maintenance
            completion: within the scheduled month. System uptime contribution target: 99.5% per
            site. SLA breach penalties: 0.5% of monthly contract value per incident,{' '}
            <HighlightSpan>capped at 10% of annual contract value</HighlightSpan>. The Client
            reserves the right to terminate this agreement with 30 days notice in the event of 3 or
            more consecutive SLA breaches.
          </Typography>
        </Box>

        <SectionHeading>4. Commercial Terms</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 2 }}>
          The total contract value for the initial 12-month term is {values.currency || 'USD'}{' '}
          {values.contractValue
            ? Number(values.contractValue.replace(/,/g, '')).toLocaleString()
            : '44,200'}{' '}
          ({values.contractValueWords || 'forty-four thousand two hundred United States Dollars'}),
          exclusive of VAT at 15% per ZIMRA regulations. Payment shall be made within{' '}
          {values.paymentTerms || '30'} days of receipt of a valid tax invoice, subject to GRN
          acknowledgement via the OPTIMA platform. Withholding tax at 10% shall be deducted from all
          payments per applicable ZIMRA regulations. A performance bond of{' '}
          {values.currency || 'USD'}{' '}
          {values.contractValue
            ? (Number(values.contractValue.replace(/,/g, '')) * 0.1).toLocaleString()
            : '4,420'}{' '}
          (10% of contract value) shall be submitted by the Service Provider within 5 business days
          of execution of this agreement.
        </Typography>

        <SectionHeading>5. Term &amp; Termination</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 2 }}>
          This Agreement shall commence on {values.startDate || '1st June 2026'} and continue for an
          initial term of twelve (12) months, expiring on {values.endDate || '31st May 2027'},
          unless earlier terminated. Either party may terminate this Agreement by providing{' '}
          <HighlightSpan>thirty (30) days&apos; written notice</HighlightSpan>. The Client may
          terminate immediately in the event of material breach, insolvency of the Service Provider,
          or debarment under PRAZ regulations.
        </Typography>

        <SectionHeading>6. Governing Law</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 2 }}>
          This Agreement shall be governed by and construed in accordance with the laws of{' '}
          {values.governingLaw || 'Zimbabwe (Chapter 8:01)'}. Any disputes arising out of or in
          connection with this Agreement shall be referred to arbitration in accordance with the
          Arbitration Act [Chapter 7:15] of Zimbabwe.
        </Typography>

        <SectionHeading>7. Compliance &amp; Regulatory</SectionHeading>
        <Typography sx={{ fontSize: 12.5, mb: 3 }}>
          Both parties shall comply with all applicable ZIMRA tax regulations, PRAZ procurement
          guidelines, and ZACC anti-corruption obligations. The Service Provider warrants that it is
          duly registered with the relevant regulatory authorities and holds all necessary
          certifications required to perform the services outlined herein.
        </Typography>

        {/* Signature block */}
        <Box sx={{ borderTop: '1px solid #e5e7eb', pt: 3, mt: 2 }}>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
            {['Client', 'Service Provider'].map((party) => (
              <Box key={party}>
                <Typography sx={{ fontWeight: 700, fontSize: 12, mb: 2 }}>
                  For and on behalf of{' '}
                  {party === 'Client'
                    ? values.clientName || 'Econet Wireless Zimbabwe Limited'
                    : values.vendor || 'Zimbabwe Cooling Ltd'}
                  :
                </Typography>
                <Box sx={{ borderBottom: '1px solid #374151', mb: 0.5, height: 32 }} />
                <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
                  Authorised Signatory
                </Typography>
                <Box sx={{ borderBottom: '1px solid #374151', mb: 0.5, height: 32, mt: 1.5 }} />
                <Typography sx={{ fontSize: 11, color: '#6b7280' }}>Date</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── VALIDATION AGENT PANEL ───────────────────────────────────────────────────
function ValidationPanel({ values }: { values: ContractValues }) {

  type ValidationCheck = {
    id: string;
    severity: ValidationSeverity;
    title: string;
    detail: string;
  };

  const checks: ValidationCheck[] = [
    {
      id: 'penalty',
      severity: 'warning',
      title: 'Penalty Cap — Review Recommended',
      detail: `Clause 3 caps penalties at 10% of annual value (${values.currency || 'USD'} ${
        values.contractValue
          ? (Number(values.contractValue.replace(/,/g, '')) * 0.1).toLocaleString()
          : '4,420'
      }). Industry standard for critical infrastructure SLAs is 15–20%. Consider increasing for NOC environments.`,
    },
    {
      id: 'termination',
      severity: 'warning',
      title: 'Termination Notice Period',
      detail:
        'Clause 5 specifies 30 days notice. For 4-site operational dependency, 60-day notice is advisable to ensure business continuity during transition.',
    },
    {
      id: 'payment',
      severity: 'success',
      title: 'Payment Terms — Compliant',
      detail: `Net-30 payment with GRN link is standard and defensible. WHT deduction at 10% per ZIMRA is correctly referenced.`,
    },
    {
      id: 'liability',
      severity: 'success',
      title: 'Liability Cap — Acceptable',
      detail:
        'Liability capped at preceding 12-month contract value. Proportional and standard for service agreements of this nature.',
    },
    {
      id: 'praz',
      severity: 'success',
      title: 'PRAZ & Compliance References — Complete',
      detail:
        'ZIMRA, PRAZ and ZACC obligations referenced correctly in Clause 7. Consistent with Zimbabwe legal framework.',
    },
  ];

  return (
    <Box>
      {/* Status badge */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: '#16a34a',
            boxShadow: '0 0 0 3px rgba(22,163,74,0.2)',
          }}
        />
        <GreenChip>VALIDATION COMPLETE</GreenChip>
      </Stack>

      {checks.map((c) => (
        <ValidationCard key={c.id} severity={c.severity}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Box
              sx={{
                mt: 0.2,
                flexShrink: 0,
                color: c.severity === 'warning' ? '#d97706' : '#16a34a',
              }}
            >
              {c.severity === 'warning' ? <WarnIcon size={13} /> : <CheckIcon size={13} />}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: c.severity === 'warning' ? '#92400e' : '#14532d',
                  mb: 0.4,
                }}
              >
                {c.title}
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#4b5563', lineHeight: 1.5 }}>
                {c.detail}
              </Typography>
            </Box>
          </Stack>
        </ValidationCard>
      ))}
    </Box>
  );
}

// ─── MAIN CONTRACT GENERATOR PAGE ────────────────────────────────────────────
export default function ContractGeneratorPage() {
  const theme = useTheme();

  const [values, setValues] = useState<ContractValues>({
    vendor: 'Zimbabwe Cooling Ltd',
    contractType: 'Service Level Agreement',
    contractValue: '44,200',
    currency: 'USD',
    startDate: '2026-06-01',
    endDate: '2026-05-31',
    governingLaw: 'Zimbabwe (Chapter 8:01)',
    clientName: 'Econet Zimbabwe',
    scope: '',
    paymentTerms: '30',
    contractValueWords: 'forty-four thousand two hundred United States Dollars',
  });

  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (field: keyof ContractValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (generated) setGenerated(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <Box
      sx={{ minHeight: '100vh', bgcolor: '#f8faf8', fontFamily: '"Inter", "Geist", sans-serif' }}
    >
      {/* ── Top Navigation Bar ─────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: '#fff',
          borderBottom: '1px solid #e5e7eb',
          px: 3,
          py: 1.5,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Box mb={2}>
              <PremiumBreadcrumbs
                title="Contract Generator"
                paths={[
                  { label: 'Home', href: '/dashboard' },
                  { label: 'Contract Generator', href: '/contract-generator' },
                ]}
              />
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr" height="calc(100vh - 72px)">
        <Box
          sx={{
            bgcolor: '#fff',
            borderRight: '1px solid #e5e7eb',
            p: 2.5,
            overflowY: 'auto',
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 320px' }} gap={4}>
            {/* Vendor */}
            <Box mb={2}>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#374151',
                  letterSpacing: '0.06em',
                  mb: 0.8,
                }}
              >
                VENDOR
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={values.vendor}
                  onChange={(e) => handleChange('vendor', e.target.value)}
                  sx={{
                    fontSize: 12,
                    bgcolor: '#f9fafb',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                  }}
                >
                  {VENDOR_OPTIONS.map((v) => (
                    <MenuItem key={v} value={v} sx={{ fontSize: 12 }}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Contract Type */}
            <Box mb={2}>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#374151',
                  letterSpacing: '0.06em',
                  mb: 0.8,
                }}
              >
                CONTRACT TYPE
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={values.contractType}
                  onChange={(e) => handleChange('contractType', e.target.value)}
                  sx={{
                    fontSize: 12,
                    bgcolor: '#f9fafb',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                  }}
                >
                  {CONTRACT_TYPE_OPTIONS.map((v) => (
                    <MenuItem key={v} value={v} sx={{ fontSize: 12 }}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Contract Value */}
          <Box mb={2}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: '#374151',
                letterSpacing: '0.06em',
                mb: 0.8,
              }}
            >
              CONTRACT VALUE ({values.currency})
            </Typography>
            <Stack direction="row" spacing={0.8}>
              <TextField
                size="small"
                value={values.contractValue}
                onChange={(e) => handleChange('contractValue', e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiInputBase-input': { fontSize: 12 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                  },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 60 }}>
                <Select
                  value={values.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  sx={{
                    fontSize: 11,
                    bgcolor: '#f9fafb',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                  }}
                >
                  {CURRENCY_OPTIONS.map((c) => (
                    <MenuItem key={c} value={c} sx={{ fontSize: 11 }}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Dates */}
          <Box mb={2}>
            <Stack direction="row" spacing={1}>
              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '0.06em',
                    mb: 0.8,
                  }}
                >
                  START DATE
                </Typography>
                <TextField
                  size="small"
                  type="date"
                  value={values.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': { fontSize: 11 },
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#f9fafb',
                      '& fieldset': { borderColor: '#e5e7eb' },
                    },
                  }}
                />
              </Box>
              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '0.06em',
                    mb: 0.8,
                  }}
                >
                  END DATE
                </Typography>
                <TextField
                  size="small"
                  type="date"
                  value={values.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': { fontSize: 11 },
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#f9fafb',
                      '& fieldset': { borderColor: '#e5e7eb' },
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>

          {/* Governing Law */}
          <Box mb={2}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: '#374151',
                letterSpacing: '0.06em',
                mb: 0.8,
              }}
            >
              GOVERNING LAW
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={values.governingLaw}
                onChange={(e) => handleChange('governingLaw', e.target.value)}
                sx={{
                  fontSize: 11,
                  bgcolor: '#f9fafb',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                }}
              >
                {GOVERNING_LAW_OPTIONS.map((v) => (
                  <MenuItem key={v} value={v} sx={{ fontSize: 11 }}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Client Name */}
          <Box mb={2.5}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: '#374151',
                letterSpacing: '0.06em',
                mb: 0.8,
              }}
            >
              CLIENT NAME
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={values.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              sx={{
                '& .MuiInputBase-input': { fontSize: 12 },
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f9fafb',
                  '& fieldset': { borderColor: '#e5e7eb' },
                },
              }}
            />
          </Box>

          <Divider sx={{ mb: 2.5, borderColor: '#f3f4f6' }} />

          {/* Generate Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleGenerate}
            disabled={generating}
            startIcon={
              generating ? <CircularProgress size={13} color="inherit" /> : <SparkleIcon />
            }
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': { bgcolor: theme.palette.primary.dark },
              '&:disabled': { bgcolor: alpha(theme.palette.primary.main, 0.5) },
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 13,
              py: 1.2,
              borderRadius: 1.5,
              boxShadow: '0 2px 8px rgba(22,163,74,0.25)',
              mb: 1.5,
            }}
          >
            {generating ? 'Generating…' : 'Generate Contract'}
          </Button>

          {generated && (
            <Box display="flex" alignItems="center" gap={2} mb={1.5} mt={1} justifyContent="center">
              <Button
                size="small"
                variant="outlined"
                startIcon={<EyeIcon />}
                onClick={() => setPreviewOpen(true)}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  textTransform: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                Preview
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<PrinterIcon />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  textTransform: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                Print
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<MaximizeIcon />}
                onClick={() => setPreviewOpen(true)}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  textTransform: 'none',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                Full Screen
              </Button>
            </Box>
          )}

          {/* Divider with OR */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <Box sx={{ flex: 1, height: 1, bgcolor: '#e5e7eb' }} />
            <Typography sx={{ fontSize: 11, color: '#9ca3af' }}>— OR —</Typography>
            <Box sx={{ flex: 1, height: 1, bgcolor: '#e5e7eb' }} />
          </Stack>

          {/* Upload Existing */}
          <Box
            sx={{
              border: '1.5px dashed #d1d5db',
              borderRadius: 1.5,
              p: 1.5,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              mb: 1.5,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Box sx={{ color: '#9ca3af', mb: 0.3 }}>
              <UploadIcon />
            </Box>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
              Upload Existing Contract
            </Typography>
            <Typography sx={{ fontSize: 10, color: '#9ca3af' }}>PDF, DOCX supported</Typography>
          </Box>

          {/* Download DOCX */}
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            disabled={!generated}
            sx={{
              borderColor: '#e5e7eb',
              color: '#374151',
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 1.5,
              mb: 2,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
              '&:disabled': { opacity: 0.4 },
            }}
          >
            Download DOCX
          </Button>

          {/* Edit Mode Toggle */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={editMode}
                onChange={(e) => setEditMode(e.target.checked)}
                sx={{
                  color: '#d1d5db',
                  '&.Mui-checked': { color: theme.palette.primary.main },
                  p: 0.5,
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 12, color: '#374151' }}>Enable Edit Mode</Typography>
            }
            sx={{ ml: 0 }}
          />
        </Box>
      </Box>

      {/* ── PREVIEW POPUP DIALOG ───────────────────────────────────────────── */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        TransitionComponent={Fade}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { sx: { backdropFilter: 'blur(4px)', bgcolor: alpha('#000', 0.45) } },
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          },
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.8,
            borderBottom: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            bgcolor: '#fff',
            zIndex: 10,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
              Contract Preview
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
              {values.contractType} · {values.vendor} · {values.clientName}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Validation badge inside preview */}
            <GreenChip>
              <CheckIcon size={10} />
              VALIDATED
            </GreenChip>

            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: '#e5e7eb',
                color: '#374151',
                textTransform: 'none',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Download DOCX
            </Button>

            <Button
              size="small"
              variant="contained"
              startIcon={<PrinterIcon />}
              sx={{
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
                textTransform: 'none',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: 'none',
              }}
            >
              Print
            </Button>

            <IconButton
              size="small"
              onClick={() => setPreviewOpen(false)}
              sx={{ color: '#6b7280', '&:hover': { bgcolor: '#f3f4f6' } }}
            >
              <XIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Dialog Body — document + side validation */}
        <DialogContent sx={{ p: 0, display: 'flex', gap: 0 }}>
          {/* Document area */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              bgcolor: '#f8f8f8',
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ContractDocument values={values} />
          </Box>

          {/* Validation sidebar inside modal */}
          <Box
            sx={{
              width: 260,
              flexShrink: 0,
              borderLeft: '1px solid #e5e7eb',
              p: 2.5,
              bgcolor: '#fff',
              overflowY: 'auto',
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#111827', mb: 0.3 }}>
              Validation Agent
            </Typography>
            <Typography sx={{ fontSize: 11, color: '#6b7280', mb: 2 }}>
              Legal &amp; commercial scrutiny
            </Typography>
            <ValidationPanel values={values} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
