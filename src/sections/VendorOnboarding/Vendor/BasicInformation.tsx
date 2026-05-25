'use client';

import * as React from 'react';

import { Box, Grid, Stack, Divider, MenuItem, TextField, Typography } from '@mui/material';

import PayoutPreferences from './PaymentPreference';

const vendorTypes = ['Manufacturer', 'Distributor', 'Wholesaler', 'Service Provider', 'Contractor'];

export default function VendorOnboardingForm() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          borderRadius: 0,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        {/* Header */}
        <Box
          mb={2}
          //   sx={{
          //     p: 2.5,
          //     color: 'white',
          //     background: (theme) =>
          //       `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          //   }}
        >
          <Typography fontSize={13} fontWeight={600}>
            Registration Form
          </Typography>

          <Typography fontSize={12} color="text.secondary" sx={{ mt: 0.5, opacity: 0.9 }}>
            Complete the registration form to become an approved vendor.
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ py: { xs: 2, md: 1 } }}>
          <Stack spacing={3}>
            {/* Company Information */}
            <Box>
              <Typography fontSize={13} fontWeight={600} mb={2}>
                Company Information
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="Company Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField select fullWidth size="small" label="Vendor Type">
                    {vendorTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="GST / Tax ID" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="Website" />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Contact Information */}
            <Box>
              <Typography fontSize={13} fontWeight={600} mb={2}>
                Contact Information
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="Contact Person" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" type="email" label="Email Address" />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth size="small" label="Phone Number" />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Address Details */}
            <Box>
              <Typography fontSize={13} fontWeight={600} mb={2}>
                Address Details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth multiline minRows={2} size="small" label="Address" />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField fullWidth size="small" label="City" />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField fullWidth size="small" label="State" />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField fullWidth size="small" label="ZIP Code" />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField fullWidth size="small" label="Country" />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Banking Information */}
            <Box>
              <Typography fontSize={13} fontWeight={600} mb={2}>
                Banking Information
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField fullWidth size="small" label="Bank Name" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField fullWidth size="small" label="Account Number" />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField fullWidth size="small" label="IFSC Code" />
                </Grid>
              </Grid>
              <Grid container mt={2} mb={2} spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Routing Number"
                    placeholder="9-digit ABA or SWIFT code"
                    InputProps={{
                      inputProps: {
                        maxLength: 18,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mb: 3 }} />

              <PayoutPreferences />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
