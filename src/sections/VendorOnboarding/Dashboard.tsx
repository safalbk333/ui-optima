'use client';

import * as React from 'react';

import {
  Autocomplete,
  Avatar,
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
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { fetchVendors } from 'src/store/slices/vendor/VendorSlice';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function VendorOnboardingDetails() {
  const router = useRouter();
  const dispatch=useAppDispatch()
const { data: vendor, loading } = useAppSelector(
  (state) => state.vendors
);
React.useEffect(() => {
  dispatch(fetchVendors());
}, [dispatch]);
console.log(vendor,'vendor')
  const theme = useTheme();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'vendorName',
      headerName: 'Vendor',
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1.2} alignItems="center" height="100%">
          <Avatar
            sx={{
              width: 26,
              height: 26,
              fontSize: 11,
              bgcolor: alpha(PRIMARY, 0.12),
              color: PRIMARY,
              fontWeight: 700,
            }}
          >
            {params.row.vendorName?.charAt(0)}
          </Avatar>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.1,
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.5,
                m: 0,
              }}
            >
              {params.row.vendorName}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: 11,
                lineHeight: 1,
                m: 0,
              }}
            >
              {params.row.vendorCode}
            </Typography>
          </Box>
        </Stack>
      ),
    },


    {
      field: 'email',
      headerName: 'Email',
      flex: 1.4,
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },



    {
      field: 'submittedDate',
      headerName: 'Submitted Date',
      flex: 1,
    },
  ];

const rows =
  vendor?.map((item, index) => ({
    id: item.pk_chr_vendor_id || index,
    vendorName: item.chr_vendor_name,
    vendorCode: item.pk_chr_vendor_id?.slice(0, 8), // or your vendor code field if available
    category: '-', // replace when category exists in API
    contactPerson: '-', // replace when contact person exists
    email: item.chr_vendor_email,
    phone: item.chr_vendor_phone,
    status:
      item.chr_document_status === 'A'
        ? 'Approved'
        : item.chr_document_status === 'R'
          ? 'Rejected'
          : item.chr_document_status === 'P'
            ? 'Pending'
            : 'Draft',
    submittedDate: item.tim_created
      ? new Date(item.tim_created).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '-',
  })) || [];

  return (
    <Box>
      {/* Breadcrumb */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Onboarding"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor Management', href: '/vendor-onboarding' },
          ]}
          action={
            <Button
              color="primary"
              onClick={() => router.push('/vendor-onboarding/vendor')}
              variant="outlined"
              sx={{
                borderRadius: 0.5,
                px: 2,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Add New Vendor
            </Button>
          }
        />
      </Box>

      <Box
        mb={2}
        sx={{
          borderTop: `1px dashed ${alpha(theme.palette.text.primary, 0.12)}`,
        }}
      />

      {/* Filters */}
      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search Vendor" fullWidth />

          <Autocomplete
            size="small"
            options={['IT Services', 'Office Supplies', 'Manufacturing', 'Logistics']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          <Autocomplete
          
            size="small"
            options={['Approved', 'Pending', 'In Review', 'Rejected']}
            sx={{ minWidth: 180 }}
            renderInput={(params) => <TextField  {...params} label="Status" />}
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{
                background: PRIMARY,
                px: 3,
                color: 'white',
                textTransform: 'none',
                boxShadow: 'none',
                                borderRadius: 0.5,

              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.text.primary, 0.18),
                textTransform: 'none',
                                borderRadius: 0.5,

              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Table */}
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
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
  );
}
