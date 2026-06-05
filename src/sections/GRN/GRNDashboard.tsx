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
import React, { useEffect, useMemo } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { fetchGoodsReceipts } from 'src/store/slices/Grn/GrnSlice';
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

function GRNDashboard() {
  const theme = useTheme();
  const router = useRouter();
const dispatch = useAppDispatch();

const { data: grns, loading } = useAppSelector(
  (state) => state.goodsReceipt
);

useEffect(() => {
  dispatch(fetchGoodsReceipts());
}, [dispatch]);
  const PRIMARY = theme.palette.primary.main;

const columns: GridColDef[] = [
  {
    field: 'grnNo',
    headerName: 'GRN No',
    flex: 1,
  },

  {
    field: 'poNo',
    headerName: 'PO No',
    flex: 1,
  },

  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1.5,
  },

  {
    field: 'receiptDate',
    headerName: 'Receipt Date',
    flex: 1,
  },

  {
    field: 'receivedBy',
    headerName: 'Received By',
    flex: 1,
  },

  {
    field: 'itemsReceived',
    headerName: 'Items Received',
    flex: 1,
  },

{
  field: 'inspectionStatus',
  headerName: 'Status',
  flex: 1,
  renderCell: (params: GridRenderCellParams) => {
    let bgColor = '#F3F4F6';
    let textColor = '#6B7280';

    if (params.value === 'Approved') {
      bgColor = '#E8F5E9';
      textColor = '#2E7D32';
    }

    if (params.value === 'Pending') {
      bgColor = '#FFF8E1';
      textColor = '#ED6C02';
    }

    if (params.value === 'Rejected') {
      bgColor = '#FDEDED';
      textColor = '#D32F2F';
    }

    return (
      <Chip
        label={params.value}
        size="small"
        sx={{
          height: 26,
          fontSize: 11,
          fontWeight: 600,
          bgcolor: bgColor,
          color: textColor,
          border: 'none',

          '& .MuiChip-label': {
            px: 1.2,
          },
        }}
      />
    );
  },
},
];

const rows = useMemo(
  () =>
    (grns || []).map((grn) => ({
      id: grn.pk_chr_goods_receipt_id,

      grnNo: grn.chr_grn_code,

      poNo: grn.purchase_order?.chr_po_number || '',

      vendor: '-',

      receiptDate: grn.dt_received_at
        ? new Date(grn.dt_received_at).toLocaleDateString()
        : '',

      receivedBy: grn.fk_chr_created_id || 'System',

      itemsReceived:
        grn.goods_receipt_items?.reduce(
          (sum, item) => sum + (item.int_quantity_received || 0),
          0
        ) || 0,

      inspectionStatus:
        grn.chr_status === 'PENDING'
          ? 'Pending'
          : grn.chr_status === 'APPROVED'
          ? 'Approved'
          : grn.chr_status === 'REJECTED'
          ? 'Rejected'
          : grn.chr_status,
    })),
  [grns]
);

  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
<PremiumBreadcrumbs
  title="GRN Details"
  paths={[
    { label: 'Home', href: '/dashboard' },
    { label: 'GRN Details', href: '/grn' },
  ]}
            action={
              <Button
                            sx={{
                borderRadius: 0.5,
                px: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}
              color='primary'
                variant="outlined"
                onClick={() => {
                  router.push(paths.grn.new);
                }}
              >
                New GRN
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
  label="Search GRN"
  placeholder="Search by GRN number or PO number"
  fullWidth
/>

<Autocomplete
  size="small"
  options={['Approved', 'Pending', 'Rejected']}
  sx={{ minWidth: 200 }}
  renderInput={(params) => (
    <TextField {...params} label="Inspection Status" />
  )}
/>

<Autocomplete
  size="small"
  options={[
    'Dell Technologies',
    'Godrej Interio',
    'ABC Logistics',
    'Safety World Pvt Ltd',
  ]}
  sx={{ minWidth: 220 }}
  renderInput={(params) => (
    <TextField {...params} label="Vendor" />
  )}
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
            loading={loading}
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

export default GRNDashboard;
