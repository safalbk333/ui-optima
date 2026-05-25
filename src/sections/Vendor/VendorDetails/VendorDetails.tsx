'use client';

import {
  Box,
  Tab,
  Chip,
  Grid,
  Tabs,
  Paper,
  Stack,
  Avatar,
  Button,
  Divider,
  Tooltip,
  Skeleton,
  IconButton,
  Typography,
  CardContent,
  LinearProgress,
} from '@mui/material';
import React, { useEffect, useReducer, useCallback } from 'react';
import { alpha } from '@mui/material/styles';

import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type VendorStatus = 'Active' | 'Inactive' | 'Suspended' | 'Blacklisted';
type RiskLevel = 'Low' | 'Medium' | 'High';
type ComplianceStatus = 'Verified' | 'Pending' | 'Expired' | 'Valid' | 'Yes' | 'No';
type ContractStatus = 'Active' | 'Expired' | 'Terminated' | 'Draft';
type POStatus = 'Open' | 'Closed' | 'Cancelled';
type DeliveryStatus = 'In Progress' | 'Partially Delivered' | 'Delivered' | 'Pending';
type DocumentStatus = 'Valid' | 'Expired' | 'Pending';
type ActivityType =
  | 'Vendor Approved'
  | 'KYC Verified'
  | 'PRAZ Verified'
  | 'Contract Created'
  | 'PO Created'
  | 'Invoice Submitted'
  | 'Document Uploaded'
  | 'Risk Review';

interface VendorContact {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  registeredAddress: string;
  billingAddress: string;
}

interface ComplianceItem {
  id: number;
  label: string;
  status: ComplianceStatus;
  date: string;
}

interface RiskGovernance {
  riskLevel: RiskLevel;
  blacklistStatus: string;
  suspensionStatus: string;
  complianceIssues: number;
  lastRiskReview: string;
  nextReviewDue: string;
}

interface PerformanceMetric {
  label: string;
  value: string | number;
  unit?: string;
  score?: number; // 0–100 for progress bar
}

interface VendorContract {
  id: number;
  contractNo: string;
  title: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
}

interface PurchaseOrder {
  id: number;
  poNo: string;
  poDate: string;
  poValue: string;
  status: POStatus;
  deliveryStatus: DeliveryStatus;
}

interface VendorDocument {
  id: number;
  name: string;
  type: string;
  expiryDate: string;
  status: DocumentStatus;
}

