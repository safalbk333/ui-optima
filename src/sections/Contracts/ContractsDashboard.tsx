'use client';

import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
  GridRenderCellParams,
  useGridApiContext,
} from '@mui/x-data-grid';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { alpha, useTheme } from '@mui/material/styles';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

// ── replace these with your actual project imports ───────────────────────────
// import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

type ContractStatus = 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Expired' | 'Terminated';

interface ContractRow {
  id: number;
  contractId: string;
  contractTitle: string;
  vendor: string;
  category: string;
  value: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  status: ContractStatus;
  createdBy: string;
  /** Number of days until expiry — negative means already expired */
  daysToExpiry: number;
}
type ContractAction =
  | { type: 'contracts/fetchPending' }
  | { type: 'contracts/fetchFulfilled'; payload: ContractRow[] }
  | { type: 'contracts/fetchRejected'; payload: string };

interface ContractState {
  rows: ContractRow[];
  loading: boolean;
  error: string | null;
}

const initialContractState: ContractState = {
  rows: [],
  loading: false,
  error: null,
};

/** Local reducer — mirrors the shape of a real RTK createSlice reducer */
function contractReducer(state: ContractState, action: ContractAction): ContractState {
  switch (action.type) {
    case 'contracts/fetchPending':
      return { ...state, loading: true, error: null };
    case 'contracts/fetchFulfilled':
      return { ...state, loading: false, rows: action.payload };
    case 'contracts/fetchRejected':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const MOCK_CONTRACTS: ContractRow[] = [
  {
    id: 1,
    contractId: 'CON-2401',
    contractTitle: 'IT Infrastructure Support Agreement',
    vendor: 'TechNova Solutions',
    category: 'IT Services',
    value: '₹12,00,000',
    startDate: '01 Jan 2024',
    endDate: '31 Dec 2024',
    renewalDate: '01 Dec 2024',
    status: 'Active',
    createdBy: 'Arun Kumar',
    daysToExpiry: 8,
  },
  {
    id: 2,
    contractId: 'CON-2402',
    contractTitle: 'Raw Materials Supply Contract',
    vendor: 'Prime Industrial Supplies',
    category: 'Manufacturing',
    value: '₹8,50,000',
    startDate: '15 Feb 2024',
    endDate: '14 Feb 2025',
    renewalDate: '14 Jan 2025',
    status: 'Under Review',
    createdBy: 'Sneha Raj',
    daysToExpiry: 65,
  },
  {
    id: 3,
    contractId: 'CON-2403',
    contractTitle: 'Office Consumables Annual Agreement',
    vendor: 'GreenLeaf Traders',
    category: 'Office Supplies',
    value: '₹3,20,000',
    startDate: '01 Mar 2023',
    endDate: '28 Feb 2024',
    renewalDate: '—',
    status: 'Expired',
    createdBy: 'Rahul Nair',
    daysToExpiry: -60,
  },
  {
    id: 4,
    contractId: 'CON-2404',
    contractTitle: 'Pan-India Freight & Logistics Contract',
    vendor: 'Skyline Logistics',
    category: 'Logistics',
    value: '₹22,75,000',
    startDate: '10 Apr 2024',
    endDate: '09 Apr 2026',
    renewalDate: '09 Mar 2026',
    status: 'Approved',
    createdBy: 'Anjali Menon',
    daysToExpiry: 490,
  },
  {
    id: 5,
    contractId: 'CON-2405',
    contractTitle: 'Network Equipment AMC',
    vendor: 'BrightTech AMC',
    category: 'AMC',
    value: '₹5,60,000',
    startDate: '01 Jun 2024',
    endDate: '31 May 2025',
    renewalDate: '01 May 2025',
    status: 'Active',
    createdBy: 'Kiran Pillai',
    daysToExpiry: 12,
  },
  {
    id: 6,
    contractId: 'CON-2406',
    contractTitle: 'CCTV & Access Control Services',
    vendor: 'Delta Security Systems',
    category: 'Security',
    value: '₹4,10,000',
    startDate: '01 Jul 2023',
    endDate: '30 Jun 2024',
    renewalDate: '—',
    status: 'Terminated',
    createdBy: 'Meera Nambiar',
    daysToExpiry: -120,
  },
  {
    id: 7,
    contractId: 'CON-2407',
    contractTitle: 'Data Centre Infrastructure Build-out',
    vendor: 'Vertex Infra Pvt Ltd',
    category: 'Infrastructure',
    value: '₹18,00,000',
    startDate: '15 Aug 2024',
    endDate: '14 Aug 2025',
    renewalDate: '14 Jul 2025',
    status: 'Draft',
    createdBy: 'Suresh Babu',
    daysToExpiry: 258,
  },
  {
    id: 8,
    contractId: 'CON-2408',
    contractTitle: 'Broadband & Leased Line Agreement',
    vendor: 'ClearWave Telecom',
    category: 'Telecom',
    value: '₹30,50,000',
    startDate: '01 Sep 2024',
    endDate: '31 Aug 2027',
    renewalDate: '01 Jul 2027',
    status: 'Active',
    createdBy: 'Divya Krishnan',
    daysToExpiry: 1024,
  },
  {
    id: 9,
    contractId: 'CON-2409',
    contractTitle: 'Generator Maintenance Contract',
    vendor: 'PowerGen Services',
    category: 'AMC',
    value: '₹2,80,000',
    startDate: '01 Oct 2024',
    endDate: '30 Sep 2025',
    renewalDate: '01 Sep 2025',
    status: 'Active',
    createdBy: 'Arun Kumar',
    daysToExpiry: 310,
  },
  {
    id: 10,
    contractId: 'CON-2410',
    contractTitle: 'HR Payroll Processing SLA',
    vendor: 'PeopleSoft India',
    category: 'HR Services',
    value: '₹6,00,000',
    startDate: '01 Nov 2024',
    endDate: '31 Oct 2025',
    renewalDate: '01 Oct 2025',
    status: 'Under Review',
    createdBy: 'Sneha Raj',
    daysToExpiry: 340,
  },
];

/** Simulates an async API call — swap for real endpoint later */
function fetchContractsMock(): Promise<ContractRow[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_CONTRACTS), 1200));
}

