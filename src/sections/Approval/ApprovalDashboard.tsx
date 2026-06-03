'use client';

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
  useGridApiContext,
} from '@mui/x-data-grid';
import type {
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import React, { useEffect } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

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

function ApprovalDashboard() {
  const theme = useTheme();
   const dispatch = useAppDispatch();
  const router = useRouter();
const { data: purchaseRequests, loading } = useAppSelector(
  (state) => state.purchaseRequests
);
  const PRIMARY = theme.palette.primary.main;
  useEffect(() => {
    dispatch(fetchPurchaseRequests());
  }, [dispatch]);
const columns: GridColDef[] = [
  {
    field: 'requestNo',
    headerName: 'Request No',
    flex: 1.2,
  },
  {
    field: 'submittedAgo',
    headerName: 'Age',
    width: 90,
  },
  {
    field: 'requester',
    headerName: 'Requester',
    flex: 1,
  },
  {
    field: 'department',
    headerName: 'Department',
    flex: 1,
  },
  {
    field: 'itemSummary',
    headerName: 'Item Summary',
    flex: 2,
  },
  {
    field: 'lineItems',
    headerName: 'Lines',
    width: 90,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 110,
    renderCell: (params: GridRenderCellParams) => {
      const map: Record<string, any> = {
        High: { color: '#b91c1c', bgcolor: '#fee2e2' },
        Medium: { color: '#b45309', bgcolor: '#fef3c7' },
        Low: { color: '#15803d', bgcolor: '#dcfce7' },
      };

      return (
        <Chip
          size="small"
          label={params.value}
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: map[params.value]?.color,
            bgcolor: map[params.value]?.bgcolor,
          }}
        />
      );
    },
  },
  {
    field: 'status',
    headerName: 'Approval Status',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const map: Record<string, any> = {
        Pending: { color: '#b45309', bgcolor: '#fef3c7' },
        Approved: { color: '#15803d', bgcolor: '#dcfce7' },
        Rejected: { color: '#b91c1c', bgcolor: '#fee2e2' },
      };

      return (
        <Chip
          size="small"
          label={params.value}
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: map[params.value]?.color,
            bgcolor: map[params.value]?.bgcolor,
          }}
        />
      );
    },
  },
];

const rows =
  purchaseRequests?.map((item) => ({
    id: item.pk_chr_request_id,
    requestNo: item.chr_request_number,
    submittedAgo: item.tim_created
      ? `${Math.floor(
          (Date.now() - new Date(item.tim_created).getTime()) /
            (1000 * 60 * 60)
        )}h`
      : '-',
    requester: item.requested_by?.chr_user_name || '-',
    department: item.department?.chr_department_name || '-',
    itemSummary: item.chr_title,
    lineItems: 1, // replace with actual count if available
    priority: item.priority?.chr_priority_name || '-',
    status: item.current_status?.chr_status_name || '-',
    justification: item.txt_description,
    estimatedValue: item.flt_estimated_value,
    currency: item.chr_currency,
  })) || [];

  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Approval Que"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Approval', href: '/approval' },
          ]}

        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Filters */}

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField
            size="small"
            label="Search PO"
            placeholder="Search by PO number or title"
            fullWidth
          />

          <Autocomplete
            size="small"
            options={['Open', 'Acknowledged', 'Pending', 'Closed', 'Rejected']}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <Autocomplete
            size="small"
            options={['IT Equipment', 'Furniture', 'Logistics', 'Safety']}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{
                background: PRIMARY,
                px: 2.5,
                minWidth: 90,
              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.text.primary, 0.2),
                minWidth: 90,
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Table */}

      <Box sx={{ borderRadius: 2 ,mt:-1}}>
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
            loading={loading}
            autoHeight
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            slots={{
              toolbar: GridToolbar,
              footer: CustomFooter,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
            onRowClick={(params) => {
              router.push(`/approval/view`);
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
            sx={{
              fontSize: 13,

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'transparent',
                minHeight: 42,
                maxHeight: 42,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
              },

              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'transparent !important',
              },

              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: 13,
                fontWeight: 700,
                color: 'primary.main',
              },

              '& .MuiDataGrid-cell': {
                fontSize: 13,
                alignItems: 'center',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
              },

              '& .MuiDataGrid-row': {
                minHeight: 44,
                maxHeight: 44,
                cursor: 'pointer',
              },

              '& .MuiDataGrid-row:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.03),
              },

              '& .MuiDataGrid-toolbarContainer': {
                px: 1,
                py: 0.5,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ApprovalDashboard;
