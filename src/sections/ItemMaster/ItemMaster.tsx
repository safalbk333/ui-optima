'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  InputAdornment,
  Pagination,
  Dialog,
  DialogContent,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type {
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  DataGrid,
  useGridApiContext,
  GridFooterContainer,
  gridPageCountSelector,
  gridPaginationModelSelector,
} from '@mui/x-data-grid';
import { useGridSelector } from '@mui/x-data-grid/internals';

import SearchIcon from '@mui/icons-material/Search';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { useRouter } from 'next/navigation';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type ItemStatus = 'Active' | 'Inactive' | 'Discontinued';
type ItemCategory = 'IT Equipment' | 'Networking' | 'Facilities' | 'Office Supplies' | 'Furniture';

interface ItemRow {
  id: string;
  itemId: string;       // e.g. ITM-001
  itemName: string;
  category: ItemCategory;
  uom: string;           // unit of measure e.g. 'ea', 'reel', 'box'
  unitPrice: number;     // USD
  status: ItemStatus;
}

// Match classification for deduplication results
type MatchType = 'Exact Duplicate' | 'Likely Duplicate' | 'Possible Match';

// A single side (Item A or Item B) of a duplicate pairing
interface DuplicateItemRef {
  name: string;
  itemId: string;
  category: string;
}

interface DuplicatePair {
  id: string;
  itemA: DuplicateItemRef;
  itemB: DuplicateItemRef;
  similarity: number;          // 0-100
  matchType: MatchType;
  aiRecommendation: string;
}

