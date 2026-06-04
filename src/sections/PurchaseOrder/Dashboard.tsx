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
import { fetchPurchaseOrders } from 'src/store/slices/PurchaseOrder/PRSlice';
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
const dispatch = useAppDispatch();

const { data: purchaseOrders, loading } = useAppSelector(
  (state) => state.purchaseOrder
);

useEffect(() => {
  dispatch(fetchPurchaseOrders());
}, [dispatch]);
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

const rows =
  purchaseOrders?.map((po) => ({
    id: po.pk_chr_purchase_order_id,

    poNo: po.chr_po_number,

    vendor: po.vendor?.chr_vendor_name || '-',

    category: po.request?.chr_title || '-',

    poDate: po.dt_issued_at
      ? new Date(po.dt_issued_at).toLocaleDateString()
      : '-',

    deliveryDate: po.dt_expected_delivery
      ? new Date(po.dt_expected_delivery).toLocaleDateString()
      : '-',

    buyer: po.vendor?.chr_vendor_email || '-',

    amount: `${po.chr_currency} ${Number(
      po.flt_total_value || 0
    ).toLocaleString()}`,

    status:
      po.quotation?.chr_status === 'DRAFT'
        ? 'Draft'
        : po.quotation?.chr_status || '-',
  })) || [];

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
                                    sx={{
                px: 3,
                textTransform: 'none',
                boxShadow: 'none',
                                borderRadius: 0.5,

              }}
                        variant="outlined"
                        color='primary'
                        onClick={() => {
                          router.push('/purchase_orders/details');
                        }}
                      >
                        New Purchase Order
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
                borderRadius: 0.5,
              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.text.primary, 0.2),
                minWidth: 90,
                borderRadius: 0.5,
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
            // onRowClick={(params) => {
            //   router.push(`/purchase_orders/details`);
            // }}
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

export default PurchaseOrderDashboard;
