'use client';

import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// ── Icons ──────────────────────────────────────────────────────────────────────
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ContractStatus = 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Expired' | 'Terminated';
type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';
type TerminationStatus = 'Initiated' | 'Under Review' | 'Approved' | 'Rejected' | 'Completed';

interface ContractDocument {
  id: number;
  fileName: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  version: string;
  status: DocumentStatus;
}

interface AuditEntry {
  id: number;
  action: string;
  performedBy: string;
  role: string;
  timestamp: string;
  details: string | null;
}

interface TerminationRecord {
  id: number;
  terminationNo: number;
  terminatedBy: string;
  terminatedAt: string;
  effectiveDate: string;
  reason: string;
  reasonCategory: string;
  status: TerminationStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  notes: string | null;
}

interface TerminationPageData {
  contractId: string;
  contractTitle: string;
  vendor: string;
  contractType: string;
  category: string;
  startDate: string;
  endDate: string;
  contractValue: string;
  currency: string;
  daysToExpiry: number;
  contractStatus: ContractStatus;
  submittedBy: string;
  submittedAt: string;
  description: string;
  documents: ContractDocument[];
  auditTrail: AuditEntry[];
  terminationHistory: TerminationRecord[];
  // RBAC
  currentUserRole: string;
  currentUserName: string;
}

// ── Reducer ───────────────────────────────────────────────────────────────────
type TerminationPageAction =
  | { type: 'termination/fetchPending' }
  | { type: 'termination/fetchFulfilled'; payload: TerminationPageData }
  | { type: 'termination/fetchRejected'; payload: string }
  | { type: 'termination/submitPending' }
  | { type: 'termination/submitFulfilled'; payload: TerminationPageData }
  | { type: 'termination/submitRejected'; payload: string };

interface TerminationPageState {
  data: TerminationPageData | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

const initialState: TerminationPageState = {
  data: null,
  loading: false,
  error: null,
  submitting: false,
  submitError: null,
  submitSuccess: false,
};

function terminationReducer(
  state: TerminationPageState,
  action: TerminationPageAction
): TerminationPageState {
  switch (action.type) {
    case 'termination/fetchPending':
      return { ...state, loading: true, error: null };
    case 'termination/fetchFulfilled':
      return { ...state, loading: false, data: action.payload };
    case 'termination/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    case 'termination/submitPending':
      return { ...state, submitting: true, submitError: null, submitSuccess: false };
    case 'termination/submitFulfilled':
      return { ...state, submitting: false, data: action.payload, submitSuccess: true };
    case 'termination/submitRejected':
      return { ...state, submitting: false, submitError: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const TERMINATION_REASON_CATEGORIES = [
  'Vendor Non-Performance',
  'Mutual Agreement',
  'Breach of Contract',
  'Force Majeure',
  'Budget Constraints',
  'Regulatory / Compliance',
  'Project Cancellation',
  'Vendor Insolvency',
  'Other',
];

const MOCK_TERMINATION_DATA: TerminationPageData = {
  contractId: 'CON-2402',
  contractTitle: 'Raw Materials Supply Contract',
  vendor: 'Prime Industrial Supplies',
  contractType: 'Supply Contract',
  category: 'Manufacturing',
  startDate: '15 Feb 2024',
  endDate: '14 Feb 2025',
  contractValue: '₹8,50,000',
  currency: 'INR',
  daysToExpiry: 65,
  contractStatus: 'Active',
  submittedBy: 'Sneha Raj',
  submittedAt: '16 Feb 2024, 09:45 AM',
  description:
    'Annual supply agreement for raw materials — steel rods, copper wire, and industrial-grade polymer sheets — required for Q1–Q4 manufacturing cycles. Includes penalty clauses for late delivery and quality deviations.',
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
  auditTrail: [
    {
      id: 1,
      action: 'Contract Created',
      performedBy: 'Sneha Raj',
      role: 'Procurement Officer',
      timestamp: '16 Feb 2024, 09:45 AM',
      details: 'Initial contract draft created.',
    },
    {
      id: 2,
      action: 'Submitted for Approval',
      performedBy: 'Sneha Raj',
      role: 'Procurement Officer',
      timestamp: '16 Feb 2024, 10:00 AM',
      details: null,
    },
    {
      id: 3,
      action: 'Approved — Step 1',
      performedBy: 'Arun Kumar',
      role: 'Procurement Head',
      timestamp: '17 Feb 2024, 02:15 PM',
      details: 'All vendor documents verified.',
    },
    {
      id: 4,
      action: 'Contract Activated',
      performedBy: 'System',
      role: 'Automated',
      timestamp: '18 Feb 2024, 12:00 AM',
      details: 'Contract moved to Active status after full approval.',
    },
  ],
  terminationHistory: [],
  currentUserRole: 'Procurement Head',
  currentUserName: 'Arun Kumar',
};

function fetchTerminationDataMock(_contractId: string): Promise<TerminationPageData> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_TERMINATION_DATA), 900));
}

