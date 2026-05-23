'use client';

import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Pagination,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  DataGrid,
  useGridApiContext,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from '@mui/x-data-grid';
import { alpha, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import UploadIcon from '@mui/icons-material/Upload';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { GridToolbar, useGridSelector } from '@mui/x-data-grid/internals';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';

// ---------------------------------------------------------------------------
// Custom Pagination Footer
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Status badge color maps
// ---------------------------------------------------------------------------
const STATUS_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Active: { color: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7' },
  'KYC Pending': { color: '#a16207', bg: '#fefce8', border: '#fde68a' },
  Suspended: { color: '#c62828', bg: '#fef2f2', border: '#fca5a5' },
  Pending: { color: '#a16207', bg: '#fefce8', border: '#fde68a' },
  Inactive: { color: '#c62828', bg: '#fef2f2', border: '#fca5a5' },
};

const PRAZ_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Verified: { color: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7' },
  Submitted: { color: '#a16207', bg: '#fefce8', border: '#fde68a' },
  Expired: { color: '#c62828', bg: '#fef2f2', border: '#fca5a5' },
};

const RISK_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Low: { color: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7' },
  Medium: { color: '#a16207', bg: '#fefce8', border: '#fde68a' },
  High: { color: '#c62828', bg: '#fef2f2', border: '#fca5a5' },
};

// Reusable pill badge component
function StatusBadge({
  value,
  colorMap,
  showCheck,
}: {
  value: string;
  colorMap: Record<string, { color: string; bg: string; border: string }>;
  showCheck?: boolean;
}) {
  const style = colorMap[value] ?? { color: '#555', bg: '#f0f0f0', border: '#ccc' };
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.5,
        borderRadius: 1.5,
        border: `1px solid ${style.border}`,
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 600,
        fontSize: 10,
        whiteSpace: 'nowrap',
        height: 24,
      }}
    >
      {showCheck && value === 'Verified' && '✓ '}
      {value}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Invite Vendor Modal
// ---------------------------------------------------------------------------
interface InviteVendorModalProps {
  open: boolean;
  onClose: () => void;
}

function InviteVendorModal({ open, onClose }: InviteVendorModalProps) {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    contactPerson: '',
    serviceCategory: 'IT & Technology',
    customMessage: '',
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSend = () => {
    // TODO: integrate with API to send vendor invitation
    console.log('Sending invitation:', formData);
    onClose();
  };

  const formFieldBg = alpha(theme.palette.primary.main, 0.08);

  // Shared input style — soft green background, no visible border
  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: formFieldBg,
      borderRadius: 1.5,
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: alpha(theme.palette.text.primary, 0.45),
      opacity: 1,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      {/* Modal header */}
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
        <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.text.primary }}>
          Invite Vendor
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: 'auto', color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={2.5}>
          {/* Company Name */}
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                mb: 0.8,
                display: 'block',
              }}
            >
              Company Name *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Vendor Company Pvt Ltd"
              value={formData.companyName}
              onChange={handleChange('companyName')}
              sx={fieldSx}
            />
          </Box>

          {/* Contact Email */}
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                mb: 0.8,
                display: 'block',
              }}
            >
              Contact Email *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="contact@vendor.co.zw"
              value={formData.contactEmail}
              onChange={handleChange('contactEmail')}
              sx={fieldSx}
            />
          </Box>

          {/* Contact Person */}
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                mb: 0.8,
                display: 'block',
              }}
            >
              Contact Person
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Tanaka Moyo"
              value={formData.contactPerson}
              onChange={handleChange('contactPerson')}
              sx={fieldSx}
            />
          </Box>

          {/* Service Category */}
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                mb: 0.8,
                display: 'block',
              }}
            >
              Service Category
            </Typography>
            <Select
              fullWidth
              size="small"
              value={formData.serviceCategory}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, serviceCategory: e.target.value }))
              }
              sx={{
                bgcolor: formFieldBg,
                borderRadius: 1.5,
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: `1.5px solid ${theme.palette.primary.main}` },
              }}
            >
              {[
                'IT & Technology',
                'Facilities / HVAC',
                'Construction & Civil',
                'Logistics',
                'Engineering',
                'Manufacturing',
                'Office Supplies',
              ].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Custom Message */}
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                mb: 0.8,
                display: 'block',
              }}
            >
              Custom Message (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Welcome to Econet Zimbabwe's supplier network..."
              value={formData.customMessage}
              onChange={handleChange('customMessage')}
              sx={fieldSx}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          startIcon={<SendIcon />}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: theme.palette.primary.dark },
          }}
        >
          Send Invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Main VendorDirectory Component
