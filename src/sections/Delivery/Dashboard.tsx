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
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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

function VendorShipmentDetails() {
  const theme = useTheme();
  const router = useRouter();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'shipmentId',
      headerName: 'Shipment ID',
      flex: 1,
    },
    {
      field: 'poNumber',
      headerName: 'PO Number',
      flex: 1,
    },
    {
      field: 'buyerName',
      headerName: 'Buyer',
      flex: 1.3,
    },
    {
      field: 'asnNumber',
      headerName: 'ASN Number',
      flex: 1,
    },
    {
      field: 'deliveryDate',
      headerName: 'Expected Delivery',
      flex: 1,
    },
    {
      field: 'carrier',
      headerName: 'Carrier',
      flex: 1,
    },
    {
      field: 'trackingNo',
      headerName: 'Tracking No',
      flex: 1.2,
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      flex: 0.7,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color: any = 'default';

        if (params.value === 'In Transit') color = 'info';
        if (params.value === 'Delivered') color = 'success';
        if (params.value === 'Delayed') color = 'warning';
        if (params.value === 'Cancelled') color = 'error';

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
            variant="soft"
            sx={{
              fontWeight: 600,
              borderRadius: 1,
            }}
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      shipmentId: 'SHP-3001',
      poNumber: 'PO-2026-1001',
      buyerName: 'ABC Manufacturing Pvt Ltd',
      asnNumber: 'ASN-9001',
      deliveryDate: '12 May 2026',
      carrier: 'BlueDart',
      trackingNo: 'BD99871234',
      quantity: 42,
      status: 'In Transit',
    },
    {
      id: 2,
      shipmentId: 'SHP-3002',
      poNumber: 'PO-2026-1005',
      buyerName: 'Zen Industrial Group',
      asnNumber: 'ASN-9002',
      deliveryDate: '10 May 2026',
      carrier: 'DHL',
      trackingNo: 'DHL776512',
      quantity: 18,
      status: 'Delivered',
    },
    {
      id: 3,
      shipmentId: 'SHP-3003',
      poNumber: 'PO-2026-1008',
      buyerName: 'GreenLeaf Enterprises',
      asnNumber: 'ASN-9003',
      deliveryDate: '15 May 2026',
      carrier: 'FedEx',
      trackingNo: 'FDX123998',
      quantity: 10,
      status: 'Delayed',
    },
    {
      id: 4,
      shipmentId: 'SHP-3004',
      poNumber: 'PO-2026-1010',
      buyerName: 'Prime Tech Solutions',
      asnNumber: 'ASN-9004',
      deliveryDate: '18 May 2026',
      carrier: 'UPS',
      trackingNo: 'UPS558812',
      quantity: 5,
      status: 'Cancelled',
    },
  ];

  return (
    <Box>
      {/* Breadcrumb */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Shipment & Delivery"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Shipment & Delivery', href: '/shipment-delivery' },
          ]}
          action={
            <Button
              variant="outlined"
              onClick={() => {
                router.push('/delivery/asn');
              }}
            >
              Create ASN
            </Button>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Filters */}

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search Shipment / PO / ASN" fullWidth />

          <Autocomplete
            size="small"
            options={['In Transit', 'Delivered', 'Delayed', 'Cancelled']}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label="Shipment Status" />}
          />

          <Autocomplete
            size="small"
            options={['BlueDart', 'DHL', 'FedEx', 'UPS']}
            sx={{ minWidth: 180 }}
            renderInput={(params) => <TextField {...params} label="Carrier" />}
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

      {/* Table */}

      <Box mt={-1} sx={{ borderRadius: 1 }}>
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
                display: 'flex',
                alignItems: 'center',
              },

              '& .MuiDataGrid-row': {
                minHeight: 42,
                maxHeight: 42,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default VendorShipmentDetails;
