'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Checkbox,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridRenderCellParams,
  GridRowParams,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { alpha, useTheme } from '@mui/material/styles';

import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

type TenantStatus = 'Active' | 'Inactive' | 'Suspended' | 'Trial';
type SubscriptionPlan = 'Enterprise' | 'Professional' | 'Basic' | 'Trial';
type Industry =
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Logistics'
  | 'Manufacturing'
  | 'Education'
  | 'Retail'
  | 'Energy';

interface TenantRow {
  id: string;
  code: string;
  tenantName: string;
  tenantId: string;         // e.g. ID: 987216-A — internal system ID shown below name
  industry: Industry;
  contactPerson: string;
  emailAddress: string;
  plan: SubscriptionPlan;
  status: TenantStatus;
  expiryDate: string;       // ISO date string e.g. '2025-12-31'
  createdAt: string;        // ISO date string
  modules: string[];        // enabled feature modules for the tenant
}

// ----------------------------------------------------------------------
// HARDCODED TENANT DATA — Enterprise Admin context
// A mix of active, inactive, trial, and suspended tenants across industries
// ----------------------------------------------------------------------

const HARDCODED_TENANTS: TenantRow[] = [
  {
    id: '1',
    code: 'TC-2024-001',
    tenantName: 'Global Dynamics Inc.',
    tenantId: 'ID: 987216-A',
    industry: 'Technology',
    contactPerson: 'Sarah Jenkins',
    emailAddress: 's.jenkins@gdynamics.com',
    plan: 'Enterprise',
    status: 'Active',
    expiryDate: '2025-12-31',
    createdAt: '2024-01-15',
    modules: ['Procurement', 'Finance', 'HR', 'Contracts', 'Reporting'],
  },
  {
    id: '2',
    code: 'TC-2024-042',
    tenantName: 'Nexus Healthcare',
    tenantId: 'ID: 110293-B',
    industry: 'Healthcare',
    contactPerson: 'Dr. Marcus Vane',
    emailAddress: 'm.vane@nexushealth.org',
    plan: 'Professional',
    status: 'Inactive',
    expiryDate: '2024-09-30',
    createdAt: '2024-02-20',
    modules: ['Procurement', 'Finance', 'Contracts'],
  },
  {
    id: '3',
    code: 'TC-2023-991',
    tenantName: 'FinTech Pro',
    tenantId: 'ID: 762234-C',
    industry: 'Finance',
    contactPerson: 'Alice Cooper',
    emailAddress: 'acooper@finpro.io',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-06-30',
    createdAt: '2023-11-08',
    modules: ['Finance', 'Reporting'],
  },
  {
    id: '4',
    code: 'TC-2024-118',
    tenantName: 'CloudScale Ltd.',
    tenantId: 'ID: 443211-M',
    industry: 'Technology',
    contactPerson: 'Ken Tanaka',
    emailAddress: 'k.tanaka@cloudscale.net',
    plan: 'Enterprise',
    status: 'Active',
    expiryDate: '2026-03-31',
    createdAt: '2024-03-01',
    modules: ['Procurement', 'Finance', 'HR', 'Contracts', 'Vendor Portal', 'Reporting'],
  },
  {
    id: '5',
    code: 'TC-2024-088',
    tenantName: 'Stellar Logistics',
    tenantId: 'ID: 887234-L',
    industry: 'Logistics',
    contactPerson: 'Elena Petrova',
    emailAddress: 'e.petrova@stellar.log',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-08-31',
    createdAt: '2024-04-10',
    modules: ['Procurement', 'Warehouse'],
  },
  {
    id: '6',
    code: 'TC-2024-205',
    tenantName: 'MedCore Systems',
    tenantId: 'ID: 334512-H',
    industry: 'Healthcare',
    contactPerson: 'James Okoro',
    emailAddress: 'j.okoro@medcore.health',
    plan: 'Professional',
    status: 'Active',
    expiryDate: '2025-11-30',
    createdAt: '2024-05-18',
    modules: ['Procurement', 'Finance', 'HR', 'Contracts'],
  },
  {
    id: '7',
    code: 'TC-2024-317',
    tenantName: 'AgroVest Holdings',
    tenantId: 'ID: 556783-G',
    industry: 'Manufacturing',
    contactPerson: 'Patience Mwale',
    emailAddress: 'p.mwale@agrovest.co',
    plan: 'Trial',
    status: 'Trial',
    expiryDate: '2024-12-15',
    createdAt: '2024-11-15',
    modules: ['Procurement'],
  },
  {
    id: '8',
    code: 'TC-2023-744',
    tenantName: 'Edufusion Learning',
    tenantId: 'ID: 221098-E',
    industry: 'Education',
    contactPerson: 'Claire Ndlovu',
    emailAddress: 'c.ndlovu@edufusion.ac',
    plan: 'Basic',
    status: 'Suspended',
    expiryDate: '2024-06-30',
    createdAt: '2023-07-01',
    modules: ['Finance', 'HR'],
  },
  {
    id: '9',
    code: 'TC-2024-512',
    tenantName: 'RetailMax Group',
    tenantId: 'ID: 778432-R',
    industry: 'Retail',
    contactPerson: 'David Chen',
    emailAddress: 'd.chen@retailmax.com',
    plan: 'Enterprise',
    status: 'Active',
    expiryDate: '2026-01-31',
    createdAt: '2024-06-01',
    modules: ['Procurement', 'Finance', 'HR', 'Contracts', 'Vendor Portal', 'Warehouse', 'Reporting'],
  },
  {
    id: '10',
    code: 'TC-2024-603',
    tenantName: 'PowerGen Energy',
    tenantId: 'ID: 990123-P',
    industry: 'Energy',
    contactPerson: 'Tanya Boateng',
    emailAddress: 't.boateng@powergen.co.zw',
    plan: 'Professional',
    status: 'Active',
    expiryDate: '2025-09-30',
    createdAt: '2024-07-12',
    modules: ['Procurement', 'Finance', 'Contracts', 'Reporting'],
  },
  {
    id: '11',
    code: 'TC-2024-721',
    tenantName: 'BuildRight Construction',
    tenantId: 'ID: 445566-B',
    industry: 'Manufacturing',
    contactPerson: 'Prosper Chirwa',
    emailAddress: 'p.chirwa@buildright.co.zw',
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2025-05-31',
    createdAt: '2024-08-03',
    modules: ['Procurement', 'Warehouse'],
  },
  {
    id: '12',
    code: 'TC-2023-822',
    tenantName: 'SafePharma Ltd',
    tenantId: 'ID: 112345-S',
    industry: 'Healthcare',
    contactPerson: 'Fungai Moyo',
    emailAddress: 'f.moyo@safepharma.co.zw',
    plan: 'Professional',
    status: 'Inactive',
    expiryDate: '2024-08-31',
    createdAt: '2023-09-01',
    modules: ['Procurement', 'Finance', 'Contracts'],
  },
];

