'use client';

import {
  Box,
  Card,
  Chip,
  Alert,
  Stack,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Skeleton,
  TextField,
  IconButton,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { alpha, useTheme } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import dayjs from 'dayjs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

// ── Icons ──────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ContractStatus = 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Expired' | 'Terminated';
type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';
type RenewalStatus = 'Pending' | 'Submitted' | 'Approved' | 'Rejected';

interface ContractDocument {
  id: number;
  fileName: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  version: string;
  status: DocumentStatus;
}

interface RenewalRecord {
  id: number;
  renewalNo: number;
  previousEndDate: string;
  newEndDate: string;
  renewedBy: string;
  renewedAt: string;
  reason: string;
  status: RenewalStatus;
  previousValue: string;
  newValue: string;
}

interface RenewalPageData {
  contractId: string;
  contractTitle: string;
  vendor: string;
  contractType: string;
  category: string;
  startDate: string;
  endDate: string; // original end date
  renewalDate: string; // last renewal date (if any)
  contractValue: string;
  currency: string;
  daysToExpiry: number;
  contractStatus: ContractStatus;
  submittedBy: string;
  description: string;
  documents: ContractDocument[];
  renewalHistory: RenewalRecord[];
  // RBAC
  currentUserRole: string;
  currentUserName: string;
}

// ── Reducer types ─────────────────────────────────────────────────────────────
type RenewalPageAction =
  | { type: 'renewal/fetchPending' }
  | { type: 'renewal/fetchFulfilled'; payload: RenewalPageData }
  | { type: 'renewal/fetchRejected'; payload: string }
  | { type: 'renewal/submitPending' }
  | { type: 'renewal/submitFulfilled'; payload: RenewalPageData }
  | { type: 'renewal/submitRejected'; payload: string };

interface RenewalPageState {
  data: RenewalPageData | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

const initialState: RenewalPageState = {
  data: null,
  loading: false,
  error: null,
  submitting: false,
  submitError: null,
  submitSuccess: false,
};

function renewalReducer(state: RenewalPageState, action: RenewalPageAction): RenewalPageState {
  switch (action.type) {
    case 'renewal/fetchPending':
      return { ...state, loading: true, error: null };
    case 'renewal/fetchFulfilled':
      return { ...state, loading: false, data: action.payload };
    case 'renewal/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    case 'renewal/submitPending':
      return { ...state, submitting: true, submitError: null, submitSuccess: false };
    case 'renewal/submitFulfilled':
      return { ...state, submitting: false, data: action.payload, submitSuccess: true };
    case 'renewal/submitRejected':
      return { ...state, submitting: false, submitError: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_RENEWAL_DATA: RenewalPageData = {
  contractId: 'CON-2402',
  contractTitle: 'Raw Materials Supply Contract',
  vendor: 'Prime Industrial Supplies',
  contractType: 'Supply Contract',
  category: 'Manufacturing',
  startDate: '15 Feb 2024',
  endDate: '14 Feb 2025',
  renewalDate: '—',
  contractValue: '₹8,50,000',
  currency: 'INR',
  daysToExpiry: 18,
  contractStatus: 'Active',
  submittedBy: 'Sneha Raj',
  description:
    'Annual supply agreement for raw materials — steel rods, copper wire, and industrial-grade polymer sheets — required for Q1–Q4 manufacturing cycles.',
  documents: [
    {
      id: 1,
      fileName: 'RawMaterials_SupplyContract_v1.0.pdf',
      fileType: 'PDF',
      fileSize: '3.1 MB',
      version: 'v1.0',
      status: 'Approved',
    },
    {
      id: 2,
      fileName: 'Vendor_Compliance_Certificate.pdf',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      version: 'v1.0',
      status: 'Approved',
    },
    {
      id: 3,
      fileName: 'Material_Specification_Sheet.docx',
      fileType: 'DOCX',
      fileSize: '760 KB',
      version: 'v1.0',
      status: 'Approved',
    },
  ],
  renewalHistory: [
    {
      id: 1,
      renewalNo: 1,
      previousEndDate: '14 Feb 2023',
      newEndDate: '14 Feb 2024',
      renewedBy: 'Arun Kumar',
      renewedAt: '20 Jan 2023, 11:30 AM',
      reason: 'Ongoing supplier relationship confirmed. Extended for one more year.',
      status: 'Approved',
      previousValue: '₹7,80,000',
      newValue: '₹8,50,000',
    },
  ],
  currentUserRole: 'Procurement Head',
  currentUserName: 'Arun Kumar',
};

function fetchRenewalDataMock(_contractId: string): Promise<RenewalPageData> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_RENEWAL_DATA), 900));
}

function submitRenewalMock(
  data: RenewalPageData,
  payload: { newEndDate: string; newValue: string; reason: string }
): Promise<RenewalPageData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.07) {
        const newRecord: RenewalRecord = {
          id: data.renewalHistory.length + 1,
          renewalNo: data.renewalHistory.length + 1,
          previousEndDate: data.endDate,
          newEndDate: payload.newEndDate,
          renewedBy: data.currentUserName,
          renewedAt: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          reason: payload.reason,
          status: 'Submitted',
          previousValue: data.contractValue,
          newValue: payload.newValue || data.contractValue,
        };
        resolve({
          ...data,
          endDate: payload.newEndDate,
          contractValue: payload.newValue || data.contractValue,
          daysToExpiry: 365,
          renewalDate: payload.newEndDate,
          renewalHistory: [...data.renewalHistory, newRecord],
        });
      } else {
        reject(new Error('Server error — please try again.'));
      }
    }, 1500);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EXPIRY_CRITICAL_DAYS = 15;
