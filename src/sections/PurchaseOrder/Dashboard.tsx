'use client';

import React from 'react';
import {
  Box,
  Chip,
  Stack,
  Button,
  TextField,
  Typography,
  Pagination,
  Autocomplete,
} from '@mui/material';

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
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { useRouter } from 'next/navigation';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

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

function PurchaseOrderDashboard() {
  const theme = useTheme();
  const router = useRouter();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'poNo',
      headerName: 'PO No',
      flex: 1,
    },

    {
      field: 'title',
      headerName: 'PO Title',
      flex: 1.8,
    },

    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },

    {
      field: 'poDate',
      headerName: 'PO Date',
      flex: 1,
    },

    {
      field: 'deliveryDate',
      headerName: 'Delivery Date',
      flex: 1,
    },

    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 1,
    },

    {
      field: 'amount',
      headerName: 'PO Amount',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color = 'default';

        if (params.value === 'Open') color = 'info';
        if (params.value === 'Acknowledged') color = 'success';
        if (params.value === 'Pending') color = 'warning';
        if (params.value === 'Closed') color = 'default';
        if (params.value === 'Rejected') color = 'error';

        return (
          <Chip
            label={params.value}
            sx={{
              fontSize: 11,
              height: 24,
              fontWeight: 600,
            }}
            color={color as any}
            size="small"
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      poNo: 'PO-2026-1001',
      title: 'Dell Latitude Laptop Procurement',
      category: 'IT Equipment',
      poDate: '01 May 2026',
      deliveryDate: '10 May 2026',
      buyer: 'Procurement Team',
      amount: '$24,500',
      status: 'Open',
    },

    {
      id: 2,
      poNo: 'PO-2026-1002',
      title: 'Office Workstation Chairs',
      category: 'Furniture',
      poDate: '28 Apr 2026',
      deliveryDate: '08 May 2026',
      buyer: 'Admin Department',
      amount: '$8,200',
      status: 'Acknowledged',
    },

    {
      id: 3,
      poNo: 'PO-2026-1003',
      title: 'Warehouse Transportation Services',
      category: 'Logistics',
      poDate: '26 Apr 2026',
      deliveryDate: '06 May 2026',
      buyer: 'Supply Chain',
      amount: '$14,000',
      status: 'Pending',
    },

    {
      id: 4,
      poNo: 'PO-2026-1004',
      title: 'Industrial Safety Kits',
      category: 'Safety',
      poDate: '24 Apr 2026',
      deliveryDate: '04 May 2026',
      buyer: 'Operations',
      amount: '$6,750',
      status: 'Rejected',
    },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Purchase Orders"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Purchase Orders', href: '/purchase_orders' },
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
              router.push(`/purchase_orders/details`);
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

export default PurchaseOrderDashboard;