// ----------------------------------------------------------------------
// CONSTANTS — plan and status palette tokens
// ----------------------------------------------------------------------

const PLAN_STYLE: Record<SubscriptionPlan, { bg: string; color: string }> = {
  Enterprise: { bg: '#EDE7F6', color: '#5E35B1' },
  Professional: { bg: '#E3F2FD', color: '#1565C0' },
  Basic: { bg: '#F3E5F5', color: '#6A1B9A' },
  Trial: { bg: '#FFF8E1', color: '#E65100' },
};

const STATUS_STYLE: Record<TenantStatus, { bg: string; color: string; dot: string }> = {
  Active: { bg: '#E8F5E9', color: '#2E7D32', dot: '#4CAF50' },
  Inactive: { bg: '#FAFAFA', color: '#757575', dot: '#9E9E9E' },
  Suspended: { bg: '#FFF3E0', color: '#E65100', dot: '#FF9800' },
  Trial: { bg: '#E3F2FD', color: '#1565C0', dot: '#2196F3' },
};

const ALL_INDUSTRIES: Industry[] = [
  'Technology', 'Healthcare', 'Finance', 'Logistics',
  'Manufacturing', 'Education', 'Retail', 'Energy',
];

const ALL_PLANS: SubscriptionPlan[] = ['Enterprise', 'Professional', 'Basic', 'Trial'];

