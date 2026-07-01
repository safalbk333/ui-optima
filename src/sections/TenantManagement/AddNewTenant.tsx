'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// ── Icons ─────────────────────────────────────────────────────────────────────
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type BillingCycle = 'Annual' | 'Monthly';

interface OrganizationForm {
  organizationName: string;
  organizationCode: string;
  registrationNumber: string;
  industry: string;
  websiteUrl: string;
}

interface ContactForm {
  fullName: string;
  workEmail: string;
  mobileNumber: string;
  alternateNumber: string;
}

interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  country: string;
  pincodeZip: string;
}

interface SubscriptionForm {
  plan: string;
  billingCycle: BillingCycle;
  activationDate: string;
  maxUserLimit: string;
}

interface BrandingForm {
  logoFile: File | null;
  primaryThemeColor: string;
}

// Full form shape used across all steps
interface TenantFormData {
  organization: OrganizationForm;
  contact: ContactForm;
  address: AddressForm;
  subscription: SubscriptionForm;
  branding: BrandingForm;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  'Technology & SaaS',
  'Healthcare',
  'Finance & Banking',
  'Logistics',
  'Manufacturing',
  'Education',
  'Retail',
  'Energy & Utilities',
  'Government',
  'Other',
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Zimbabwe',
  'South Africa',
  'Kenya',
  'Nigeria',
  'India',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Other',
];

const SUBSCRIPTION_PLANS = [
  'Enterprise Elite',
  'Enterprise',
  'Professional',
  'Basic',
  'Trial',
];

// Step metadata — label + section icon
const STEPS = [
  { label: 'Organization', icon: <TableChartOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Contact',      icon: <PersonPinOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Address',      icon: <LocationOnOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Subscription', icon: <CreditCardOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: 'Branding',     icon: <PaletteOutlinedIcon sx={{ fontSize: 16 }} /> },
];

// Design tokens — matching the teal-navy palette from the screenshots
const TEAL  = '#005DAC';   // primary blue from screenshot branding
const GREEN = '#1B5E20';   // completed step dark-green fill
const GREEN_MID = '#2E7D32'; // save-draft button green

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL FORM STATE
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_FORM: TenantFormData = {
  organization: {
    organizationName: '',
    organizationCode: '',
    registrationNumber: '',
    industry: '',
    websiteUrl: '',
  },
  contact: {
    fullName: '',
    workEmail: '',
    mobileNumber: '',
    alternateNumber: '',
  },
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    country: 'United States',
    pincodeZip: '',
  },
  subscription: {
    plan: 'Enterprise Elite',
    billingCycle: 'Annual',
    activationDate: '',
    maxUserLimit: '500',
  },
  branding: {
    logoFile: null,
    primaryThemeColor: '#005DAC',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

interface StepIndicatorProps {
  currentStep: number; // 1-based
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, position: 'relative' }}>
      {STEPS.map((step, idx) => {
        const stepNum  = idx + 1;
        const done     = stepNum < currentStep;
        const active   = stepNum === currentStep;
        const upcoming = stepNum > currentStep;

        return (
          <React.Fragment key={step.label}>
            {/* Connector line — before each step except the first */}
            {idx > 0 && (
              <Box
                sx={{
                  flex: 1,
                  height: 2,
                  bgcolor: done ? TEAL : alpha('#000', 0.15),
                  transition: 'background-color 0.3s ease',
                  mx: 0,
                }}
              />
            )}

            {/* Step circle + label */}
            <Stack alignItems="center" spacing={0.75} sx={{ flexShrink: 0 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  transition: 'all 0.25s ease',
                  // Completed = dark teal fill + check icon
                  // Active    = primary blue fill + number
                  // Upcoming  = light grey outline + number
                  ...(done && {
                    bgcolor: GREEN,
                    color: '#fff',
                    border: 'none',
                  }),
                  ...(active && {
                    bgcolor: TEAL,
                    color: '#fff',
                    border: 'none',
                    boxShadow: `0 0 0 4px ${alpha(TEAL, 0.18)}`,
                  }),
                  ...(upcoming && {
                    bgcolor: 'transparent',
                    color: alpha('#000', 0.35),
                    border: `2px solid ${alpha('#000', 0.18)}`,
                  }),
                }}
              >
                {done ? <CheckIcon sx={{ fontSize: 18 }} /> : stepNum}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  fontSize: 11,
                  fontWeight: active || done ? 700 : 400,
                  color: active
                    ? TEAL
                    : done
                    ? GREEN
                    : alpha('#000', 0.4),
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {step.label}
              </Typography>
            </Stack>
          </React.Fragment>
        );
      })}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED FIELD STYLES — uniform outlined inputs matching the screenshots
// ─────────────────────────────────────────────────────────────────────────────

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    fontSize: 14,
    bgcolor: '#fff',
  },
  '& .MuiInputLabel-root': { fontSize: 13 },
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Organization Details
// ─────────────────────────────────────────────────────────────────────────────

