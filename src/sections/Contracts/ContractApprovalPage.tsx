'use client';

import {
  Box,
  Card,
  Chip,
  Alert,
  Stack,
  Avatar,
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
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { alpha, useTheme } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// ── Icons ─────────────────────────────────────────────────────────────────────

// ── replace these with your actual project imports ────────────────────────────
// import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Spec §4-E: Approval Statuses */
type ApprovalStatus = 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
type ContractStatus = 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Expired' | 'Terminated';
type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';

/** Single step in the configurable approval chain */
interface ApprovalStep {
  id: number;
  stepNo: number;
  role: string;
  approverName: string | null; // null = pending assignment
  status: ApprovalStatus;
  comments: string | null;
  actedAt: string | null;
  /** Whether this step is the currently active one awaiting action */
  isCurrent: boolean;
}

interface ContractDocument {
  id: number;
  fileName: string;
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  version: string;
  status: DocumentStatus;
}

/** Full approval page data */
interface ApprovalPageData {
  // Contract summary (shown read-only on the approval page)
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
  // Approval workflow — configurable chain; NOT hardcoded per spec §11
  approvalSteps: ApprovalStep[];
  // Current authenticated user's role — used for RBAC rendering
  // TODO: replace with → useAppSelector((s) => s.auth.user.role)
  currentUserRole: string;
  currentUserName: string;
}

// ── Redux-mirror action / state ───────────────────────────────────────────────
type ApprovalPageAction =
  | { type: 'approval/fetchPending' }
  | { type: 'approval/fetchFulfilled'; payload: ApprovalPageData }
  | { type: 'approval/fetchRejected'; payload: string }
  | { type: 'approval/actionPending' }
  | { type: 'approval/actionFulfilled'; payload: ApprovalPageData }
  | { type: 'approval/actionRejected'; payload: string };

interface ApprovalPageState {
  data: ApprovalPageData | null;
  loading: boolean;
  error: string | null;
  acting: boolean; // true while approve/reject API call is in flight
  actionError: string | null;
}

const initialApprovalState: ApprovalPageState = {
  data: null,
  loading: false,
  error: null,
  acting: false,
  actionError: null,
};

/** Local reducer — mirrors the shape of a real RTK createSlice reducer */
function approvalReducer(state: ApprovalPageState, action: ApprovalPageAction): ApprovalPageState {
  switch (action.type) {
    case 'approval/fetchPending':
      return { ...state, loading: true, error: null };
    case 'approval/fetchFulfilled':
      return { ...state, loading: false, data: action.payload };
    case 'approval/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    case 'approval/actionPending':
      return { ...state, acting: true, actionError: null };
    case 'approval/actionFulfilled':
      return { ...state, acting: false, data: action.payload };
    case 'approval/actionRejected':
      return { ...state, acting: false, actionError: action.payload };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  — swap for real API call
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_APPROVAL_DATA: ApprovalPageData = {
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
  contractStatus: 'Under Review',
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
      status: 'Pending',
    },
    {
      id: 2,
      fileName: 'Vendor_Compliance_Certificate.pdf',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      version: 'v1.0',
      status: 'Pending',
    },
    {
      id: 3,
      fileName: 'Material_Specification_Sheet.docx',
      fileType: 'DOCX',
      fileSize: '760 KB',
      version: 'v1.0',
      status: 'Pending',
    },
  ],
  // ── Configurable approval chain — NOT hardcoded per spec §11 ─────────────
  // In production this array is fetched from /api/contracts/:id/approval-workflow
  // and shaped by the backend based on client-configured approval policies.
  approvalSteps: [
    {
      id: 1,
      stepNo: 1,
      role: 'Procurement Officer',
      approverName: 'Sneha Raj',
      status: 'Approved',
      comments: 'Contract reviewed and submitted. All vendor docs are in order.',
      actedAt: '16 Feb 2024, 09:45 AM',
      isCurrent: false,
    },
    {
      id: 2,
      stepNo: 2,
      role: 'Procurement Head',
      approverName: 'Arun Kumar',
      status: 'Under Review',
      comments: null,
      actedAt: null,
      isCurrent: true,
    },
    {
      id: 3,
      stepNo: 3,
      role: 'Finance Head',
      approverName: 'Divya Krishnan',
      status: 'Draft',
      comments: null,
      actedAt: null,
      isCurrent: false,
    },
    {
      id: 4,
      stepNo: 4,
      role: 'Legal Head',
      approverName: null,
      status: 'Draft',
      comments: null,
      actedAt: null,
      isCurrent: false,
    },
  ],
  // Simulating current user = Procurement Head (the active approver for step 2)
  currentUserRole: 'Procurement Head',
  currentUserName: 'Arun Kumar',
};

/** Simulates an async fetch — swap for real endpoint */
function fetchApprovalDataMock(_contractId: string): Promise<ApprovalPageData> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_APPROVAL_DATA), 1000));
}

