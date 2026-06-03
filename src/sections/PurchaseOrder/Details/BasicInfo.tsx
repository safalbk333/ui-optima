'use client';

import * as React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchVendors } from 'src/store/slices/vendor/VendorSlice';

const priorityOptions = ['Low', 'Medium', 'High'];

const currencyOptions = ['USD', 'EUR', 'INR'];

const uomOptions = ['PCS', 'BOX', 'KG', 'LTR'];


export default function POView() {
  const [items, setItems] = React.useState([
    {
      id: 1,
    },
  ]);
  const [selectedVendor, setSelectedVendor] = React.useState<any | null>(null);
const dispatch = useAppDispatch();
const { data: vendor, loading } = useAppSelector(
  (state) => state.vendors
);
React.useEffect(() => {
  dispatch(fetchVendors());
}, [dispatch]);
  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now() }]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const smallInputSx = {
    '& .MuiInputBase-root': {
      fontSize: 12,
      minHeight: 34,
      bgcolor: '#fff',
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px 10px',
    },
  };
  const vendors = [
  { id: 1, name: 'ABC Suppliers' },
  { id: 2, name: 'Global Traders' },
  { id: 3, name: 'Prime Industries' },
  { id: 4, name: 'Tech Procurement Ltd' },
  { id: 5, name: 'Elite Manufacturing' },
];
const SELECT_ALL = {
  id: 0,
  name: 'Select All',
};
 const [selectedVendors, setSelectedVendors] = React.useState<any[]>([]);

  const options = [SELECT_ALL, ...vendors];

  const handleChange = (_: any, value: any[]) => {
    const isSelectAllClicked = value.some(
      (option) => option.id === SELECT_ALL.id
    );

    if (isSelectAllClicked) {
      const allSelected = selectedVendors.length === vendors.length;

      setSelectedVendors(allSelected ? [] : vendors);
      return;
    }

    setSelectedVendors(value);
  };


  return (
    <Box>
      <Box maxWidth={700}>
        {/* RFQ Details */}
        <Typography fontSize={13} fontWeight={600}>
          Basic Details
        </Typography>
        <Typography fontSize={11} color="text.secondary" mb={2}>
          Create supplier quotation request
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
  options={vendors || []}
  loading={loading}
  size="small"
  fullWidth
  value={selectedVendor}
  onChange={(_, value) => setSelectedVendor(value)}
  getOptionLabel={(option) => option?.chr_vendor_name || ''}
  isOptionEqualToValue={(option, value) =>
    option.pk_chr_vendor_id === value.pk_chr_vendor_id
  }
  renderInput={(params) => (
    <TextField
      {...params}
      label="Vendor"
      placeholder="Select Vendor"
    />
  )}
/>
          </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Created By"
              sx={smallInputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              size="small"
              label="Created Date"
              InputLabelProps={{ shrink: true }}
              sx={smallInputSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              options={priorityOptions}
              size="small"
              defaultValue="Medium"
              renderInput={(params) => <TextField {...params} label="Priority" sx={smallInputSx} />}
            />
          </Grid>



          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              options={currencyOptions}
              size="small"
              defaultValue="USD"
              renderInput={(params) => <TextField {...params} label="Currency" sx={smallInputSx} />}
            />
          </Grid>



          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Delivery Location"
              placeholder="Warehouse - Chennai"
              sx={smallInputSx}
            />
          </Grid>

        </Grid>

        {/* Line Items */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2.5} mb={1}>
          <Typography fontSize={13} fontWeight={600}>
            Line Items
          </Typography>
        </Stack>

        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <Grid
            container
            sx={{
              px: 1,
              py: 0.8,
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            {['Item', 'Qty', 'UOM', ''].map((head, index) => (
              <Grid size={{ xs: index === 0 ? 4 : 2.1 }} key={head}>
                <Typography fontSize={11} fontWeight={700} color="text.secondary">
                  {head}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Rows */}
          {items.map((row) => (
            <Grid
              container
              spacing={1}
              key={row.id}
              sx={{
                px: 1,
                py: 1,
                alignItems: 'center',
                borderBottom: '1px solid #edf2f7',
              }}
            >
              <Grid size={{ xs: 4 }}>
                <TextField fullWidth size="small" placeholder="Item name" sx={smallInputSx} />
              </Grid>

              <Grid size={{ xs: 2 }}>
                <TextField fullWidth size="small" placeholder="0" sx={smallInputSx} />
              </Grid>

              <Grid size={{ xs: 5 }}>
                <Autocomplete
                  options={uomOptions}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="UOM" sx={smallInputSx} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 0.6 }}>
                <IconButton
                  size="small"
                  onClick={() => removeItem(row.id)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 67, 54, 0.10)',
                    color: '#d32f2f',
                    transition: 'all 0.2s ease',

                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.18)',
                    },
                  }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Box
            sx={{
              mt: 'auto',
              pt: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              // borderTop: '1px solid',
              // borderColor: 'divider',
            }}
          >
            <Button
              startIcon={<AddIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="outlined"
              onClick={addItem}
              sx={{
                textTransform: 'none',
                fontSize: 11,
                minHeight: 28,
              }}
            >
              Add Item
            </Button>
          </Box>
        </Box>



      </Box>
    </Box>
  );
}