// ---------------------------------------------------------------------------
function VendorDirectory() {
  const theme = useTheme();
  const router = useRouter();
  const PRIMARY = theme.palette.primary.main;

  const [inviteOpen, setInviteOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Filter state
  // ---------------------------------------------------------------------------
  // "draft" values — updated as the user types / selects
  const [searchDraft, setSearchDraft] = useState('');
  const [categoryDraft, setCategoryDraft] = useState('all');

  // "applied" values — only committed when the user clicks Apply
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Map Select values to the exact category strings used in the rows data
  const CATEGORY_MAP: Record<string, string> = {
    it: 'IT & Technology',
    facilities: 'Facilities / HVAC',
    construction: 'Construction & Civil',
    logistics: 'Logistics',
    engineering: 'Engineering',
  };

  // Apply both search and category filters to the full rows array
  const filteredRows = rows.filter((row) => {
    const needle = searchText.toLowerCase().trim();

    // Search filter — checks vendor name, ID, contact person, and location
    const matchesSearch =
      !needle ||
      row.vendorName.toLowerCase().includes(needle) ||
      row.vendorId.toLowerCase().includes(needle) ||
      row.contactPerson.toLowerCase().includes(needle) ||
      row.location.toLowerCase().includes(needle);

    // Category filter — 'all' passes everything; otherwise match exact category string
    const targetCategory = CATEGORY_MAP[categoryFilter];
    const matchesCategory = categoryFilter === 'all' || row.category === targetCategory;

    return matchesSearch && matchesCategory;
  });

  // Apply button: commit draft values to the active filter state
  const handleApply = () => {
    setSearchText(searchDraft);
    setCategoryFilter(categoryDraft);
  };

  // Reset button: clear both draft and applied filter state
  const handleReset = () => {
    setSearchDraft('');
    setCategoryDraft('all');
    setSearchText('');
    setCategoryFilter('all');
  };

  const columns: GridColDef[] = [
    {
      field: 'vendor',
      headerName: 'VENDOR',
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box className="flex flex-col items-center" lineHeight={0}>
          <Typography variant="body2" fontWeight={500}>
            {params.row.vendorName}
          </Typography>
          <Typography variant="caption" sx={{ color: '#7a9a7a', fontFamily: 'monospace' }}>
            {params.row.vendorId}
          </Typography>
        </Box>
      ),
    },
    { field: 'category', headerName: 'CATEGORY', flex: 1 },
    { field: 'location', headerName: 'COUNTRY', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <StatusBadge value={params.value} colorMap={STATUS_COLORS} />
      ),
    },
    {
      field: 'praz',
      headerName: 'PRAZ',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <StatusBadge value={params.value} colorMap={PRAZ_COLORS} showCheck />
      ),
    },
    {
      field: 'risk',
      headerName: 'RISK',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <StatusBadge value={params.value} colorMap={RISK_COLORS} />
      ),
    },
    {
      field: 'activePOs',
      headerName: 'ACTIVE POS',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 500,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      flex: 1,
      sortable: false,
      renderCell: () => (
        <IconButton
          size="small"
          sx={{
            border: '1px solid #d1e0d1',
            borderRadius: 1.5,
            color: theme.palette.text.primary,
            '&:hover': { bgcolor: theme.palette.primary.lighter },
          }}
          onClick={() => router.push(paths.vendor.details)}
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Directory"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor Directory', href: '/vendor/directory' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        {/* Search input — updates draft state on every keystroke */}
        <TextField
          size="small"
          placeholder="Search vendors..."
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleApply();
          }}
          sx={{
            maxWidth: 280,
            '& .MuiOutlinedInput-root': { bgcolor: 'white', borderRadius: 2 },
          }}
        />

        {/* Category dropdown — updates draft state on change */}
        <Select
          size="small"
          value={categoryDraft}
          onChange={(e) => setCategoryDraft(e.target.value)}
          sx={{ minWidth: 180, bgcolor: 'white', borderRadius: 2 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="it">IT & Technology</MenuItem>
          <MenuItem value="facilities">Facilities / HVAC</MenuItem>
          <MenuItem value="construction">Construction & Civil</MenuItem>
          <MenuItem value="logistics">Logistics</MenuItem>
          <MenuItem value="engineering">Engineering</MenuItem>
        </Select>

        <Stack direction="row" spacing={1}>
          {/* Apply: commits draft values and triggers filtered results */}
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              background: PRIMARY,
              px: 2.5,
              minWidth: 90,
            }}
          >
            Apply
          </Button>

          {/* Reset: clears all filter state */}
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: alpha(theme.palette.primary.main, 0.2),
              minWidth: 90,
            }}
          >
            Reset
          </Button>
        </Stack>

        {/* Right-side toolbar actions */}
        <Stack direction="row" spacing={1.5} sx={{ ml: 'auto' }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{
              borderColor: PRIMARY,
              color: PRIMARY,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'white',
            }}
          >
            Bulk Import
          </Button>

          <Button
            variant="contained"
            onClick={() => setInviteOpen(true)}
            startIcon={<EmailIcon />}
            sx={{
              bgcolor: PRIMARY,
              color: 'white',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: theme.palette.primary.dark },
            }}
          >
            Invite Vendor
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          overflow: 'hidden',
          '& .MuiDataGrid-columnHeader': { bgcolor: 'transparent !important' },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: 12,
            fontWeight: 700,
            color: PRIMARY,
            letterSpacing: 0.5,
          },
        }}
      >
        {/* Pass filteredRows so the grid always reflects the active filters */}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
          disableColumnFilter
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnSelector
          slots={{ toolbar: GridToolbar, footer: CustomFooter }}
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
          sx={{ fontSize: 13 }}
        />
      </Box>

      <InviteVendorModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </Box>
  );
}