const EXPIRY_WARNING_DAYS = 30;

const CONTRACT_STATUS_COLOR: Record<
  ContractStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Draft: 'default',
  'Under Review': 'warning',
  Approved: 'info',
  Active: 'success',
  Expired: 'error',
  Terminated: 'error',
};

const RENEWAL_STATUS_COLOR: Record<
  RenewalStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Pending: 'warning',
  Submitted: 'info',
  Approved: 'success',
  Rejected: 'error',
};

const DOC_STATUS_COLOR: Record<
  DocumentStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
  Expired: 'default',
};

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE COMPONENTS  (mirrors ContractApprovalPage design language)
// ─────────────────────────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  children,
  action,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={(theme) => ({
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
                flexShrink: 0,
              })}
            >
              {icon}
            </Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {title}
            </Typography>
          </Stack>
          {action}
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}

function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        display="block"
        mb={0.3}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600} color="text.primary">
        {value ?? '—'}
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPIRY COUNTDOWN BANNER — Spec §4-F: Renewal reminder banner + countdown
// ─────────────────────────────────────────────────────────────────────────────
function ExpiryBanner({ data }: { data: RenewalPageData }) {
  const { daysToExpiry, endDate, contractStatus } = data;
  const isExpired = daysToExpiry < 0 || contractStatus === 'Expired';
  const isCritical = !isExpired && daysToExpiry <= EXPIRY_CRITICAL_DAYS;
  const isWarning = !isExpired && !isCritical && daysToExpiry <= EXPIRY_WARNING_DAYS;

  if (!isExpired && !isCritical && !isWarning) return null;

  // Progress bar: how much of the 30-day window has elapsed
  const progressPct = isExpired
    ? 100
    : Math.max(
        0,
        Math.min(100, ((EXPIRY_WARNING_DAYS - daysToExpiry) / EXPIRY_WARNING_DAYS) * 100)
      );

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        border: `1px solid ${alpha(
          isExpired
            ? theme.palette.error.main
            : isCritical
              ? theme.palette.error.main
              : theme.palette.warning.main,
          0.4
        )}`,
        borderRadius: 2,
        mb: 2,
        bgcolor: alpha(
          isExpired
            ? theme.palette.error.main
            : isCritical
              ? theme.palette.error.main
              : theme.palette.warning.main,
          0.04
        ),
        overflow: 'hidden',
      })}
    >
      <CardContent sx={{ pb: '12px !important' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          spacing={1}
          mb={1.5}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={(theme) => ({
                width: 36,
                height: 36,
                borderRadius: 1,
                bgcolor: alpha(
                  isExpired || isCritical ? theme.palette.error.main : theme.palette.warning.main,
                  0.12
                ),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isExpired || isCritical ? 'error.main' : 'warning.main',
                flexShrink: 0,
              })}
            >
              {isExpired ? (
                <CancelOutlinedIcon sx={{ fontSize: 20 }} />
              ) : (
                <NotificationsActiveOutlinedIcon sx={{ fontSize: 20 }} />
              )}
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color={isExpired || isCritical ? 'error.main' : 'warning.main'}
              >
                {isExpired
                  ? 'Contract Expired'
                  : isCritical
                    ? `Expires in ${daysToExpiry} day${daysToExpiry === 1 ? '' : 's'} — Action Required`
                    : `Expiry Reminder — ${daysToExpiry} days remaining`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isExpired
                  ? `This contract expired on ${endDate}. Please initiate renewal immediately.`
                  : `Contract end date: ${endDate}. Renew to avoid disruption.`}
              </Typography>
            </Box>
          </Stack>

          {/* Countdown badge */}
          {!isExpired && (
            <Stack alignItems="center" flexShrink={0}>
              <Box
                sx={(theme) => ({
                  px: 2,
                  py: 0.8,
                  borderRadius: 1.5,
                  border: `1px solid ${alpha(
                    isCritical ? theme.palette.error.main : theme.palette.warning.main,
                    0.35
                  )}`,
                  bgcolor: alpha(
                    isCritical ? theme.palette.error.main : theme.palette.warning.main,
                    0.08
                  ),
                  textAlign: 'center',
                })}
              >
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color={isCritical ? 'error.main' : 'warning.main'}
                  lineHeight={1}
                >
                  {daysToExpiry}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  days left
                </Typography>
              </Box>
            </Stack>
          )}
        </Stack>

        {/* Progress bar — spec §4-F: Expiry countdown */}
        <Box>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.disabled">
              30-day renewal window
            </Typography>
            <Typography
              variant="caption"
              color={isExpired || isCritical ? 'error.main' : 'warning.main'}
              fontWeight={600}
            >
              {isExpired ? 'Expired' : `${Math.round(progressPct)}% elapsed`}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressPct}
            color={isExpired || isCritical ? 'error' : 'warning'}
            sx={{ borderRadius: 99, height: 6 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRACT SUMMARY — read-only snapshot
// ─────────────────────────────────────────────────────────────────────────────
function ContractSummarySection({ data }: { data: RenewalPageData }) {
  return (
    <SectionCard title="Contract Summary" icon={<InfoOutlinedIcon sx={{ fontSize: 16 }} />}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={2.5}
      >
        <InfoField label="Contract ID" value={data.contractId} />
        <InfoField label="Contract Title" value={data.contractTitle} />
        <InfoField label="Vendor" value={data.vendor} />
        <InfoField label="Contract Type" value={data.contractType} />
        <InfoField label="Category" value={data.category} />
        <InfoField
          label="Status"
          value={
            <Chip
              label={data.contractStatus}
              size="small"
              color={CONTRACT_STATUS_COLOR[data.contractStatus]}
              variant="outlined"
              sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
            />
          }
        />
        <InfoField label="Start Date" value={data.startDate} />
        <InfoField
          label="End Date"
          value={
            <Stack direction="row" spacing={0.5} alignItems="center">
              {data.daysToExpiry <= EXPIRY_WARNING_DAYS && data.daysToExpiry >= 0 && (
                <WarningAmberIcon sx={{ fontSize: 14, color: 'warning.main' }} />
              )}
              <Typography
                variant="body2"
                fontWeight={600}
                color={
                  data.daysToExpiry < 0
                    ? 'error.main'
                    : data.daysToExpiry <= EXPIRY_CRITICAL_DAYS
                      ? 'error.main'
                      : data.daysToExpiry <= EXPIRY_WARNING_DAYS
                        ? 'warning.main'
                        : 'text.primary'
                }
              >
                {data.endDate}
              </Typography>
            </Stack>
          }
        />
        <InfoField label="Contract Value" value={`${data.contractValue} (${data.currency})`} />
        <InfoField label="Last Renewal Date" value={data.renewalDate} />
        <InfoField label="No. of Renewals" value={`${data.renewalHistory.length}`} />
        <InfoField label="Created By" value={data.submittedBy} />
        <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
          <InfoField label="Description" value={data.description} />
        </Box>
      </Box>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENTS SECTION — read-only; can preview & download
// ─────────────────────────────────────────────────────────────────────────────
function DocumentsSection({ documents }: { documents: RenewalPageData['documents'] }) {
  return (
    <SectionCard
      title="Contract Documents"
      icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
      action={
        <Tooltip title="Upload replacement document">
          <Button
            size="small"
            variant="outlined"
            startIcon={<UploadFileOutlinedIcon sx={{ fontSize: 14 }} />}
            sx={{ fontSize: 11 }}
            onClick={() => console.info('[ContractRenewal] Upload replacement doc')}
          >
            Upload
          </Button>
        </Tooltip>
      }
    >
      <Stack spacing={1}>
        {documents.map((doc) => {
          const isPdf = doc.fileType === 'PDF';
          return (
            <Stack
              key={doc.id}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
              spacing={1}
              sx={(theme) => ({
                px: 1.5,
                py: 1.2,
                borderRadius: 1.5,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.07)}`,
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.03) },
                transition: 'background-color 0.15s',
              })}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" minWidth={0}>
                <Box
                  sx={(theme) => ({
                    width: 34,
                    height: 34,
                    borderRadius: 1,
                    bgcolor: isPdf
                      ? alpha(theme.palette.error.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isPdf ? 'error.main' : 'primary.main',
                    flexShrink: 0,
                  })}
                >
                  <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                </Box>
                <Box minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 260 }}>
                    {doc.fileName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {doc.fileSize} · {doc.version}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
                <Chip
                  label={doc.status}
                  size="small"
                  color={DOC_STATUS_COLOR[doc.status]}
                  variant="outlined"
                  sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                />
                <Tooltip title="Preview">
                  <IconButton
                    size="small"
                    onClick={() => console.info('[ContractRenewal] Preview:', doc.fileName)}
                  >
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton
                    size="small"
                    onClick={() => console.info('[ContractRenewal] Download:', doc.fileName)}
                  >
                    <DownloadOutlinedIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RENEWAL HISTORY — spec §4-C: Amendment/Renewal History
// ─────────────────────────────────────────────────────────────────────────────
function RenewalHistorySection({ history }: { history: RenewalRecord[] }) {
  return (
    <SectionCard title="Renewal History" icon={<HistoryOutlinedIcon sx={{ fontSize: 16 }} />}>
      {history.length === 0 ? (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          py={2}
        >
          No renewals recorded for this contract.
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {history.map((record) => (
            <Box
              key={record.id}
              sx={(theme) => ({
                p: 1.5,
                borderRadius: 1.5,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                bgcolor: alpha(theme.palette.success.main, 0.02),
              })}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={0.5}
                mb={1}
              >
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="caption" fontWeight={700} color="text.primary">
                    Renewal #{record.renewalNo}
                  </Typography>
                  <Chip
                    label={record.status}
                    size="small"
                    color={RENEWAL_STATUS_COLOR[record.status]}
                    variant="outlined"
                    sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                  />
                </Stack>
                <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                  {record.renewedAt}
                </Typography>
              </Stack>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}
                gap={1.5}
                mb={1}
              >
                <InfoField
                  label="Previous End Date → New End Date"
                  value={`${record.previousEndDate} → ${record.newEndDate}`}
                />
                <InfoField
                  label="Previous Value → New Value"
                  value={`${record.previousValue} → ${record.newValue}`}
                />
                <InfoField label="Renewed By" value={record.renewedBy} />
              </Box>

              <Box
                sx={(theme) => ({
                  px: 1,
                  py: 0.6,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.text.primary, 0.03),
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
                })}
              >
                <Typography variant="caption" color="text.secondary" fontStyle="italic">
                  {record.reason}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RENEWAL FORM — spec §4-F: Renew action button + form
// ─────────────────────────────────────────────────────────────────────────────
interface RenewalFormProps {
  data: RenewalPageData;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onSubmit: (payload: { newEndDate: string; newValue: string; reason: string }) => void;
}

function RenewalFormPanel({
  data,
  submitting,
  submitError,
  submitSuccess,
  onSubmit,
}: RenewalFormProps) {
  const [newEndDate, setNewEndDate] = useState<Dayjs | null>(null);
  const [newValue, setNewValue] = useState('');
  const [reason, setReason] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Validation
  const [errors, setErrors] = useState<{ newEndDate?: string; reason?: string }>({});

  const canRenew = data.currentUserRole === 'Procurement Head' || data.currentUserRole === 'Admin';

  const validate = (): boolean => {
    const newErrors: { newEndDate?: string; reason?: string } = {};
    if (!newEndDate) newErrors.newEndDate = 'New end date is required.';
    if (!reason.trim()) newErrors.reason = 'Renewal reason is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRenewClick = () => {
    if (validate()) setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    onSubmit({
      newEndDate: newEndDate?.format('DD MMM YYYY') ?? '',
      newValue: newValue.trim() || data.contractValue,
      reason: reason.trim(),
    });
  };

  // After successful renewal, show success state
  if (submitSuccess) {
    return (
      <Card
        elevation={0}
        sx={(t) => ({
          border: `1px solid ${alpha(t.palette.success.main, 0.35)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.success.main, 0.03),
        })}
      >
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CheckCircleOutlineIcon color="success" />
            <Box>
              <Typography variant="body2" fontWeight={700} color="success.main">
                Renewal submitted successfully
              </Typography>
              <Typography variant="caption" color="text.secondary">
                The renewal has been submitted for approval. You can track status in Renewal History
                below.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Non-authorized user
  if (!canRenew) {
    return (
      <Card
        elevation={0}
        sx={{
          border: (t) => `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <InfoOutlinedIcon color="info" />
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Renewal requires Procurement Head or Admin role
              </Typography>
              <Typography variant="caption" color="text.secondary">
                You do not have permission to initiate a renewal at this stage.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        elevation={0}
        sx={(t) => ({
          border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.primary.main, 0.02),
        })}
      >
        <CardContent>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Box
              sx={(t) => ({
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: alpha(t.palette.primary.main, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
              })}
            >
              <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                Initiate Renewal
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Extend the contract term and update key details
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

          {submitError && (
            <Alert
              severity="error"
              icon={<ErrorOutlineIcon fontSize="small" />}
              sx={{ mb: 2, fontSize: 12 }}
            >
              {submitError}
            </Alert>
          )}

          {/* Form fields */}
          <Stack spacing={2}>
            {/* New End Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="New End Date *"
                value={newEndDate}
                onChange={(val) => {
                  setNewEndDate(val);
                  if (val) setErrors((e) => ({ ...e, newEndDate: undefined }));
                }}
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    error: !!errors.newEndDate,
                    helperText: errors.newEndDate,
                  },
                }}
              />
            </LocalizationProvider>

            {/* New Contract Value — optional */}
            <TextField
              fullWidth
              size="small"
              label="Updated Contract Value (optional)"
              placeholder={`Current: ${data.contractValue}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <AttachMoneyOutlinedIcon
                    sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }}
                  />
                ),
              }}
            />

            {/* Reason */}
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Renewal Reason *"
              placeholder="Describe the reason for this renewal…"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setErrors((er) => ({ ...er, reason: undefined }));
              }}
              error={!!errors.reason}
              helperText={errors.reason}
            />
          </Stack>

          <Box mt={2.5}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              startIcon={
                submitting ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <AutorenewOutlinedIcon />
                )
              }
              disabled={submitting}
              onClick={handleRenewClick}
              sx={{ fontWeight: 700, py: 1 }}
            >
              {submitting ? 'Submitting…' : 'Submit Renewal'}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={1.5}
          >
            Renewal will be submitted for approval as per the configured workflow.
          </Typography>
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={(t) => ({
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: alpha(t.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.main',
              })}
            >
              <AutorenewOutlinedIcon fontSize="small" />
            </Box>
            <Typography fontWeight={700}>Confirm Renewal</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2, fontSize: 12 }}>
            You are about to renew <strong>{data.contractTitle}</strong>. This will extend the
            contract end date to <strong>{newEndDate?.format('DD MMM YYYY')}</strong> and submit for
            approval.
          </Alert>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Previous End Date
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {data.endDate}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                New End Date
              </Typography>
              <Typography variant="caption" fontWeight={700} color="primary.main">
                {newEndDate?.format('DD MMM YYYY')}
              </Typography>
            </Stack>
            {newValue && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" color="text.secondary">
                  Updated Value
                </Typography>
                <Typography variant="caption" fontWeight={700} color="primary.main">
                  {newValue}
                </Typography>
              </Stack>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" size="small" color="primary" onClick={handleConfirm}>
            Confirm &amp; Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function RenewalLoadingSkeleton() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Skeleton variant="text" width={260} height={32} />
        <Skeleton variant="rounded" width={100} height={32} />
      </Stack>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
      <Skeleton variant="rounded" height={90} sx={{ mb: 2 }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} flexWrap="wrap" useFlexGap>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={56} sx={{ flex: 1, minWidth: 130 }} />
        ))}
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box flex={1.4}>
          <Skeleton variant="rounded" height={260} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={160} />
        </Box>
        <Box flex={1}>
          <Skeleton variant="rounded" height={280} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={200} />
        </Box>
      </Stack>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — ContractRenewalPage
// ─────────────────────────────────────────────────────────────────────────────
interface ContractRenewalPageProps {
  contractId?: string;
}

function ContractRenewalPage({ contractId = 'CON-2402' }: ContractRenewalPageProps) {
  const theme = useTheme();
  const [state, dispatch] = useReducer(renewalReducer, initialState);
  const { data, loading, error, submitting, submitError, submitSuccess } = state;

  const router = useRouter();

  const loadData = useCallback(() => {
    dispatch({ type: 'renewal/fetchPending' });
    fetchRenewalDataMock(contractId)
      .then((payload) => dispatch({ type: 'renewal/fetchFulfilled', payload }))
      .catch((err: Error) => dispatch({ type: 'renewal/fetchRejected', payload: err.message }));
  }, [contractId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRenewalSubmit = useCallback(
    async (payload: { newEndDate: string; newValue: string; reason: string }) => {
      if (!data) return;
      dispatch({ type: 'renewal/submitPending' });
      try {
        const updated = await submitRenewalMock(data, payload);
        dispatch({ type: 'renewal/submitFulfilled', payload: updated });
      } catch (err) {
        dispatch({
          type: 'renewal/submitRejected',
          payload: err instanceof Error ? err.message : 'Renewal submission failed.',
        });
      }
    },
    [data]
  );

  if (loading) return <RenewalLoadingSkeleton />;

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="error" mb={2}>
          Failed to load renewal data: {error}
        </Typography>
        <Button variant="outlined" onClick={loadData}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box textAlign="center" py={8}>
        <AssignmentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">Contract not found.</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => console.info('[ContractRenewal] Back to list')}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  const pendingRenewals = data.renewalHistory.filter(
    (r) => r.status === 'Submitted' || r.status === 'Pending'
  ).length;

  return (
    <Box>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <Box mb={2}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
              <IconButton
                size="small"
                onClick={() => router.push(paths.contract.root)}
                sx={{ mr: 0.5 }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                Home &rsaquo; Contract Dashboard &rsaquo; <strong>{data.contractId}</strong>{' '}
                &rsaquo; Renewal
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" pl={0.5}>
              <Typography variant="h6" fontWeight={700}>
                Contract Renewal
              </Typography>
              <Chip
                label={data.contractStatus}
                size="small"
                color={CONTRACT_STATUS_COLOR[data.contractStatus]}
                variant="outlined"
                sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
              />
            </Stack>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              borderColor: alpha(theme.palette.text.primary, 0.2),
              fontSize: 12,
              flexShrink: 0,
            }}
            onClick={() => console.info('[ContractRenewal] Download:', data.contractId)}
          >
            Download Contract
          </Button>
        </Stack>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Expiry Reminder Banner — spec §4-F ─────────────────────────── */}
      <ExpiryBanner data={data} />

      {/* ── Quick-stat strip ────────────────────────────────────────────── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        mb={2.5}
        flexWrap="wrap"
        useFlexGap
      >
        {[
          { label: 'Contract ID', value: data.contractId },
          { label: 'Vendor', value: data.vendor },
          { label: 'Contract Value', value: data.contractValue },
          {
            label: 'Days to Expiry',
            value: data.daysToExpiry < 0 ? 'Expired' : `${data.daysToExpiry}d`,
          },
          { label: 'Total Renewals', value: `${data.renewalHistory.length}` },
          {
            label: 'Pending Renewals',
            value: pendingRenewals > 0 ? `${pendingRenewals} in progress` : 'None',
          },
        ].map(({ label, value }) => (
          <Box
            key={label}
            sx={(t) => ({
              px: 1.5,
              py: 1,
              borderRadius: 1.5,
              border: `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              bgcolor: alpha(t.palette.primary.main, 0.02),
              flex: 1,
              minWidth: 120,
            })}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              {label}
            </Typography>
            <Typography variant="body2" fontWeight={700} noWrap>
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* ── Main two-column layout ───────────────────────────────────────── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
        {/* Left column: contract details + documents */}
        <Box flex={1.4} minWidth={0}>
          <ContractSummarySection data={data} />
          <DocumentsSection documents={data.documents} />
        </Box>

        {/* Right column: renewal form + history */}
        <Box flex={1} minWidth={0}>
          {/* Renewal form — spec §4-F: Renew action button */}
          <RenewalFormPanel
            data={data}
            submitting={submitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            onSubmit={handleRenewalSubmit}
          />

          {/* Renewal history — spec §4-C: Renewal History */}
          <RenewalHistorySection history={data.renewalHistory} />
        </Box>
      </Stack>
    </Box>
  );
}

export default ContractRenewalPage;
