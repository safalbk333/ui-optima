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

function EOIDashboard() {
  const theme = useTheme();
  const router = useRouter();

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
      const statusStyles: Record<string, any> = {
        Draft: {
          color: '#6b7280',
          bgcolor: '#f3f4f6',
        },
        Published: {
          color: '#1d4ed8',
          bgcolor: '#dbeafe',
        },
        Open: {
          color: '#15803d',
          bgcolor: '#dcfce7',
        },
        Evaluation: {
          color: '#b45309',
          bgcolor: '#fef3c7',
        },
        Awarded: {
          color: '#7c3aed',
          bgcolor: '#ede9fe',
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
    eoiNo: 'EOI-2026-1001',
    title: 'Supply of Enterprise Laptops',
    category: 'IT Equipment',
    publishDate: '01 May 2026',
    closingDate: '15 May 2026',
    responses: 18,
    owner: 'Ajith Kumar',
    status: 'Open',
  },
  {
    id: 2,
    eoiNo: 'EOI-2026-1002',
    title: 'Office Furniture Procurement',
    category: 'Furniture',
    publishDate: '03 May 2026',
    closingDate: '18 May 2026',
    responses: 12,
    owner: 'Anjali Nair',
    status: 'Evaluation',
  },
  {
    id: 3,
    eoiNo: 'EOI-2026-1003',
    title: 'Logistics Service Providers',
    category: 'Logistics',
    publishDate: '06 May 2026',
    closingDate: '22 May 2026',
    responses: 24,
    owner: 'Rahul Menon',
    status: 'Published',
  },
  {
    id: 4,
    eoiNo: 'EOI-2026-1004',
    title: 'Industrial Safety Equipment',
    category: 'Safety',
    publishDate: '08 May 2026',
    closingDate: '25 May 2026',
    responses: 8,
    owner: 'Vivek Nair',
    status: 'Draft',
  },
  {
    id: 5,
    eoiNo: 'EOI-2026-1005',
    title: 'Cloud Infrastructure Services',
    category: 'IT Services',
    publishDate: '10 May 2026',
    closingDate: '28 May 2026',
    responses: 31,
    owner: 'Ajith Kumar',
    status: 'Awarded',
  },
];

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

export default EOIDashboard;
