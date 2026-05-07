'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  Avatar,
  Divider,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

function VendorForm() {
  const theme = useTheme();

  const categories = [
    'IT Services',
    'Logistics',
    'Manufacturing',
    'Office Supplies',
    'Consulting',
    'Construction',
  ];

  const countries = ['India', 'UAE', 'Singapore', 'Germany', 'United States'];

  const paymentTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60'];

  const vendorTypes = ['Local Vendor', 'International Vendor', 'Contract Vendor'];

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Create Vendor"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Vendor', href: '/vendor' },
            { label: 'Create', href: '/vendor/management' },
          ]}
        />
      </Box>
      <Box mb={3} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Grid container spacing={3}>
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* BASIC DETAILS */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Box p={3}>
                <Stack direction="row" spacing={1.2} alignItems="center" mb={3}>
                  <Typography fontSize={14} fontWeight={600}>
                    Basic Information
                  </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Vendor Name" placeholder="Enter vendor name" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Vendor Code" placeholder="VEN-1001" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      options={vendorTypes}
                      renderInput={(params) => <TextField {...params} label="Vendor Type" />}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      options={categories}
                      renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      label="Description"
                      placeholder="Enter vendor description..."
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>

            {/* CONTACT DETAILS */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Box p={3}>
                <Stack direction="row" spacing={1.2} alignItems="center" mb={3}>
                  <Typography fontSize={14} fontWeight={600}>
                    Contact Details
                  </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Contact Person" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Phone Number" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Email Address" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Website" />
                  </Grid>
                </Grid>
              </Box>
            </Card>

            {/* ADDRESS */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Box p={3}>
                <Stack direction="row" spacing={1.2} alignItems="center" mb={3}>
                  <Typography fontSize={14} fontWeight={600}>
                    Address Information
                  </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Address Line" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="City" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="State" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField fullWidth label="Postal Code" />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      options={countries}
                      renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>

            {/* BANK DETAILS */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Box p={3}>
                <Stack direction="row" spacing={1.2} alignItems="center" mb={3}>
                  <Typography fontSize={14} fontWeight={600}>
                    Payment & Bank Details
                  </Typography>
                </Stack>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Bank Name" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Account Number" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="IFSC / SWIFT Code" />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      options={paymentTerms}
                      renderInput={(params) => <TextField {...params} label="Payment Terms" />}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Card
              sx={{
                p: 3,
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              {/* Header */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography fontSize={14} fontWeight={600}>
                  Document Repository
                </Typography>
              </Stack>

              {/* Upload Box */}
              <Box
                sx={{
                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.12)}`,
                  borderRadius: 2,
                  px: 2,
                  py: 2,
                  mb: 3,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                      }}
                    >
                      <DescriptionOutlinedIcon
                        sx={{
                          fontSize: 32,
                          color: 'text.secondary',
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography fontSize={14} fontWeight={600}>
                        Bank Details
                      </Typography>

                      <Typography fontSize={12} color="text.secondary">
                        PDF, JPG up to 10MB
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 1.5,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                      color: 'primary.main',
                      transition: '0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <UploadFileRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>

              {/* Uploaded File */}
              <Box
                sx={{
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                  borderRadius: 2,
                  px: 2,
                  py: 2.5,
                  bgcolor: alpha(theme.palette.success.main, 0.02),
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CheckCircleOutlineRoundedIcon
                      sx={{
                        color: 'success.main',
                        fontSize: 34,
                      }}
                    />

                    <Box>
                      <Typography fontSize={13} fontWeight={600}>
                        W-9 Form (2023)
                      </Typography>

                      <Typography
                        fontSize={12}
                        sx={{
                          color: 'success.main',
                          fontWeight: 600,
                        }}
                      >
                        Verified · 1.2MB
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton>
                    <DeleteOutlineRoundedIcon color="disabled" />
                  </IconButton>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* PROFILE */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                overflow: 'hidden',
              }}
            >
              <Box p={3}>
                <Stack spacing={3} alignItems="center">
                  {/* Avatar Preview */}
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: 96,
                        height: 96,
                        fontSize: 32,
                        fontWeight: 700,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        border: `3px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                      }}
                    >
                      V
                    </Avatar>

                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 32,
                        height: 32,
                        bgcolor: 'background.paper',
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        '&:hover': {
                          bgcolor: 'background.paper',
                        },
                      }}
                    >
                      <CloudUploadOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>

                  {/* Info */}
                  <Stack spacing={0.5} alignItems="center">
                    <Typography fontSize={14} fontWeight={700}>
                      Upload Vendor Logo
                    </Typography>

                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      PNG, JPG or SVG up to 5MB
                    </Typography>
                  </Stack>

                  {/* Upload Area */}
                  <Box
                    sx={{
                      width: '100%',
                      border: `1.5px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                      borderRadius: 2,
                      py: 3,
                      px: 2,
                      textAlign: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      transition: '0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                      },
                    }}
                  >
                    <Stack spacing={1} alignItems="center">
                      <CloudUploadOutlinedIcon
                        sx={{
                          fontSize: 34,
                          color: 'primary.main',
                        }}
                      />

                      <Typography fontSize={13} fontWeight={600}>
                        Drag & drop logo here
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        or click to browse files
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Card>

            {/* SETTINGS */}
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Box p={3}>
                <Typography fontSize={13} fontWeight={700} mb={2}>
                  Settings
                </Typography>

                <Stack spacing={1}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Active Vendor" />

                  <Divider />

                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Allow Purchase Orders"
                  />

                  <Divider />

                  <FormControlLabel control={<Switch />} label="Enable Notifications" />
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VendorForm;