export default VendorDirectory;

const rows = [
  {
    id: 1,
    vendorId: 'VND-0014',
    vendorName: 'Zimbabwe Cooling Ltd',
    category: 'Facilities / HVAC',
    contactPerson: 'Arun Kumar',
    location: 'Zimbabwe',
    status: 'Active',
    praz: 'Verified',
    risk: 'Low',
    activePOs: 3,
    rating: '4.8',
  },
  {
    id: 2,
    vendorId: 'VND-0019',
    vendorName: 'ProBuild Solutions',
    category: 'Construction & Civil',
    contactPerson: 'Sneha Raj',
    location: 'Zimbabwe',
    status: 'Active',
    praz: 'Verified',
    risk: 'Medium',
    activePOs: 1,
    rating: '4.5',
  },
  {
    id: 3,
    vendorId: 'VND-0023',
    vendorName: 'TechCore Systems',
    category: 'IT & Technology',
    contactPerson: 'Rahul Nair',
    location: 'Zimbabwe',
    status: 'KYC Pending',
    praz: 'Submitted',
    risk: 'Medium',
    activePOs: 0,
    rating: '4.2',
  },
  {
    id: 4,
    vendorId: 'VND-0031',
    vendorName: 'Pinnacle Engineering',
    category: 'Engineering',
    contactPerson: 'Anjali Menon',
    location: 'Zimbabwe',
    status: 'Suspended',
    praz: 'Expired',
    risk: 'High',
    activePOs: 0,
    rating: '4.9',
  },
];
