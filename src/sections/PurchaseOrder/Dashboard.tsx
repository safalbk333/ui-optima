'use client';

import {
  Box,
  Chip,
  Stack,
  Button,
  TextField,
  Pagination,
  Typography,
  Autocomplete,
} from '@mui/material';
import {
  DataGrid,
  useGridApiContext,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from '@mui/x-data-grid';
import type {
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
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

function PurchaseOrderDashboard() {
  const theme = useTheme();
  const router = useRouter();

  const PRIMARY = theme.palette.primary.main;

const columns: GridColDef[] = [
  {
    field: 'poNo',
    headerName: 'PO Number',
    flex: 1,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1.5,
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
    headerName: 'Expected Delivery',
    flex: 1,
  },
  {
    field: 'buyer',
    headerName: 'Buyer',
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'PO Value',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      const statusStyles: Record<string, any> = {
        Draft: {
          color: '#6b7280',
          bgcolor: '#f3f4f6',
        },
        Approved: {
          color: '#15803d',
          bgcolor: '#dcfce7',
        },
        Sent: {
          color: '#1d4ed8',
          bgcolor: '#dbeafe',
        },
        Partial: {
          color: '#b45309',
          bgcolor: '#fef3c7',
        },
        Closed: {
          color: '#374151',
          bgcolor: '#e5e7eb',
        },
        Cancelled: {
          color: '#b91c1c',
          bgcolor: '#fee2e2',
        },
      };

      const style = statusStyles[params.value] || {};

      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            height: 26,
            fontSize: 12,
            fontWeight: 600,
            borderRadius: '8px',
            color: style.color,
            bgcolor: style.bgcolor,
          }}
        />
      );
    },
  },
];

const rows = [
  {
    id: 1,
    poNo: 'PO-2026-1001',
    vendor: 'Dell Technologies',
    category: 'IT Equipment',
    poDate: '01 May 2026',
    deliveryDate: '10 May 2026',
    buyer: 'Ajith Kumar',
    amount: '$24,500',
    status: 'Approved',
  },
  {
    id: 2,
    poNo: 'PO-2026-1002',
    vendor: 'Godrej Interio',
    category: 'Furniture',
    poDate: '05 May 2026',
    deliveryDate: '18 May 2026',
    buyer: 'Anjali Nair',
    amount: '$8,200',
    status: 'Sent',
  },
  {
    id: 3,
    poNo: 'PO-2026-1003',
    vendor: 'DHL Logistics',
    category: 'Logistics',
    poDate: '08 May 2026',
    deliveryDate: '20 May 2026',
    buyer: 'Rahul Menon',
    amount: '$14,000',
    status: 'Partial',
  },
  {
    id: 4,
    poNo: 'PO-2026-1004',
    vendor: '3M Safety Solutions',
    category: 'Safety',
    poDate: '10 May 2026',
    deliveryDate: '22 May 2026',
    buyer: 'Vivek Nair',
    amount: '$6,750',
    status: 'Draft',
  },
  {
    id: 5,
    poNo: 'PO-2026-1005',
    vendor: 'HP Enterprise',
    category: 'IT Equipment',
    poDate: '12 May 2026',
    deliveryDate: '25 May 2026',
    buyer: 'Ajith Kumar',
    amount: '$18,900',
    status: 'Closed',
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
                    action={
                      <Button
                        variant="outlined"
                        onClick={() => {
                          router.push(paths.products.products);
                        }}
                      >
                        New PO
                      </Button>
                    }
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
