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
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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
import { paths } from 'src/routes/paths';

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

function VendorDocumentsTable() {
  const theme = useTheme();

  const router = useRouter();

  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    {
      field: 'documentName',
      headerName: 'Document Name',
      flex: 1.6,
    },

    {
      field: 'documentType',
      headerName: 'Type',
      flex: 1,
    },

    {
      field: 'uploadedDate',
      headerName: 'Uploaded Date',
      flex: 1,
    },

    {
      field: 'expiryDate',
      headerName: 'Expiry Date',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const isExpired = params.row.expiryStatus === 'Expired';
        const isExpiring = params.row.expiryStatus === 'Expiring Soon';

        return (
          <Stack mt={0.8} spacing={0.3}>
            <Typography fontSize={13}>{params.value}</Typography>

            {(isExpired || isExpiring) && (
              <Typography
                fontSize={11}
                color={isExpired ? 'error.main' : 'warning.main'}
                fontWeight={600}
              >
                {params.row.expiryStatus}
              </Typography>
            )}
          </Stack>
        );
      },
    },

    {
      field: 'uploadedBy',
      headerName: 'Uploaded By',
      flex: 1.4,
      renderCell: (params: GridRenderCellParams) => (
        <Stack spacing={0.2} justifyContent="center" height="100%">
          <Typography fontSize={13} fontWeight={600}>
            {params.row.uploadedBy}
          </Typography>

          <Typography fontSize={11} color="text.secondary">
            {params.row.email}
          </Typography>
        </Stack>
      ),
    },

    {
      field: 'progress',
      headerName: 'Completion',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box width="100%">
          <Stack mt={2} direction="row" spacing={1} alignItems="center">
            <Box flex={1}>
              <LinearProgress
                variant="determinate"
                value={params.value}
                sx={{
                  height: 6,
                  borderRadius: 10,
                }}
              />
            </Box>

            <Typography fontSize={12} fontWeight={600}>
              {params.value}%
            </Typography>
          </Stack>
        </Box>
      ),
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        let bgColor = '';
        let textColor = '';

        if (params.value === 'Approved') {
          bgColor = alpha(theme.palette.success.main, 0.12);
          textColor = theme.palette.success.main;
        }

        if (params.value === 'Pending Review') {
          bgColor = alpha(theme.palette.warning.main, 0.12);
          textColor = theme.palette.warning.main;
        }

        if (params.value === 'Rejected') {
          bgColor = alpha(theme.palette.error.main, 0.12);
          textColor = theme.palette.error.main;
        }

        if (params.value === 'Missing') {
          bgColor = alpha(theme.palette.grey[500], 0.12);
          textColor = theme.palette.text.secondary;
        }

        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              bgcolor: bgColor,
              color: textColor,
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 1,
              height: 28,
            }}
          />
        );
      },
    },

    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 0.5,
      renderCell: () => (
        <Tooltip title="Preview">
          <IconButton
            size="small"
            sx={{
              border: '1px solid',
              borderColor: alpha(theme.palette.text.primary, 0.15),
              borderRadius: 1.5,
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      documentName: 'GST Registration Certificate',
      documentType: 'Compliance',
      uploadedDate: '02 May 2026',
      expiryDate: '15 Dec 2026',
      uploadedBy: 'Ajith',
      email: 'ajith@vendor.com',
      progress: 100,
      expiryStatus: 'Valid',
      status: 'Approved',
    },

    {
      id: 2,
      documentName: 'ISO 9001 Certification',
      documentType: 'Certification',
      uploadedDate: '28 Apr 2026',
      expiryDate: '20 May 2026',
      uploadedBy: 'Ajith',
      email: 'ajith@vendor.com',
      progress: 80,
      expiryStatus: 'Expiring Soon',
      status: 'Pending Review',
    },

    {
      id: 3,
      documentName: 'Bank Account Proof',
      documentType: 'Finance',
      uploadedDate: '18 Apr 2026',
      expiryDate: 'N/A',
      uploadedBy: 'Ajith',
      email: 'ajith@vendor.com',
      progress: 100,
      expiryStatus: 'Valid',
      status: 'Approved',
    },

    {
      id: 4,
      documentName: 'Insurance Policy Document',
      documentType: 'Insurance',
      uploadedDate: '12 Apr 2026',
      expiryDate: '01 May 2026',
      uploadedBy: 'Ajith',
      email: 'ajith@vendor.com',
      progress: 45,
      expiryStatus: 'Expired',
      status: 'Rejected',
    },
  ];
  return (
    <Box>
      {/* Breadcrumbs */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Documents"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Documents', href: '/documents' },
          ]}
          action={
            <Button
              onClick={() => {
                router.push(paths.documents.upload);
              }}
              sx={{ fontWeight: 600, borderRadius: 0.3 }}
              variant="outlined"
            >
              Upload Document
            </Button>
          }
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
          <TextField
            size="small"
            label="Search Document"
            placeholder="Search by document name"
            fullWidth
          />

          <Autocomplete
            size="small"
            options={['Approved', 'Pending Review', 'Rejected', 'Missing']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <Autocomplete
            size="small"
            options={['Compliance', 'Certification', 'Finance', 'Insurance']}
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Document Type" />}
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
                fontWeight: 700,
                color: 'primary.main',
              },

              '& .MuiDataGrid-cell': {
                fontSize: 13,
                alignItems: 'center',
              },

              '& .MuiDataGrid-row': {
                minHeight: 50,
                maxHeight: 50,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default VendorDocumentsTable;
