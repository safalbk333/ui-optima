'use client';

import {
  Box,
  Chip,
  Grid,
  Stack,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import React, { useState } from 'react';

const vendorOptions = [
  'ABC Technologies',
  'Global Supplies',
  'Tech Solutions',
  'Prime Vendors',
  'NextGen Systems',
];

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
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
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
            sx={fieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Reference Number"
            fullWidth
            size="small"
            sx={fieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="Category"
            fullWidth
            size="small"
            defaultValue=""
            sx={fieldSx}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Services">Services</MenuItem>
            <MenuItem value="Supply">Supply</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            label="Submission Deadline"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
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
            sx={fieldSx}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Vendors */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Vendors
      </Typography>

      <Autocomplete
        multiple
        size="small"
        options={vendorOptions}
        value={selectedVendors}
        onChange={(_, value) => setSelectedVendors(value)}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: 13,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Vendors"
            placeholder="Choose Vendors"
          />
        )}
      />

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

      {/* Timeline */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        Timeline
      </Typography>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            label="Published Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            sx={fieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            label="Query End Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            sx={fieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            label="Submission Deadline"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            sx={fieldSx}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            type="date"
            label="Evaluation Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            sx={fieldSx}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Actions */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          size="small"
          color='primary'
          sx={{borderRadius:0.5}}
        >
          Save Draft
        </Button>

        <Button
          variant="contained"
          size="small"
                    color='primary'
          sx={{borderRadius:0.5}}

        >
          Publish EOI
        </Button>
      </Stack>
    </Box>
  );
}