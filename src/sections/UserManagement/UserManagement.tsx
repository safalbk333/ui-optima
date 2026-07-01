'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Pagination,
  Autocomplete,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  DataGrid,
  useGridApiContext,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from '@mui/x-data-grid';
import {
  GridToolbar,
  useGridSelector,
} from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

type ViewMode = 'table' | 'grid';

interface UserRow {
  id: string;
  userId: string;
  employeeCode: string;
  userName: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  jobRole: string;
  groupRoles: string[];
  adUser: boolean;
  // Procurement2Pay additions
  isVendor: boolean;
  vendorId?: string;       // e.g. VND-0014 — only present when isVendor is true
  vendorName?: string;     // linked vendor company name
  prazStatus?: 'Verified' | 'Pending' | 'Expired'; // PRAZ registration status for vendors
  department: string;
}

// ----------------------------------------------------------------------
// HARDCODED USER DATA — Procurement2Pay context
// Users can be internal staff (buyers, finance, approvers) OR vendor contacts
// ----------------------------------------------------------------------

const HARDCODED_USERS: UserRow[] = [
  // ── Internal Staff ──────────────────────────────────────────────────
  {
    id: '1',
    userId: 'USR-0001',
    employeeCode: 'EMP001',
    userName: 'Tendai Moyo',
    email: 'tendai.moyo@optima.co.zw',
    status: 'Active',
    jobRole: 'Procurement Officer',
    department: 'Procurement & Supply',
    groupRoles: ['Buyer', 'Approver'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '2',
    userId: 'USR-0002',
    employeeCode: 'EMP002',
    userName: 'Chiedza Mutasa',
    email: 'chiedza.mutasa@optima.co.zw',
    status: 'Active',
    jobRole: 'Finance Manager',
    department: 'Finance',
    groupRoles: ['Finance', 'Approver'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '3',
    userId: 'USR-0003',
    employeeCode: 'EMP003',
    userName: 'Takumi F',
    email: 'takumi.f@optima.co.zw',
    status: 'Active',
    jobRole: 'Procurement Manager',
    department: 'Procurement & Supply',
    groupRoles: ['Approver', 'Admin'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '4',
    userId: 'USR-0004',
    employeeCode: 'EMP004',
    userName: 'Farai Ncube',
    email: 'farai.ncube@optima.co.zw',
    status: 'Active',
    jobRole: 'Stores Keeper',
    department: 'Warehouse & Logistics',
    groupRoles: ['GRN Officer'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '5',
    userId: 'USR-0005',
    employeeCode: 'EMP005',
    userName: 'Rutendo Dube',
    email: 'rutendo.dube@optima.co.zw',
    status: 'Active',
    jobRole: 'Accounts Payable Officer',
    department: 'Finance',
    groupRoles: ['Finance', 'Invoice Processor'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '6',
    userId: 'USR-0006',
    employeeCode: 'EMP006',
    userName: 'Blessing Chikwanda',
    email: 'blessing.chikwanda@optima.co.zw',
    status: 'Pending',
    jobRole: 'Procurement Assistant',
    department: 'Procurement & Supply',
    groupRoles: ['Buyer'],
    adUser: false,
    isVendor: false,
  },
  {
    id: '7',
    userId: 'USR-0007',
    employeeCode: 'EMP007',
    userName: 'Munyaradzi Hove',
    email: 'munyaradzi.hove@optima.co.zw',
    status: 'Inactive',
    jobRole: 'IT Administrator',
    department: 'Information Technology',
    groupRoles: ['Admin', 'Viewer'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '8',
    userId: 'USR-0008',
    employeeCode: 'EMP008',
    userName: 'Tatenda Zimba',
    email: 'tatenda.zimba@optima.co.zw',
    status: 'Active',
    jobRole: 'Contract Manager',
    department: 'Legal & Contracts',
    groupRoles: ['Contract Manager', 'Approver'],
    adUser: true,
    isVendor: false,
  },

  // ── Vendor Users ─────────────────────────────────────────────────────
  // Vendors are given portal accounts to submit invoices, respond to RFQs, etc.
  {
    id: '9',
    userId: 'USR-0009',
    employeeCode: 'VND-EMP001',
    userName: 'Simba Chigova',
    email: 'procurement@zcl.co.zw',
    status: 'Active',
    jobRole: 'Vendor Contact',
    department: 'External',
    groupRoles: ['Vendor'],
    adUser: false,
    isVendor: true,
    vendorId: 'VND-0014',
    vendorName: 'Zimbabwe Cooling Ltd',
    prazStatus: 'Verified',
  },
  {
    id: '10',
    userId: 'USR-0010',
    employeeCode: 'VND-EMP002',
    userName: 'Nomsa Dlamini',
    email: 'nomsa@saftech.co.zw',
    status: 'Active',
    jobRole: 'Vendor Contact',
    department: 'External',
    groupRoles: ['Vendor'],
    adUser: false,
    isVendor: true,
    vendorId: 'VND-0021',
    vendorName: 'Safire Technologies',
    prazStatus: 'Verified',
  },
  {
    id: '11',
    userId: 'USR-0011',
    employeeCode: 'VND-EMP003',
    userName: 'Elias Banda',
    email: 'elias@zimprintworks.co.zw',
    status: 'Pending',
    jobRole: 'Vendor Contact',
    department: 'External',
    groupRoles: ['Vendor'],
    adUser: false,
    isVendor: true,
    vendorId: 'VND-0033',
    vendorName: 'Zimbabwe Print Works',
    prazStatus: 'Pending',
  },
  {
    id: '12',
    userId: 'USR-0012',
    employeeCode: 'VND-EMP004',
    userName: 'Precious Mokoena',
    email: 'precious@transzim.co.zw',
    status: 'Active',
    jobRole: 'Vendor Contact',
    department: 'External',
    groupRoles: ['Vendor'],
    adUser: false,
    isVendor: true,
    vendorId: 'VND-0007',
    vendorName: 'TransZim Logistics',
    prazStatus: 'Verified',
  },
  {
    id: '13',
    userId: 'USR-0013',
    employeeCode: 'VND-EMP005',
    userName: 'Charles Osei',
    email: 'charles@afrobuild.co.zw',
    status: 'Inactive',
    jobRole: 'Vendor Contact',
    department: 'External',
    groupRoles: ['Vendor'],
    adUser: false,
    isVendor: true,
    vendorId: 'VND-0042',
    vendorName: 'Afro Build Supplies',
    prazStatus: 'Expired',
  },
  {
    id: '14',
    userId: 'USR-0014',
    employeeCode: 'EMP009',
    userName: 'Vimbai Chirwa',
    email: 'vimbai.chirwa@optima.co.zw',
    status: 'Active',
    jobRole: 'RFQ Coordinator',
    department: 'Procurement & Supply',
    groupRoles: ['Buyer', 'RFQ Manager'],
    adUser: true,
    isVendor: false,
  },
  {
    id: '15',
    userId: 'USR-0015',
    employeeCode: 'EMP010',
    userName: 'Kudakwashe Marimo',
    email: 'kudakwashe.marimo@optima.co.zw',
    status: 'Active',
    jobRole: 'Chief Finance Officer',
    department: 'Finance',
    groupRoles: ['Finance', 'Approver', 'Admin'],
    adUser: true,
    isVendor: false,
  },
];

// ----------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#c62828', '#00796b'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

// ----------------------------------------------------------------------
// STATUS CHIP
// ----------------------------------------------------------------------

function StatusChip({ value }: { value: string }) {
  let bg = '#EEF2FF';
  let color = '#4338CA';

  if (value === 'Active') {
    bg = '#E8F5E9';
    color = '#2E7D32';
  }
  if (value === 'Pending') {
    bg = '#FFF8E1';
    color = '#ED6C02';
  }
  if (value === 'Inactive') {
    bg = '#FEEBEE';
    color = '#D32F2F';
  }

  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 22,
        fontSize: 11,
        fontWeight: 600,
        borderRadius: 1,
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 1 },
      }}
    />
  );
}

// ── PRAZ Status Chip — for vendor users only ──────────────────────────
function PrazChip({ value }: { value: 'Verified' | 'Pending' | 'Expired' }) {
  const map: Record<string, { bg: string; color: string }> = {
    Verified: { bg: '#E8F5E9', color: '#2E7D32' },
    Pending:  { bg: '#FFF8E1', color: '#ED6C02' },
    Expired:  { bg: '#FEEBEE', color: '#D32F2F' },
  };
  const { bg, color } = map[value] ?? { bg: '#F5F5F5', color: '#616161' };

  return (
    <Chip
      label={`PRAZ: ${value}`}
      size="small"
      sx={{
        height: 20,
        fontSize: 10,
        fontWeight: 600,
        borderRadius: 1,
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 0.75 },
      }}
    />
  );
}

// ----------------------------------------------------------------------
// CUSTOM DATAGRID FOOTER
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// USER CARD (Grid view)
// ----------------------------------------------------------------------

interface UserCardProps {
  user: UserRow;
  onEdit: (userId: string) => void;
  onClick: (userId: string) => void;
}

function UserCard({ user, onEdit, onClick }: UserCardProps) {
  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: (theme) => `0 2px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
      onClick={() => onClick(user.userId)}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* ---- Header row: AD badge + Vendor badge + Edit ---- */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
          <Stack direction="row" spacing={0.75} flexWrap="wrap">
            <Chip
              label={user.adUser ? 'AD USER' : 'NON AD USER'}
              size="small"
              variant="outlined"
              sx={{
                height: 22,
                fontSize: 10,
                fontWeight: 600,
                borderRadius: 1,
                borderColor: 'divider',
                color: 'text.secondary',
                '& .MuiChip-label': { px: 1 },
              }}
            />
            {/* Vendor badge — shown only for vendor-linked users */}
            {user.isVendor && (
              <Chip
                icon={<StorefrontOutlinedIcon sx={{ fontSize: '12px !important' }} />}
                label="VENDOR"
                size="small"
                variant="outlined"
                sx={{
                  height: 22,
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 1,
                  borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                  color: 'primary.main',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
          </Stack>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(user.userId);
              }}
              sx={{ color: 'text.secondary', p: 0.5 }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* ---- Avatar + name ---- */}
        <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: 13,
              fontWeight: 600,
              bgcolor: getAvatarColor(user.userName),
            }}
          >
            {getInitials(user.userName)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} lineHeight={1.2}>
              {user.userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ borderTop: '1px dashed', borderColor: 'divider', pt: 1.5, mb: 1.5 }} />

        {/* ---- Meta grid ---- */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
            <Box mt={0.25}>
              <StatusChip value={user.status} />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Employee Code
            </Typography>
            <Typography variant="body2" fontWeight={600} mt={0.25}>
              {user.employeeCode}
            </Typography>
          </Box>

          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography variant="caption" color="text.secondary">
              Job Role
            </Typography>
            <Typography variant="body2" fontWeight={600} mt={0.25}>
              {user.jobRole || '—'}
            </Typography>
          </Box>

          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography variant="caption" color="text.secondary">
              Department
            </Typography>
            <Typography variant="body2" fontWeight={600} mt={0.25}>
              {user.department}
            </Typography>
          </Box>
        </Box>

        {/* ---- Vendor details block — only for vendor users ---- */}
        {user.isVendor && user.vendorId && (
          <Box
            sx={{
              bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
              borderRadius: 1,
              px: 1.25,
              py: 1,
              mb: 1.5,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {user.vendorId}
                </Typography>
                <Typography variant="caption" fontWeight={700} color="primary.main">
                  {user.vendorName}
                </Typography>
              </Box>
              {user.prazStatus && <PrazChip value={user.prazStatus} />}
            </Stack>
          </Box>
        )}

        {/* ---- Group Roles ---- */}
        {user.groupRoles.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Group Roles
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {user.groupRoles.map((role) => (
                <Chip
                  key={role}
                  label={role}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 10,
                    fontWeight: 500,
                    borderRadius: 1,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* ---- View Details ---- */}
        <Box mt={1.5}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onClick(user.userId);
            }}
            sx={{
              borderColor: 'divider',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 12,
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

function UserManagement() {
  const theme = useTheme();
  const router = useRouter();
  const PRIMARY = theme.palette.primary.main;

  // ---- View mode state ----
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // ---- Search & filter state ----
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // Additional P2P filter: show only vendor users
  const [vendorFilter, setVendorFilter] = useState<'All' | 'Vendor' | 'Internal'>('All');

  // ---- Loading state (for simulation) ----
  const [loading, setLoading] = useState(false);

  // ---- Error state ----
  const [error, setError] = useState<string | null>(null);

  // ----------------------------------------------------------------------
  // USE HARDCODED DATA INSTEAD OF API
  // ----------------------------------------------------------------------

  const users = HARDCODED_USERS;

  // ----------------------------------------------------------------------
  // MAP DATA → rows (already in correct format)
  // ----------------------------------------------------------------------

  const rows: UserRow[] = users;

  // ---- Apply client-side search/filter ----
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      !searchQuery ||
      row.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // Also allow searching by vendor name or vendor ID
      (row.vendorName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.vendorId ?? '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      !selectedRole || row.jobRole === selectedRole;

    // Vendor / Internal tab filter
    const matchesVendorFilter =
      vendorFilter === 'All' ||
      (vendorFilter === 'Vendor' && row.isVendor) ||
      (vendorFilter === 'Internal' && !row.isVendor);

    return matchesSearch && matchesRole && matchesVendorFilter;
  });

  // ---- Unique job roles for filter dropdown ----
  const jobRoleOptions = [...new Set(rows.map((r) => r.jobRole).filter((r) => r !== 'N/A'))];

  // ----------------------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------------------

  const handleViewDetails = (userId: string) => {
    router.push(paths.userManagement.details);
  };

  const handleEdit = (userId: string) => {
    router.push(paths.userManagement.addUser);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedRole(null);
    setVendorFilter('All');
  };

  // ----------------------------------------------------------------------
  // DATAGRID COLUMNS
  // ----------------------------------------------------------------------

  const columns: GridColDef[] = [
    {
      field: 'employeeCode',
      headerName: 'Employee Code',
      flex: 1,
    },
    {
      field: 'userName',
      headerName: 'User Name',
      flex: 1.4,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" alignItems="center" spacing={1} height="100%">
          <Avatar
            sx={{
              width: 26,
              height: 26,
              fontSize: 10,
              fontWeight: 600,
              bgcolor: getAvatarColor(params.value),
            }}
          >
            {getInitials(params.value)}
          </Avatar>
          <Stack>
            <Typography fontSize={12} fontWeight={600} lineHeight={1.2}>
              {params.value}
            </Typography>
            {/* Show vendor badge inline for vendor users */}
            {params.row.isVendor && (
              <Typography fontSize={10} color="primary.main" lineHeight={1.2}>
                {params.row.vendorName}
              </Typography>
            )}
          </Stack>
        </Stack>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.6,
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1.2,
    },
    {
      field: 'jobRole',
      headerName: 'Job Role',
      flex: 1,
    },
    {
      field: 'groupRoles',
      headerName: 'Group Roles',
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" flexWrap="wrap" gap={0.5} alignItems="center" height="100%">
          {(params.value as string[]).slice(0, 2).map((role: string) => (
            <Chip
              key={role}
              label={role}
              size="small"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 500,
                borderRadius: 1,
                bgcolor: alpha(PRIMARY, 0.08),
                color: 'primary.main',
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          ))}
          {(params.value as string[]).length > 2 && (
            <Typography fontSize={10} color="text.secondary">
              +{(params.value as string[]).length - 2}
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => <StatusChip value={params.value} />,
    },
    {
      // PRAZ status column — only meaningful for vendor rows; blank for internal staff
      field: 'prazStatus',
      headerName: 'PRAZ',
      flex: 0.9,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? <PrazChip value={params.value} /> : null,
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.5,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" alignItems="center" height="100%">
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(params.row.userId);
              }}
              sx={{ color: 'text.secondary', p: 0.5 }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="User Management"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'User Management', href: '/user-management' },
            { label: 'User', href: '/user-management/user' },
          ]}
          action={
            <Button
              variant="outlined"
              onClick={() => router.push(paths.userManagement.addUser)}
            >
              Add User
            </Button>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ---------------------------------------------------------------- */}
      {/* VENDOR / INTERNAL QUICK-FILTER TABS                               */}
      {/* Lets the admin quickly narrow to vendor portal users or staff     */}
      {/* ---------------------------------------------------------------- */}

      <Stack direction="row" spacing={1} mb={3}>
        {(['All', 'Internal', 'Vendor'] as const).map((label) => (
          <Button
            key={label}
            size="small"
            variant={vendorFilter === label ? 'contained' : 'outlined'}
            onClick={() => setVendorFilter(label)}
            sx={{
              fontSize: 12,
              borderRadius: 1,
              textTransform: 'none',
              borderColor: alpha(theme.palette.text.primary, 0.2),
              ...(vendorFilter !== label && { color: 'text.secondary' }),
            }}
          >
            {label === 'All'
              ? `All Users (${rows.length})`
              : label === 'Vendor'
                ? `Vendor Users (${rows.filter((r) => r.isVendor).length})`
                : `Internal Staff (${rows.filter((r) => !r.isVendor).length})`}
          </Button>
        ))}
      </Stack>

      {/* ---------------------------------------------------------------- */}
      {/* FILTERS + VIEW TOGGLE                                              */}
      {/* ---------------------------------------------------------------- */}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={2}
      >
        {/* Search — extended to match vendor name & vendor ID */}
        <TextField
          size="small"
          label="Search by name, email, vendor..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Role filter */}
        <Autocomplete
          size="small"
          options={jobRoleOptions}
          value={selectedRole}
          onChange={(_, val) => setSelectedRole(val)}
          sx={{ minWidth: 220 }}
          renderInput={(params) => <TextField {...params} label="Job Role" />}
        />

        {/* Apply / Reset */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            sx={{
              background: PRIMARY,
              px: 3,
              color: 'white',
              whiteSpace: 'nowrap',
            }}
          >
            Apply
          </Button>

          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: alpha(theme.palette.text.primary, 0.2),
              whiteSpace: 'nowrap',
            }}
          >
            Reset
          </Button>
        </Stack>

        {/* View mode toggle */}
        <Stack direction="row" spacing={0.5} sx={{ ml: { sm: 'auto' } }}>
          <Tooltip title="Grid view">
            <IconButton
              size="small"
              onClick={() => setViewMode('grid')}
              sx={{
                border: '1px solid',
                borderColor: viewMode === 'grid' ? 'primary.main' : 'divider',
                borderRadius: 1,
                color: viewMode === 'grid' ? 'primary.main' : 'text.secondary',
                bgcolor: viewMode === 'grid' ? alpha(PRIMARY, 0.06) : 'transparent',
              }}
            >
              <ViewModuleIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Table view">
            <IconButton
              size="small"
              onClick={() => setViewMode('table')}
              sx={{
                border: '1px solid',
                borderColor: viewMode === 'table' ? 'primary.main' : 'divider',
                borderRadius: 1,
                color: viewMode === 'table' ? 'primary.main' : 'text.secondary',
                bgcolor: viewMode === 'table' ? alpha(PRIMARY, 0.06) : 'transparent',
              }}
            >
              <ViewListIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* ---------------------------------------------------------------- */}
      {/* ERROR STATE                                                        */}
      {/* ---------------------------------------------------------------- */}

      {error && (
        <Box mt={2} mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TABLE VIEW                                                         */}
      {/* ---------------------------------------------------------------- */}

      {viewMode === 'table' && (
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
            loading={loading}
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            onRowClick={(params) => handleViewDetails(params.row.userId)}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            slots={{
              toolbar: GridToolbar,
              footer: CustomFooter,
              loadingOverlay: () => (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <CircularProgress size={28} />
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
              cursor: 'pointer',

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
      )}

      {/* ---------------------------------------------------------------- */}
      {/* GRID VIEW                                                          */}
      {/* ---------------------------------------------------------------- */}

      {viewMode === 'grid' && (
        <>
          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" py={8}>
              <CircularProgress size={28} />
            </Box>
          ) : filteredRows.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" py={8}>
              <Typography color="text.secondary">No users found.</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2,
              }}
            >
              {filteredRows.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onClick={handleViewDetails}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default UserManagement;