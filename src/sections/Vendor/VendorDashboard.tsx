'use client';

import React from 'react';
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

function VendorDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    { field: 'vendorId', headerName: 'Vendor ID', flex: 1 },
    { field: 'vendorName', headerName: 'Vendor Name', flex: 1.4 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color = 'text.primary';

        if (params.value === 'Active') color = 'success.main';
        if (params.value === 'Pending') color = 'warning.main';
        if (params.value === 'Inactive') color = 'error.main';

        return (
          <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
            {params.value}
          </Typography>
        );
      },
    },
    { field: 'rating', headerName: 'Rating', flex: 0.8 },
  ];

  const rows = [
    {
      id: 1,
      vendorId: 'VEN-1001',
      vendorName: 'TechNova Solutions',
      category: 'IT Services',
      contactPerson: 'Arun Kumar',
      location: 'Kochi',
      status: 'Active',
      rating: '4.8',
    },
    {
      id: 2,
      vendorId: 'VEN-1002',
      vendorName: 'Prime Industrial Supplies',
      category: 'Manufacturing',
      contactPerson: 'Sneha Raj',
      location: 'Chennai',
      status: 'Active',
      rating: '4.5',
    },
    {
      id: 3,
      vendorId: 'VEN-1003',
      vendorName: 'GreenLeaf Traders',
      category: 'Office Supplies',
      contactPerson: 'Rahul Nair',
      location: 'Bengaluru',
      status: 'Inactive',
      rating: '4.2',
    },
    {
      id: 4,
      vendorId: 'VEN-1004',
      vendorName: 'Skyline Logistics',
      category: 'Logistics',
      contactPerson: 'Anjali Menon',
      location: 'Mumbai',
      status: 'Active',
      rating: '4.9',
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendors List"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendors List', href: '/products' },
          ]}
          action={
            <Button
              variant="outlined"
              onClick={() => {
                router.push(paths.vendor.management);
              }}
            >
              Add Vendor
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
          <TextField size="small" label="Search Vendor" fullWidth />

          <Autocomplete
            size="small"
            options={['IT Services', 'Manufacturing', 'Logistics']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
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

export default VendorDashboard;
