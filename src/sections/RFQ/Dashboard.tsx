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
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { useRouter } from 'next/navigation';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

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

function RFQDashboard() {
  const theme = useTheme();
  const router = useRouter();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'rfqNo',
      headerName: 'RFQ No',
      flex: 1,
    },

    {
      field: 'title',
      headerName: 'RFQ Title',
      flex: 1.6,
    },

    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },

    {
      field: 'issueDate',
      headerName: 'Issue Date',
      flex: 1,
    },

    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
    },

    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color = 'default';

        if (params.value === 'Open') color = 'success';
        if (params.value === 'Submitted') color = 'info';
        if (params.value === 'Under Review') color = 'warning';
        if (params.value === 'Rejected') color = 'error';

        return (
          <Chip
            label={params.value}
            sx={{ fontSize: 12 }}
            color={color as any}
            size="small"
            variant="soft"
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      rfqNo: 'RFQ-2026-1001',
      title: 'Laptop Procurement for Head Office',
      category: 'IT Equipment',
      issueDate: '01 May 2026',
      dueDate: '10 May 2026',
      buyer: 'Procurement Team',
      status: 'Open',
    },

    {
      id: 2,
      rfqNo: 'RFQ-2026-1002',
      title: 'Office Furniture Supply',
      category: 'Furniture',
      issueDate: '28 Apr 2026',
      dueDate: '08 May 2026',
      buyer: 'Admin Department',
      status: 'Submitted',
    },

    {
      id: 3,
      rfqNo: 'RFQ-2026-1003',
      title: 'Warehouse Logistics Services',
      category: 'Logistics',
      issueDate: '26 Apr 2026',
      dueDate: '06 May 2026',
      buyer: 'Supply Chain',
      status: 'Under Review',
    },

    {
      id: 4,
      rfqNo: 'RFQ-2026-1004',
      title: 'Industrial Safety Equipment',
      category: 'Safety',
      issueDate: '24 Apr 2026',
      dueDate: '04 May 2026',
      buyer: 'Operations',
      status: 'Rejected',
    },
  ];

  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Request for Quotations"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'RFQ Dashboard', href: '/rfq' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Filters */}

      <Box mb={-1}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField
            size="small"
            label="Search RFQ"
            placeholder="Search by RFQ number or title"
            fullWidth
          />

          <Autocomplete
            size="small"
            options={['Open', 'Submitted', 'Under Review', 'Rejected']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <Autocomplete
            size="small"
            options={['IT Equipment', 'Furniture', 'Logistics', 'Safety']}
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

      {/* Table */}

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
            slots={{
              toolbar: GridToolbar,
              footer: CustomFooter,
            }}
            onRowClick={(params) => {
              router.push(`/quotations/view`);
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
                minHeight: 40,
                maxHeight: 40,
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
                fontSize: 13,
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

export default RFQDashboard;
