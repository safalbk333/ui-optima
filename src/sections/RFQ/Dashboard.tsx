'use client';

import * as React from 'react';

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
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { alpha, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { fetchRFQs } from 'src/store/slices/Rfq/RfqSlice';
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
const dispatch = useAppDispatch();

const { data: rfqs, loading } = useAppSelector(
  (state) => state.rfq
);

React.useEffect(() => {
  dispatch(fetchRFQs());
}, [dispatch]);
  const PRIMARY = theme.palette.primary.main;

  const columns: GridColDef[] = [
    { field: 'rfqNumber', headerName: 'RFQ Number', flex: 1 },

    { field: 'vendor', headerName: 'Vendor', flex: 1 },

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

const rows =
  rfqs?.map((rfq) => ({
    id: rfq.pk_chr_rfq_id,
    rfqNumber: rfq.chr_rfq_code,
    vendor: rfq.eoi?.chr_eoi_title || '-',
    category:
      rfq.rfq_item_mappings
        ?.map((item) => item.item?.chr_item_name)
        .join(', ') || '-',
    buyer: rfq.request?.chr_request_number || '-',
    quotationValue:
      rfq.rfq_item_mappings?.reduce(
        (sum, item) => sum + (item.flt_total_price || 0),
        0
      ) || 0,
    status: rfq.chr_status,
    rfqDate: new Date(rfq.dt_issue_date).toLocaleDateString('en-IN'),
  })) || [];

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
                borderRadius: 0.5,
              }}
            >
              Apply
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 0.5,
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
             loading={loading}
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
    </Box>
  );
}
