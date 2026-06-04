'use client';

import * as React from 'react';

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
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import type { RootState } from 'src/store/store';
import { fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
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
export default function PurchaseRequests() {
  const router = useRouter();
  const theme = useTheme();
  const PRIMARY = theme.palette.primary.main;
  const dispatch = useAppDispatch();

const { data,loading } = useAppSelector(
  (state: RootState) => state.purchaseRequests
);

React.useEffect(() => {
  dispatch(fetchPurchaseRequests());
}, [dispatch]);
  const columns: GridColDef[] = [
    { field: 'prNumber', headerName: 'PR Number', flex: 1 },
    { field: 'requestType', headerName: 'Request Type', flex: 1 },
    { field: 'requester', headerName: 'Requester', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let bg = '#EEF2FF';
        let color = '#4338CA';

        if (params.value === 'Approved') {
          bg = '#E8F5E9';
          color = '#2E7D32';
        }

        if (params.value === 'Pending') {
          bg = '#FFF8E1';
          color = '#ED6C02';
        }

        if (params.value === 'Rejected') {
          bg = '#FEEBEE';
          color = '#D32F2F';
        }

        if (params.value === 'In Review') {
          bg = '#E3F2FD';
          color = '#0288D1';
        }

        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 1,
              backgroundColor: bg,
              color,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        );
      },
    },
    { field: 'createdDate', headerName: 'Created Date', flex: 1 },
  ];

const rows =
  data?.map((item: any) => ({
    id: item.pk_chr_request_id,
    prNumber: item.chr_request_number,
    requestType: item.category?.chr_category_name || '-',
    requester: item.requested_by?.chr_user_name || '-',
    department: item.department?.chr_department_name || '-',
    amount: `${item.chr_currency} ${Number(item.flt_estimated_value).toLocaleString()}`,
    status: item.current_status?.chr_status_name || '-',
    createdDate: new Date(item.tim_created).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  })) || [];
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Purchase Requests"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'List', href: '/purchase-request' },
          ]}
          action={
            <Button
              color="primary"
              onClick={() => router.push('/purchase-requests/purchase-request')}
              sx={{ borderRadius: 0.5, fontWeight: 600 }}
              variant="outlined"
            >
              New Purchase Request
            </Button>
          }
        />
      </Box>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search" fullWidth />

          <Autocomplete
            size="small"
            options={['IT', 'Admin']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Department" />}
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{
                background: PRIMARY,
                px: 3,
                color: 'white',
                borderRadius: 0.5
              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 0.5,
                borderColor: alpha(theme.palette.text.primary, 0.2),
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* MappingTable Style DataGrid */}
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
            autoHeight
            rows={rows}
            loading={loading}
            columns={columns}
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
              fontSize: 14,
              fontWeight: 500,
              color: 'primary.main',
            },

            '& .MuiDataGrid-cell': {
              fontSize: 13,
              letterSpacing: 0.2,
              fontWeight: 200,
            },

            '& .MuiDataGrid-row': {
              minHeight: 34,
              maxHeight: 34,
            },

            // Hide scrollbars
            '& .MuiDataGrid-main': {
              overflow: 'hidden',
            },

            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden !important',
            },

            '& .MuiDataGrid-scrollbar': {
              display: 'none',
            },

            '& ::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          />
        </Box>
      </Box>
    </Box>
  );
}