// Add Item form fields — matches the screenshot form
interface AddItemForm {
  itemName: string;
  category: string;
  uom: string;
  unitPrice: string;
  preferredVendor: string;
  spendCategory: string;
  specificationNotes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED ITEM DATA — Econet Zimbabwe Item Master context
// ─────────────────────────────────────────────────────────────────────────────

const HARDCODED_ITEMS: ItemRow[] = [
  {
    id: '1',
    itemId: 'ITM-001',
    itemName: 'HP LaserJet Pro M404dn — Monochrome Printer',
    category: 'IT Equipment',
    uom: 'ea',
    unitPrice: 920.0,
    status: 'Active',
  },
  {
    id: '2',
    itemId: 'ITM-002',
    itemName: 'Dell OptiPlex 7090 — Desktop Computer',
    category: 'IT Equipment',
    uom: 'ea',
    unitPrice: 1240.0,
    status: 'Active',
  },
  {
    id: '3',
    itemId: 'ITM-003',
    itemName: 'Cisco Catalyst 9200 — 24-Port Switch',
    category: 'Networking',
    uom: 'ea',
    unitPrice: 3800.0,
    status: 'Active',
  },
  {
    id: '4',
    itemId: 'ITM-004',
    itemName: 'HVAC Filter Unit (MERV-13) — 600x600mm',
    category: 'Facilities',
    uom: 'ea',
    unitPrice: 142.0,
    status: 'Active',
  },
  {
    id: '5',
    itemId: 'ITM-005',
    itemName: 'Compressed Gas Cylinder — R-410A Refrigerant 10kg',
    category: 'Facilities',
    uom: 'ea',
    unitPrice: 220.0,
    status: 'Active',
  },
  {
    id: '6',
    itemId: 'ITM-006',
    itemName: 'UPS Battery Module — APC Smart-UPS 3000VA',
    category: 'IT Equipment',
    uom: 'ea',
    unitPrice: 680.0,
    status: 'Active',
  },
  {
    id: '7',
    itemId: 'ITM-007',
    itemName: 'Network Cable — Cat6 UTP 305m Reel',
    category: 'Networking',
    uom: 'reel',
    unitPrice: 128.0,
    status: 'Active',
  },
  {
    id: '8',
    itemId: 'ITM-008',
    itemName: 'Office Desk Chair — Ergonomic Mesh Back',
    category: 'Furniture',
    uom: 'ea',
    unitPrice: 175.0,
    status: 'Active',
  },
  {
    id: '9',
    itemId: 'ITM-009',
    itemName: 'A4 Copy Paper — 80gsm 5-Ream Box',
    category: 'Office Supplies',
    uom: 'box',
    unitPrice: 38.5,
    status: 'Active',
  },
  {
    id: '10',
    itemId: 'ITM-010',
    itemName: 'Toner Cartridge — HP 26A Black',
    category: 'IT Equipment',
    uom: 'ea',
    unitPrice: 95.0,
    status: 'Inactive',
  },
  {
    id: '11',
    itemId: 'ITM-011',
    itemName: 'Fiber Patch Panel — 24-Port LC',
    category: 'Networking',
    uom: 'ea',
    unitPrice: 215.0,
    status: 'Active',
  },
  {
    id: '12',
    itemId: 'ITM-012',
    itemName: 'Conference Table — 3.2m Boardroom Oak Finish',
    category: 'Furniture',
    uom: 'ea',
    unitPrice: 1450.0,
    status: 'Discontinued',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED DEDUPLICATION RESULTS — AI Analysis mock data, matching screenshot
// ─────────────────────────────────────────────────────────────────────────────

const HARDCODED_DUPLICATES: DuplicatePair[] = [
  {
    id: 'dup-1',
    itemA: { name: 'HVAC Filter Unit (MERV-13) 600x600mm', itemId: 'ITM-0041', category: 'Facilities' },
    itemB: { name: 'Air Filter MERV13 600x600', itemId: 'ITM-0087', category: 'Facilities' },
    similarity: 96,
    matchType: 'Exact Duplicate',
    aiRecommendation: 'Merge — keep ITM-0041 (older, more PO history)',
  },
  {
    id: 'dup-2',
    itemA: { name: 'Laptop Computer Dell Latitude 5540', itemId: 'ITM-0012', category: 'IT Equipment' },
    itemB: { name: 'Dell Latitude 5540 Laptop 16GB RAM', itemId: 'ITM-0093', category: 'IT Equipment' },
    similarity: 91,
    matchType: 'Likely Duplicate',
    aiRecommendation: 'Review specs — ITM-0093 has RAM specification; may be variant',
  },
  {
    id: 'dup-3',
    itemA: { name: 'Network Switch 48-Port Managed', itemId: 'ITM-0028', category: 'Network' },
    itemB: { name: '48 Port Managed Ethernet Switch', itemId: 'ITM-0104', category: 'IT Equipment' },
    similarity: 84,
    matchType: 'Likely Duplicate',
    aiRecommendation: 'Different category classification — consolidate under Network',
  },
  {
    id: 'dup-4',
    itemA: { name: 'Office Chair Ergonomic (High Back)', itemId: 'ITM-0055', category: 'Office Furniture' },
    itemB: { name: 'High-Back Executive Ergonomic Chair', itemId: 'ITM-0119', category: 'Office Supplies' },
    similarity: 78,
    matchType: 'Possible Match',
    aiRecommendation: 'Same product, different category — verify and merge if same spec',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const ALL_CATEGORIES: ItemCategory[] = [
  'IT Equipment',
  'Networking',
  'Facilities',
  'Office Supplies',
  'Furniture',
];

// Unit of measure options for the Add Item form
const UOM_OPTIONS = ['ea', 'box', 'reel', 'set', 'pkt', 'ltr', 'kg', 'mtr', 'roll'];

// Mock vendor options for the preferred vendor dropdown
const VENDOR_OPTIONS = [
  '— None —',
  'Zimbabwe Cooling Ltd',
  'Safire Technologies',
  'TransZim Logistics',
  'Afro Build Supplies',
  'Zimbabwe Print Works',
];

const STATUS_STYLE: Record<ItemStatus, { bg: string; color: string }> = {
  Active: { bg: '#E8F5E9', color: '#2E7D32' },
  Inactive: { bg: '#F5F5F5', color: '#757575' },
  Discontinued: { bg: '#FFEBEE', color: '#C62828' },
};

// Match-type pill styling — matching screenshot tones (red / amber / grey-amber)
const MATCH_TYPE_STYLE: Record<MatchType, { bg: string; color: string }> = {
  'Exact Duplicate': { bg: '#FDECEA', color: '#C62828' },
  'Likely Duplicate': { bg: '#FBE9D0', color: '#9C6F09' },
  'Possible Match': { bg: '#EEF1ED', color: '#5F6F62' },
};

// Similarity badge — green-tinted pill matching screenshot
const SIMILARITY_BG = '#E3F2E5';
const SIMILARITY_COLOR = '#2E7D32';

// Initial blank state for the Add Item form
const BLANK_ADD_ITEM_FORM: AddItemForm = {
  itemName: '',
  category: 'Facilities',
  uom: 'ea',
  unitPrice: '',
  preferredVendor: '— None —',
  spendCategory: '',
  specificationNotes: '',
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return value.toFixed(2);
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM DATAGRID FOOTER — reused for both the Item Master grid and the
// Deduplication Results grid, matching the VendorDashboard reference pattern
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CHIP — pill style matching screenshot (used inside the DataGrid cell)
// ─────────────────────────────────────────────────────────────────────────────

function StatusChip({ value }: { value: ItemStatus }) {
  const { bg, color } = STATUS_STYLE[value];
  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 24,
        fontSize: 11,
        fontWeight: 700,
        borderRadius: '999px',
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MATCH TYPE CHIP — for the deduplication results grid
// ─────────────────────────────────────────────────────────────────────────────

function MatchTypeChip({ value }: { value: MatchType }) {
  const { bg, color } = MATCH_TYPE_STYLE[value];
  return (
    <Chip
      label={value}
      size="small"
      sx={{
        height: 24,
        fontSize: 11,
        fontWeight: 700,
        borderRadius: '999px',
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMILARITY BADGE — green percentage pill matching screenshot
// ─────────────────────────────────────────────────────────────────────────────

function SimilarityBadge({ value }: { value: number }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: '3px',
        borderRadius: '6px',
        bgcolor: SIMILARITY_BG,
        color: SIMILARITY_COLOR,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      {value}%
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD ITEM DIALOG — popup triggered by "Add Item" button
// Styled to match the screenshot: pale green wash, uppercase field labels,
// green-tinted inputs, AI Duplicate Check banner, three footer actions.
// ─────────────────────────────────────────────────────────────────────────────

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (form: AddItemForm) => void;
  onCheckDuplicates: (form: AddItemForm) => void;
}

function AddItemDialog({ open, onClose, onSave, onCheckDuplicates }: AddItemDialogProps) {
  const [form, setForm] = useState<AddItemForm>(BLANK_ADD_ITEM_FORM);

  // Reset form every time the dialog opens fresh
  React.useEffect(() => {
    if (open) setForm(BLANK_ADD_ITEM_FORM);
  }, [open]);

  const patch = (key: keyof AddItemForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Shared input style — pale green-tinted bg matching screenshot
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: 13,
      bgcolor: (t: any) => alpha(t.palette.primary.main, 0.06),
      '& fieldset': { borderColor: (t: any) => alpha(t.palette.primary.main, 0.25) },
      '&:hover fieldset': { borderColor: 'primary.main' },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    },
  };

  // Shared label style — small, uppercase, muted — matching screenshot
  const fieldLabel = (label: string, required = false) => (
    <Typography
      variant="caption"
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: 'text.secondary',
        textTransform: 'uppercase',
        mb: 0.75,
        display: 'block',
      }}
    >
      {label}{required && ' *'}
    </Typography>
  );

  const selectSx = {
    borderRadius: '8px',
    fontSize: 13,
    bgcolor: (t: any) => alpha(t.palette.primary.main, 0.06),
    '& fieldset': { borderColor: (t: any) => alpha(t.palette.primary.main, 0.25) },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: (t) => alpha(t.palette.primary.main, 0.15),
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* ── Header ────────────────────────────────────────────────────── */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, pt: 3, pb: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <ListAltOutlinedIcon sx={{ color: 'primary.dark', fontSize: 22 }} />
            <Typography variant="h6" fontWeight={700} fontSize={18} color="primary.dark">
              Add Item to Master
            </Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px',
              color: 'text.secondary',
              p: 0.75,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Box sx={{ px: 3, pb: 3 }}>
          {/* ── AI Duplicate Check banner ────────────────────────────────── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.25,
              px: 2,
              py: 1.5,
              borderRadius: '10px',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
              border: '1px solid',
              borderColor: (t) => alpha(t.palette.primary.main, 0.2),
              mb: 3,
            }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 12, color: 'primary.main', mt: '3px', flexShrink: 0 }} />
            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, fontSize: 11.5, letterSpacing: '0.04em', color: 'primary.dark', textTransform: 'uppercase' }}
              >
                AI Duplicate Check
              </Typography>
              <Typography variant="body2" fontSize={12.5} color="text.secondary" lineHeight={1.5} mt={0.25}>
                AI will scan for similar items on save and flag potential duplicates before committing to the master list.
              </Typography>
            </Box>
          </Box>

          {/* ── Item Name / Description ────────────────────────────────────── */}
          <Box mb={2.5}>
            {fieldLabel('Item Name / Description', true)}
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. HVAC Filter Unit MERV-13 600x600mm"
              value={form.itemName}
              onChange={(e) => patch('itemName', e.target.value)}
              sx={inputSx}
            />
          </Box>

          {/* ── Category | UOM | Unit Price ────────────────────────────────── */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 2,
              mb: 2.5,
            }}
          >
            <Box>
              {fieldLabel('Category', true)}
              <Select
                fullWidth
                size="small"
                value={form.category}
                onChange={(e) => patch('category', e.target.value)}
                sx={selectSx}
              >
                {ALL_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat} sx={{ fontSize: 13 }}>{cat}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              {fieldLabel('Unit of Measure', true)}
              <Select
                fullWidth
                size="small"
                value={form.uom}
                onChange={(e) => patch('uom', e.target.value)}
                sx={selectSx}
              >
                {UOM_OPTIONS.map((u) => (
                  <MenuItem key={u} value={u} sx={{ fontSize: 13 }}>{u}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              {fieldLabel('Unit Price (USD)')}
              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="0.00"
                value={form.unitPrice}
                onChange={(e) => patch('unitPrice', e.target.value)}
                inputProps={{ min: 0, step: '0.01' }}
                sx={inputSx}
              />
            </Box>
          </Box>

          {/* ── Preferred Vendor | Spend Category (GL Code) ───────────────── */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mb: 2.5,
            }}
          >
            <Box>
              {fieldLabel('Preferred Vendor')}
              <Select
                fullWidth
                size="small"
                value={form.preferredVendor}
                onChange={(e) => patch('preferredVendor', e.target.value)}
                sx={selectSx}
              >
                {VENDOR_OPTIONS.map((v) => (
                  <MenuItem key={v} value={v} sx={{ fontSize: 13 }}>{v}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              {fieldLabel('Spend Category (GL Code)')}
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. 6200-OPEX-FAC"
                value={form.spendCategory}
                onChange={(e) => patch('spendCategory', e.target.value)}
                sx={inputSx}
              />
            </Box>
          </Box>

          {/* ── Specification / Notes ─────────────────────────────────────── */}
          <Box mb={0.5}>
            {fieldLabel('Specification / Notes')}
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              placeholder="Technical specification, brand standards, or procurement notes..."
              value={form.specificationNotes}
              onChange={(e) => patch('specificationNotes', e.target.value)}
              sx={inputSx}
            />
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* ── Footer: Cancel | Check Duplicates | Save to Master ───────── */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ px: 3, py: 2 }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outlined"
            startIcon={<ContentPasteSearchOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={() => onCheckDuplicates(form)}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              borderColor: (t) => alpha(t.palette.primary.main, 0.5),
              color: 'primary.dark',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
              '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.1) },
            }}
          >
            Check Duplicates
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={() => onSave(form)}
            disabled={!form.itemName.trim()}
            sx={{
              fontSize: 13,
              fontWeight: 700,
              borderRadius: '8px',
              textTransform: 'none',
              bgcolor: 'primary.dark',
              '&:hover': { bgcolor: '#1B5E20' },
            }}
          >
            Save to Master
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEDUPLICATION RESULTS DIALOG — popup shown after "Run Deduplication"
// Results are now rendered with DataGrid instead of a manual MUI Table.
// ─────────────────────────────────────────────────────────────────────────────

interface DeduplicationDialogProps {
  open: boolean;
  onClose: () => void;
  duplicates: DuplicatePair[];
  onMerge: (pairId: string) => void;
  onKeepBoth: (pairId: string) => void;
  onApplyAllRecommended: () => void;
  onDownloadReport: () => void;
  onDismiss: () => void;
}

function DeduplicationDialog({
  open,
  onClose,
  duplicates,
  onMerge,
  onKeepBoth,
  onApplyAllRecommended,
  onDownloadReport,
  onDismiss,
}: DeduplicationDialogProps) {
  // ---- DataGrid rows: DuplicatePair objects already carry a unique `id` ----
  const dedupeRows = duplicates;

  // ---- DataGrid column definitions for the deduplication results grid ----
  const dedupeColumns: GridColDef<DuplicatePair>[] = [
    {
      field: 'itemA',
      headerName: 'Item A',
      flex: 1.3,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <Stack justifyContent="center" height="100%" py={1}>
          <Typography variant="body2" fontWeight={600} fontSize={13} lineHeight={1.4}>
            {params.row.itemA.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontSize: 11.5 }}
          >
            {params.row.itemA.itemId} &bull; {params.row.itemA.category}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'itemB',
      headerName: 'Item B',
      flex: 1.3,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <Stack justifyContent="center" height="100%" py={1}>
          <Typography variant="body2" fontWeight={600} fontSize={13} lineHeight={1.4}>
            {params.row.itemB.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontSize: 11.5 }}
          >
            {params.row.itemB.itemId} &bull; {params.row.itemB.category}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'similarity',
      headerName: 'Similarity',
      flex: 0.7,
      minWidth: 110,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <SimilarityBadge value={params.row.similarity} />
      ),
    },
    {
      field: 'matchType',
      headerName: 'Match Type',
      flex: 0.9,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <MatchTypeChip value={params.row.matchType} />
      ),
    },
    {
      field: 'aiRecommendation',
      headerName: 'AI Recommendation',
      flex: 1.4,
      minWidth: 220,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <Typography variant="body2" fontSize={12.5} color="text.secondary" lineHeight={1.5}>
          {params.row.aiRecommendation}
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 170,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<DuplicatePair>) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onMerge(params.row.id)}
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              borderRadius: '6px',
              textTransform: 'none',
              borderColor: 'primary.main',
              color: 'primary.dark',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.12) },
            }}
          >
            Merge
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onKeepBoth(params.row.id)}
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              borderRadius: '6px',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
              whiteSpace: 'nowrap',
            }}
          >
            Keep Both
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: '#fff',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* ── Header ────────────────────────────────────────────────────── */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 2.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <VerifiedUserOutlinedIcon sx={{ color: 'primary.dark', fontSize: 22 }} />
            <Typography variant="h6" fontWeight={700} fontSize={18}>
              Deduplication Results — AI Analysis
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* Potential duplicates found badge */}
            <Chip
              label={`${duplicates.length} Potential Duplicates Found`}
              size="small"
              sx={{
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                borderRadius: '999px',
                bgcolor: '#F4E3BD',
                color: '#8A6315',
                '& .MuiChip-label': { px: 1.5 },
              }}
            />
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />

        {/* ── Results grid (DataGrid) ─────────────────────────────────────── */}
        <Box sx={{ px: 0 }}>
          <DataGrid
            rows={dedupeRows}
            columns={dedupeColumns}
            autoHeight
            getRowHeight={() => 'auto'}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            slots={{
              footer: CustomFooter,
              noRowsOverlay: () => (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%" py={6}>
                  <Typography variant="body2" color="text.secondary" fontSize={13}>
                    No potential duplicates found.
                  </Typography>
                </Box>
              ),
            }}
            slotProps={{
            toolbar: {
              showQuickFilter: false,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            sx={{
              border: 'none',
              fontSize: 13,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#fff',
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              },
              '& .MuiDataGrid-cell': {
                fontSize: 13,
                py: 1,
                borderBottom: '1px solid',
                borderColor: (t) => alpha(t.palette.text.primary, 0.06),
              },
              '& .MuiDataGrid-row': {
                minHeight: 56,
              },
            }}
          />
        </Box>

        <Divider />

        {/* ── Footer actions — Apply All Recommended Merges | Download Report | Dismiss ── */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ px: 3, py: 2.5 }}
        >
          <Button
            variant="outlined"
            startIcon={<CheckIcon sx={{ fontSize: 16 }} />}
            onClick={onApplyAllRecommended}
            disabled={duplicates.length === 0}
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              borderRadius: '8px',
              textTransform: 'none',
              borderColor: 'primary.main',
              color: 'primary.dark',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.12) },
            }}
          >
            Apply All Recommended Merges
          </Button>

          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={onDownloadReport}
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
              whiteSpace: 'nowrap',
            }}
          >
            Download Report
          </Button>

          <Button
            variant="outlined"
            startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
            onClick={onDismiss}
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
            }}
          >
            Dismiss
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP TOOLBAR — Search, Category filter, Bulk Upload, Run Deduplication, Add Item
// ─────────────────────────────────────────────────────────────────────────────

