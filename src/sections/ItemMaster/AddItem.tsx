import { Close, ContentPasteSearchOutlined, FiberManualRecord, ListAltOutlined, SaveOutlined } from "@mui/icons-material";
import { alpha, Box, Button, Divider, IconButton, MenuItem, patch, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

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

interface AddItemForm {
    itemName: string;
    category: string;
    uom: string;
    unitPrice: string;
    preferredVendor: string;
    spendCategory: string;
    specificationNotes: string;
}

interface AddItemProps {
    open: boolean;
    onClose: () => void;
    onSave: (form: AddItemForm) => void;
    onCheckDuplicates: (form: AddItemForm) => void;
}


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


function AddItem({ open, onClose, onSave, onCheckDuplicates }: AddItemProps) {
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
        <Box sx={{ p: 0 }}>
            {/* ── Header ────────────────────────────────────────────────────── */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 3, pt: 3, pb: 2 }}
            >
                <Stack direction="row" alignItems="center" spacing={1.25}>
                    <ListAltOutlined sx={{ color: 'primary.dark', fontSize: 22 }} />
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
                    <Close fontSize="small" />
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
                    <FiberManualRecord sx={{ fontSize: 12, color: 'primary.main', mt: '3px', flexShrink: 0 }} />
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
                    startIcon={<ContentPasteSearchOutlined sx={{ fontSize: 16 }} />}
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
                    startIcon={<SaveOutlined sx={{ fontSize: 16 }} />}
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
        </Box>
    )
}

export default AddItem