const ALL_STATUSES: TenantStatus[] = ['Active', 'Inactive', 'Suspended', 'Trial'];

// ----------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ----------------------------------------------------------------------
// STATUS CHIP — dot + label matching the screenshot
// ----------------------------------------------------------------------

function StatusChip({ value }: { value: TenantStatus }) {
  const { bg, color, dot } = STATUS_STYLE[value];
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        px: 1,
        py: '3px',
        borderRadius: '6px',
        bgcolor: bg,
        color,
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: dot,
          flexShrink: 0,
        }}
      />
      {value.toUpperCase()}
    </Box>
  );
}

// ----------------------------------------------------------------------
// PLAN BADGE — coloured pill, no dot
// ----------------------------------------------------------------------

function PlanBadge({ value }: { value: SubscriptionPlan }) {
  const { bg, color } = PLAN_STYLE[value];
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: '3px',
        borderRadius: '6px',
        bgcolor: bg,
        color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.03em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      {value}
    </Box>
  );
}

// ----------------------------------------------------------------------
// BULK ACTION BAR — appears when rows are selected
// ----------------------------------------------------------------------

interface BulkActionBarProps {
  selectedCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onArchive: () => void;
}

function BulkActionBar({ selectedCount, onActivate, onDeactivate, onArchive }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        mb: 0,
        bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
        border: '1px solid',
        borderColor: (t) => alpha(t.palette.primary.main, 0.12),
        borderBottom: 'none',
        borderRadius: '8px 8px 0 0',
      }}
    >
      {/* Selected count badge */}
      <Box
        sx={{
          px: 1.5,
          py: '4px',
          borderRadius: '6px',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          fontSize: 12,
          fontWeight: 700,
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        {selectedCount} Selected
      </Box>

      {/* Bulk action buttons — outlined style matching screenshot */}
      <Button
        size="small"
        variant="outlined"
        startIcon={<CheckCircleOutlineIcon sx={{ fontSize: 15 }} />}
        onClick={onActivate}
        sx={{
          fontSize: 12,
          fontWeight: 600,
          borderRadius: '6px',
          textTransform: 'none',
          borderColor: 'divider',
          color: 'text.primary',
          '&:hover': { borderColor: 'success.main', color: 'success.main' },
        }}
      >
        Activate
      </Button>

      <Button
        size="small"
        variant="outlined"
        startIcon={<BlockIcon sx={{ fontSize: 15 }} />}
        onClick={onDeactivate}
        sx={{
          fontSize: 12,
          fontWeight: 600,
          borderRadius: '6px',
          textTransform: 'none',
          borderColor: 'divider',
          color: 'text.primary',
          '&:hover': { borderColor: 'error.main', color: 'error.main' },
        }}
      >
        Deactivate
      </Button>

      <Button
        size="small"
        variant="outlined"
        startIcon={<ArchiveOutlinedIcon sx={{ fontSize: 15 }} />}
        onClick={onArchive}
        sx={{
          fontSize: 12,
          fontWeight: 600,
          borderRadius: '6px',
          textTransform: 'none',
          borderColor: 'divider',
          color: 'text.primary',
          '&:hover': { borderColor: 'warning.main', color: 'warning.main' },
        }}
      >
        Archive
      </Button>
    </Box>
  );
}

// ----------------------------------------------------------------------
// FILTER BAR — Industry, Status, Plan, Expiry range
// ----------------------------------------------------------------------

interface FilterBarProps {
  industry: string;
  status: string;
  plan: string;
  expiryFrom: string;
  expiryTo: string;
  onIndustryChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onPlanChange: (v: string) => void;
  onExpiryFromChange: (v: string) => void;
  onExpiryToChange: (v: string) => void;
}

