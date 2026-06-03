'use client';

import * as React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const priorityOptions = ['Low', 'Medium', 'High'];

const currencyOptions = ['USD', 'EUR', 'INR'];

const uomOptions = ['PCS', 'BOX', 'KG', 'LTR'];

const vendorOptions = ['ABC Suppliers', 'Global Tech', 'Prime Industrial', 'Vision Traders'];

export default function RFQBuilderForm() {
  const [items, setItems] = React.useState([
    {
      id: 1,
    },
  ]);

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
            <TextField
              fullWidth
              size="small"
              label="RFQ Title"
              placeholder="Laptop Procurement"
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
            <TextField
              fullWidth
              type="date"
              size="small"
              label="Submission Date"
              InputLabelProps={{ shrink: true }}
              sx={smallInputSx}
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
            <Autocomplete
              multiple
              options={vendorOptions}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Suppliers"
                  placeholder="Select vendors"
                  sx={smallInputSx}
                />
              )}
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
          <Grid size={{xs:12,md:12}}>
             <Autocomplete
        multiple
        size='small'
        disableCloseOnSelect
        options={options}
        value={selectedVendors}
                      sx={smallInputSx}

        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => {
          const allSelected =
            selectedVendors.length === vendors.length &&
            vendors.length > 0;

          const checked =
            option.id === SELECT_ALL.id
              ? allSelected
              : selectedVendors.some(
                  (vendor) => vendor.id === option.id
                );

          return (
            <li {...props}>
              <Checkbox checked={checked} />
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Vendors"
            placeholder="Choose vendors"
          />
        )}
      />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              size="small"
              label="Description"
              placeholder="Enter RFQ description"
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

        {/* Attachment Section */}
        <Typography fontSize={13} fontWeight={600} mt={2.5} mb={1}>
          Attachments
        </Typography>

        <Typography fontSize={11} color="text.secondary" mb={1.5}>
          Upload RFQ related documents and supporting files
        </Typography>

        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          {/* Uploaded Files */}
          <Stack spacing={1} py={1.5}>
            {[
              {
                name: 'Technical Specification.pdf',
                size: '2.5 MB',
                color: '#14b8a6',
                bg: 'rgba(20,184,166,0.10)',
              },
              {
                name: 'Vendor Requirement.docx',
                size: '1.2 MB',
                color: '#f97316',
                bg: 'rgba(249,115,22,0.10)',
              },
              {
                name: 'Quotation Format.xlsx',
                size: '850 KB',
                color: '#8b5cf6',
                bg: 'rgba(139,92,246,0.10)',
              },
            ].map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1.2,
                  borderRadius: 1,
                  border: `1px solid ${file.bg}`,
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 1,
                      bgcolor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: file.color,
                    }}
                  >
                    <InsertDriveFileOutlinedIcon sx={{ fontSize: 20 }} />
                  </Box>

                  <Box>
                    <Typography fontSize={12} fontWeight={600}>
                      {file.name}
                    </Typography>

                    <Typography fontSize={10.5} color="text.secondary">
                      {file.size}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: '#fff',

                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.7)',
                      },
                    }}
                  >
                    <DownloadRoundedIcon sx={{ fontSize: 17 }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: '#fff',
                      color: '#ef4444',

                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.7)',
                      },
                    }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 17 }} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* Upload Area */}
          <Box
            sx={{
              borderTop: '1px solid #f1f5f9',
              py: 2,
            }}
          >
            <Box
              component="label"
              sx={{
                border: '1px dashed #dbe3ec',
                borderRadius: 1,
                minHeight: 170,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: '0.2s',

                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(64,106,175,0.03)',
                },
              }}
            >
              <input type="file" hidden multiple />

              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  bgcolor: 'rgba(64,106,175,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  mb: 1.5,
                }}
              >
                <CloudUploadOutlinedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography fontSize={13} fontWeight={600}>
                Drop your files here
              </Typography>

              <Typography fontSize={11} color="text.secondary" mt={0.5}>
                or click to browse multiple attachments
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Terms */}
        <Typography fontSize={13} fontWeight={600} mt={2.5} mb={1}>
          Terms & Conditions
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={3}
          size="small"
          placeholder="Enter terms and conditions..."
          sx={smallInputSx}
        />
      </Box>
    </Box>
  );
}
