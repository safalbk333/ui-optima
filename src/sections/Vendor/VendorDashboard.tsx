'use client';

import React, { useEffect } from 'react';
import { Box, Stack, Button, TextField, Typography, Pagination, Autocomplete, CircularProgress, Alert, Chip, Rating } from '@mui/material';
import type {
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';
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
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { clearVendors, fetchVendors } from 'src/store/slices/vendor/VendorSlice';

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
  const dispatch = useAppDispatch();
  const PRIMARY = theme.palette.primary.main;

  // ----------------------------------------------------------------------
  // REDUX STATE
  // ----------------------------------------------------------------------

  const { data: vendors, loading, error } = useAppSelector((state) => state.vendors);

  // ----------------------------------------------------------------------
  // FETCH ON MOUNT — cleanup on unmount
  // ----------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchVendors());

    return () => {
      dispatch(clearVendors());
    };
  }, [dispatch]);

  // ----------------------------------------------------------------------
  // MAP API DATA → DataGrid rows
  // ----------------------------------------------------------------------

  const rows = vendors.map((vendor, index) => ({
    id: vendor.pk_chr_vendor_id,
    vendorId: vendor.pk_chr_vendor_id,
    vendorCode: `VEN-${String(index + 1).padStart(3, '0')}`,
    vendorName: vendor.chr_vendor_name,
    category: 'N/A',                          // not in API payload; extend when available
    contactPerson: vendor.chr_vendor_email,
    location: vendor.fk_chr_city_id ?? 'N/A',
    status:
      vendor.chr_document_status === 'active'
        ? 'Active'
        : vendor.chr_document_status === 'pending'
          ? 'Pending'
          : 'Inactive',
    rating: '0.0',                            // not in API payload; extend when available
  }));

  const columns: GridColDef[] = [
    { field: 'vendorCode', headerName: 'Vendor Code', flex: 1 },
    { field: 'vendorName', headerName: 'Vendor Name', flex: 1.4 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let bg = '#EEF2FF';
        let color = '#4338CA';

        if (params.value === 'Active') {
          bg = '#E8F5E9';
          color = '#2E7D32';
        };
        if (params.value === 'Pending') {
          bg = '#FFF8E1';
          color = '#ED6C02';
        };
        if (params.value === 'Inactive') {
          bg = '#FEEBEE';
          color = '#D32F2F';
        };

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
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction='row' alignItems='flex-end' height='100%' justifyItems='center'>
          <Rating
          name="read-only"
          value={params.value}
          readOnly
        />
        <Typography fontSize='small'>{params.value}</Typography>
        </Stack>
      ),
    }
  ];

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Approved Vendors"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Approved Vendors', href: '/vendor' },
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

      {/* ------------------------------------------------------------------ */}
      {/* ERROR STATE                                                          */}
      {/* ------------------------------------------------------------------ */}

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

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
            loading={loading}
            pageSizeOptions={[5, 10]}
            disableColumnFilter
            onRowClick={(params) =>
              router.push(`/vendor/details/details?id=${params.row.vendorId}`)
            }
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            slots={{
              toolbar: GridToolbar,
              footer: CustomFooter,
              loadingOverlay: () => (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <CircularProgress size={28} />
                </Box>
              ),
            }}
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