interface ActivityEntry {
  id: number;
  type: ActivityType;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface VendorStats {
  rfqsParticipated: number;
  rfqsWon: number;
  activePOs: number;
  totalSpend: string;
  onTimeDelivery: string;
  performanceScore: string;
}

interface VendorDetail {
  vendorId: string;
  vendorName: string;
  initials: string;
  status: VendorStatus;
  category: string;
  country: string;
  vendorSince: string;
  riskLevel: RiskLevel;
  prazStatus: ComplianceStatus;
  activeContracts: number;
  activePOs: number;
  stats: VendorStats;
  contact: VendorContact;
  compliance: ComplianceItem[];
  risk: RiskGovernance;
  performance: PerformanceMetric[];
  contracts: VendorContract[];
  purchaseOrders: PurchaseOrder[];
  documents: VendorDocument[];
  activityTimeline: ActivityEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────

type VendorDetailAction =
  | { type: 'vendorDetail/fetchPending' }
  | { type: 'vendorDetail/fetchFulfilled'; payload: VendorDetail }
  | { type: 'vendorDetail/fetchRejected'; payload: string };

interface VendorDetailState {
  data: VendorDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: VendorDetailState = { data: null, loading: false, error: null };

function vendorDetailReducer(
  state: VendorDetailState,
  action: VendorDetailAction
): VendorDetailState {
  switch (action.type) {
    case 'vendorDetail/fetchPending':
      return { ...state, loading: true, error: null };
    case 'vendorDetail/fetchFulfilled':
      return { ...state, loading: false, data: action.payload };
    case 'vendorDetail/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_VENDOR: VendorDetail = {
  vendorId: 'VND-0014',
  vendorName: 'Zimbabwe Cooling Ltd',
  initials: 'ZCL',
  status: 'Active',
  category: 'Facilities / HVAC',
  country: 'Zimbabwe',
  vendorSince: 'Jan 2024',
  riskLevel: 'Low',
  prazStatus: 'Verified',
  activeContracts: 4,
  activePOs: 3,
  stats: {
    rfqsParticipated: 28,
    rfqsWon: 12,
    activePOs: 3,
    totalSpend: '$245,680.00',
    onTimeDelivery: '92%',
    performanceScore: '4.6 / 5',
  },
  contact: {
    companyName: 'Zimbabwe Cooling Ltd',
    contactPerson: 'Tendai Moyo',
    email: 'procurement@zcl.co.zw',
    phone: '+263 24 2 123456',
    website: 'www.zcl.co.zw',
    registeredAddress: '45 Industrial Way, Msasa, Harare, Zimbabwe',
    billingAddress: '45 Industrial Way, Msasa, Harare, Zimbabwe',
  },
  compliance: [
    { id: 1, label: 'KYC Verification', status: 'Verified', date: '05 Jan 2024' },
    { id: 2, label: 'PRAZ Registration', status: 'Verified', date: '31 Dec 2025' },
    { id: 3, label: 'Tax Clearance', status: 'Valid', date: '15 Mar 2025' },
    { id: 4, label: 'NDA Signed', status: 'Yes', date: '10 Jan 2024' },
    { id: 5, label: 'ISO Certification', status: 'Verified', date: '20 Feb 2026' },
    { id: 6, label: 'Compliance Expiry', status: 'Valid', date: '120 days left' },
  ],
  risk: {
    riskLevel: 'Low',
    blacklistStatus: 'Not Blacklisted',
    suspensionStatus: 'Not Suspended',
    complianceIssues: 0,
    lastRiskReview: '10 Apr 2025',
    nextReviewDue: '10 Jul 2025',
  },
  performance: [
    { label: 'Delivery SLA', value: '92%', score: 92 },
    { label: 'Quality Score', value: '4.6 / 5', score: 92 },
    { label: 'Delay Incidents', value: '2', score: 85 },
    { label: 'Compliance Score', value: '95%', score: 95 },
    { label: 'Response Time', value: '4.2 / 5', score: 84 },
    { label: 'Overall Rating', value: '4.6 / 5', score: 92 },
  ],
  contracts: [
    {
      id: 1,
      contractNo: 'CON-2024-001',
      title: 'HVAC Maintenance',
      startDate: '01 Jan 2024',
      endDate: '31 Dec 2025',
      status: 'Active',
    },
    {
      id: 2,
      contractNo: 'CON-2024-015',
      title: 'Cooling Systems Supply',
      startDate: '10 Feb 2024',
      endDate: '09 Feb 2026',
      status: 'Active',
    },
    {
      id: 3,
      contractNo: 'CON-2024-021',
      title: 'Annual Service Contract',
      startDate: '01 Mar 2024',
      endDate: '28 Feb 2025',
      status: 'Active',
    },
    {
      id: 4,
      contractNo: 'CON-2023-087',
      title: 'Spare Parts Supply',
      startDate: '15 Jun 2023',
      endDate: '14 Jun 2024',
      status: 'Expired',
    },
  ],
  purchaseOrders: [
    {
      id: 1,
      poNo: 'PO-2025-1045',
      poDate: '12 Apr 2025',
      poValue: '$18,450.00',
      status: 'Open',
      deliveryStatus: 'In Progress',
    },
    {
      id: 2,
      poNo: 'PO-2025-0987',
      poDate: '28 Mar 2025',
      poValue: '$42,670.00',
      status: 'Open',
      deliveryStatus: 'Partially Delivered',
    },
    {
      id: 3,
      poNo: 'PO-2025-0856',
      poDate: '15 Feb 2025',
      poValue: '$26,300.00',
      status: 'Open',
      deliveryStatus: 'Delivered',
    },
  ],
  documents: [
    {
      id: 1,
      name: 'PRAZ Certificate',
      type: 'Compliance',
      expiryDate: '31 Dec 2025',
      status: 'Valid',
    },
    {
      id: 2,
      name: 'Tax Clearance Cert.',
      type: 'Tax Document',
      expiryDate: '15 Mar 2026',
      status: 'Valid',
    },
    { id: 3, name: 'KYC Documents', type: 'KYC', expiryDate: '05 Jan 2026', status: 'Valid' },
    {
      id: 4,
      name: 'ISO 9001 Certificate',
      type: 'Certification',
      expiryDate: '20 Feb 2026',
      status: 'Valid',
    },
    { id: 5, name: 'NDA Agreement', type: 'Legal', expiryDate: '10 Jan 2026', status: 'Valid' },
  ],
  activityTimeline: [
    {
      id: 1,
      type: 'Vendor Approved',
      title: 'Vendor Approved',
      date: '09 Jan 2024',
      time: '10:30 AM',
      description: 'Vendor was approved by Admin',
    },
    {
      id: 2,
      type: 'KYC Verified',
      title: 'KYC Verified',
      date: '05 Jan 2024',
      time: '02:15 PM',
      description: 'KYC documents verified',
    },
    {
      id: 3,
      type: 'PRAZ Verified',
      title: 'PRAZ Verified',
      date: '18 Jan 2024',
      time: '11:05 AM',
      description: 'PRAZ registration verified',
    },
    {
      id: 4,
      type: 'Contract Created',
      title: 'Contract CON-2024-001 Created',
      date: '01 Jan 2024',
      time: '09:00 AM',
      description: 'HVAC Maintenance contract created',
    },
    {
      id: 5,
      type: 'PO Created',
      title: 'PO-2025-0856 Created',
      date: '15 Feb 2025',
      time: '10:22 AM',
      description: 'Purchase order created',
    },
    {
      id: 6,
      type: 'Invoice Submitted',
      title: 'Invoice INV-2025-002 Submitted',
      date: '05 Apr 2025',
      time: '03:45 PM',
      description: 'Invoice submitted for PO-2025-0856',
    },
  ],
};

function fetchVendorDetailMock(_vendorId: string): Promise<VendorDetail> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_VENDOR), 900));
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const VENDOR_STATUS_COLOR: Record<VendorStatus, 'default' | 'success' | 'warning' | 'error'> = {
  Active: 'success',
  Inactive: 'default',
  Suspended: 'warning',
  Blacklisted: 'error',
};

const CONTRACT_STATUS_COLOR: Record<ContractStatus, 'default' | 'success' | 'warning' | 'error'> = {
  Active: 'success',
  Expired: 'error',
  Terminated: 'error',
  Draft: 'default',
};

const PO_STATUS_COLOR: Record<POStatus, 'default' | 'success' | 'warning' | 'error'> = {
  Open: 'success',
  Closed: 'default',
  Cancelled: 'error',
};

const DELIVERY_STATUS_COLOR: Record<
  DeliveryStatus,
  'default' | 'info' | 'warning' | 'success' | 'error'
> = {
  'In Progress': 'info',
  'Partially Delivered': 'warning',
  Delivered: 'success',
  Pending: 'default',
};

const DOC_STATUS_COLOR: Record<DocumentStatus, 'default' | 'success' | 'error' | 'warning'> = {
  Valid: 'success',
  Expired: 'error',
  Pending: 'warning',
};

const COMPLIANCE_STATUS_COLOR: Record<
  ComplianceStatus,
  'default' | 'success' | 'warning' | 'error'
> = {
  Verified: 'success',
  Valid: 'success',
  Yes: 'success',
  Pending: 'warning',
  Expired: 'error',
  No: 'error',
};

const ACTIVITY_COLOR: Record<ActivityType, string> = {
  'Vendor Approved': '#22c55e',
  'KYC Verified': '#3b82f6',
  'PRAZ Verified': '#3b82f6',
  'Contract Created': '#8b5cf6',
  'PO Created': '#f59e0b',
  'Invoice Submitted': '#10b981',
  'Document Uploaded': '#6366f1',
  'Risk Review': '#ef4444',
};

const RISK_COLOR: Record<RiskLevel, 'success' | 'warning' | 'error'> = {
  Low: 'success',
  Medium: 'warning',
  High: 'error',
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}

function SectionCard({ title, icon, children, action }: SectionCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent sx={{ pb: '16px !important', height: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon && (
              <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                {icon}
              </Box>
            )}
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
          </Stack>
          {action}
        </Stack>
        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
        {children}
      </CardContent>
    </Box>
  );
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Stack direction="row" spacing={1} mb={1.2}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ minWidth: 150, flexShrink: 0, pt: '2px' }}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
        {value}
      </Typography>
    </Stack>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={48} sx={{ mb: 2 }} />
      <Skeleton variant="rounded" height={180} sx={{ mb: 2, borderRadius: 2 }} />
      <Stack direction="row" spacing={2} mb={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={80} sx={{ flex: 1, borderRadius: 2 }} />
        ))}
      </Stack>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={120} sx={{ mb: 2, borderRadius: 2 }} />
      ))}
    </Box>
  );
}

