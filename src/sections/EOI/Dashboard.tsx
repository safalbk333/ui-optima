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
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import { fetchEOIs } from 'src/store/slices/Eoi/EoiSlice';
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

function EOIDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch=useAppDispatch()
    const {
      data: eois,
      loading: eoiLoading,
      error,
    } = useAppSelector((state) => state.eoi);
  
  React.useEffect(() => {
    dispatch(fetchEOIs());
  }, [dispatch]);
  console.log(eois,'eois')
  const PRIMARY = theme.palette.primary.main;

const columns: GridColDef[] = [
  {
    field: 'eoiNo',
    headerName: 'EOI Number',
    flex: 1,
  },
  {
    field: 'title',
    headerName: 'EOI Title',
    flex: 1.8,
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1,
  },
  {
    field: 'publishDate',
    headerName: 'Publish Date',
    flex: 1,
  },
  {
    field: 'closingDate',
    headerName: 'Closing Date',
    flex: 1,
  },
  {
    field: 'responses',
    headerName: 'Responses',
    flex: 0.8,
  },
  {
    field: 'owner',
    headerName: 'EOI Owner',
    flex: 1,
  },
{
  field: 'status',
  headerName: 'Status',
  flex: 1,

  renderCell: (params: GridRenderCellParams) => {
    let bg = '#F1F5F9';
    let color = '#475569';

    if (params.value === 'Published') {
      bg = '#E3F2FD';
      color = '#0288D1';
    }

    if (params.value === 'Open') {
      bg = '#E8F5E9';
      color = '#2E7D32';
    }

    if (params.value === 'Evaluation') {
      bg = '#FFF8E1';
      color = '#ED6C02';
    }

    if (params.value === 'Awarded') {
      bg = '#F3E5F5';
      color = '#7B1FA2';
    }

    if (params.value === 'Closed') {
      bg = '#ECEFF1';
      color = '#546E7A';
    }

    if (params.value === 'Cancelled') {
      bg = '#FEEBEE';
      color = '#D32F2F';
    }

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
}
];

const rows =
  eois?.map((eoi, index) => ({
    id: eoi.pk_chr_eoi_id,
    eoiNo: eoi.chr_eoi_code,
    title: eoi.chr_eoi_title,
    category: eoi.request?.chr_title || '-',
    publishDate: eoi.tim_created
      ? new Date(eoi.tim_created).toLocaleDateString('en-GB')
      : '-',
    closingDate: eoi.dt_submission_deadline
      ? new Date(eoi.dt_submission_deadline).toLocaleDateString('en-GB')
      : '-',
    responses: 0, // replace if API provides response count
    owner: eoi.vendor?.chr_vendor_name || '-',
    status: eoi.chr_status,
  })) || [];

  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="EOI"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'EOI', href: '/eoi' },
          ]}
                    action={
                      <Button
                      sx={{borderRadius:0.5}}
                        variant="outlined"
                        onClick={() => {
                          router.push('/eoi/eois');
                        }}
                      >
                        New EOI
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
  label="Search EOI"
  placeholder="Search by EOI Number or Title"
  fullWidth
/>

<Autocomplete
  size="small"
  options={[
    'Draft',
    'Published',
    'Open',
    'Evaluation',
    'Awarded',
    'Closed',
    'Cancelled',
  ]}
  sx={{ minWidth: 220 }}
  renderInput={(params) => (
    <TextField {...params} label="Status" />
  )}
/>

<Autocomplete
  size="small"
  options={[
    'IT Equipment',
    'Furniture',
    'Logistics',
    'Safety',
    'IT Services',
  ]}
  sx={{ minWidth: 220 }}
  renderInput={(params) => (
    <TextField {...params} label="Category" />
  )}
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

export default EOIDashboard;
