'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Autocomplete,
  Pagination,
  Chip,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
  GridRenderCellParams,
  useGridApiContext,
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

function VendorProducts() {
  const theme = useTheme();
  const router = useRouter();
  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'vendorId',
      headerName: 'Vendor ID',
      flex: 1,
    },
    {
      field: 'vendorName',
      headerName: 'Vendor Name',
      flex: 1.4,
    },
    {
      field: 'productCode',
      headerName: 'Product Code',
      flex: 1,
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1.5,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Available Qty',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let color: any = 'default';

        if (params.value === 'Available') color = 'success';
        if (params.value === 'Low Stock') color = 'warning';
        if (params.value === 'Out of Stock') color = 'error';

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
      vendorId: 'VEN-1001',
      vendorName: 'TechNova Solutions',
      productCode: 'PRD-501',
      productName: 'Dell Latitude 5440',
      category: 'Laptops',
      unitPrice: '₹78,000',
      stock: '42',
      status: 'Available',
    },
    {
      id: 2,
      vendorId: 'VEN-1001',
      vendorName: 'TechNova Solutions',
      productCode: 'PRD-502',
      productName: 'HP LaserJet Pro Printer',
      category: 'Printers',
      unitPrice: '₹24,500',
      stock: '8',
      status: 'Low Stock',
    },
    {
      id: 3,
      vendorId: 'VEN-1002',
      vendorName: 'Prime Industrial Supplies',
      productCode: 'PRD-503',
      productName: 'Safety Hand Gloves',
      category: 'Safety Equipment',
      unitPrice: '₹450',
      stock: '120',
      status: 'Available',
    },
    {
      id: 4,
      vendorId: 'VEN-1003',
      vendorName: 'GreenLeaf Traders',
      productCode: 'PRD-504',
      productName: 'A4 Printing Paper Bundle',
      category: 'Office Supplies',
      unitPrice: '₹320',
      stock: '0',
      status: 'Out of Stock',
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Products"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor Products', href: '/vendor-products' },
          ]}
          action={
            <Button
              variant="outlined"
              onClick={() => {
                router.push(paths.products.products);
              }}
            >
              Add Product
            </Button>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Filters */}

      <Box >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField size="small" label="Search Vendor ID / Vendor Name" fullWidth />

          <Autocomplete
            size="small"
            options={['Laptops', 'Office Supplies', 'Safety Equipment', 'Warehouse Devices']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Product Category" />}
          />

          <Autocomplete
            size="small"
            options={['Available', 'Low Stock', 'Out of Stock']}
            sx={{ minWidth: 180 }}
            renderInput={(params) => <TextField {...params} label="Product Status" />}
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

export default VendorProducts;
