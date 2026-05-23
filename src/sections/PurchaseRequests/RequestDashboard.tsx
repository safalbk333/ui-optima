'use client';

import * as React from 'react';

import { Autocomplete, Box, Button, Pagination, Stack, TextField, Typography } from '@mui/material';
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

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
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
        let color = 'text.primary';

        if (params.value === 'Approved') color = 'success.main';
        if (params.value === 'Pending') color = 'warning.main';
        if (params.value === 'Rejected') color = 'error.main';
        if (params.value === 'In Review') color = 'info.main';

        return (
          <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
            {params.value}
          </Typography>
        );
      },
    },
    { field: 'createdDate', headerName: 'Created Date', flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      prNumber: 'PR-2026-001',
      requestType: 'Office Supplies',
      requester: 'Ajith Pradeep',
      department: 'Procurement',
      amount: '₹45,000',
      status: 'Approved',
      createdDate: '12 May 2026',
    },
    {
      id: 2,
      prNumber: 'PR-2026-002',
      requestType: 'Laptop Purchase',
      requester: 'Rahul Nair',
      department: 'IT',
      amount: '₹1,25,000',
      status: 'Pending',
      createdDate: '14 May 2026',
    },
    {
      id: 3,
      prNumber: 'PR-2026-003',
      requestType: 'AMC Renewal',
      requester: 'Sneha Kumar',
      department: 'Administration',
      amount: '₹82,000',
      status: 'In Review',
      createdDate: '15 May 2026',
    },
    {
      id: 4,
      prNumber: 'PR-2026-004',
      requestType: 'Furniture Purchase',
      requester: 'Arun George',
      department: 'Facilities',
      amount: '₹2,10,000',
      status: 'Rejected',
      createdDate: '16 May 2026',
    },
  ];
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
              onClick={() => router.push('/purchase-requests/purchase-request')}
              sx={{ borderRadius: 0.5,fontWeight:600 }}
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
              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
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
            rows={rows}
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
                fontSize: 13,
                fontWeight: 600,
                color: 'primary.main',
              },

              '& .MuiDataGrid-cell': {
                fontSize: 12,
              },

              '& .MuiDataGrid-row': {
                minHeight: 34,
                maxHeight: 34,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
