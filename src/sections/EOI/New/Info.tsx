'use client';

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { createEOI } from 'src/store/slices/Eoi/EoiSlice';
import { fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { fetchVendors } from 'src/store/slices/vendor/VendorSlice';
import { useRouter } from 'next/navigation';

const fieldSx = {
  '& .MuiInputBase-root': {
    fontSize: 13,
    minHeight: 38,
  },
  '& .MuiInputLabel-root': {
    fontSize: 13,
  },
};

export default function EOIBuilder() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ------------------------------------------------------------------
  // FORM STATE
  // ------------------------------------------------------------------

  const [eoiTitle, setEoiTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');

  const [selectedPR, setSelectedPR] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [selectedVendor, setSelectedVendor] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // ------------------------------------------------------------------
  // REDUX STATE
  // ------------------------------------------------------------------

  const { data: purchaseRequests } = useAppSelector(
    (state) => state.purchaseRequests
  );

  const { data: vendors } = useAppSelector(
    (state) => state.vendors
  );

  // ------------------------------------------------------------------
  // API CALLS
  // ------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchPurchaseRequests());
    dispatch(fetchVendors());
  }, [dispatch]);

  // ------------------------------------------------------------------
  // DROPDOWN OPTIONS
  // ------------------------------------------------------------------
console.log(purchaseRequests,'purchaseRequests')
const purchaseRequestOptions =
  purchaseRequests?.map((pr) => ({
    label: `${pr.chr_request_number} - ${pr.chr_title}`,
    value: pr.pk_chr_request_id,
    raw: pr,
  })) || [];

  const vendorOptions =
    vendors?.map((vendor) => ({
      label: vendor.chr_vendor_name,
      value: vendor.pk_chr_vendor_id,
    })) || [];

  // ------------------------------------------------------------------
  // FILE HANDLERS
  // ------------------------------------------------------------------

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = Array.from(event.target.files || []);

    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) =>
      prev.filter((file) => file.name !== fileName)
    );
  };

  // ------------------------------------------------------------------
  // CREATE EOI
  // ------------------------------------------------------------------

  const handleCreateEOI = async () => {
    const payload = {
      chr_eoi_title: eoiTitle,
      fk_chr_request_id: selectedPR?.value || '',
      fk_chr_vendor_id: selectedVendor?.value || '',
      txt_notes: description,
      dt_submission_deadline: submissionDeadline
        ? new Date(submissionDeadline).toISOString()
        : null,
    };

    try {
      await dispatch(createEOI(payload)).unwrap();

      console.log('EOI Payload:', payload);

      router.push('/eoi');
    } catch (error) {
      console.error('Failed to create EOI:', error);
    }
  };

  return (
    <Box
      sx={{
        py: 1,
        maxWidth: 700,
      }}
    >


      {/* Basic Information */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Basic Information
      </Typography>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
<TextField
  label="EOI Title"
  fullWidth
  size="small"
  value={eoiTitle}
  onChange={(e) => setEoiTitle(e.target.value)}
  sx={fieldSx}
/>
        </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
  options={purchaseRequestOptions}
  value={selectedPR}
  onChange={(_, newValue) => setSelectedPR(newValue)}
  size="small"

  getOptionLabel={(option) => option?.label || ''}

  isOptionEqualToValue={(option, value) =>
    option.value === value?.value
  }

  renderInput={(params) => (
    <TextField
      {...params}
      label="Purchase Request"
      placeholder="Select Purchase Request"
      sx={fieldSx}
    />
  )}
/>
        </Grid>



<Grid size={{ xs: 12, md: 6 }}>
  <Autocomplete
    options={vendorOptions}
    value={selectedVendor}
    onChange={(_, value) => setSelectedVendor(value)}
    size="small"
    renderInput={(params) => (
      <TextField
        {...params}
        label="Vendor"
        placeholder="Select Vendor"
        sx={fieldSx}
      />
    )}
  />
</Grid>

        <Grid size={{ xs: 12, md: 6 }}>
<TextField
  type="date"
  label="Submission Deadline"
  InputLabelProps={{ shrink: true }}
  fullWidth
  size="small"
  value={submissionDeadline}
  onChange={(e) => setSubmissionDeadline(e.target.value)}
  sx={fieldSx}
/>
        </Grid>

        <Grid size={12}>
<TextField
  label="Description"
  multiline
  rows={3}
  fullWidth
  size="small"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  sx={fieldSx}
/>
        </Grid>
      </Grid>




      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        mt={1.5}
      >
        {selectedVendors.map((vendor) => (
          <Chip
            key={vendor}
            label={vendor}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              height: 24,
              fontSize: 12,
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Attachments */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Attachments
      </Typography>

      <Box
        component="label"
        sx={{
          display: 'block',
          border: '1.5px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: 'grey.50',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'grey.100',
            borderColor: 'primary.main',
          },
        }}
      >
        <input
          hidden
          multiple
          type="file"
          onChange={handleFileUpload}
        />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Click or Drag Files Here
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          PDF, DOCX, XLSX, Images
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        mt={1.5}
      >
        {files.map((file) => (
          <Chip
            key={file.name}
            label={file.name}
            size="small"
            onDelete={() => removeFile(file.name)}
            sx={{
              height: 24,
              fontSize: 12,
            }}
          />
        ))}
      </Stack>




      <Divider sx={{ my: 2 }} />

      {/* Actions */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
      >
        {/* <Button
          variant="outlined"
          size="small"
          color='primary'
          sx={{borderRadius:0.5}}
        >
          Save Draft
        </Button> */}

        <Button
          variant="contained"
          size="small"
                    color='primary'
          sx={{borderRadius:0.5}}
            onClick={handleCreateEOI}

        >
          Publish EOI
        </Button>
      </Stack>
    </Box>
  );
}