const EXPIRY_WARNING_DAYS = 30;

const STATUS_COLOR: Record<ContractStatus, 'default' | 'warning' | 'info' | 'success' | 'error'> = {
  Draft: 'default',
  'Under Review': 'warning',
  Approved: 'info',
  Active: 'success',
  Expired: 'error',
  Terminated: 'error',
};

// kept for reference — used by filter Autocomplete
const STATUSES: ContractStatus[] = [
  'Draft',
  'Under Review',
  'Approved',
  'Active',
  'Expired',
  'Terminated',
];

// ─────────────────────────────────────────────────────────────────────────────
// CHART DATA — hardcoded dummy data for the three dashboard charts
// TODO: Replace with data derived from live API rows once endpoint is ready
// ─────────────────────────────────────────────────────────────────────────────

/** Contracts by Status — used in PieChart */
const CHART_STATUS_DATA = [
  { name: 'Active', value: 4 },
  { name: 'Under Review', value: 2 },
  { name: 'Draft', value: 1 },
  { name: 'Approved', value: 1 },
  { name: 'Expired', value: 1 },
  { name: 'Terminated', value: 1 },
];

/** Contracts by Vendor (top 5) — used in BarChart */
const CHART_VENDOR_DATA = [
  { vendor: 'TechNova', contracts: 2 },
  { vendor: 'Skyline', contracts: 2 },
  { vendor: 'BrightTech', contracts: 1 },
  { vendor: 'ClearWave', contracts: 1 },
  { vendor: 'PowerGen', contracts: 1 },
];

/** Monthly Renewals (Jan–Jun 2024) — used in LineChart */
const CHART_RENEWAL_DATA = [
  { month: 'Jan', renewals: 1 },
  { month: 'Feb', renewals: 3 },
  { month: 'Mar', renewals: 2 },
  { month: 'Apr', renewals: 4 },
  { month: 'May', renewals: 2 },
  { month: 'Jun', renewals: 5 },
];