function submitTerminationMock(
  data: TerminationPageData,
  payload: { reasonCategory: string; reason: string; effectiveDate: string; notes: string }
): Promise<TerminationPageData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.07) {
        const newRecord: TerminationRecord = {
          id: 1,
          terminationNo: 1,
          terminatedBy: data.currentUserName,
          terminatedAt: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          effectiveDate: payload.effectiveDate,
          reason: payload.reason,
          reasonCategory: payload.reasonCategory,
          status: 'Under Review',
          approvedBy: null,
          approvedAt: null,
          notes: payload.notes || null,
        };
        const newAuditEntry: AuditEntry = {
          id: data.auditTrail.length + 1,
          action: 'Termination Initiated',
          performedBy: data.currentUserName,
          role: data.currentUserRole,
          timestamp: newRecord.terminatedAt,
          details: `Reason: ${payload.reasonCategory} — ${payload.reason.slice(0, 60)}${payload.reason.length > 60 ? '…' : ''}`,
        };
        resolve({
          ...data,
          contractStatus: 'Terminated',
          terminationHistory: [newRecord],
          auditTrail: [...data.auditTrail, newAuditEntry],
        });
      } else {
        reject(new Error('Server error — please try again.'));
      }
    }, 1600);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

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

const DOC_STATUS_COLOR: Record<
  DocumentStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
  Expired: 'default',
};

