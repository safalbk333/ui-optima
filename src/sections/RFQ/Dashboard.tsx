'use client';

import * as React from 'react';

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

export default function RFQList() {
  const router = useRouter();
  const theme = useTheme();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    { field: 'rfqNumber', headerName: 'RFQ Number', flex: 1 },

    { field: 'vendor', headerName: 'Vendor', flex: 1 },

    { field: 'category', headerName: 'Category', flex: 1 },

    { field: 'buyer', headerName: 'Buyer', flex: 1 },

    { field: 'quotationValue', headerName: 'Quotation Value', flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,

      renderCell: (params: GridRenderCellParams) => {
        let bg = '#EEF2FF';
        let color = '#4338CA';

        if (params.value === 'Awarded') {
          bg = '#E8F5E9';
          color = '#2E7D32';
        }

        if (params.value === 'Pending') {
          bg = '#FFF8E1';
          color = '#ED6C02';
        }

        if (params.value === 'Rejected') {
          bg = '#FEEBEE';
          color = '#D32F2F';
        }

        if (params.value === 'Under Evaluation') {
          bg = '#E3F2FD';
          color = '#0288D1';
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
    },

    { field: 'rfqDate', headerName: 'RFQ Date', flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      rfqNumber: 'RFQ-2026-001',
      vendor: 'TechNova Solutions',
      category: 'Laptop Procurement',
      buyer: 'Ajith Pradeep',
      quotationValue: '₹4,50,000',
      status: 'Awarded',
      rfqDate: '12 May 2026',
    },

    {
      id: 2,
      rfqNumber: 'RFQ-2026-002',
      vendor: 'OfficeMart Pvt Ltd',
      category: 'Office Supplies',
      buyer: 'Rahul Nair',
      quotationValue: '₹95,000',
      status: 'Pending',
      rfqDate: '14 May 2026',
    },

    {
      id: 3,
      rfqNumber: 'RFQ-2026-003',
      vendor: 'SecureNet Systems',
      category: 'Network Equipment',
      buyer: 'Sneha Kumar',
      quotationValue: '₹2,80,000',
      status: 'Under Evaluation',
      rfqDate: '15 May 2026',
    },

    {
      id: 4,
      rfqNumber: 'RFQ-2026-004',
      vendor: 'Urban Furnitures',
      category: 'Office Furniture',
      buyer: 'Arun George',
      quotationValue: '₹6,10,000',
      status: 'Rejected',
      rfqDate: '16 May 2026',
    },

    {
      id: 5,
      rfqNumber: 'RFQ-2026-005',
      vendor: 'Prime Electricals',
      category: 'Electrical Components',
      buyer: 'Nikhil Raj',
      quotationValue: '₹1,75,000',
      status: 'Pending',
      rfqDate: '18 May 2026',
    },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Request For Quotation"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'RFQ List', href: '/rfq' },
          ]}
          action={
            <Button
              color="primary"
              variant="outlined"
              onClick={() => router.push('/rfq/rfp')}
              sx={{
                borderRadius: 0.5,
                fontWeight: 600,
              }}
            >
              New RFQ / RFP
            </Button>
          }
        />
      </Box>

      <Box
        mb={2}
        sx={{
          borderTop: '1px dashed #d1d5db',
        }}
      />

      {/* Filters */}
      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search RFQ" fullWidth />

          <Autocomplete
            size="small"
            options={['Pending', 'Awarded', 'Rejected', 'Under Evaluation']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <Autocomplete
            size="small"
            options={['IT Procurement', 'Office Supplies', 'Furniture', 'Electrical']}
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

      {/* DataGrid */}
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
            autoHeight
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
                minHeight: 38,
                maxHeight: 38,
              },

              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'transparent !important',
              },

              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: 14,
                fontWeight: 600,
                color: 'primary.main',
              },

              '& .MuiDataGrid-cell': {
                fontSize: 13,
                letterSpacing: 0.2,
                fontWeight: 400,
                borderColor: alpha(theme.palette.text.primary, 0.06),
              },

              '& .MuiDataGrid-row': {
                minHeight: 42,
                maxHeight: 42,

                '&:hover': {
                  backgroundColor: alpha(PRIMARY, 0.03),
                },
              },

              '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              },

              '& .MuiDataGrid-toolbarContainer': {
                px: 1,
                py: 1,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