interface Step1Props {
  data: OrganizationForm;
  onChange: (patch: Partial<OrganizationForm>) => void;
}

function Step1Organization({ data, onChange }: Step1Props) {
  return (
    <Box>
      {/* Section heading */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box sx={{ color: TEAL, display: 'flex' }}>
          <TableChartOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          Organization Details
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Row 1: Name + Code */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Organization Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. Acme Corporation"
            value={data.organizationName}
            onChange={(e) => onChange({ organizationName: e.target.value })}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Organization Code
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="ACME-01"
            value={data.organizationCode}
            onChange={(e) => onChange({ organizationCode: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Row 2: Registration Number + Industry */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Registration Number
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="REG-12345678"
            value={data.registrationNumber}
            onChange={(e) => onChange({ registrationNumber: e.target.value })}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Industry
          </Typography>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={data.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            sx={{ borderRadius: '8px', fontSize: 14, bgcolor: '#fff' }}
          >
            <MenuItem value="" disabled>
              <em style={{ color: alpha('#000', 0.4), fontStyle: 'normal' }}>Technology & SaaS</em>
            </MenuItem>
            {INDUSTRIES.map((ind) => (
              <MenuItem key={ind} value={ind} sx={{ fontSize: 13 }}>
                {ind}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Row 3: Website URL — full width with https:// adornment */}
      <Box>
        <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
          Website URL
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="www.acme.com"
          value={data.websiteUrl}
          onChange={(e) => onChange({ websiteUrl: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    px: 1.25,
                    py: '5px',
                    bgcolor: alpha('#000', 0.05),
                    borderRight: `1px solid ${alpha('#000', 0.12)}`,
                    fontSize: 13,
                    color: 'text.secondary',
                    mr: 1,
                    borderRadius: '0',
                    ml: -1.75,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  https://
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            ...inputSx,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: 14,
              bgcolor: '#fff',
              pl: 0,
              overflow: 'hidden',
            },
          }}
        />
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Primary Contact
// ─────────────────────────────────────────────────────────────────────────────

interface Step2Props {
  data: ContactForm;
  onChange: (patch: Partial<ContactForm>) => void;
}

function Step2Contact({ data, onChange }: Step2Props) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box sx={{ color: TEAL, display: 'flex' }}>
          <PersonPinOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          Primary Contact
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Row 1: Full Name + Work Email */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Full Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Work Email
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="email"
            placeholder="john@acme.com"
            value={data.workEmail}
            onChange={(e) => onChange({ workEmail: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Row 2: Mobile + Alternate */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Mobile Number
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="+1 (555) 000-0000"
            value={data.mobileNumber}
            onChange={(e) => onChange({ mobileNumber: e.target.value })}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Alternate Number{' '}
            <Typography component="span" variant="caption" color="text.secondary">
              (Optional)
            </Typography>
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="+1 (555) 000-0001"
            value={data.alternateNumber}
            onChange={(e) => onChange({ alternateNumber: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — Global Address
// ─────────────────────────────────────────────────────────────────────────────

interface Step3Props {
  data: AddressForm;
  onChange: (patch: Partial<AddressForm>) => void;
}

function Step3Address({ data, onChange }: Step3Props) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box sx={{ color: TEAL, display: 'flex' }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          Global Address
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Address Line 1 */}
      <Box mb={3}>
        <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
          Address Line 1
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="123 Business Way"
          value={data.addressLine1}
          onChange={(e) => onChange({ addressLine1: e.target.value })}
          sx={inputSx}
        />
      </Box>

      {/* Address Line 2 */}
      <Box mb={3}>
        <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
          Address Line 2
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Suite 400"
          value={data.addressLine2}
          onChange={(e) => onChange({ addressLine2: e.target.value })}
          sx={inputSx}
        />
      </Box>

      {/* City + State */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            City
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="San Francisco"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            State / Province
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="California"
            value={data.stateProvince}
            onChange={(e) => onChange({ stateProvince: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Country + Zip */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Country
          </Typography>
          <Select
            fullWidth
            size="small"
            value={data.country}
            onChange={(e) => onChange({ country: e.target.value })}
            sx={{ borderRadius: '8px', fontSize: 14, bgcolor: '#fff' }}
          >
            {COUNTRIES.map((c) => (
              <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Pincode / Zip
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="94105"
            value={data.pincodeZip}
            onChange={(e) => onChange({ pincodeZip: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — Subscription Plan
// ─────────────────────────────────────────────────────────────────────────────

interface Step4Props {
  data: SubscriptionForm;
  onChange: (patch: Partial<SubscriptionForm>) => void;
}

function Step4Subscription({ data, onChange }: Step4Props) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box sx={{ color: TEAL, display: 'flex' }}>
          <CreditCardOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          Subscription Plan
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Row 1: Plan + Billing Cycle */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Select Plan
          </Typography>
          <Select
            fullWidth
            size="small"
            value={data.plan}
            onChange={(e) => onChange({ plan: e.target.value })}
            sx={{ borderRadius: '8px', fontSize: 14, bgcolor: '#fff' }}
          >
            {SUBSCRIPTION_PLANS.map((p) => (
              <MenuItem key={p} value={p} sx={{ fontSize: 13 }}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Billing Cycle
          </Typography>
          {/* Radio group matching the screenshot — Annual / Monthly side by side */}
          <RadioGroup
            row
            value={data.billingCycle}
            onChange={(e) => onChange({ billingCycle: e.target.value as BillingCycle })}
            sx={{ mt: 0.5 }}
          >
            <FormControlLabel
              value="Annual"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: alpha('#000', 0.3),
                    '&.Mui-checked': { color: TEAL },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontSize={13} fontWeight={500}>
                  Annual
                </Typography>
              }
            />
            <FormControlLabel
              value="Monthly"
              control={
                <Radio
                  size="small"
                  sx={{
                    color: alpha('#000', 0.3),
                    '&.Mui-checked': { color: TEAL },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontSize={13} fontWeight={500}>
                  Monthly
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </Box>

      {/* Row 2: Activation Date + Max User Limit */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Activation Date
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={data.activationDate}
            onChange={(e) => onChange({ activationDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={inputSx}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Max User Limit
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            placeholder="500"
            value={data.maxUserLimit}
            onChange={(e) => onChange({ maxUserLimit: e.target.value })}
            sx={inputSx}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — Branding & Identity
// ─────────────────────────────────────────────────────────────────────────────

interface Step5Props {
  data: BrandingForm;
  onChange: (patch: Partial<BrandingForm>) => void;
}

function Step5Branding({ data, onChange }: Step5Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange({ logoFile: file });
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onChange({ logoFile: file });
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
        <Box sx={{ color: TEAL, display: 'flex' }}>
          <PaletteOutlinedIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography variant="h6" fontWeight={700} fontSize={18}>
          Branding &amp; Identity
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 4,
          alignItems: 'flex-start',
        }}
      >
        {/* Organization Logo — drag-and-drop zone */}
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Organization Logo
          </Typography>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.svg,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          {/* Drop zone — dashed border matching screenshot */}
          <Box
            onClick={handleDropZoneClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            sx={{
              border: `2px dashed ${alpha('#000', 0.2)}`,
              borderRadius: '10px',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              minHeight: 160,
              bgcolor: alpha('#000', 0.015),
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                borderColor: TEAL,
                bgcolor: alpha(TEAL, 0.03),
              },
            }}
          >
            {data.logoFile ? (
              // Show selected filename instead of placeholder
              <Typography variant="body2" fontWeight={600} color="primary.main" textAlign="center">
                {data.logoFile.name}
              </Typography>
            ) : (
              <>
                <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: alpha('#000', 0.3) }} />
                <Typography variant="body2" fontSize={13} color="text.secondary" textAlign="center">
                  Drag and drop or{' '}
                  <Typography
                    component="span"
                    sx={{ color: TEAL, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    browse
                  </Typography>
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  PNG, SVG or JPEG (Max 2MB)
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Primary Theme Color — colour swatch + hex input */}
        <Box>
          <Typography variant="body2" fontWeight={600} mb={0.75} fontSize={13}>
            Primary Theme Color
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            {/* Colour preview swatch — acts as a native colour picker trigger */}
            <Box
              component="label"
              htmlFor="theme-color-picker"
              sx={{
                width: 56,
                height: 40,
                borderRadius: '8px',
                bgcolor: data.primaryThemeColor,
                cursor: 'pointer',
                border: `1px solid ${alpha('#000', 0.12)}`,
                flexShrink: 0,
                display: 'block',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <input
                id="theme-color-picker"
                type="color"
                value={data.primaryThemeColor}
                onChange={(e) => onChange({ primaryThemeColor: e.target.value })}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                }}
              />
            </Box>

            {/* Hex value text input */}
            <Box flex={1}>
              <TextField
                fullWidth
                size="small"
                value={data.primaryThemeColor.toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange({ primaryThemeColor: v });
                }}
                sx={inputSx}
              />
              <Typography variant="caption" color="text.secondary" mt={0.75} display="block" lineHeight={1.4}>
                This color will be applied to the tenant`s user interface headers and buttons.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP FOOTER — Cancel Onboarding | Previous | Next Step / Create Tenant | Save Draft
// ─────────────────────────────────────────────────────────────────────────────

interface StepFooterProps {
  step: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onCreateTenant: () => void;
  onSaveDraft: () => void;
  onCancelOnboarding: () => void;
}

function StepFooter({
  step,
  totalSteps,
  onPrevious,
  onNext,
  onCreateTenant,
  onSaveDraft,
  onCancelOnboarding,
}: StepFooterProps) {
  const isFirst = step === 1;
  const isLast  = step === totalSteps;

  return (
    <>
      <Divider sx={{ mt: 3, mb: 2.5 }} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
        {/* Left: Cancel Onboarding (text link style) */}
        <Button
          variant="text"
          onClick={onCancelOnboarding}
          sx={{
            color: 'text.secondary',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': { color: 'error.main', bgcolor: 'transparent' },
          }}
        >
          Cancel Onboarding
        </Button>

        {/* Right: Previous + Next/Create + Save Draft */}
        <Stack direction="row" spacing={1.5}>
          {/* Previous — outlined, with back arrow; hidden on step 1 */}
          {!isFirst && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
              onClick={onPrevious}
              sx={{
                fontSize: 13,
                fontWeight: 600,
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: alpha('#000', 0.25),
                color: 'text.primary',
                '&:hover': { borderColor: TEAL, color: TEAL },
              }}
            >
              Previous
            </Button>
          )}

          {/* Next Step or Create Tenant (last step) */}
          {isLast ? (
            <Button
              variant="contained"
              endIcon={<RocketLaunchIcon sx={{ fontSize: 16 }} />}
              onClick={onCreateTenant}
              sx={{
                fontSize: 13,
                fontWeight: 700,
                borderRadius: '8px',
                textTransform: 'none',
                bgcolor: TEAL,
                '&:hover': { bgcolor: '#004A8D' },
                px: 2.5,
              }}
            >
              Create Tenant
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              onClick={onNext}
              sx={{
                fontSize: 13,
                fontWeight: 700,
                borderRadius: '8px',
                textTransform: 'none',
                bgcolor: TEAL,
                '&:hover': { bgcolor: '#004A8D' },
                px: 2.5,
              }}
            >
              Next Step
            </Button>
          )}

          {/* Save Draft — dark green, always visible */}
          <Button
            variant="contained"
            onClick={onSaveDraft}
            sx={{
              fontSize: 13,
              fontWeight: 700,
              borderRadius: '8px',
              textTransform: 'none',
              bgcolor: GREEN_MID,
              '&:hover': { bgcolor: '#1B5E20' },
              px: 2.5,
            }}
          >
            Save Draft
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — CreateTenant (multi-step wizard)
// ─────────────────────────────────────────────────────────────────────────────

function CreateTenant() {
  // ── Wizard state ──────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1); // 1-based
  const [formData, setFormData]       = useState<TenantFormData>(INITIAL_FORM);

  // ── Toast / feedback state ────────────────────────────────────────────────
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: 'success' | 'info' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  // ── Form patch helpers — one per step section ─────────────────────────────

  const patchOrganization = (patch: Partial<OrganizationForm>) =>
    setFormData((prev) => ({ ...prev, organization: { ...prev.organization, ...patch } }));

  const patchContact = (patch: Partial<ContactForm>) =>
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));

  const patchAddress = (patch: Partial<AddressForm>) =>
    setFormData((prev) => ({ ...prev, address: { ...prev.address, ...patch } }));

  const patchSubscription = (patch: Partial<SubscriptionForm>) =>
    setFormData((prev) => ({ ...prev, subscription: { ...prev.subscription, ...patch } }));

  const patchBranding = (patch: Partial<BrandingForm>) =>
    setFormData((prev) => ({ ...prev, branding: { ...prev.branding, ...patch } }));

  // ── Navigation ─────────────────────────────────────────────────────────────

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleCreateTenant = () => {
    // TODO: POST /api/tenants with formData
    showSnackbar('Tenant created successfully!', 'success');
  };

  const handleSaveDraft = () => {
    // TODO: POST /api/tenants/draft with formData
    showSnackbar('Draft saved. You can continue onboarding later.', 'info');
  };

  const handleCancelOnboarding = () => {
    // TODO: router.push('/tenant-management')
    showSnackbar('Onboarding cancelled. Returning to tenant list…', 'info');
  };

  // ── Active step content ────────────────────────────────────────────────────

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Organization data={formData.organization} onChange={patchOrganization} />;
      case 2:
        return <Step2Contact data={formData.contact} onChange={patchContact} />;
      case 3:
        return <Step3Address data={formData.address} onChange={patchAddress} />;
      case 4:
        return <Step4Subscription data={formData.subscription} onChange={patchSubscription} />;
      case 5:
        return <Step5Branding data={formData.branding} onChange={patchBranding} />;
      default:
        return null;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* ── Breadcrumbs ─────────────────────────────────────────────────── */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Create New Tenant"
          paths={[
            { label: 'Tenants', href: '/tenant-management' },
            { label: 'Create New Tenant', href: '#' },
          ]}
        />
      </Box>

      {/* ── Page heading ─────────────────────────────────────────────────── */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={800} fontSize={{ xs: 24, sm: 30 }} mb={0.75}>
          Onboard New Organization
        </Typography>
        <Typography variant="body2" color="text.secondary" maxWidth={640} lineHeight={1.6}>
          Configure the core parameters, branding, and subscription tier for a new enterprise
          tenant. Ensure all legal registration details are accurate.
        </Typography>
      </Box>

      {/* ── Step Indicator ───────────────────────────────────────────────── */}
      <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} />

      {/* ── Step Content Card ────────────────────────────────────────────── */}
      <Box
        sx={{
          border: '1px solid',
          borderColor: alpha('#000', 0.1),
          borderRadius: '12px',
          bgcolor: '#fff',
          p: { xs: 2.5, sm: 4 },
          boxShadow: `0 1px 4px ${alpha('#000', 0.06)}`,
        }}
      >
        {/* Animate step transitions softly */}
        <Box key={currentStep} sx={{ animation: 'fadeIn 0.2s ease' }}>
          {renderStepContent()}
        </Box>

        {/* ── Step Footer (navigation buttons) ─────────────────────────── */}
        <StepFooter
          step={currentStep}
          totalSteps={STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCreateTenant={handleCreateTenant}
          onSaveDraft={handleSaveDraft}
          onCancelOnboarding={handleCancelOnboarding}
        />
      </Box>

      {/* ── Toast Snackbar ───────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '8px', fontSize: 13 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Keyframe for step fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

export default CreateTenant;