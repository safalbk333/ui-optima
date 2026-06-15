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
import { fetchQuotations } from 'src/store/slices/Quotation/Quotation';
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

export default function Quotation() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { data: quotations } = useAppSelector(
    (state) => state.quotations
  );

  React.useEffect(() => {
    dispatch(fetchQuotations());
  }, [dispatch]);
  const rows = React.useMemo(
    () =>
      (quotations || []).map((item: any) => ({
        id: item.pk_chr_quotation_id,

        quotationId: item.pk_chr_quotation_id,

        rfqCode: item.rfq?.chr_rfq_code || '',

        rfqTitle: item.rfq?.chr_rfq_title || '',

        vendorName: item.vendor?.chr_vendor_name || '',

        vendorEmail: item.vendor?.chr_vendor_email || '',

        buyerName: item.buyer?.chr_user_name || '',

        status: item.chr_status?.trim() || '',

        totalAmount: item.flt_total_amount || 0,

        currency: item.chr_currency || '',

        itemCount: item.quotation_items?.length || 0,

        submittedDate: item.tim_created
          ? new Date(item.tim_created).toLocaleDateString()
          : '',
      })),
    [quotations]
  );
  const theme = useTheme();
  console.log(quotations, 'quotations')
  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'rfqCode',
      headerName: 'RFQ Code',
      flex: 2,
    },

    {
      field: 'rfqTitle',
      headerName: 'RFQ Title',
      flex: 1.8,
    },



    {
      field: 'itemCount',
      headerName: 'Items',
      width: 90,
      align: 'center',
      headerAlign: 'center',
    },


    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const status = params.value;

        const chipStyles =
          status === 'APPROVED'
            ? {
              bgcolor: 'success.lighter',
              color: 'success.dark',
            }
            : status === 'REJECTED'
              ? {
                bgcolor: 'error.lighter',
                color: 'error.dark',
              }
              : {
                bgcolor: 'warning.lighter',
                color: 'warning.dark',
              };

        return (
          <Chip
            size="small"
            label={status}
            sx={{
              ...chipStyles,
              fontWeight: 500,
              fontSize: '12px',
              textTransform: 'capitalize',
              border: 'none',
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
        );
      },
    },

    {
      field: 'submittedDate',
      headerName: 'Created Date',
      flex: 1,
    },
  ];



  return (
    <Box>
      {/* Breadcrumb */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Quotations"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Quotations', href: '/quotation' },
          ]}


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
          onRowClick={(params) =>
            router.push(`/quotation/view?id=${params.row.quotationId}`)
          } disableColumnSelector
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
