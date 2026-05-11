'use client';

import * as React from 'react';
import { Box, Stack, Button, TextField, Typography, Pagination, Autocomplete } from '@mui/material';
import type {
  GridColDef,
  GridRenderCellParams} from '@mui/x-data-grid';
import {
  DataGrid,
  useGridApiContext,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from '@mui/x-data-grid';
import { alpha, useTheme } from '@mui/material/styles';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';

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
  const theme = useTheme();
  const PRIMARY = theme.palette.primary.main;
  const columns: GridColDef[] = [
    { field: 'mrNumber', headerName: 'PR Number', flex: 1 },
    { field: 'type', headerName: 'Request Type', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'budget', headerName: 'Budget', flex: 1 },
    { field: 'approvalLevel', headerName: 'Approval Level', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color = 'text.primary';

        if (params.value === 'Approved') color = 'success.main';
        if (params.value === 'Pending') color = 'warning.main';
        if (params.value === 'Rejected') color = 'error.main';

        return (
          <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
            {params.value}
          </Typography>
        );
      },
    },
    { field: 'orionPr', headerName: 'Orion PR', flex: 1 },
  ];
  const rows = [
    {
      id: 1,
      mrNumber: 'PR-2026-001',
      type: 'Material Request',
      department: 'Procurement',
      budget: '₹1,20,000',
      approvalLevel: 'Level 2',
      status: 'Approved',
      orionPr: 'OR-45872',
    },
    {
      id: 2,
      mrNumber: 'PR-2026-002',
      type: 'Service Request',
      department: 'IT',
      budget: '₹75,000',
      approvalLevel: 'Level 1',
      status: 'Pending',
      orionPr: 'OR-45873',
    },
    {
      id: 3,
      mrNumber: 'PR-2026-003',
      type: 'Asset Purchase',
      department: 'Admin',
      budget: '₹2,50,000',
      approvalLevel: 'Level 3',
      status: 'Rejected',
      orionPr: 'OR-45874',
    },
  ];
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Requisitions"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor', href: '/vendor' },
          ]}
          action={<Button variant="outlined">New Purchase Request</Button>}
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
