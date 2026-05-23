'use client';

import { Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import React from 'react';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

const uploadBoxStyle = {
  border: '1px dashed #c7cdd4',
  borderRadius: 2,
  height: 110,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  bgcolor: '#fafafa',
  transition: '0.2s',
  '&:hover': {
    bgcolor: '#f5f5f5',
  },
};

function SectionBox({ title, subtitle, status, statusColor, children }: any) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        border: '1px solid #dfe3e8',
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={1.5}>
        <Box>
          <Typography fontSize={13} fontWeight={700} color="text.primary">
            {title}
          </Typography>

          <Typography fontSize={10} color="text.secondary" mt={0.3}>
            {subtitle}
          </Typography>
        </Box>

        <Chip
          label={status}
          size="small"
          color={statusColor}
          sx={{
            height: 20,
            fontSize: 9,
            fontWeight: 700,
            borderRadius: 1,
          }}
        />
      </Stack>

      {children}
    </Box>
  );
}

export default function VendorDocuments() {
  return (
    <Stack spacing={2}>
      {/* W9 FORM */}
      <SectionBox
        title="W-9 / W-8BEN Form"
        subtitle="Request for Taxpayer Identification Number and Certification."
        status="Required"
        statusColor="primary.main"
      >
        <Box sx={uploadBoxStyle}>
          <UploadFileRoundedIcon
            sx={{
              fontSize: 24,
              color: 'text.secondary',
              mb: 0.5,
            }}
          />

          <Typography fontSize={11} fontWeight={600} color="primary.main">
            Click to upload
            <Typography component="span" fontSize={11} color="text.secondary">
              {' '}
              or drag and drop
            </Typography>
          </Typography>

          <Typography fontSize={10} color="text.secondary">
            PDF, JPG or PNG (max. 10MB)
          </Typography>
        </Box>
      </SectionBox>

      {/* INSURANCE */}
      <SectionBox
        title="Insurance Certificates"
        subtitle="General Liability, Workers Comp, and Professional Liability."
        status="Required"
        statusColor="primary.main"
      >
        <Grid container spacing={1.2} mb={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography fontSize={10} fontWeight={600} mb={0.5}>
              Policy Number
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="GL-90034-22"
              InputProps={{
                sx: {
                  fontSize: 11,
                  height: 34,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography fontSize={10} fontWeight={600} mb={0.5}>
              Expiration Date
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  fontSize: 11,
                  height: 34,
                },
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            ...uploadBoxStyle,
            height: 70,
          }}
        >
          <CloudUploadOutlinedIcon
            sx={{
              fontSize: 20,
              color: 'text.secondary',
              mb: 0.5,
            }}
          />

          <Typography fontSize={10} color="text.secondary">
            Drop Certificate PDF Here
          </Typography>
        </Box>
      </SectionBox>

      {/* QUALITY */}
      <SectionBox
        title="Quality & Industry Certifications"
        subtitle="ISO 9001, SOC2, HIPAA, or other relevant certifications."
        status="Optional"
        statusColor="primary.main"
      >
        <Box sx={uploadBoxStyle}>
          <WorkspacePremiumOutlinedIcon
            sx={{
              fontSize: 24,
              color: 'text.secondary',
              mb: 0.5,
            }}
          />

          <Typography fontSize={10} color="text.secondary">
            Add certification documents
          </Typography>
        </Box>
      </SectionBox>
    </Stack>
  );
}
