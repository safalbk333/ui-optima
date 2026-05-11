'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Autocomplete,
  Pagination,
  Card,
  CardContent,
  Chip,
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
import { alpha, useTheme } from '@mui/material/styles';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';

// ── icons (MUI free tier) ────────────────────────────────────────────────────
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ── replace these with your actual project imports ───────────────────────────
// import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'next/navigation';

// ── types ─────────────────────────────────────────────────────────────────────
type ContractStatus =
  | 'Draft'
  | 'Under Review'
  | 'Approved'
  | 'Active'
  | 'Expired'
  | 'Terminated';

// ── helpers ───────────────────────────────────────────────────────────────────
const STATUS_COLOR: Record<ContractStatus, string> = {
  Draft: 'default',
  'Under Review': 'warning',
  Approved: 'info',
  Active: 'success',
  Expired: 'error',
  Terminated: 'error',
};

const STATUS_TEXT_COLOR: Record<ContractStatus, string> = {
  Draft: 'text.secondary',
  'Under Review': 'warning.main',
  Approved: 'info.main',
  Active: 'success.main',
  Expired: 'error.main',
  Terminated: 'error.main',
};

// ── custom pagination footer (identical pattern to reference) ─────────────────
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

// ── stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgcolor: string;
}

function StatCard({ label, value, icon, color, bgcolor }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 180,
        border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1.5}>
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

          <Box>
            <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ── sample rows ───────────────────────────────────────────────────────────────
const rows = [
  {
    id: 1,
    contractId: 'CON-2401',
    vendor: 'TechNova Solutions',
    category: 'IT Services',
    value: '₹12,00,000',
    startDate: '01 Jan 2024',
    expiryDate: '31 Dec 2024',
    status: 'Active' as ContractStatus,
  },
  {
    id: 2,
    contractId: 'CON-2402',
    vendor: 'Prime Industrial Supplies',
    category: 'Manufacturing',
    value: '₹8,50,000',
    startDate: '15 Feb 2024',
    expiryDate: '14 Feb 2025',
    status: 'Under Review' as ContractStatus,
  },
  {
    id: 3,
    contractId: 'CON-2403',
    vendor: 'GreenLeaf Traders',
    category: 'Office Supplies',
    value: '₹3,20,000',
    startDate: '01 Mar 2023',
    expiryDate: '28 Feb 2024',
    status: 'Expired' as ContractStatus,
  },
  {
    id: 4,
    contractId: 'CON-2404',
    vendor: 'Skyline Logistics',
    category: 'Logistics',
    value: '₹22,75,000',
    startDate: '10 Apr 2024',
    expiryDate: '09 Apr 2026',
    status: 'Approved' as ContractStatus,
  },
  {
    id: 5,
    contractId: 'CON-2405',
    vendor: 'BrightTech AMC',
    category: 'AMC',
    value: '₹5,60,000',
    startDate: '01 Jun 2024',
    expiryDate: '31 May 2025',
    status: 'Active' as ContractStatus,
  },
  {
    id: 6,
    contractId: 'CON-2406',
    vendor: 'Delta Security Systems',
    category: 'Security',
    value: '₹4,10,000',
    startDate: '01 Jul 2023',
    expiryDate: '30 Jun 2024',
    status: 'Terminated' as ContractStatus,
  },
  {
    id: 7,
    contractId: 'CON-2407',
    vendor: 'Vertex Infra Pvt Ltd',
    category: 'Infrastructure',
    value: '₹18,00,000',
    startDate: '15 Aug 2024',
    expiryDate: '14 Aug 2025',
    status: 'Draft' as ContractStatus,
  },
  {
    id: 8,
    contractId: 'CON-2408',
    vendor: 'ClearWave Telecom',
    category: 'Telecom',
    value: '₹30,50,000',
    startDate: '01 Sep 2024',
    expiryDate: '31 Aug 2027',
    status: 'Active' as ContractStatus,
  },
];

// ── derived stats ──────────────────────────────────────────────────────────────
const totalActive = rows.filter((r) => r.status === 'Active').length;
const totalExpiring = rows.filter((r) => r.status === 'Expired').length;
const totalPending = rows.filter(
  (r) => r.status === 'Under Review' || r.status === 'Draft'
).length;
const totalApproved = rows.filter((r) => r.status === 'Approved').length;

const CATEGORIES = ['IT Services', 'Manufacturing', 'Logistics', 'AMC', 'Telecom', 'Infrastructure', 'Security', 'Office Supplies'];
const STATUSES: ContractStatus[] = ['Draft', 'Under Review', 'Approved', 'Active', 'Expired', 'Terminated'];

// ── main component ────────────────────────────────────────────────────────────
function ContractDashboard() {
  const theme = useTheme();
  const PRIMARY = theme.palette.primary.main;

  // ── column definitions ──────────────────────────────────────────────────────
  const columns: GridColDef[] = [
    { field: 'contractId', headerName: 'Contract ID', flex: 1 },
    { field: 'vendor', headerName: 'Vendor', flex: 1.5 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'value', headerName: 'Contract Value', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'expiryDate', headerName: 'Expiry Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams<(typeof rows)[number], ContractStatus>) => (
        <Chip
          label={params.value}
          size="small"
          color={STATUS_COLOR[params.value!] as any}
          variant="outlined"
          sx={{ fontSize: 11, height: 22, fontWeight: 600 }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      sortable: false,
      renderCell: () => (
        <Button size="small" variant="text" sx={{ fontSize: 11, px: 0.5, minWidth: 0 }}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {/* ── breadcrumb / header ── */}
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
              <Button variant="outlined" onClick={() => router.push(paths.contract.create)}>
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

          <Button variant="outlined" size="small">
            + New Contract
          </Button>
        </Stack>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── stat cards ── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={3}
        flexWrap="wrap"
        useFlexGap
      >
        <StatCard
          label="Active Contracts"
          value={totalActive}
          icon={<AssignmentIcon fontSize="small" />}
          color={theme.palette.success.main}
          bgcolor={alpha(theme.palette.success.main, 0.1)}
        />
        <StatCard
          label="Expiring / Expired"
          value={totalExpiring}
          icon={<WarningAmberIcon fontSize="small" />}
          color={theme.palette.error.main}
          bgcolor={alpha(theme.palette.error.main, 0.1)}
        />
        <StatCard
          label="Pending Approval"
          value={totalPending}
          icon={<HourglassEmptyIcon fontSize="small" />}
          color={theme.palette.warning.main}
          bgcolor={alpha(theme.palette.warning.main, 0.1)}
        />
        <StatCard
          label="Approved"
          value={totalApproved}
          icon={<CheckCircleOutlineIcon fontSize="small" />}
          color={PRIMARY}
          bgcolor={alpha(PRIMARY, 0.1)}
        />
      </Stack>

      {/* ── filters ── */}
      <Box mb={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search Contract / Vendor" fullWidth />

          <Autocomplete
            size="small"
            options={CATEGORIES}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          <Autocomplete
            size="small"
            options={STATUSES}
            sx={{ minWidth: 180 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <Stack direction="row" spacing={1} flexShrink={0}>
            <Button
              variant="contained"
              sx={{ background: PRIMARY, px: 3, color: 'white' }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.text.primary, 0.2) }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ── data grid ── */}
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
            rows={rows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            slots={{ toolbar: GridToolbar, footer: CustomFooter }}
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
                minHeight: 36,
                maxHeight: 36,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContractDashboard;
