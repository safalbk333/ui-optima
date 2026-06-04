'use client';

import {
  Box,
  Fade,
  Stack,
  Button,
  Dialog,
  Select,
  Divider,
  Tooltip,
  Backdrop,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  FormControl,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { Edit } from '@mui/icons-material';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import ContractDocument from 'src/components/contract/ContractDocument';
import ValidationPanel from 'src/components/contract/ValidationPanel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplateByCode } from 'src/store/slices/contract/contractSlice';
import { AppDispatch, RootState } from 'src/store/store';
import { useRouter } from 'next/navigation';

// ─── Icons (inline SVG components to avoid import issues) ────────────────────

export const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
export const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
export const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
export const EyeIcon = () => (
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
export const CreateContractIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);
export const CheckIcon = ({ size = 14 }) => (
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
export const WarnIcon = ({ size = 14 }) => (
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
export const PrinterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);
export const MaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
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

export const CURRENCY_OPTIONS = ['ZIG', 'USD', 'ZWL', 'ZAR', 'EUR', 'GBP', 'KES'];

export type ContractValues = {
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
  contractTitle: string;
  clientEmail: string;
  clientPhone: string;
};

export type ValidationSeverity = 'warning' | 'success' | 'default';

export type ValidationCardProps = {
  severity?: ValidationSeverity;
};

// ─── STYLED COMPONENTS ────────────────────────────────────────────────────────
export const GreenChip = styled(Box)(({ theme }) => ({
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

export const ValidationCard = styled(Box, {
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

export const SectionHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: 13,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: 10,
  marginTop: 22,
}));

export const EditableBlock = ({
  value,
  onChange,
  editMode,
  sx = {},
}: {
  value: string;
  onChange: (val: string) => void;
  editMode: boolean;
  sx?: object;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && !editMode) {
      divRef.current.textContent = value;
    }
  }, [value, editMode]);

  useEffect(() => {
    if (divRef.current && editMode) {
      if (divRef.current.textContent !== value) {
        divRef.current.textContent = value;
      }
    }
  }, [editMode]);

  const baseTypographySx = {
    fontSize: 12.5,
    mb: 2,
    fontFamily: '"Times New Roman", serif',
    lineHeight: 1.75,
    color: '#1a1a1a',
    ...sx,
  };

  if (!editMode) {
    return <Typography sx={baseTypographySx}>{value}</Typography>;
  }

  return (
    <Box
      ref={divRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || '')}
      sx={{
        ...baseTypographySx,
        outline: 'none',
        border: '1px dashed #93c5fd',
        borderRadius: 1,
        p: '6px 8px',
        background: alpha('#3b82f6', 0.03),
        cursor: 'text',
        minHeight: 48,
        '&:focus': {
          border: '1.5px solid #3b82f6',
          background: alpha('#3b82f6', 0.06),
          boxShadow: `0 0 0 3px ${alpha('#3b82f6', 0.12)}`,
        },
        '&:hover': {
          borderColor: '#60a5fa',
        },
        transition: 'border 0.15s, box-shadow 0.15s, background 0.15s',
      }}
    />
  );
};

export interface TemplateValues {
  rfq_title: string;
  linked_purchase_request: string;
  linked_eoi: string;
  category: string;
  department: string;
  priority: string;

  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  organisation: string;

  vendor_name: string;

  currency: string;
  contract_value: string;

  start_date: string;
  end_date: string;

  governing_law: string;
}

export default function ContractGeneratorPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();

  const [errors, setErrors] = useState<Partial<Record<keyof ContractValues, string>>>({});

  const [values, setValues] = useState<ContractValues>({
    vendor: '',
    contractType: '',
    contractValue: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    governingLaw: '',
    clientName: '',
    scope: '',
    paymentTerms: '',
    contractValueWords: '',
    clientEmail: '',
    clientPhone: '',
    contractTitle: '',
  });

  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContractValues, string>> = {};

    if (!values.contractTitle.trim()) {
      newErrors.contractTitle = 'Contract title is required';
    }

    if (!values.vendor) {
      newErrors.vendor = 'Vendor is required';
    }

    if (!values.contractType) {
      newErrors.contractType = 'Contract type is required';
    }

    if (!values.contractValue.trim()) {
      newErrors.contractValue = 'Contract value is required';
    }

    if (!values.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!values.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (
      values.startDate &&
      values.endDate &&
      new Date(values.endDate) <= new Date(values.startDate)
    ) {
      newErrors.endDate = 'End date must be greater than start date';
    }

    if (!values.governingLaw) {
      newErrors.governingLaw = 'Governing law is required';
    }

    if (!values.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!values.clientPhone.trim()) {
      newErrors.clientPhone = 'Phone number is required';
    }

    if (!values.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.clientEmail)) {
      newErrors.clientEmail = 'Enter a valid email address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (field: keyof ContractValues, val: string) => {
    setValues((prev) => {
      const updated = {
        ...prev,
        [field]: val,
      };

      if (field === 'startDate' && updated.endDate && new Date(updated.endDate) <= new Date(val)) {
        updated.endDate = '';
      }

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      return;
    }

    setGenerating(true);

    await new Promise((r) => setTimeout(r, 1800));

    setGenerating(false);
    setGenerated(true);

    const storedData = JSON.stringify(values);

    sessionStorage.setItem('contractDetails', storedData);

    router.replace('/contract-generator/preview');
  };

  // Reset edit mode when dialog is closed
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  useEffect(() => {
    const payload = {
      templateCode: 'RFQ',
    };

    dispatch(fetchTemplateByCode(payload));
  }, [dispatch]);

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

      <Box display="grid" gridTemplateColumns="1fr">
        <Box
          sx={{
            bgcolor: '#fff',
            borderRight: '1px solid #e5e7eb',
            p: 2.5,
            overflowY: 'auto',
          }}
        >
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
              CONTRACT TITLE
            </Typography>

            <TextField
              size="small"
              fullWidth
              value={values.contractTitle}
              onChange={(e) => handleChange('contractTitle', e.target.value)}
              sx={{
                '& .MuiInputBase-input': { fontSize: 12 },
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f9fafb',
                  '& fieldset': { borderColor: '#e5e7eb' },
                },
              }}
              error={!!errors.contractTitle}
              helperText={errors.contractTitle}
            />
          </Box>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 320px' }} gap={4}>
            {/* Vendor */}
            <Box>
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
              <FormControl fullWidth size="small" error={!!errors.vendor}>
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
                {errors.vendor && (
                  <Typography color="error" sx={{ fontSize: 12, mt: 0.5 }}>
                    {errors?.vendor}
                  </Typography>
                )}
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
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  inputProps={{
                    min: today,
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 11,
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
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                  inputProps={{
                    min: values.startDate || today,
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 11,
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
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} mb={2.5}>
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
                CLIENT EMAIL
              </Typography>

              <TextField
                size="small"
                fullWidth
                type="email"
                value={values.clientEmail}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
                placeholder="procurement@company.com"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 12 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                  },
                }}
                error={!!errors.clientEmail}
                helperText={errors.clientEmail}
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
                CLIENT PHONE
              </Typography>

              <TextField
                size="small"
                fullWidth
                value={values.clientPhone}
                onChange={(e) => handleChange('clientPhone', e.target.value)}
                placeholder=""
                sx={{
                  '& .MuiInputBase-input': { fontSize: 12 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f9fafb',
                    '& fieldset': { borderColor: '#e5e7eb' },
                  },
                }}
                error={!!errors.clientPhone}
                helperText={errors.clientPhone}
              />
            </Box>
          </Stack>

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
        </Box>
      </Box>
    </Box>
  );
}