const TERMINATION_STATUS_COLOR: Record<
  TerminationStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Initiated: 'warning',
  'Under Review': 'warning',
  Approved: 'info',
  Rejected: 'error',
  Completed: 'error',
};

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE COMPONENTS — exact same design language as ApprovalPage & RenewalPage
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
// TERMINATION WARNING BANNER — destructive-action awareness
// ─────────────────────────────────────────────────────────────────────────────
function TerminationWarningBanner({ contractStatus }: { contractStatus: ContractStatus }) {
  if (contractStatus === 'Terminated') {
    return (
      <Card
        elevation={0}
        sx={(t) => ({
          border: `1px solid ${alpha(t.palette.error.main, 0.4)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.error.main, 0.04),
        })}
      >
        <CardContent sx={{ py: '14px !important' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={(t) => ({
                width: 36,
                height: 36,
                borderRadius: 1,
                flexShrink: 0,
                bgcolor: alpha(t.palette.error.main, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'error.main',
              })}
            >
              <CancelOutlinedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} color="error.main">
                Contract Already Terminated
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This contract has been terminated. No further actions are permitted.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={(t) => ({
        border: `1px solid ${alpha(t.palette.error.main, 0.3)}`,
        borderRadius: 2,
        mb: 2,
        bgcolor: alpha(t.palette.error.main, 0.03),
      })}
    >
      <CardContent sx={{ py: '14px !important' }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={(t) => ({
              width: 36,
              height: 36,
              borderRadius: 1,
              flexShrink: 0,
              mt: 0.2,
              bgcolor: alpha(t.palette.error.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'error.main',
            })}
          >
            <ReportProblemOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="error.main" mb={0.5}>
              Termination is an irreversible action
            </Typography>
            <Stack spacing={0.4}>
              {[
                'The contract will be permanently moved to Terminated status.',
                'All associated purchase orders and deliveries will be flagged.',
                'Vendor access to contract documents will be revoked.',
                'This action will be logged in the audit trail.',
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <FiberManualRecordIcon
                    sx={{ fontSize: 6, mt: 0.8, color: 'error.main', flexShrink: 0 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRACT SUMMARY — read-only snapshot
// ─────────────────────────────────────────────────────────────────────────────
function ContractSummarySection({ data }: { data: TerminationPageData }) {
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
        <InfoField label="End Date" value={data.endDate} />
        <InfoField label="Contract Value" value={`${data.contractValue} (${data.currency})`} />
        <InfoField label="Created By" value={data.submittedBy} />
        <InfoField label="Created At" value={data.submittedAt} />
        <InfoField
          label="Days Remaining"
          value={
            data.daysToExpiry < 0 ? (
              <Typography variant="body2" fontWeight={700} color="error.main">
                Expired
              </Typography>
            ) : (
              <Typography variant="body2" fontWeight={600}>
                {data.daysToExpiry}d
              </Typography>
            )
          }
        />
        <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
          <InfoField label="Description" value={data.description} />
        </Box>
      </Box>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENTS SECTION — read-only on termination page
// ─────────────────────────────────────────────────────────────────────────────
function DocumentsSection({ documents }: { documents: TerminationPageData['documents'] }) {
  return (
    <SectionCard
      title="Contract Documents"
      icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
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
                    flexShrink: 0,
                    bgcolor: isPdf
                      ? alpha(theme.palette.error.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isPdf ? 'error.main' : 'primary.main',
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
                    onClick={() => console.info('[ContractTermination] Preview:', doc.fileName)}
                  >
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download">
                  <IconButton
                    size="small"
                    onClick={() => console.info('[ContractTermination] Download:', doc.fileName)}
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
// AUDIT TRAIL — spec §4-C: Audit trail
// ─────────────────────────────────────────────────────────────────────────────
function AuditTrailSection({ auditTrail }: { auditTrail: AuditEntry[] }) {
  return (
    <SectionCard title="Audit Trail" icon={<HistoryOutlinedIcon sx={{ fontSize: 16 }} />}>
      <Stack spacing={0}>
        {auditTrail.map((entry, idx) => {
          const isLast = idx === auditTrail.length - 1;
          const isTermination = entry.action.toLowerCase().includes('terminat');
          return (
            <Box key={entry.id} sx={{ position: 'relative', pl: 4.5, pb: isLast ? 0 : 2.5 }}>
              {/* Connector line */}
              {!isLast && (
                <Box
                  sx={(t) => ({
                    position: 'absolute',
                    left: 11,
                    top: 24,
                    bottom: 0,
                    width: 1.5,
                    bgcolor: alpha(t.palette.text.primary, 0.08),
                    borderRadius: 1,
                  })}
                />
              )}
              {/* Dot */}
              <Box
                sx={(t) => ({
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1.5px solid ${isTermination ? t.palette.error.main : alpha(t.palette.text.primary, 0.15)}`,
                  bgcolor: isTermination
                    ? alpha(t.palette.error.main, 0.08)
                    : alpha(t.palette.text.primary, 0.04),
                  color: isTermination ? 'error.main' : 'text.disabled',
                })}
              >
                <FiberManualRecordIcon sx={{ fontSize: 8 }} />
              </Box>
              {/* Content */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={0.5}
                mb={0.3}
              >
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color={isTermination ? 'error.main' : 'text.primary'}
                  >
                    {entry.action}
                  </Typography>
                  <Chip
                    label={entry.role}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: 9,
                      height: 16,
                      fontWeight: 600,
                      color: 'text.secondary',
                      borderColor: 'divider',
                    }}
                  />
                </Stack>
                <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                  {entry.timestamp}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" mb={entry.details ? 0.4 : 0}>
                <Avatar
                  sx={(t) => ({
                    width: 16,
                    height: 16,
                    fontSize: 8,
                    fontWeight: 700,
                    bgcolor: alpha(t.palette.primary.main, 0.12),
                    color: 'primary.main',
                  })}
                >
                  {entry.performedBy.charAt(0)}
                </Avatar>
                <Typography variant="caption" color="text.secondary">
                  {entry.performedBy}
                </Typography>
              </Stack>
              {entry.details && (
                <Box
                  sx={(t) => ({
                    mt: 0.4,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: alpha(t.palette.text.primary, 0.03),
                    border: `1px solid ${alpha(t.palette.text.primary, 0.06)}`,
                  })}
                >
                  <Typography variant="caption" color="text.secondary" fontStyle="italic">
                    {entry.details}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINATION HISTORY — past termination records
// ─────────────────────────────────────────────────────────────────────────────
function TerminationHistorySection({ history }: { history: TerminationRecord[] }) {
  if (history.length === 0) return null;
  return (
    <SectionCard title="Termination Record" icon={<BlockOutlinedIcon sx={{ fontSize: 16 }} />}>
      <Stack spacing={1.5}>
        {history.map((record) => (
          <Box
            key={record.id}
            sx={(t) => ({
              p: 1.5,
              borderRadius: 1.5,
              border: `1px solid ${alpha(t.palette.error.main, 0.2)}`,
              bgcolor: alpha(t.palette.error.main, 0.02),
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
                  Termination #{record.terminationNo}
                </Typography>
                <Chip
                  label={record.status}
                  size="small"
                  color={TERMINATION_STATUS_COLOR[record.status]}
                  variant="outlined"
                  sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                />
                <Chip
                  label={record.reasonCategory}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: 9,
                    height: 18,
                    fontWeight: 600,
                    color: 'text.secondary',
                    borderColor: 'divider',
                  }}
                />
              </Stack>
              <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                {record.terminatedAt}
              </Typography>
            </Stack>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}
              gap={1.5}
              mb={1}
            >
              <InfoField label="Effective Date" value={record.effectiveDate} />
              <InfoField label="Terminated By" value={record.terminatedBy} />
              {record.approvedBy && <InfoField label="Approved By" value={record.approvedBy} />}
              {record.approvedAt && <InfoField label="Approved At" value={record.approvedAt} />}
            </Box>
            <Box
              sx={(t) => ({
                px: 1,
                py: 0.6,
                borderRadius: 1,
                bgcolor: alpha(t.palette.text.primary, 0.03),
                border: `1px solid ${alpha(t.palette.text.primary, 0.06)}`,
              })}
            >
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                {record.reason}
              </Typography>
            </Box>
            {record.notes && (
              <Box
                sx={(t) => ({
                  mt: 0.6,
                  px: 1,
                  py: 0.6,
                  borderRadius: 1,
                  bgcolor: alpha(t.palette.text.primary, 0.02),
                  border: `1px solid ${alpha(t.palette.text.primary, 0.05)}`,
                })}
              >
                <Typography variant="caption" color="text.secondary">
                  <strong>Notes:</strong> {record.notes}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINATION FORM — spec §4-G: Termination reason mandatory + confirmation popup
// ─────────────────────────────────────────────────────────────────────────────
interface TerminationFormProps {
  data: TerminationPageData;
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onSubmit: (payload: {
    reasonCategory: string;
    reason: string;
    effectiveDate: string;
    notes: string;
  }) => void;
}

function TerminationFormPanel({
  data,
  submitting,
  submitError,
  submitSuccess,
  onSubmit,
}: TerminationFormProps) {
  const [reasonCategory, setReasonCategory] = useState('');
  const [reason, setReason] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [notes, setNotes] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<{
    reasonCategory?: string;
    reason?: string;
    effectiveDate?: string;
    acknowledged?: string;
  }>({});

  const canTerminate = ['Procurement Head', 'Admin', 'Finance Head'].includes(data.currentUserRole);
  const isAlreadyTerminated = data.contractStatus === 'Terminated';

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!reasonCategory) e.reasonCategory = 'Please select a reason category.';
    if (!reason.trim()) e.reason = 'Termination reason is mandatory.';
    if (!effectiveDate) e.effectiveDate = 'Effective date is required.';
    if (!acknowledged) e.acknowledged = 'You must acknowledge the consequences.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleTerminateClick = () => {
    if (validate()) setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    onSubmit({ reasonCategory, reason, effectiveDate, notes });
  };

  // Already terminated
  if (isAlreadyTerminated && !submitSuccess) {
    return null;
  }

  // Success state
  if (submitSuccess) {
    return (
      <Card
        elevation={0}
        sx={(t) => ({
          border: `1px solid ${alpha(t.palette.error.main, 0.35)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.error.main, 0.03),
        })}
      >
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CheckCircleOutlineIcon color="error" />
            <Box>
              <Typography variant="body2" fontWeight={700} color="error.main">
                Termination submitted successfully
              </Typography>
              <Typography variant="caption" color="text.secondary">
                The contract termination is now Under Review. Check the Termination Record below for
                status.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // No permission
  if (!canTerminate) {
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
                Insufficient permissions to terminate
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Only Procurement Head, Finance Head, or Admin can initiate contract termination.
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
          border: `1px solid ${alpha(t.palette.error.main, 0.3)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.error.main, 0.02),
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
                bgcolor: alpha(t.palette.error.main, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'error.main',
              })}
            >
              <GavelOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                Initiate Termination
              </Typography>
              <Typography variant="caption" color="text.secondary">
                All fields marked * are mandatory
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

          <Stack spacing={2}>
            {/* Reason Category */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
                display="block"
                mb={0.5}
              >
                Reason Category *
              </Typography>
              <Select
                fullWidth
                size="small"
                value={reasonCategory}
                onChange={(e: SelectChangeEvent) => {
                  setReasonCategory(e.target.value);
                  setErrors((er) => ({ ...er, reasonCategory: undefined }));
                }}
                displayEmpty
                error={!!errors.reasonCategory}
                renderValue={(v) =>
                  v || (
                    <Typography variant="body2" color="text.disabled">
                      Select a category…
                    </Typography>
                  )
                }
              >
                {TERMINATION_REASON_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <Typography variant="body2">{cat}</Typography>
                  </MenuItem>
                ))}
              </Select>
              {errors.reasonCategory && (
                <FormHelperText error sx={{ ml: 1.5 }}>
                  {errors.reasonCategory}
                </FormHelperText>
              )}
            </Box>

            {/* Reason detail */}
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Termination Reason *"
              placeholder="Provide a detailed explanation for terminating this contract…"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setErrors((er) => ({ ...er, reason: undefined }));
              }}
              error={!!errors.reason}
              helperText={errors.reason}
            />

            {/* Effective Date */}
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Effective Termination Date *"
              InputLabelProps={{ shrink: true }}
              value={effectiveDate}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
              onChange={(e) => {
                setEffectiveDate(e.target.value);
                if (e.target.value) setErrors((er) => ({ ...er, effectiveDate: undefined }));
              }}
              error={!!errors.effectiveDate}
              helperText={errors.effectiveDate}
            />

            {/* Additional Notes */}
            <TextField
              fullWidth
              multiline
              rows={2}
              size="small"
              label="Additional Notes (optional)"
              placeholder="Any supplementary information, outstanding obligations, or transition notes…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Acknowledgement checkbox — spec §4-G: Confirmation */}
            <Box
              sx={(t) => ({
                p: 1.5,
                borderRadius: 1.5,
                border: `1px solid ${errors.acknowledged ? t.palette.error.main : alpha(t.palette.error.main, 0.2)}`,
                bgcolor: alpha(t.palette.error.main, 0.03),
              })}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={acknowledged}
                    onChange={(e) => {
                      setAcknowledged(e.target.checked);
                      if (e.target.checked) setErrors((er) => ({ ...er, acknowledged: undefined }));
                    }}
                    icon={
                      <CheckBoxOutlineBlankIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    }
                    checkedIcon={<CheckBoxIcon sx={{ fontSize: 18, color: 'error.main' }} />}
                  />
                }
                label={
                  <Typography
                    variant="caption"
                    color={acknowledged ? 'text.primary' : 'text.secondary'}
                    fontWeight={500}
                  >
                    I acknowledge that contract termination is permanent and irreversible. This
                    action will be recorded in the audit trail and cannot be undone.
                  </Typography>
                }
              />
              {errors.acknowledged && (
                <FormHelperText error sx={{ ml: 4 }}>
                  {errors.acknowledged}
                </FormHelperText>
              )}
            </Box>
          </Stack>

          <Box mt={2.5}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="small"
              startIcon={
                submitting ? <CircularProgress size={14} color="inherit" /> : <GavelOutlinedIcon />
              }
              disabled={submitting}
              onClick={handleTerminateClick}
              sx={{ fontWeight: 700, py: 1 }}
            >
              {submitting ? 'Processing…' : 'Terminate Contract'}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={1.5}
          >
            Termination will proceed as per your organisation`s configured workflow.
          </Typography>
        </CardContent>
      </Card>

      {/* ── Confirmation dialog — spec §4-G: Confirmation popup ─────────── */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={(t) => ({
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: alpha(t.palette.error.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'error.main',
              })}
            >
              <GavelOutlinedIcon fontSize="small" />
            </Box>
            <Typography fontWeight={700}>Confirm Contract Termination</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2.5, fontSize: 12 }}>
            You are about to permanently terminate <strong>{data.contractTitle}</strong> with{' '}
            <strong>{data.vendor}</strong>. This action cannot be undone.
          </Alert>

          {/* Summary of what's being submitted */}
          <Stack
            spacing={1}
            sx={(t) => ({
              p: 1.5,
              borderRadius: 1.5,
              border: `1px solid ${alpha(t.palette.text.primary, 0.08)}`,
              bgcolor: alpha(t.palette.text.primary, 0.02),
              mb: 2,
            })}
          >
            {[
              { label: 'Contract ID', value: data.contractId },
              { label: 'Vendor', value: data.vendor },
              { label: 'Reason Category', value: reasonCategory },
              { label: 'Effective Date', value: effectiveDate },
              { label: 'Initiated By', value: `${data.currentUserName} (${data.currentUserRole})` },
            ].map(({ label, value }) => (
              <Stack key={label} direction="row" justifyContent="space-between" spacing={2}>
                <Typography variant="caption" color="text.secondary">
                  {label}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  textAlign="right"
                  sx={{ maxWidth: '60%' }}
                >
                  {value}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary" display="block">
            <strong>Reason:</strong> {reason}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<GavelOutlinedIcon />}
            onClick={handleConfirm}
          >
            Confirm Termination
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function TerminationLoadingSkeleton() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Skeleton variant="text" width={260} height={32} />
        <Skeleton variant="rounded" width={100} height={32} />
      </Stack>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
      <Skeleton variant="rounded" height={100} sx={{ mb: 2 }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} flexWrap="wrap" useFlexGap>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={56} sx={{ flex: 1, minWidth: 130 }} />
        ))}
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box flex={1.4}>
          <Skeleton variant="rounded" height={300} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={160} />
        </Box>
        <Box flex={1}>
          <Skeleton variant="rounded" height={380} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={200} />
        </Box>
      </Stack>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — ContractTerminationPage
// ─────────────────────────────────────────────────────────────────────────────
interface ContractTerminationPageProps {
  contractId?: string;
}

function ContractTerminationPage({ contractId = 'CON-2402' }: ContractTerminationPageProps) {
  const theme = useTheme();
  const [state, dispatch] = useReducer(terminationReducer, initialState);
  const { data, loading, error, submitting, submitError, submitSuccess } = state;

  const loadData = useCallback(() => {
    dispatch({ type: 'termination/fetchPending' });
    fetchTerminationDataMock(contractId)
      .then((payload) => dispatch({ type: 'termination/fetchFulfilled', payload }))
      .catch((err: Error) => dispatch({ type: 'termination/fetchRejected', payload: err.message }));
  }, [contractId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleTerminationSubmit = useCallback(
    async (payload: {
      reasonCategory: string;
      reason: string;
      effectiveDate: string;
      notes: string;
    }) => {
      if (!data) return;
      dispatch({ type: 'termination/submitPending' });
      try {
        const updated = await submitTerminationMock(data, payload);
        dispatch({ type: 'termination/submitFulfilled', payload: updated });
      } catch (err) {
        dispatch({
          type: 'termination/submitRejected',
          payload: err instanceof Error ? err.message : 'Termination submission failed.',
        });
      }
    },
    [data]
  );

  if (loading) return <TerminationLoadingSkeleton />;

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="error" mb={2}>
          Failed to load termination data: {error}
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
          onClick={() => console.info('[ContractTermination] Back to list')}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  const isTerminated = data.contractStatus === 'Terminated' || submitSuccess;

  return (
    <Box>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <Box mb={2}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
              <IconButton
                size="small"
                onClick={() => console.info('[ContractTermination] Back to detail')}
                sx={{ mr: 0.5 }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                Home &rsaquo; Contract Dashboard &rsaquo; <strong>{data.contractId}</strong>{' '}
                &rsaquo; Termination
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" pl={0.5}>
              <Typography variant="h6" fontWeight={700}>
                Contract Termination
              </Typography>
              <Chip
                label={isTerminated ? 'Terminated' : data.contractStatus}
                size="small"
                color={isTerminated ? 'error' : CONTRACT_STATUS_COLOR[data.contractStatus]}
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
            onClick={() => console.info('[ContractTermination] Download:', data.contractId)}
          >
            Download Contract
          </Button>
        </Stack>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Warning Banner ───────────────────────────────────────────────── */}
      <TerminationWarningBanner
        contractStatus={isTerminated ? 'Terminated' : data.contractStatus}
      />

      {/* ── Quick-stat strip ─────────────────────────────────────────────── */}
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
          { label: 'Contract Status', value: isTerminated ? 'Terminated' : data.contractStatus },
          {
            label: 'Days Remaining',
            value: data.daysToExpiry < 0 ? 'Expired' : `${data.daysToExpiry}d`,
          },
          { label: 'Created By', value: data.submittedBy },
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
        {/* Left: contract details + documents + audit trail */}
        <Box flex={1.4} minWidth={0}>
          <ContractSummarySection data={data} />
          <DocumentsSection documents={data.documents} />
          <AuditTrailSection auditTrail={data.auditTrail} />
        </Box>

        {/* Right: termination form + history */}
        <Box flex={1} minWidth={0}>
          {/* Termination form — spec §4-G */}
          <TerminationFormPanel
            data={data}
            submitting={submitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            onSubmit={handleTerminationSubmit}
          />

          {/* Termination record */}
          <TerminationHistorySection history={data.terminationHistory} />
        </Box>
      </Stack>
    </Box>
  );
}

export default ContractTerminationPage;
