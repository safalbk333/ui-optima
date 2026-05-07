'use client';

import React, { useState } from 'react';

import {
  Box,
  Grid,
  Chip,
  Stack,
  Button,
  Avatar,
  Switch,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

const categories = [
  'Laptops',
  'Printers',
  'Office Supplies',
  'Warehouse Devices',
  'Networking',
  'Industrial Equipment',
];

const brands = ['Dell', 'HP', 'Lenovo', 'Canon', 'Zebra', 'Honeywell'];

const vendors = [
  'TechNova Solutions',
  'Prime Industrial Supplies',
  'GreenLeaf Traders',
  'Skyline Logistics',
];

function AddVendorProduct() {
  const theme = useTheme();

  const [tags, setTags] = useState<string[]>(['Electronics', 'Corporate', 'Bulk Purchase']);

  const PRIMARY = theme.palette.primary.main;

  const sectionStyle = {
    bgcolor: 'transparent',
    overflow: 'hidden',
  };

  return (
    <Box>
      {/* Breadcrumb */}

      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Vendor Products"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor Dashboard', href: '/products' },
            { label: 'Add Product', href: '/products/details/' },
          ]}
        />
      </Box>

      <Box mb={3} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Grid container spacing={3}>
        {/* LEFT SECTION */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* PRODUCT INFORMATION */}

            <Box sx={sectionStyle}>
              <Box>
                <Typography fontWeight={600} fontSize={15} mb={3}>
                  Product Information
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Product Name"
                      placeholder="Enter product name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Product Code / SKU"
                      placeholder="PRD-1001"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <QrCode2RoundedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      size="small"
                      options={vendors}
                      renderInput={(params) => <TextField {...params} label="Vendor" />}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      size="small"
                      options={categories}
                      renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      size="small"
                      options={brands}
                      renderInput={(params) => <TextField {...params} label="Brand" />}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField size="small" select fullWidth label="Unit Type">
                      <MenuItem value="pcs">Pieces</MenuItem>
                      <MenuItem value="box">Box</MenuItem>
                      <MenuItem value="kg">Kilogram</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      rows={4}
                      label="Product Description"
                      placeholder="Write product details, specifications, warranty info..."
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* PRICING & INVENTORY */}

            <Box sx={sectionStyle}>
              <Box>
                <Typography fontWeight={600} fontSize={15} mb={3}>
                  Pricing & Inventory
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Purchase Price"
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Selling Price"
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField size="small" fullWidth label="Discount %" placeholder="0" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField size="small" fullWidth label="Available Quantity" placeholder="0" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Minimum Stock Alert"
                      placeholder="10"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Warehouse Location"
                      placeholder="Rack A12"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WarehouseOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* SPECIFICATIONS */}

            <Box sx={sectionStyle}>
              <Box>
                <Typography fontWeight={600} fontSize={15} mb={3}>
                  Specifications & Tags
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField size="small" fullWidth label="Warranty" placeholder="1 Year" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField size="small" fullWidth label="Model Number" placeholder="DL-5540" />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      multiple
                      freeSolo
                      value={tags}
                      onChange={(_, value) => setTags(value)}
                      options={[]}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={index}
                            label={option}
                            color="primary"
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Product Tags" placeholder="Add tags" />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable Product Visibility"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Grid>

        {/* RIGHT SECTION */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* PRODUCT MEDIA */}

            <Box sx={sectionStyle}>
              <Box p={3}>
                <Typography fontWeight={600} fontSize={15} mb={2.5}>
                  Product Media
                </Typography>

                <Box
                  sx={{
                    border: `1.5px dashed ${alpha(PRIMARY, 0.3)}`,
                    borderRadius: 1.5,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: alpha(PRIMARY, 0.02),
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: alpha(PRIMARY, 0.1),
                      color: PRIMARY,
                    }}
                  >
                    <AddPhotoAlternateRoundedIcon />
                  </Avatar>

                  <Typography fontWeight={600} mb={1}>
                    Upload Product Images
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Drag & drop files here or browse from device
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadRoundedIcon />}
                    sx={{
                      boxShadow: 'none',
                      borderRadius: 1,
                    }}
                  >
                    Upload Files
                  </Button>
                </Box>

                <Stack direction="row" spacing={1.5} mt={2}>
                  {[1, 2, 3].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 1.5,
                        position: 'relative',
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'background.paper',
                          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                        }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* PRODUCT STATUS */}

            <Box sx={sectionStyle}>
              <Box p={3}>
                <Typography fontWeight={600} fontSize={15} mb={2.5}>
                  Product Status
                </Typography>

                <Stack spacing={2}>
                  <TextField size="small" select fullWidth label="Availability">
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="low-stock">Low Stock</MenuItem>
                    <MenuItem value="out-stock">Out of Stock</MenuItem>
                  </TextField>

                  <TextField size="small" select fullWidth label="Approval Status">
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </TextField>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddVendorProduct;