/** Pie chart fill colours — one per status slice */
const PIE_COLORS = ['#22c55e', '#f59e0b', '#94a3b8', '#3b82f6', '#ef4444', '#dc2626'];

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM FOOTER  — identical pattern to reference VendorDashboard
// ─────────────────────────────────────────────────────────────────────────────
function CustomFooter() {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <GridFooterContainer
      sx={{
        px: 2,
        py: 1,
        borderTop: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        background: 'transparent',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="caption" color="text.secondary">
          Showing page {paginationModel.page + 1} of {pageCount}
        </Typography>

        <Pagination
          size="small"
          color="primary"
          page={paginationModel.page + 1}
          count={pageCount}
          onChange={(_, value) => apiRef.current.setPage(value - 1)}
        />
      </Stack>
    </GridFooterContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD  — reusable component (spec §8 Reusable Components)
// ─────────────────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgcolor: string;
  loading?: boolean;
}

function StatCard({ label, value, icon, color, bgcolor, loading }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 160,
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {/* icon badge */}
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.5,
              bgcolor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          {/* value + label */}
          <Box>
            {loading ? (
              <Skeleton variant="text" width={40} height={32} />
            ) : (
              <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
                {value}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRACTS BY STATUS CHART  — spec 4-A "Charts (Optional Placeholder)"
// Pie chart showing distribution of contracts across all statuses.
// TODO: Replace CHART_STATUS_DATA with data derived from live `rows` once API ready
// ─────────────────────────────────────────────────────────────────────────────
function ContractsByStatusChart() {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{padding: 2}}>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          mb={1}
          display="block"
        >
          Contracts by Status
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={CHART_STATUS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={46}
              paddingAngle={2}
              dataKey="value"
            >
              {CHART_STATUS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{ fontSize: 11, padding: '4px 8px' }}
            />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRACTS BY VENDOR CHART  — spec §4-A "Charts (Optional Placeholder)"
// Horizontal bar chart showing number of contracts per top vendor.
// TODO: Replace CHART_VENDOR_DATA with data derived from live `rows` once API ready
// ─────────────────────────────────────────────────────────────────────────────
function ContractsByVendorChart() {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{padding: 2}}>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          mb={1}
          display="block"
        >
          Contracts by Vendor
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={CHART_VENDOR_DATA}
            layout="vertical"
            margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.06)" />
            <XAxis
              type="number"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="vendor"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <RechartsTooltip
              formatter={(value) => [value, 'Contracts']}
              contentStyle={{ fontSize: 11, padding: '4px 8px' }}
            />
            <Bar dataKey="contracts" fill="#3b82f6" radius={[0, 3, 3, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function MonthlyRenewalsChart() {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 220,
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{padding: 2}}>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          mb={1}
          display="block"
        >
          Monthly Renewals
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={CHART_RENEWAL_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <RechartsTooltip
              formatter={(value) => [value, 'Renewals']}
              contentStyle={{ fontSize: 11, padding: '4px 8px' }}
            />
            <Line
              type="monotone"
              dataKey="renewals"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3, fill: '#22c55e' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPIRY WARNING BANNER  — spec §4-F: Renewal reminder banner / expiry countdown
// Displayed when ≥1 contracts expire within EXPIRY_WARNING_DAYS
// ─────────────────────────────────────────────────────────────────────────────
interface ExpiryBannerProps {
  expiringSoon: ContractRow[];
  onDismiss: () => void;
}

function ExpiryBanner({ expiringSoon, onDismiss }: ExpiryBannerProps) {
  if (expiringSoon.length === 0) return null;

  return (
    <Alert
      severity="warning"
      icon={<WarningAmberIcon fontSize="small" />}
      action={
        <IconButton size="small" onClick={onDismiss}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      sx={{ mb: 2, fontSize: 12 }}
    >
      <strong>
        {expiringSoon.length} contract{expiringSoon.length > 1 ? 's' : ''}
      </strong>{' '}
      expiring within {EXPIRY_WARNING_DAYS} days:&nbsp;
      {expiringSoon.map((c) => (
        <span key={c.id}>
          <strong>{c.contractId}</strong> ({c.vendor} — {c.daysToExpiry}d left)&nbsp;
        </span>
      ))}
      — initiate renewal to avoid service disruption.
    </Alert>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW ACTIONS  — spec §4-B: View, Edit, Renew, Terminate, Download
// Actions are conditionally enabled based on the contract's current status.
// ─────────────────────────────────────────────────────────────────────────────
interface RowActionsProps {
  row: ContractRow;
  // TODO: wire these handlers to router.push / dispatch calls on integration
  onView: (row: ContractRow) => void;
  onEdit: (row: ContractRow) => void;
  onRenew: (row: ContractRow) => void;
  onTerminate: (row: ContractRow) => void;
  onDownload: (row: ContractRow) => void;
}

function RowActions({ row, onView, onEdit, onRenew, onTerminate, onDownload }: RowActionsProps) {
  const canEdit = row.status === 'Draft' || row.status === 'Under Review';
  const canRenew = row.status === 'Active' || row.status === 'Expired';
  const canTerminate = row.status === 'Active' || row.status === 'Approved';
  const router = useRouter();

  return (
    <Stack direction="row" spacing={0} alignItems="center">
      {/* View — always visible */}
      <Tooltip title="View">
        <IconButton size="small" onClick={() => onView(row)}>
          <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>

      {/* Edit — Draft / Under Review only */}
      <Tooltip title={canEdit ? 'Edit' : 'Cannot edit at this stage'}>
        <span>
          <IconButton size="small" disabled={!canEdit} onClick={() => onEdit(row)}>
            <EditOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </span>
      </Tooltip>

      {/* Renew — Active / Expired only */}
      <Tooltip title={canRenew ? 'Renew' : 'Renewal not applicable'}>
        <span>
          <IconButton size="small" disabled={!canRenew} onClick={() => router.push(paths.contract.renewal)}>
            <RefreshOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </span>
      </Tooltip>

      {/* Terminate — Active / Approved only */}
      <Tooltip title={canTerminate ? 'Terminate' : 'Cannot terminate at this stage'}>
        <span>
          <IconButton
            size="small"
            disabled={!canTerminate}
            onClick={() => router.push(paths.contract.termination)}
            sx={{ color: canTerminate ? 'error.main' : undefined }}
          >
            <CancelOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </span>
      </Tooltip>

      {/* Download — always visible */}
      <Tooltip title="Download">
        <IconButton size="small" onClick={() => onDownload(row)}>
          <DownloadOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function ContractDashboard() {
  const theme = useTheme();
  const PRIMARY = theme.palette.primary.main;

  // ── replace these with your actual project imports ─────────────────────────
  const router = useRouter();
  // const dispatch  = useAppDispatch();
  // const { rows, loading, error } = useAppSelector((s) => s.contracts);

  // ── local Redux-mirror state (remove once real Redux slice is wired) ────────
  const [state, dispatch] = useReducer(contractReducer, initialContractState);
  const { rows, loading, error } = state;

  // ── filter input state ──────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterVendor, setFilterVendor] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ContractStatus | null>(null);
  const [filterStartFrom, setFilterStartFrom] = useState('');
  const [filterEndTo, setFilterEndTo] = useState('');

  // ── banner dismiss state ────────────────────────────────────────────────────
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // ── applied filters (committed on "Apply" click) ────────────────────────────
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    vendor: null as string | null,
    status: null as ContractStatus | null,
    startFrom: '',
    endTo: '',
  });

  // ── data loading ─────────────────────────────────────────────────────────────
  // Dispatches fetchPending → (mock fetch) → fetchFulfilled / fetchRejected.
  // TODO: replace fetchContractsMock() with → dispatch(fetchContracts())
  //       once the real RTK thunk is created in src/store/slices/contractSlice
  const loadContracts = useCallback(() => {
    dispatch({ type: 'contracts/fetchPending' });

    fetchContractsMock()
      .then((data) => dispatch({ type: 'contracts/fetchFulfilled', payload: data }))
      .catch((err: Error) => dispatch({ type: 'contracts/fetchRejected', payload: err.message }));
  }, []);

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  // ── derived stats from live (fetched) data ──────────────────────────────────
  const totalContracts = rows.length;
  const totalActive = rows.filter((r) => r.status === 'Active').length;
  const totalExpiringSoon = rows.filter(
    (r) => r.daysToExpiry >= 0 && r.daysToExpiry <= EXPIRY_WARNING_DAYS
  ).length;
  const totalPendingApproval = rows.filter(
    (r) => r.status === 'Under Review' || r.status === 'Draft'
  ).length;
  const totalTerminated = rows.filter((r) => r.status === 'Terminated').length;

  // ── expiry banner data ──────────────────────────────────────────────────────
  const expiringSoon = rows.filter(
    (r) => r.daysToExpiry >= 0 && r.daysToExpiry <= EXPIRY_WARNING_DAYS
  );

  // ── filtered rows (computed from appliedFilters) ────────────────────────────
  const filteredRows = rows.filter((r) => {
    const q = appliedFilters.search.toLowerCase();
    const matchSearch =
      !q ||
      r.contractId.toLowerCase().includes(q) ||
      r.contractTitle.toLowerCase().includes(q) ||
      r.vendor.toLowerCase().includes(q);

    const matchVendor = !appliedFilters.vendor || r.vendor === appliedFilters.vendor;
    const matchStatus = !appliedFilters.status || r.status === appliedFilters.status;

    // Date range — basic string comparison against startDate / endDate fields.
    // TODO: convert to dayjs/date-fns comparison once real ISO date strings
    //       arrive from the API.
    const matchStart = !appliedFilters.startFrom || r.startDate >= appliedFilters.startFrom;
    const matchEnd = !appliedFilters.endTo || r.endDate <= appliedFilters.endTo;

    return matchSearch && matchVendor && matchStatus && matchStart && matchEnd;
  });

  // ── unique vendor list derived from fetched data ────────────────────────────
  const vendorOptions = Array.from(new Set(rows.map((r) => r.vendor))).sort();

  // ── filter action handlers ──────────────────────────────────────────────────
  const handleApplyFilters = () => {
    setAppliedFilters({
      search,
      vendor: filterVendor,
      status: filterStatus,
      startFrom: filterStartFrom,
      endTo: filterEndTo,
    });
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilterVendor(null);
    setFilterStatus(null);
    setFilterStartFrom('');
    setFilterEndTo('');
    setAppliedFilters({
      search: '',
      vendor: null,
      status: null,
      startFrom: '',
      endTo: '',
    });
  };

  // ── row action handlers ─────────────────────────────────────────────────────
  // Each handler will be wired to router.push / dispatch during API integration
  const handleView = (row: ContractRow) => {
    console.info('[ContractDashboard] View:', row.contractId);
    router.push(paths.contract.details);
  };

  const handleEdit = (row: ContractRow) => {
    router.push(paths.contract.edit);
    console.info('[ContractDashboard] Edit:', row.contractId);
  };

  const handleRenew = (row: ContractRow) => {
    // TODO: router.push(paths.contract.renew(row.contractId))
    console.info('[ContractDashboard] Renew:', row.contractId);
  };

  const handleTerminate = (row: ContractRow) => {
    // TODO: open TerminationModal → dispatch(terminateContract(row.contractId))
    console.info('[ContractDashboard] Terminate:', row.contractId);
  };

  const handleDownload = (row: ContractRow) => {
    // TODO: dispatch(downloadContract(row.contractId)) → triggers file download
    console.info('[ContractDashboard] Download:', row.contractId);
  };

  // ── column definitions — spec §4-B table columns ────────────────────────────
  const columns: GridColDef[] = [
    { field: 'contractId', headerName: 'Contract ID', flex: 0.9 },
    { field: 'vendor', headerName: 'Vendor Name', flex: 1.3 },
    { field: 'contractTitle', headerName: 'Contract Title', flex: 1.6 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      renderCell: (params: GridRenderCellParams<ContractRow, ContractStatus>) => (
        // ── Status badge — reusable across modules per spec §8 ───────────────
        <Chip
          label={params.value}
          size="small"
          color={STATUS_COLOR[params.value!]}
          variant="outlined"
          sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
        />
      ),
    },
    { field: 'startDate', headerName: 'Start Date', flex: 0.9 },
    { field: 'endDate', headerName: 'End Date', flex: 0.9 },
    { field: 'value', headerName: 'Contract Value', flex: 0.9 },
    { field: 'createdBy', headerName: 'Created By', flex: 1 },
    {
      field: 'daysToExpiry',
      headerName: 'Expiry',
      flex: 0.75,
      renderCell: (params: GridRenderCellParams<ContractRow, number>) => {
        const days = params.value ?? 0;
        if (days < 0)
          return (
            <Typography variant="caption" color="error.main" fontWeight={600}>
              Expired
            </Typography>
          );
        if (days <= EXPIRY_WARNING_DAYS)
          return (
            <Typography variant="caption" color="warning.main" fontWeight={600}>
              {days}d left
            </Typography>
          );
        return (
          <Typography variant="caption" color="text.secondary">
            {days}d
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.2,
      sortable: false,
      // ── Row-level actions: View / Edit / Renew / Terminate / Download ───────
      // Spec §4-B Actions — each action conditionally enabled per contract status
      renderCell: (params: GridRenderCellParams<ContractRow>) => (
        <RowActions
          row={params.row}
          onView={handleView}
          onEdit={handleEdit}
          onRenew={handleRenew}
          onTerminate={handleTerminate}
          onDownload={handleDownload}
        />
      ),
    },
  ];

  // ── loading skeleton ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="rounded" width={120} height={32} />
        </Stack>

        <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mb={3}
          flexWrap="wrap"
          useFlexGap
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={80} sx={{ flex: 1, minWidth: 150 }} />
          ))}
        </Stack>

        <Skeleton variant="rounded" height={300} />
      </Box>
    );
  }

  // ── error state ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <Typography color="error" mb={2}>
          Failed to load contracts: {error}
        </Typography>
        <Button variant="outlined" onClick={loadContracts}>
          Retry
        </Button>
      </Box>
    );
  }

  // ── empty state ───────────────────────────────────────────────────────────────
  if (!loading && rows.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <AssignmentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">No contracts found.</Typography>
        <Button onClick={() => router.push(paths.contract.add)} variant="outlined" size="small" sx={{ mt: 2 }}>
          + Create First Contract
        </Button>
      </Box>
    );
  }

  // ── main render ───────────────────────────────────────────────────────────────
  return (
    <Box>
      {/* ── breadcrumb / page header ─────────────────────────────────────────── */}
      <Box mb={2}>
        {/*
          Replace the block below with:
          <PremiumBreadcrumbs
            title="Contract Management"
            paths={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Contract Dashboard', href: '/contract-dashboard' },
            ]}
            action={
              <Button variant="outlined" onClick={() => router.push(paths.contract.add)}>
                + New Contract
              </Button>
            }
          />
        */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Home &rsaquo; Contract Dashboard
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              Contract Management
            </Typography>
          </Box>

          <Button onClick={() => router.push(paths.contract.add)} variant="outlined" size="small">
            + New Contract
          </Button>
        </Stack>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── expiry warning banner — spec §4-F ────────────────────────────────── */}
      {!bannerDismissed && (
        <ExpiryBanner expiringSoon={expiringSoon} onDismiss={() => setBannerDismissed(true)} />
      )}

      {/* ── stat cards — spec §4-A: 5 dashboard cards ────────────────────────── */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} flexWrap="wrap" useFlexGap>
        <StatCard
          label="Total Contracts"
          value={totalContracts}
          icon={<AssignmentIcon fontSize="small" />}
          color={PRIMARY}
          bgcolor={alpha(PRIMARY, 0.1)}
          loading={loading}
        />
        <StatCard
          label="Active"
          value={totalActive}
          icon={<CheckCircleOutlineIcon fontSize="small" />}
          color={theme.palette.success.main}
          bgcolor={alpha(theme.palette.success.main, 0.1)}
          loading={loading}
        />
        <StatCard
          label="Expiring Soon"
          value={totalExpiringSoon}
          icon={<WarningAmberIcon fontSize="small" />}
          color={theme.palette.warning.main}
          bgcolor={alpha(theme.palette.warning.main, 0.1)}
          loading={loading}
        />
        <StatCard
          label="Pending Approval"
          value={totalPendingApproval}
          icon={<HourglassEmptyIcon fontSize="small" />}
          color={theme.palette.info.main}
          bgcolor={alpha(theme.palette.info.main, 0.1)}
          loading={loading}
        />
        <StatCard
          label="Terminated"
          value={totalTerminated}
          icon={<CancelOutlinedIcon fontSize="small" />}
          color={theme.palette.error.main}
          bgcolor={alpha(theme.palette.error.main, 0.1)}
          loading={loading}
        />
      </Stack>

      {/* ── charts — spec §4-A "Charts (Optional Placeholder)" ───────────────── */}
      {/* Each chart component uses hardcoded dummy data; swap with live data once API ready */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} flexWrap="wrap" useFlexGap>
        <ContractsByStatusChart />
        <ContractsByVendorChart />
        <MonthlyRenewalsChart />
      </Stack>

      <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

      {/* ── filters — spec §4-B: Status, Vendor, Date Range, Search ─────────── */}
      <Box mb={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          flexWrap="wrap"
          useFlexGap
        >
          {/* Search by Contract ID, Contract Title, or Vendor */}
          <TextField
            size="small"
            label="Search by ID / Title / Vendor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 250 }}
          />

          {/* Vendor filter — options populated from fetched rows (not hardcoded) */}
          <Autocomplete
            size="small"
            options={vendorOptions}
            value={filterVendor}
            onChange={(_, v) => setFilterVendor(v)}
            sx={{ minWidth: 210 }}
            renderInput={(params) => <TextField {...params} label="Vendor" />}
          />

          {/* Status filter */}
          <Autocomplete
            size="small"
            options={STATUSES}
            value={filterStatus}
            onChange={(_, v) => setFilterStatus(v as ContractStatus | null)}
            sx={{ minWidth: 180 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          {/* Date range: start-from — spec §4-B Filters */}
          <TextField
            size="small"
            label="Start From"
            type="date"
            value={filterStartFrom}
            onChange={(e) => setFilterStartFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          {/* Date range: end-to */}
          <TextField
            size="small"
            label="End To"
            type="date"
            value={filterEndTo}
            onChange={(e) => setFilterEndTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <Stack direction="row" spacing={1} flexShrink={0}>
            <Button
              variant="contained"
              sx={{ background: PRIMARY, px: 3, color: 'white' }}
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.text.primary, 0.2) }}
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ── data grid — spec §4-B Contract List Screen ───────────────────────── */}
      <Box sx={{ borderRadius: 1 }}>
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            '& .MuiDataGrid-root': {
              border: 'none',
              bgcolor: 'transparent',
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            loading={loading}
            slots={{
              toolbar: GridToolbar,
              footer: CustomFooter,
              loadingOverlay: () => (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <CircularProgress size={28} />
                </Box>
              ),
              noRowsOverlay: () => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  flexDirection="column"
                  gap={1}
                >
                  <AssignmentIcon sx={{ fontSize: 36, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary">
                    No contracts match the applied filters.
                  </Typography>
                </Box>
              ),
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            sx={{
              fontSize: 13,

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                minHeight: 36,
                maxHeight: 36,
              },

              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'transparent !important',
              },

              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: 13,
                fontWeight: 600,
                color: 'primary.main',
              },

              '& .MuiDataGrid-cell': {
                fontSize: 12,
              },

              '& .MuiDataGrid-row': {
                minHeight: 40,
                maxHeight: 40,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContractDashboard;