function FilterBar({
  industry, status, plan, expiryFrom, expiryTo,
  onIndustryChange, onStatusChange, onPlanChange,
  onExpiryFromChange, onExpiryToChange,
}: FilterBarProps) {
  const selectSx = {
    fontSize: 13,
    borderRadius: '8px',
    minWidth: 160,
    bgcolor: 'background.paper',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        mb: 2,
      }}
    >
      {/* Industry */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel sx={{ fontSize: 13 }}>Industry</InputLabel>
        <Select
          value={industry}
          label="Industry"
          onChange={(e) => onIndustryChange(e.target.value)}
          sx={selectSx}
        >
          <MenuItem value=""><em>All Industries</em></MenuItem>
          {ALL_INDUSTRIES.map((ind) => (
            <MenuItem key={ind} value={ind} sx={{ fontSize: 13 }}>{ind}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Status */}
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel sx={{ fontSize: 13 }}>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => onStatusChange(e.target.value)}
          sx={selectSx}
        >
          <MenuItem value=""><em>All Status</em></MenuItem>
          {ALL_STATUSES.map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Subscription Plan */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel sx={{ fontSize: 13 }}>Subscription Plan</InputLabel>
        <Select
          value={plan}
          label="Subscription Plan"
          onChange={(e) => onPlanChange(e.target.value)}
          sx={selectSx}
        >
          <MenuItem value=""><em>All Plans</em></MenuItem>
          {ALL_PLANS.map((p) => (
            <MenuItem key={p} value={p} sx={{ fontSize: 13 }}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Expiry Range */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          size="small"
          type="date"
          label="Expiry From"
          value={expiryFrom}
          onChange={(e) => onExpiryFromChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 155, '& .MuiInputBase-root': { borderRadius: '8px', fontSize: 13, bgcolor: 'background.paper' } }}
        />
        <Typography variant="caption" color="text.secondary">–</Typography>
        <TextField
          size="small"
          type="date"
          label="Expiry To"
          value={expiryTo}
          onChange={(e) => onExpiryToChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 155, '& .MuiInputBase-root': { borderRadius: '8px', fontSize: 13, bgcolor: 'background.paper' } }}
        />
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

function TenantManagement() {
  const theme = useTheme();
  const router = useRouter();

  // ---- Filter state ----
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [expiryFrom, setExpiryFrom] = useState('');
  const [expiryTo, setExpiryTo] = useState('');

  // ---- Selection state ----
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: 'include',
      ids: new Set(),
    });

  // ---- Pagination state — DataGrid uses { page, pageSize } model ----
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,   // DataGrid is 0-indexed
    pageSize: 10,
  });

  // ---- UI state ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ---- Mount guard — prevents MUI X DataGrid SSR hydration error in Next.js App Router.
  // DataGrid's GridFooter reads pagination state (e.g. rowCount.size) via useGridSelector
  // during SSR before the store is initialised, causing a TypeError. Rendering the DataGrid
  // only after the component has mounted on the client sidesteps this entirely. ----
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  // ----------------------------------------------------------------------
  // CLIENT-SIDE FILTERING
  // ----------------------------------------------------------------------

  const filteredRows = useMemo(() => 
     HARDCODED_TENANTS.filter((row) => {
      const matchesIndustry = !industryFilter || row.industry === industryFilter;
      const matchesStatus = !statusFilter || row.status === statusFilter;
      const matchesPlan = !planFilter || row.plan === planFilter;

      // Expiry date range filter
      const expiry = new Date(row.expiryDate);
      const matchesFrom = !expiryFrom || expiry >= new Date(expiryFrom);
      const matchesTo = !expiryTo || expiry <= new Date(expiryTo);

      return matchesIndustry && matchesStatus && matchesPlan && matchesFrom && matchesTo;
    }),
   [industryFilter, statusFilter, planFilter, expiryFrom, expiryTo]);

  // ----------------------------------------------------------------------
  // SELECTION HANDLERS
  // ----------------------------------------------------------------------

  const selectedCount = rowSelectionModel.ids.size;

  // ----------------------------------------------------------------------
  // BULK ACTION HANDLERS (mock — would call API in production)
  // ----------------------------------------------------------------------

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleBulkActivate = () => {
    // TODO: call PATCH /api/tenants/bulk { ids, status: 'Active' }
    showSuccess(`${selectedCount} tenant(s) activated.`);
    setRowSelectionModel({
      type: 'include',
      ids: new Set(),
    });
  };

  const handleBulkDeactivate = () => {
    // TODO: call PATCH /api/tenants/bulk { ids, status: 'Inactive' }
    showSuccess(`${selectedCount} tenant(s) deactivated.`);
    setRowSelectionModel({
      type: 'include',
      ids: new Set(),
    });
  };

  const handleBulkArchive = () => {
    // TODO: call DELETE /api/tenants/bulk { ids }
    showSuccess(`${selectedCount} tenant(s) archived.`);
    setRowSelectionModel({
      type: 'include',
      ids: new Set(),
    });
  };

  // ----------------------------------------------------------------------
  // NAVIGATION HANDLERS
  // ----------------------------------------------------------------------

  const handleViewDetails = (code: string) => {
    // router.push(`/tenant-management/${code}`);
  };

  const handleExport = () => {
    // TODO: trigger CSV / Excel export
  };

  const handleAddTenant = () => {
    router.push(paths.tenantManagement.addTenant);
  };

  // ----------------------------------------------------------------------
  // FILTER RESET
  // ----------------------------------------------------------------------

  const handleReset = () => {
    setIndustryFilter('');
    setStatusFilter('');
    setPlanFilter('');
    setExpiryFrom('');
    setExpiryTo('');
    setPaginationModel({ page: 0, pageSize: 10 });
    setRowSelectionModel({
      type: 'include',
      ids: new Set(),
    });
  };

  // ----------------------------------------------------------------------
  // DATAGRID COLUMN DEFINITIONS
  // ----------------------------------------------------------------------

  const columns: GridColDef<TenantRow>[] = [
    // Code — styled as a primary-coloured link
    {
      field: 'code',
      headerName: 'Code',
      width: 140,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: 12,
            lineHeight: 1.3,
            display: 'block',
          }}
        >
          {params.value}
        </Typography>
      ),
    },

    // Tenant Name — two-line cell: bold name + muted sub-ID
    {
      field: 'tenantName',
      headerName: 'Tenant Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <Box sx={{ lineHeight: 1.4 }}>
          <Typography variant="body2" fontWeight={600} fontSize={13} lineHeight={1.3}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {params.row.tenantId}
          </Typography>
        </Box>
      ),
    },

    // Industry — plain text
    {
      field: 'industry',
      headerName: 'Industry',
      width: 140,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <Typography variant="body2" fontSize={12}>{params.value}</Typography>
      ),
    },

    // Contact Person — plain text
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      width: 160,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <Typography variant="body2" fontSize={12}>{params.value}</Typography>
      ),
    },

    // Email Address — muted colour
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      flex: 1,
      minWidth: 190,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <Typography variant="body2" fontSize={12} color="text.secondary">
          {params.value}
        </Typography>
      ),
    },

    // Plan — coloured badge pill
    {
      field: 'plan',
      headerName: 'Plan',
      width: 130,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <PlanBadge value={params.value as SubscriptionPlan} />
      ),
    },

    // Status — dot + label chip
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams<TenantRow>) => (
        <StatusChip value={params.value as TenantStatus} />
      ),
    },
  ];

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  return (
    <Box>
      {/* ── Breadcrumbs + page title ───────────────────────────────────────── */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Tenant Management"
          paths={[
            { label: 'Organization', href: '/dashboard' },
            { label: 'Tenants', href: '/tenant-management' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              {/* Export button — icon only, outlined circle as in screenshot */}
              <Tooltip title="Export tenants">
                <IconButton
                  onClick={handleExport}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                    p: 0.75,
                    color: 'text.secondary',
                  }}
                >
                  <DownloadIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                onClick={handleAddTenant}
                sx={{ borderRadius: '8px', fontSize: 13, fontWeight: 600, textTransform: 'none' }}
              >
                Add Tenant
              </Button>
            </Stack>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Success / Error alerts ────────────────────────────────────────── */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 1.5 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* ── Filter Bar ───────────────────────────────────────────────────── */}
      <FilterBar
        industry={industryFilter}
        status={statusFilter}
        plan={planFilter}
        expiryFrom={expiryFrom}
        expiryTo={expiryTo}
        onIndustryChange={(v) => { setIndustryFilter(v); setPaginationModel((m) => ({ ...m, page: 0 })); }}
        onStatusChange={(v) => { setStatusFilter(v); setPaginationModel((m) => ({ ...m, page: 0 })); }}
        onPlanChange={(v) => { setPlanFilter(v); setPaginationModel((m) => ({ ...m, page: 0 })); }}
        onExpiryFromChange={(v) => { setExpiryFrom(v); setPaginationModel((m) => ({ ...m, page: 0 })); }}
        onExpiryToChange={(v) => { setExpiryTo(v); setPaginationModel((m) => ({ ...m, page: 0 })); }}
      />

      {/* ── Bulk Action Bar (only when rows are selected) ─────────────────── */}
      <BulkActionBar
        selectedCount={selectedCount}
        onActivate={handleBulkActivate}
        onDeactivate={handleBulkDeactivate}
        onArchive={handleBulkArchive}
      />

      {/* ── DataGrid Table — only rendered client-side to avoid MUI X DataGrid SSR
           TypeError where GridFooter reads rowCount.size before the store is ready ── */}
      {hasMounted && <Paper
        variant="outlined"
        sx={{
          borderRadius: selectedCount > 0 ? '0 0 12px 12px' : '12px',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}

          // ── Pagination ──────────────────────────────────────────────────
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15, 20]}
          pagination

          // ── Selection ───────────────────────────────────────────────────
          checkboxSelection
          disableRowSelectionOnClick={false}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newModel) => setRowSelectionModel(newModel)}

          // ── Row click → view details ────────────────────────────────────
          onRowClick={(params: GridRowParams<TenantRow>) => handleViewDetails(params.row.code)}

          // ── Disable default column menu / filter UI (we have custom FilterBar) ──
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector

          // ── Styling overrides ───────────────────────────────────────────
          sx={{
            border: 'none',
            borderRadius: 0,
            fontSize: 12,

            // Header row
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'background.paper',
              borderBottom: '2px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: 12,
              fontWeight: 700,
              color: 'text.primary',
              py: 1.5,
              '&:focus, &:focus-within': { outline: 'none' },
            },
            '& .MuiDataGrid-columnSeparator': { display: 'none' },

            // Rows
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
              '&:hover': {
                bgcolor: (t: any) => alpha(t.palette.text.primary, 0.025),
              },
              '&.Mui-selected': {
                bgcolor: (t: any) => alpha(t.palette.primary.main, 0.04),
                '&:hover': {
                  bgcolor: (t: any) => alpha(t.palette.primary.main, 0.07),
                },
              },
            },

            // Cells
            '& .MuiDataGrid-cell': {
              py: 1.5,
              px: 2,
              borderBottom: '1px solid',
              borderColor: (t: any) => alpha(t.palette.text.primary, 0.07),
              display: 'flex',
              alignItems: 'center',
              '&:focus, &:focus-within': { outline: 'none' },
            },

            // Checkbox column
            '& .MuiDataGrid-checkboxInput': {
              padding: '4px',
            },

            // Footer / pagination bar
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid',
              borderColor: 'divider',
              minHeight: 48,
              px: 1,
            },
            '& .MuiTablePagination-root': {
              fontSize: 12,
              color: 'text.secondary',
            },
            '& .MuiTablePagination-select': {
              fontSize: 12,
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: 12,
            },

            // No-rows overlay
            '& .MuiDataGrid-overlay': {
              fontSize: 13,
              color: 'text.secondary',
            },

            // Remove outer box shadow / border handled by Paper wrapper
            boxShadow: 'none',
          }}
        />
      </Paper>}
    </Box>
  );
}

export default TenantManagement;