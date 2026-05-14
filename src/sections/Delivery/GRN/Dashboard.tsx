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
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';

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

function VendorGRNDetails() {
  const theme = useTheme();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'grnNumber',
      headerName: 'GRN Number',
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
      flex: 1.4,
    },
    {
      field: 'asnNumber',
      headerName: 'ASN Number',
      flex: 1,
    },
    {
      field: 'receivedDate',
      headerName: 'Received Date',
      flex: 1,
    },
    {
      field: 'warehouse',
      headerName: 'Warehouse',
      flex: 1.1,
    },
    {
      field: 'receivedQty',
      headerName: 'Received Qty',
      flex: 0.9,
    },
    {
      field: 'acceptedQty',
      headerName: 'Accepted',
      flex: 0.8,
    },
    {
      field: 'rejectedQty',
      headerName: 'Rejected',
      flex: 0.8,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color: any = 'default';

        if (params.value === 'Pending Inspection') color = 'warning';
        if (params.value === 'Accepted') color = 'success';
        if (params.value === 'Partially Accepted') color = 'info';
        if (params.value === 'Rejected') color = 'error';

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
            variant="soft"
            sx={{
              fontWeight: 600,
              borderRadius: 1,
              fontSize: 11,
            }}
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      grnNumber: 'GRN-5001',
      poNumber: 'PO-2026-1001',
      buyerName: 'ABC Manufacturing Pvt Ltd',
      asnNumber: 'ASN-9001',
      receivedDate: '12 May 2026',
      warehouse: 'Chennai WH',
      receivedQty: 120,
      acceptedQty: 118,
      rejectedQty: 2,
      status: 'Partially Accepted',
    },
    {
      id: 2,
      grnNumber: 'GRN-5002',
      poNumber: 'PO-2026-1005',
      buyerName: 'Zen Industrial Group',
      asnNumber: 'ASN-9002',
      receivedDate: '10 May 2026',
      warehouse: 'Mumbai Hub',
      receivedQty: 85,
      acceptedQty: 85,
      rejectedQty: 0,
      status: 'Accepted',
    },
    {
      id: 3,
      grnNumber: 'GRN-5003',
      poNumber: 'PO-2026-1008',
      buyerName: 'GreenLeaf Enterprises',
      asnNumber: 'ASN-9003',
      receivedDate: '15 May 2026',
      warehouse: 'Bangalore DC',
      receivedQty: 60,
      acceptedQty: 0,
      rejectedQty: 0,
      status: 'Pending Inspection',
    },
    {
      id: 4,
      grnNumber: 'GRN-5004',
      poNumber: 'PO-2026-1010',
      buyerName: 'Prime Tech Solutions',
      asnNumber: 'ASN-9004',
      receivedDate: '18 May 2026',
      warehouse: 'Delhi WH',
      receivedQty: 40,
      acceptedQty: 0,
      rejectedQty: 40,
      status: 'Rejected',
    },
  ];

  return (
    <Box>
      {/* Breadcrumb */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="GRN"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'GRN List', href: '/grn' },
          ]}
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
          <TextField size="small" label="Search GRN / PO / ASN" fullWidth />

          <Autocomplete
            size="small"
            options={['Accepted', 'Partially Accepted', 'Pending Inspection', 'Rejected']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="GRN Status" />}
          />

          <Autocomplete
            size="small"
            options={['Chennai WH', 'Mumbai Hub', 'Bangalore DC', 'Delhi WH']}
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} label="Warehouse" />}
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

export default VendorGRNDetails;