// ── Tab Panel ─────────────────────────────────────────────────────────────────
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <Box role="tabpanel" hidden={value !== index} pt={2}>
      {value === index && children}
    </Box>
  );
}

// ── Overview Tab: Company & Contact + Compliance & KYC + Risk + Performance ──
function OverviewTab({ data }: { data: VendorDetail }) {
  return (
    <Grid container spacing={2}>
      {/* Company & Contact Information */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Company & Contact Information"
          icon={<BusinessOutlinedIcon fontSize="small" />}
          action={
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: 12 }}
            >
              Edit
            </Button>
          }
        >
          <InfoRow label="Company Name" value={data.contact.companyName} />
          <InfoRow
            label="Contact Person"
            value={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <span>{data.contact.contactPerson}</span>
              </Stack>
            }
          />
          <InfoRow
            label="Email"
            value={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <EmailOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <span>{data.contact.email}</span>
              </Stack>
            }
          />
          <InfoRow
            label="Phone"
            value={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <PhoneOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <span>{data.contact.phone}</span>
              </Stack>
            }
          />
          <InfoRow
            label="Website"
            value={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LanguageOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <span>{data.contact.website}</span>
              </Stack>
            }
          />
          <InfoRow label="Registered Address" value={data.contact.registeredAddress} />
          <InfoRow label="Billing Address" value={data.contact.billingAddress} />
        </SectionCard>
      </Grid>

      {/* Compliance & KYC */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Compliance & KYC"
          icon={<GppGoodOutlinedIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View All
            </Button>
          }
        >
          <Stack spacing={1.2}>
            {data.compliance.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{item.label}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Chip
                    label={
                      item.label === 'Compliance Expiry'
                        ? item.date
                        : item.status === 'Verified'
                          ? `✓ ${item.status}`
                          : item.status === 'Valid'
                            ? `✓ ${item.status}`
                            : item.status === 'Yes'
                              ? `✓ ${item.status}`
                              : item.status
                    }
                    size="small"
                    color={
                      item.label === 'Compliance Expiry'
                        ? 'warning'
                        : COMPLIANCE_STATUS_COLOR[item.status]
                    }
                    variant="outlined"
                    sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                  />
                  {item.label !== 'Compliance Expiry' && (
                    <Typography variant="caption" color="text.disabled">
                      {item.date}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Grid>

      {/* Risk & Governance */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Risk & Governance"
          icon={<SecurityOutlinedIcon fontSize="small" />}
          action={
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{ fontSize: 12 }}
            >
              Edit
            </Button>
          }
        >
          <InfoRow
            label="Risk Level"
            value={
              <Chip
                label={data.risk.riskLevel}
                size="small"
                color={RISK_COLOR[data.risk.riskLevel]}
                variant="outlined"
                sx={{ fontSize: 11, height: 20, fontWeight: 600 }}
              />
            }
          />
          <InfoRow
            label="Blacklist Status"
            value={
              <Typography variant="body2" fontWeight={500} color="success.main">
                {data.risk.blacklistStatus}
              </Typography>
            }
          />
          <InfoRow
            label="Suspension Status"
            value={
              <Typography variant="body2" fontWeight={500} color="success.main">
                {data.risk.suspensionStatus}
              </Typography>
            }
          />
          <InfoRow label="Compliance Issues" value={data.risk.complianceIssues} />
          <InfoRow label="Last Risk Review" value={data.risk.lastRiskReview} />
          <InfoRow label="Next Review Due" value={data.risk.nextReviewDue} />
        </SectionCard>
      </Grid>

      {/* Performance Summary */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Performance Summary"
          icon={<TimelineOutlinedIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View Details
            </Button>
          }
        >
          <Grid container spacing={1.5}>
            {data.performance.map((metric) => (
              <Grid key={metric.label} size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 1.5,
                    p: 1.2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.2}>
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.8}>
                    {metric.label}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metric.score ?? 0}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: (t) => alpha(t.palette.text.primary, 0.08),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 2,
                        bgcolor:
                          (metric.score ?? 0) >= 90
                            ? 'success.main'
                            : (metric.score ?? 0) >= 70
                              ? 'warning.main'
                              : 'error.main',
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </Grid>

      {/* Active Contracts */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title={`Active Contracts (${data.contracts.length})`}
          icon={<AssignmentIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View All
            </Button>
          }
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <Box component="thead">
              <Box component="tr">
                {['Contract No.', 'Title', 'Start Date', 'End Date', 'Status'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      py: 0.8,
                      px: 0.5,
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: 11,
                      borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {data.contracts.map((c) => (
                <Box
                  component="tr"
                  key={c.id}
                  sx={{
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.03) },
                    borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                  }}
                >
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontWeight: 600, color: 'primary.main', fontSize: 12 }}
                  >
                    {c.contractNo}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5, fontSize: 12 }}>
                    {c.title}
                  </Box>
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontSize: 12, color: 'text.secondary' }}
                  >
                    {c.startDate}
                  </Box>
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontSize: 12, color: 'text.secondary' }}
                  >
                    {c.endDate}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Chip
                      label={c.status}
                      size="small"
                      color={CONTRACT_STATUS_COLOR[c.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionCard>
      </Grid>

      {/* Active Purchase Orders */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title={`Active Purchase Orders (${data.purchaseOrders.length})`}
          icon={<ShoppingCartOutlinedIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View All
            </Button>
          }
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <Box component="thead">
              <Box component="tr">
                {['PO No.', 'PO Date', 'PO Value (USD)', 'Status', 'Delivery Status'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      py: 0.8,
                      px: 0.5,
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: 11,
                      borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {data.purchaseOrders.map((po) => (
                <Box
                  component="tr"
                  key={po.id}
                  sx={{
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.03) },
                    borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                  }}
                >
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontWeight: 600, color: 'primary.main', fontSize: 12 }}
                  >
                    {po.poNo}
                  </Box>
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontSize: 12, color: 'text.secondary' }}
                  >
                    {po.poDate}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5, fontSize: 12, fontWeight: 600 }}>
                    {po.poValue}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Chip
                      label={`✓ ${po.status}`}
                      size="small"
                      color={PO_STATUS_COLOR[po.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Chip
                      label={`✓ ${po.deliveryStatus}`}
                      size="small"
                      color={DELIVERY_STATUS_COLOR[po.deliveryStatus]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionCard>
      </Grid>

      {/* Documents */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Documents"
          icon={<DescriptionOutlinedIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View All
            </Button>
          }
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <Box component="thead">
              <Box component="tr">
                {['Document Name', 'Type', 'Expiry Date', 'Status', 'Actions'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      py: 0.8,
                      px: 0.5,
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: 11,
                      borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {data.documents.map((doc) => (
                <Box
                  component="tr"
                  key={doc.id}
                  sx={{
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.03) },
                    borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                  }}
                >
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Stack direction="row" alignItems="center" spacing={0.8}>
                      <DescriptionOutlinedIcon sx={{ fontSize: 16, color: 'error.main' }} />
                      <Typography variant="caption" fontWeight={600}>
                        {doc.name}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box
                    component="td"
                    sx={{ py: 1, px: 0.5, fontSize: 12, color: 'text.secondary' }}
                  >
                    {doc.type}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5, fontSize: 12 }}>
                    {doc.expiryDate}
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Chip
                      label={doc.status}
                      size="small"
                      color={DOC_STATUS_COLOR[doc.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                  <Box component="td" sx={{ py: 1, px: 0.5 }}>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <DownloadOutlinedIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Preview">
                        <IconButton size="small">
                          <RemoveRedEyeOutlinedIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionCard>
      </Grid>

      {/* Activity Timeline */}
      <Grid size={{ xs: 12, md: 6 }}>
        <SectionCard
          title="Activity Timeline"
          icon={<HistoryOutlinedIcon fontSize="small" />}
          action={
            <Button size="small" sx={{ fontSize: 12 }}>
              View All
            </Button>
          }
        >
          <Stack spacing={0}>
            {data.activityTimeline.map((entry, idx) => (
              <Stack key={entry.id} direction="row" spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 20,
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      mt: '4px',
                      bgcolor: ACTIVITY_COLOR[entry.type],
                      flexShrink: 0,
                    }}
                  />
                  {idx < data.activityTimeline.length - 1 && (
                    <Box
                      sx={{
                        width: '1px',
                        flex: 1,
                        bgcolor: (t) => alpha(t.palette.text.primary, 0.1),
                        minHeight: 28,
                        mt: '2px',
                      }}
                    />
                  )}
                </Box>
                <Box pb={idx < data.activityTimeline.length - 1 ? 1.5 : 0} flex={1}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption" fontWeight={700}>
                      {entry.title}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {entry.date} &bull; {entry.time}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block" mt={0.2}>
                    {entry.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Grid>
    </Grid>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface VendorDetailPageProps {
  vendorId?: string;
}

function VendorDetailPage({ vendorId = 'VND-0014' }: VendorDetailPageProps) {
  const [state, dispatch] = useReducer(vendorDetailReducer, initialState);
  const { data, loading, error } = state;
  const [activeTab, setActiveTab] = React.useState(0);

  const loadDetail = useCallback(() => {
    dispatch({ type: 'vendorDetail/fetchPending' });
    fetchVendorDetailMock(vendorId)
      .then((d) => dispatch({ type: 'vendorDetail/fetchFulfilled', payload: d }))
      .catch((err: Error) =>
        dispatch({ type: 'vendorDetail/fetchRejected', payload: err.message })
      );
  }, [vendorId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const TABS = [
    { label: 'Overview', icon: <InfoOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Contracts', icon: <AssignmentIcon sx={{ fontSize: 15 }} /> },
    { label: 'Purchase Orders', icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Performance', icon: <TimelineOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Documents', icon: <DescriptionOutlinedIcon sx={{ fontSize: 15 }} /> },
    { label: 'Activity Timeline', icon: <HistoryOutlinedIcon sx={{ fontSize: 15 }} /> },
  ];

  if (loading) return <DetailSkeleton />;

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="error" mb={2}>
          Failed to load vendor: {error}
        </Typography>
        <Button variant="outlined" onClick={loadDetail}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box textAlign="center" py={8}>
        <BusinessOutlinedIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">Vendor not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor Directory', href: '/vendor/directory' },
            { label: 'Vendor Details', href: '/vendor/details' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Vendor Hero Card ────────────────────────────────────────────────── */}
      <Box
        sx={{
          border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
          borderRadius: 2,
          mb: 2,
          p: 2.5,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Avatar + name + meta */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                  color: 'primary.main',
                  fontWeight: 800,
                  fontSize: 20,
                  border: (t) => `2px solid ${alpha(t.palette.primary.main, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                {data.initials}
              </Avatar>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
                  <Typography variant="h6" fontWeight={800}>
                    {data.vendorName}
                  </Typography>
                  <Chip
                    label={data.status}
                    size="small"
                    color={VENDOR_STATUS_COLOR[data.status]}
                    variant="outlined"
                    sx={{ fontSize: 11, height: 22, fontWeight: 700 }}
                  />
                </Stack>
                <Typography variant="caption" color="text.secondary" mb={1} display="block">
                  {data.vendorId}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <BusinessOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {data.category}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <FlagIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {data.country}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Vendor Since: {data.vendorSince}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Quick stats */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 6 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 1.5,
                    p: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Risk Level
                  </Typography>
                  <Chip
                    label={data.riskLevel}
                    size="small"
                    color={RISK_COLOR[data.riskLevel]}
                    variant="outlined"
                    sx={{ fontSize: 10, height: 18, fontWeight: 600 }}
                  />
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 1.5,
                    p: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    PRAZ Status
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.3}>
                    <CheckCircleIcon sx={{ fontSize: 12, color: 'success.main' }} />
                    <Typography variant="caption" fontWeight={600} color="success.main">
                      {data.prazStatus}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6 }} height="100%">
                <Box
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 1.5,
                    p: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" display="block">
                    Active Contracts
                  </Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {data.activeContracts}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }} alignItems="stretch">
                <Box
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 1.5,
                    p: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" display="block">
                    Active POs
                  </Typography>
                  <Typography variant="h6" fontWeight={800}>
                    {data.activePOs}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* ── KPI Stats Strip ──────────────────────────────────────────────────── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        mb={2.5}
        flexWrap="wrap"
        useFlexGap
      >
        {[
          { label: 'RFQs Participated', value: data.stats.rfqsParticipated },
          { label: 'RFQs Won', value: data.stats.rfqsWon, highlight: true },
          { label: 'Active POs', value: data.stats.activePOs },
          {
            label: 'Total Spend (USD)',
            value: data.stats.totalSpend,
            highlight: true,
            large: true,
          },
          { label: 'On-time Delivery', value: data.stats.onTimeDelivery, highlight: true },
          { label: 'Performance Score', value: data.stats.performanceScore, highlight: true },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              flex: 1,
              minWidth: 120,
              border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ py: '12px !important', px: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.4}>
                {item.label}
              </Typography>
              <Typography
                variant={item.large ? 'subtitle1' : 'h6'}
                fontWeight={800}
                color={item.highlight ? 'primary.main' : 'text.primary'}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Box>
        ))}
      </Stack>

      {/* ── Tabs ─────────────────────────────────────────────────────────────── */}
      <Box sx={{ borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.1)}`, mb: 0 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 38,
            '& .MuiTab-root': { minHeight: 38, fontSize: 12, fontWeight: 600, py: 0 },
            '& .MuiTab-root.Mui-selected': { color: 'primary.main' },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ gap: 0.5 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* ── Tab 0: Overview ──────────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={0}>
        <OverviewTab data={data} />
      </TabPanel>

      {/* ── Tab 1: Contracts ────────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={1}>
        <SectionCard
          title={`Contracts (${data.contracts.length})`}
          icon={<AssignmentIcon fontSize="small" />}
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <Box component="thead">
              <Box component="tr">
                {['Contract No.', 'Title', 'Start Date', 'End Date', 'Status'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      py: 1,
                      px: 1,
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: 11,
                      borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {data.contracts.map((c) => (
                <Box
                  component="tr"
                  key={c.id}
                  sx={{
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.03) },
                    borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                  }}
                >
                  <Box
                    component="td"
                    sx={{ py: 1.2, px: 1, fontWeight: 600, color: 'primary.main' }}
                  >
                    {c.contractNo}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1 }}>
                    {c.title}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1, color: 'text.secondary' }}>
                    {c.startDate}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1, color: 'text.secondary' }}>
                    {c.endDate}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1 }}>
                    <Chip
                      label={c.status}
                      size="small"
                      color={CONTRACT_STATUS_COLOR[c.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionCard>
      </TabPanel>

      {/* ── Tab 2: Purchase Orders ───────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={2}>
        <SectionCard
          title={`Purchase Orders (${data.purchaseOrders.length})`}
          icon={<ShoppingCartOutlinedIcon fontSize="small" />}
        >
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <Box component="thead">
              <Box component="tr">
                {['PO No.', 'PO Date', 'PO Value (USD)', 'Status', 'Delivery Status'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      textAlign: 'left',
                      py: 1,
                      px: 1,
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: 11,
                      borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {data.purchaseOrders.map((po) => (
                <Box
                  component="tr"
                  key={po.id}
                  sx={{
                    '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.03) },
                    borderBottom: (t) => `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                  }}
                >
                  <Box
                    component="td"
                    sx={{ py: 1.2, px: 1, fontWeight: 600, color: 'primary.main' }}
                  >
                    {po.poNo}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1, color: 'text.secondary' }}>
                    {po.poDate}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1, fontWeight: 600 }}>
                    {po.poValue}
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1 }}>
                    <Chip
                      label={`✓ ${po.status}`}
                      size="small"
                      color={PO_STATUS_COLOR[po.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                  <Box component="td" sx={{ py: 1.2, px: 1 }}>
                    <Chip
                      label={`✓ ${po.deliveryStatus}`}
                      size="small"
                      color={DELIVERY_STATUS_COLOR[po.deliveryStatus]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </SectionCard>
      </TabPanel>

      {/* ── Tab 3: Performance ──────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={3}>
        <SectionCard title="Performance Summary" icon={<TimelineOutlinedIcon fontSize="small" />}>
          <Grid container spacing={2}>
            {data.performance.map((metric) => (
              <Grid key={metric.label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight={800} color="primary.main" mb={0.5}>
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1.5}>
                    {metric.label}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metric.score ?? 0}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: (t) => alpha(t.palette.text.primary, 0.08),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        bgcolor:
                          (metric.score ?? 0) >= 90
                            ? 'success.main'
                            : (metric.score ?? 0) >= 70
                              ? 'warning.main'
                              : 'error.main',
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </TabPanel>

      {/* ── Tab 4: Documents ─────────────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={4}>
        <SectionCard title="Documents" icon={<DescriptionOutlinedIcon fontSize="small" />}>
          <Stack spacing={1}>
            {data.documents.map((doc) => (
              <Paper
                key={doc.id}
                variant="outlined"
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 1.5,
                  borderColor: (t) => alpha(t.palette.text.primary, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} flex={1} minWidth={0}>
                  <DescriptionOutlinedIcon
                    sx={{ fontSize: 20, color: 'error.main', flexShrink: 0 }}
                  />
                  <Box>
                    <Typography variant="caption" fontWeight={700} display="block">
                      {doc.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.type} &bull; Expires {doc.expiryDate}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} flexShrink={0}>
                  <Chip
                    label={doc.status}
                    size="small"
                    color={DOC_STATUS_COLOR[doc.status]}
                    variant="outlined"
                    sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                  />
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <DownloadOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Preview">
                    <IconButton size="small">
                      <RemoveRedEyeOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </SectionCard>
      </TabPanel>

      {/* ── Tab 5: Activity Timeline ─────────────────────────────────────────── */}
      <TabPanel value={activeTab} index={5}>
        <SectionCard title="Activity Timeline" icon={<HistoryOutlinedIcon fontSize="small" />}>
          <Stack spacing={0}>
            {data.activityTimeline.map((entry, idx) => (
              <Stack key={entry.id} direction="row" spacing={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      mt: '4px',
                      bgcolor: ACTIVITY_COLOR[entry.type],
                      flexShrink: 0,
                    }}
                  />
                  {idx < data.activityTimeline.length - 1 && (
                    <Box
                      sx={{
                        width: '1px',
                        flex: 1,
                        bgcolor: (t) => alpha(t.palette.text.primary, 0.1),
                        minHeight: 32,
                        mt: '2px',
                      }}
                    />
                  )}
                </Box>
                <Box pb={idx < data.activityTimeline.length - 1 ? 2 : 0} flex={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" fontWeight={700}>
                      {entry.title}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {entry.date} &bull; {entry.time}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" mt={0.3} display="block">
                    {entry.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </TabPanel>
    </Box>
  );
}

export default VendorDetailPage;