/** Simulates an approve/reject API call */
function submitApprovalActionMock(
  data: ApprovalPageData,
  action: 'approve' | 'reject' | 'request-changes',
  comments: string
): Promise<ApprovalPageData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.08) {
        // Build updated steps reflecting the action
        const updated: ApprovalPageData = {
          ...data,
          contractStatus:
            action === 'approve' ? 'Approved' : action === 'reject' ? 'Draft' : 'Under Review',
          approvalSteps: data.approvalSteps.map((step) => {
            if (!step.isCurrent) return step;
            return {
              ...step,
              status:
                action === 'approve'
                  ? 'Approved'
                  : action === 'reject'
                    ? 'Rejected'
                    : 'Under Review',
              comments,
              actedAt: new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
              isCurrent: false,
            };
          }),
        };
        resolve(updated);
      } else {
        reject(new Error('Server error — please try again.'));
      }
    }, 1600);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const EXPIRY_WARNING_DAYS = 30;

/** Contract-level status colours — reusable across modules per spec §8 */
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

/** Per-step approval status colour map */
const STEP_STATUS_COLOR: Record<
  ApprovalStatus,
  'default' | 'warning' | 'info' | 'success' | 'error'
> = {
  Draft: 'default',
  'Under Review': 'warning',
  Approved: 'success',
  Rejected: 'error',
};

/** Document status colours */
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
// REUSABLE — SectionCard  (matches reference dashboard exactly)
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