interface ToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  onBulkUpload: () => void;
  onRunDeduplication: () => void;
  dedupeLoading: boolean;
  onAddItem: () => void;
}

function ItemMasterToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onBulkUpload,
  onRunDeduplication,
  dedupeLoading,
  onAddItem,
}: ToolbarProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
      alignItems={{ xs: 'stretch', md: 'center' }}
      justifyContent="space-between"
      mb={2}
    >
      {/* Left: Search + Category filter */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flex={1}>
        <TextField
          size="small"
          placeholder="Search items..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            minWidth: { sm: 280 },
            '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: 13, bgcolor: 'background.paper' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            displayEmpty
            sx={{ borderRadius: '8px', fontSize: 13, bgcolor: 'background.paper' }}
          >
            <MenuItem value="" sx={{ fontSize: 13 }}>All Categories</MenuItem>
            {ALL_CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ fontSize: 13 }}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Right: Action buttons */}
      <Stack direction="row" spacing={1.25} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<UploadOutlinedIcon sx={{ fontSize: 16 }} />}
          onClick={onBulkUpload}
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            borderRadius: '8px',
            textTransform: 'none',
            borderColor: 'divider',
            color: 'text.primary',
            whiteSpace: 'nowrap',
          }}
        >
          Bulk Upload
        </Button>

        {/* Run Deduplication — amber/gold accent matching screenshot; opens the results popup */}
        <Button
          size="small"
          variant="contained"
          startIcon={
            dedupeLoading ? (
              <CircularProgress size={14} sx={{ color: '#fff' }} />
            ) : (
              <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />
            )
          }
          onClick={onRunDeduplication}
          disabled={dedupeLoading}
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            borderRadius: '8px',
            textTransform: 'none',
            bgcolor: '#B8860B',
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: '#9C6F09' },
          }}
        >
          {dedupeLoading ? 'Analyzing…' : 'Run Deduplication'}
        </Button>

        {/* Add Item — opens the AddItemDialog popup */}
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={onAddItem}
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            borderRadius: '8px',
            textTransform: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Add Item
        </Button>
      </Stack>
    </Stack>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ItemMaster() {
  const theme = useTheme();
  const router = useRouter();

  // ---- Search & filter state ----
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // ---- Loading / error state (for simulation) ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Success feedback state ----
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ---- Add Item dialog state ----
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);

  // ---- Deduplication dialog state ----
  const [dedupeDialogOpen, setDedupeDialogOpen] = useState(false);
  const [dedupeLoading, setDedupeLoading] = useState(false);
  // Local working copy of duplicate pairs so Merge/Keep Both can remove rows from the list
  const [duplicatePairs, setDuplicatePairs] = useState<DuplicatePair[]>(HARDCODED_DUPLICATES);

  // ----------------------------------------------------------------------
  // USE HARDCODED DATA INSTEAD OF API
  // ----------------------------------------------------------------------

  const items = HARDCODED_ITEMS;

  // ---- Apply client-side search/filter ----
  // Note: pagination is now handled internally by DataGrid, so we only need
  // the filtered set — no manual page-slicing required.
  const filteredRows = useMemo(() => 
     items.filter((row) => {
      const matchesSearch =
        !searchQuery ||
        row.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.itemId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !categoryFilter || row.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
  , [items, searchQuery, categoryFilter]);

  // ----------------------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------------------

  const handleEdit = (itemId: string) => {
    // router.push(`/item-master/${itemId}/edit`);
  };

  // Opens the Add Item dialog
  const handleAddItem = () => {
    setAddItemDialogOpen(true);
  };

  // Saves the new item from the Add Item dialog
  const handleSaveItem = (form: AddItemForm) => {
    // TODO: call POST /api/items with the form data, then refresh the item list
    setAddItemDialogOpen(false);
    setSuccessMessage(`"${form.itemName}" added to the master list successfully.`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Checks for duplicates from within the Add Item dialog without saving
  const handleCheckDuplicatesFromAddForm = (form: AddItemForm) => {
    // TODO: call POST /api/items/check-duplicates with the form data
    // For now: close the Add dialog and open the deduplication results dialog
    setAddItemDialogOpen(false);
    setDuplicatePairs(HARDCODED_DUPLICATES);
    setDedupeDialogOpen(true);
  };

  const handleBulkUpload = () => {
    // router.push('/item-master/bulk-upload');
  };

  // Opens the Deduplication Results dialog and (mock) loads the AI analysis
  const handleRunDeduplication = () => {
    setDedupeLoading(true);
    setDuplicatePairs(HARDCODED_DUPLICATES); // reset to full mock set on each run
    // TODO: call POST /api/items/deduplicate and populate duplicatePairs with the response
    setTimeout(() => {
      setDedupeLoading(false);
      setDedupeDialogOpen(true);
    }, 600); // simulated AI analysis delay
  };

  const handleCloseDedupeDialog = () => {
    setDedupeDialogOpen(false);
  };

  // Merge a single pair — removes it from the working list and shows a success toast
  const handleMergePair = (pairId: string) => {
    // TODO: call POST /api/items/deduplicate/:pairId/merge
    setDuplicatePairs((prev) => prev.filter((p) => p.id !== pairId));
    setSuccessMessage('Items merged successfully.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Keep both items as distinct — removes the pairing from the working list
  const handleKeepBothPair = (pairId: string) => {
    // TODO: call POST /api/items/deduplicate/:pairId/dismiss
    setDuplicatePairs((prev) => prev.filter((p) => p.id !== pairId));
  };

  // Apply all AI-recommended merges in one action
  const handleApplyAllRecommended = () => {
    // TODO: call POST /api/items/deduplicate/apply-all
    const mergedCount = duplicatePairs.length;
    setDuplicatePairs([]);
    setDedupeDialogOpen(false);
    setSuccessMessage(`${mergedCount} recommended merge(s) applied successfully.`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Download the deduplication report (mock)
  const handleDownloadReport = () => {
    // TODO: trigger CSV / PDF report download
  };

  // Dismiss the entire deduplication run without taking action
  const handleDismissDedupe = () => {
    setDedupeDialogOpen(false);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCategoryFilter('');
  };

  // ----------------------------------------------------------------------
  // DATAGRID COLUMN DEFINITIONS — Item Master grid
  // ----------------------------------------------------------------------

  const itemColumns: GridColDef<ItemRow>[] = [
    {
      field: 'itemId',
      headerName: 'Item ID',
      flex: 0.8,
      minWidth: 110,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Typography variant="body2" fontWeight={600} fontSize={12.5} color="text.secondary">
          {params.row.itemId}
        </Typography>
      ),
    },
    {
      field: 'itemName',
      headerName: 'Item Name',
      flex: 2,
      minWidth: 260,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Typography variant="body2" fontWeight={500} fontSize={13}>
          {params.row.itemName}
        </Typography>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Typography variant="body2" fontSize={13} color="text.secondary">
          {params.row.category}
        </Typography>
      ),
    },
    {
      field: 'uom',
      headerName: 'UOM',
      flex: 0.5,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Typography variant="body2" fontSize={13} color="text.secondary">
          {params.row.uom}
        </Typography>
      ),
    },
    {
      field: 'unitPrice',
      headerName: 'Unit Price (USD)',
      flex: 0.9,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Typography variant="body2" fontWeight={700} fontSize={13} color="primary.dark">
          {formatCurrency(params.row.unitPrice)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <StatusChip value={params.row.status} />
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.4,
      minWidth: 64,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<ItemRow>) => (
        <Tooltip title="Edit Item">
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row.itemId)}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px',
              color: 'text.secondary',
              p: 0.6,
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------

  return (
    <Box>
      {/* ── Breadcrumbs / page header ───────────────────────────────────── */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Item Master"
          paths={[
            { label: 'Admin', href: '/dashboard' },
            { label: 'Item Master', href: '/item-master' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* ── Success / Error alerts ──────────────────────────────────────── */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 1.5 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* ── Toolbar: search, category filter, bulk actions ─────────────── */}
      <ItemMasterToolbar
        search={searchQuery}
        onSearchChange={(v) => setSearchQuery(v)}
        category={categoryFilter}
        onCategoryChange={(v) => setCategoryFilter(v)}
        onBulkUpload={handleBulkUpload}
        onRunDeduplication={handleRunDeduplication}
        dedupeLoading={dedupeLoading}
        onAddItem={handleAddItem}
      />

      {/* ── Item Grid (DataGrid) ─────────────────────────────────────────── */}
      <Box
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: '12px',
          borderColor: 'divider',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={itemColumns}
          loading={loading}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          onRowClick={(params) => handleEdit(params.row.itemId)}
          slotProps={{
            toolbar: {
              showQuickFilter: false,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          slots={{
            footer: CustomFooter,
            loadingOverlay: () => (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%" py={8}>
                <CircularProgress size={28} />
              </Box>
            ),
            noRowsOverlay: () => (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%" py={6}>
                <Typography variant="body2" color="text.secondary" fontSize={13}>
                  No items match the current filters.
                </Typography>
              </Box>
            ),
          }}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
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
              fontSize: 13,
              fontWeight: 600,
              color: 'primary.main',
            },

            '& .MuiDataGrid-cell': {
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            },

            '& .MuiDataGrid-row': {
              minHeight: 34,
              maxHeight: 34,
            },
          }}
        />
      </Box>

      {/* ── Add Item Dialog (popup) ──────────────────────────────────────── */}
      <AddItemDialog
        open={addItemDialogOpen}
        onClose={() => setAddItemDialogOpen(false)}
        onSave={handleSaveItem}
        onCheckDuplicates={handleCheckDuplicatesFromAddForm}
      />

      {/* ── Deduplication Results Dialog (popup) ────────────────────────── */}
      <DeduplicationDialog
        open={dedupeDialogOpen}
        onClose={handleCloseDedupeDialog}
        duplicates={duplicatePairs}
        onMerge={handleMergePair}
        onKeepBoth={handleKeepBothPair}
        onApplyAllRecommended={handleApplyAllRecommended}
        onDownloadReport={handleDownloadReport}
        onDismiss={handleDismissDedupe}
      />
    </Box>
  );
}

export default ItemMaster;