/** Labelled read-only info field */
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
// CONTRACT SUMMARY — read-only snapshot visible on the approval page
// ─────────────────────────────────────────────────────────────────────────────
function ContractSummarySection({ data }: { data: ApprovalPageData }) {
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
          label="Contract Status"
          value={
            // ── Status badge — reusable per spec §8 ───────────────────────────
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
        <InfoField label="Submitted By" value={data.submittedBy} />
        <InfoField label="Submitted At" value={data.submittedAt} />
        <InfoField
          label="Days to Expiry"
          value={
            data.daysToExpiry < 0 ? (
              <Typography variant="body2" fontWeight={700} color="error.main">
                Expired
              </Typography>
            ) : data.daysToExpiry <= EXPIRY_WARNING_DAYS ? (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <WarningAmberIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                <Typography variant="body2" fontWeight={700} color="warning.main">
                  {data.daysToExpiry}d left
                </Typography>
              </Stack>
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
// DOCUMENTS PANEL — read-only; reviewer can preview / download
// ─────────────────────────────────────────────────────────────────────────────
function DocumentsSection({ documents }: { documents: ApprovalPageData['documents'] }) {
  const handlePreview = (doc: ApprovalPageData['documents'][0]) => {
    // TODO: dispatch(previewDocument(doc.id)) → open DocumentPreviewModal
    console.info('[ContractApproval] Preview:', doc.fileName);
  };

  const handleDownload = (doc: ApprovalPageData['documents'][0]) => {
    // TODO: dispatch(downloadDocument(doc.id)) → trigger file download
    console.info('[ContractApproval] Download:', doc.fileName);
  };

  return (
    <SectionCard
      title="Contract Documents"
      icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
    >
      {documents.length === 0 ? (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          py={2}
        >
          No documents attached to this contract.
        </Typography>
      ) : (
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
                {/* File info */}
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

                {/* Status + actions */}
                <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
                  <Chip
                    label={doc.status}
                    size="small"
                    color={DOC_STATUS_COLOR[doc.status]}
                    variant="outlined"
                    sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                  />
                  <Tooltip title="Preview">
                    <IconButton size="small" onClick={() => handlePreview(doc)}>
                      <RemoveRedEyeOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton size="small" onClick={() => handleDownload(doc)}>
                      <DownloadOutlinedIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APPROVAL TIMELINE — spec §4-E: Approval timeline showing workflow chain
// Configurable chain — NOT hardcoded per spec §11
// ─────────────────────────────────────────────────────────────────────────────
function ApprovalTimeline({ steps }: { steps: ApprovalStep[] }) {
  return (
    <SectionCard
      title="Approval Workflow"
      icon={<AssignmentTurnedInOutlinedIcon sx={{ fontSize: 16 }} />}
    >
      <Stack spacing={0}>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isDone = step.status === 'Approved' || step.status === 'Rejected';

          return (
            <Box key={step.id} sx={{ position: 'relative', pl: 5, pb: isLast ? 0 : 3 }}>
              {/* Vertical connector line */}
              {!isLast && (
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    left: 13,
                    top: 28,
                    bottom: 0,
                    width: 2,
                    bgcolor: isDone
                      ? step.status === 'Approved'
                        ? alpha(theme.palette.success.main, 0.3)
                        : alpha(theme.palette.error.main, 0.3)
                      : alpha(theme.palette.text.primary, 0.08),
                    borderRadius: 1,
                  })}
                />
              )}

              {/* Step dot */}
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `2px solid ${
                    step.status === 'Approved'
                      ? theme.palette.success.main
                      : step.status === 'Rejected'
                        ? theme.palette.error.main
                        : step.isCurrent
                          ? theme.palette.warning.main
                          : alpha(theme.palette.text.primary, 0.15)
                  }`,
                  bgcolor:
                    step.status === 'Approved'
                      ? alpha(theme.palette.success.main, 0.1)
                      : step.status === 'Rejected'
                        ? alpha(theme.palette.error.main, 0.1)
                        : step.isCurrent
                          ? alpha(theme.palette.warning.main, 0.1)
                          : alpha(theme.palette.text.primary, 0.04),
                  color:
                    step.status === 'Approved'
                      ? 'success.main'
                      : step.status === 'Rejected'
                        ? 'error.main'
                        : step.isCurrent
                          ? 'warning.main'
                          : 'text.disabled',
                  transition: 'all 0.2s',
                })}
              >
                {step.status === 'Approved' ? (
                  <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                ) : step.status === 'Rejected' ? (
                  <CancelOutlinedIcon sx={{ fontSize: 14 }} />
                ) : step.isCurrent ? (
                  <HourglassEmptyIcon sx={{ fontSize: 14 }} />
                ) : (
                  <Typography variant="caption" fontWeight={700} sx={{ lineHeight: 1 }}>
                    {step.stepNo}
                  </Typography>
                )}
              </Box>

              {/* Step content */}
              <Box
                sx={(theme) => ({
                  p: 1.5,
                  borderRadius: 1.5,
                  border: step.isCurrent
                    ? `1px solid ${alpha(theme.palette.warning.main, 0.4)}`
                    : `1px solid ${alpha(theme.palette.text.primary, 0.07)}`,
                  bgcolor: step.isCurrent ? alpha(theme.palette.warning.main, 0.03) : 'transparent',
                })}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={0.5}
                  mb={0.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography variant="caption" fontWeight={700} color="text.primary">
                      Step {step.stepNo} — {step.role}
                    </Typography>
                    {step.isCurrent && (
                      <Chip
                        label="Current"
                        size="small"
                        color="warning"
                        sx={{ fontSize: 9, height: 18, fontWeight: 700 }}
                      />
                    )}
                    <Chip
                      label={step.status}
                      size="small"
                      color={STEP_STATUS_COLOR[step.status]}
                      variant="outlined"
                      sx={{ fontSize: 10, height: 20, fontWeight: 600 }}
                    />
                  </Stack>
                  {step.actedAt && (
                    <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                      {step.actedAt}
                    </Typography>
                  )}
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  mb={step.comments ? 0.5 : 0}
                >
                  <Avatar
                    sx={(theme) => ({
                      width: 18,
                      height: 18,
                      fontSize: 9,
                      fontWeight: 700,
                      bgcolor: step.approverName
                        ? alpha(theme.palette.primary.main, 0.15)
                        : alpha(theme.palette.text.primary, 0.08),
                      color: step.approverName ? 'primary.main' : 'text.disabled',
                    })}
                  >
                    {step.approverName ? step.approverName.charAt(0) : '?'}
                  </Avatar>
                  <Typography
                    variant="caption"
                    color={step.approverName ? 'text.primary' : 'text.disabled'}
                  >
                    {step.approverName ?? 'Approver not yet assigned'}
                  </Typography>
                </Stack>

                {step.comments && (
                  <Box
                    sx={(theme) => ({
                      mt: 0.5,
                      px: 1,
                      py: 0.6,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.text.primary, 0.03),
                      border: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
                    })}
                  >
                    <Typography variant="caption" color="text.secondary" fontStyle="italic">
                      {step.comments}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION DIALOG — shared modal for Approve / Reject / Request Changes
// Spec §4-E: Comments box + Approve/Reject buttons
// Approval logic is NOT hardcoded — configurable flow per spec §11
// ─────────────────────────────────────────────────────────────────────────────
type ActionType = 'approve' | 'reject' | 'request-changes';

interface ActionDialogProps {
  open: boolean;
  actionType: ActionType | null;
  acting: boolean;
  onClose: () => void;
  onConfirm: (comments: string) => void;
}

const ACTION_META: Record<
  ActionType,
  {
    title: string;
    color: 'success' | 'error' | 'warning';
    icon: React.ReactNode;
    requireComments: boolean;
    confirmLabel: string;
  }
> = {
  approve: {
    title: 'Approve Contract',
    color: 'success',
    icon: <ThumbUpOutlinedIcon fontSize="small" />,
    requireComments: false,
    confirmLabel: 'Confirm Approval',
  },
  reject: {
    title: 'Reject Contract',
    color: 'error',
    icon: <ThumbDownOutlinedIcon fontSize="small" />,
    requireComments: true,
    confirmLabel: 'Confirm Rejection',
  },
  'request-changes': {
    title: 'Request Changes',
    color: 'warning',
    icon: <SwapHorizOutlinedIcon fontSize="small" />,
    requireComments: true,
    confirmLabel: 'Send Back for Changes',
  },
};

function ActionDialog({ open, actionType, acting, onClose, onConfirm }: ActionDialogProps) {
  const [comments, setComments] = useState('');
  const [commentsError, setCommentsError] = useState(false);

  if (!actionType) return null;
  const meta = ACTION_META[actionType];

  const handleConfirm = () => {
    if (meta.requireComments && !comments.trim()) {
      setCommentsError(true);
      return;
    }
    onConfirm(comments);
  };

  const handleClose = () => {
    setComments('');
    setCommentsError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={acting ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={(theme) => ({
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: alpha(theme.palette[meta.color].main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: `${meta.color}.main`,
            })}
          >
            {meta.icon}
          </Box>
          <Typography fontWeight={700}>{meta.title}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        {/* Contextual guidance */}
        <Alert
          severity={
            meta.color === 'success' ? 'success' : meta.color === 'error' ? 'error' : 'warning'
          }
          sx={{ mb: 2, fontSize: 12 }}
        >
          {actionType === 'approve' &&
            'You are about to approve this contract. It will proceed to the next approval step.'}
          {actionType === 'reject' &&
            'You are about to reject this contract. It will be returned to Draft status. A rejection reason is required.'}
          {actionType === 'request-changes' &&
            'You are sending this contract back to the submitter for changes. Please specify what needs to be updated.'}
        </Alert>

        {/* Comments box — spec §4-E: Comments box */}
        <TextField
          fullWidth
          multiline
          rows={4}
          size="small"
          label={
            meta.requireComments
              ? `${actionType === 'reject' ? 'Rejection Reason' : 'Change Request Details'} *`
              : 'Comments (optional)'
          }
          placeholder={
            actionType === 'approve'
              ? 'Add any notes for the next approver…'
              : actionType === 'reject'
                ? 'Describe why this contract is being rejected…'
                : 'Describe the changes required before re-submission…'
          }
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
            if (e.target.value.trim()) setCommentsError(false);
          }}
          error={commentsError}
          helperText={commentsError ? 'This field is required for this action.' : ''}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" size="small" onClick={handleClose} disabled={acting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          color={meta.color}
          onClick={handleConfirm}
          disabled={acting}
          startIcon={acting ? <CircularProgress size={14} color="inherit" /> : meta.icon}
        >
          {acting ? 'Processing…' : meta.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APPROVAL ACTION PANEL — the primary CTA panel for the current approver
// Spec §4-E: Approve button, Reject button, Comments box
// Role-based visibility: only shown to the active approver per spec §6
// ─────────────────────────────────────────────────────────────────────────────
interface ApprovalActionPanelProps {
  data: ApprovalPageData;
  acting: boolean;
  actionError: string | null;
  onAction: (action: ActionType, comments: string) => void;
}

function ApprovalActionPanel({ data, acting, actionError, onAction }: ApprovalActionPanelProps) {
  const [dialogAction, setDialogAction] = useState<ActionType | null>(null);

  // ── RBAC check — only the active step's approver can act ──────────────────
  // TODO: replace with real RBAC → derive from useAppSelector((s) => s.auth.user)
  const currentStep = data.approvalSteps.find((s) => s.isCurrent);
  const isCurrentApprover =
    currentStep?.role === data.currentUserRole &&
    currentStep?.approverName === data.currentUserName;

  // If current user is not the active approver, show read-only notice per spec §6
  if (!isCurrentApprover || !currentStep) {
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
                Awaiting approval by <strong>{currentStep?.role ?? 'next approver'}</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                You do not have permission to act on this contract at this stage.
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
          border: `1px solid ${alpha(t.palette.warning.main, 0.35)}`,
          borderRadius: 2,
          mb: 2,
          bgcolor: alpha(t.palette.warning.main, 0.02),
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
                bgcolor: alpha(t.palette.warning.main, 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'warning.main',
              })}
            >
              <HourglassEmptyIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                Your Approval Required
              </Typography>
              <Typography variant="caption" color="text.secondary">
                You are the designated approver for Step {currentStep.stepNo} — {currentStep.role}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

          {/* Action error from previous attempt */}
          {actionError && (
            <Alert
              severity="error"
              icon={<ErrorOutlineIcon fontSize="small" />}
              sx={{ mb: 2, fontSize: 12 }}
            >
              {actionError}
            </Alert>
          )}

          {/* CTA buttons — spec §4-E: Approve, Reject, Request Changes */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
            {/* Approve */}
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="small"
              startIcon={
                acting ? <CircularProgress size={14} color="inherit" /> : <ThumbUpOutlinedIcon />
              }
              disabled={acting}
              onClick={() => setDialogAction('approve')}
              sx={{ fontWeight: 700, py: 1 }}
            >
              Approve
            </Button>

            {/* Request Changes */}
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              size="small"
              startIcon={<SwapHorizOutlinedIcon />}
              disabled={acting}
              onClick={() => setDialogAction('request-changes')}
              sx={{ py: 1 }}
            >
              Request Changes
            </Button>

            {/* Reject */}
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              startIcon={<ThumbDownOutlinedIcon />}
              disabled={acting}
              onClick={() => setDialogAction('reject')}
              sx={{ py: 1 }}
            >
              Reject
            </Button>
          </Stack>

          {/* Guidance note */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={1.5}
          >
            Your action will be recorded in the audit trail. Approval logic is configured by your
            system administrator.
          </Typography>
        </CardContent>
      </Card>

      {/* Action dialog */}
      <ActionDialog
        open={dialogAction !== null}
        actionType={dialogAction}
        acting={acting}
        onClose={() => setDialogAction(null)}
        onConfirm={(comments) => {
          onAction(dialogAction!, comments);
          setDialogAction(null);
        }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON — mirrors loading pattern of reference ContractDashboard
// ─────────────────────────────────────────────────────────────────────────────
function ApprovalLoadingSkeleton() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Skeleton variant="text" width={260} height={32} />
        <Skeleton variant="rounded" width={100} height={32} />
      </Stack>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} flexWrap="wrap" useFlexGap>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={56} sx={{ flex: 1, minWidth: 130 }} />
        ))}
      </Stack>
      <Skeleton variant="rounded" height={100} sx={{ mb: 2 }} />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box flex={1.4}>
          <Skeleton variant="rounded" height={200} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={150} />
        </Box>
        <Box flex={1}>
          <Skeleton variant="rounded" height={380} />
        </Box>
      </Stack>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — ContractApprovalPage
// ─────────────────────────────────────────────────────────────────────────────
interface ContractApprovalPageProps {
  /**
   * Contract ID to load — typically from route params.
   * TODO: replace with → const { contractId } = useParams<{ contractId: string }>();
   */
  contractId?: string;
}

function ContractApprovalPage({ contractId = 'CON-2402' }: ContractApprovalPageProps) {
  const theme = useTheme();

  // ── replace these with your actual project imports ─────────────────────────
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { data, loading, error, acting, actionError } = useAppSelector((s) => s.contractApproval);

  // ── local Redux-mirror state (remove once real Redux slice is wired) ────────
  const [state, dispatch] = useReducer(approvalReducer, initialApprovalState);
  const { data, loading, error, acting, actionError } = state;

  // ── data loading ─────────────────────────────────────────────────────────────
  // TODO: replace fetchApprovalDataMock with → dispatch(fetchApprovalData(contractId))
  //       once RTK thunk is created in src/store/slices/contractApprovalSlice
  const loadData = useCallback(() => {
    dispatch({ type: 'approval/fetchPending' });
    fetchApprovalDataMock(contractId)
      .then((payload) => dispatch({ type: 'approval/fetchFulfilled', payload }))
      .catch((err: Error) => dispatch({ type: 'approval/fetchRejected', payload: err.message }));
  }, [contractId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── approval action handler ───────────────────────────────────────────────────
  // TODO: replace submitApprovalActionMock with:
  //   dispatch(submitApprovalAction({ contractId, action, comments })).unwrap()
  const handleAction = useCallback(
    async (action: ActionType, comments: string) => {
      if (!data) return;
      dispatch({ type: 'approval/actionPending' });
      try {
        const updated = await submitApprovalActionMock(data, action, comments);
        dispatch({ type: 'approval/actionFulfilled', payload: updated });
      } catch (err) {
        dispatch({
          type: 'approval/actionRejected',
          payload: err instanceof Error ? err.message : 'Action failed.',
        });
      }
    },
    [data]
  );

  // ── overall workflow completion check ──────────────────────────────────────────
  const allApproved = data?.approvalSteps.every((s) => s.status === 'Approved') ?? false;
  const anyRejected = data?.approvalSteps.some((s) => s.status === 'Rejected') ?? false;
  const pendingStep = data?.approvalSteps.find((s) => s.isCurrent);

  // ── loading state ─────────────────────────────────────────────────────────────
  if (loading) return <ApprovalLoadingSkeleton />;

  // ── error state ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="error" mb={2}>
          Failed to load approval data: {error}
        </Typography>
        <Button variant="outlined" onClick={loadData}>
          Retry
        </Button>
      </Box>
    );
  }

  // ── empty state ───────────────────────────────────────────────────────────────
  if (!data) {
    return (
      <Box textAlign="center" py={8}>
        <AssignmentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">Contract not found.</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => console.info('[ContractApproval] Back to list')}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  // ── main render ───────────────────────────────────────────────────────────────
  return (
    <Box>
      {/* ── Breadcrumb / Page Header ─────────────────────────────────────────── */}
      <Box mb={2}>
        {/*
          Replace the block below with:
          <PremiumBreadcrumbs
            title={`Approve — ${data.contractId}`}
            paths={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Contract Dashboard', href: '/contract-dashboard' },
              { label: data.contractId, href: paths.contract.detail(data.contractId) },
              { label: 'Approval' },
            ]}
          />
        */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} mb={0.5}>
              <IconButton
                size="small"
                onClick={() => console.info('[ContractApproval] Back to detail')}
                sx={{ mr: 0.5 }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                Home &rsaquo; Contract Dashboard &rsaquo; <strong>{data.contractId}</strong>{' '}
                &rsaquo; Approval
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" pl={0.5}>
              <Typography variant="h6" fontWeight={700}>
                Contract Approval
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

          {/* Download contract for offline review */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              borderColor: alpha(theme.palette.text.primary, 0.2),
              fontSize: 12,
              flexShrink: 0,
            }}
            onClick={() => console.info('[ContractApproval] Download:', data.contractId)}
          >
            Download Contract
          </Button>
        </Stack>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Workflow completion banners ─────────────────────────────────────── */}
      {allApproved && (
        <Alert severity="success" icon={<CheckCircleOutlineIcon fontSize="small" />} sx={{ mb: 2 }}>
          All approval steps are complete. This contract has been <strong>fully approved</strong>.
        </Alert>
      )}
      {anyRejected && (
        <Alert severity="error" icon={<CancelOutlinedIcon fontSize="small" />} sx={{ mb: 2 }}>
          This contract has been <strong>rejected</strong> and returned to Draft status.
        </Alert>
      )}

      {/* ── Quick-stat strip ─────────────────────────────────────────────────── */}
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
          { label: 'Value', value: data.contractValue },
          { label: 'Submitted By', value: data.submittedBy },
          {
            label: 'Pending Step',
            value: pendingStep
              ? `Step ${pendingStep.stepNo} — ${pendingStep.role}`
              : allApproved
                ? 'All done'
                : anyRejected
                  ? 'Rejected'
                  : '—',
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
              minWidth: 130,
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

      {/* ── Main two-column layout ────────────────────────────────────────────── */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
        {/* ── Left column: Contract details ─────────────────────────────────── */}
        <Box flex={1.4} minWidth={0}>
          <ContractSummarySection data={data} />
          <DocumentsSection documents={data.documents} />
        </Box>

        {/* ── Right column: Approval action + timeline ──────────────────────── */}
        <Box flex={1} minWidth={0}>
          {/* Approval action panel — spec §4-E: Approve / Reject buttons + Comments */}
          {!allApproved && !anyRejected && (
            <ApprovalActionPanel
              data={data}
              acting={acting}
              actionError={actionError}
              onAction={handleAction}
            />
          )}

          {/* Approval workflow timeline — spec §4-E: Approval timeline */}
          <ApprovalTimeline steps={data.approvalSteps} />
        </Box>
      </Stack>
    </Box>
  );
}

export default ContractApprovalPage;
