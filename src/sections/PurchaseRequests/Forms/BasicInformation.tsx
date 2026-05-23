'use client';

import * as React from 'react';

import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';

const commonTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#fff',
    fontSize: 13, // outer root
  },

  // input text
  '& .MuiInputBase-input': {
    fontSize: 13,
  },

  // select text
  '& .MuiSelect-select': {
    fontSize: 13,
  },

  // multiline textarea
  '& textarea': {
    fontSize: 13,
  },

  '& .MuiInputLabel-root': {
    fontSize: 12,
    fontWeight: 600,
  },
};

const commonTextFieldProps = {
  fullWidth: true,
  size: 'small' as const,
  InputLabelProps: {
    shrink: true,
  },
  sx: commonTextFieldSx,
};

export default function PurchaseRequestForm() {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: 13,
            }}
          >
            Basic Information
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              mt: 0.5,
              fontSize: 13,

              maxWidth: 700,
              lineHeight: 1.7,
            }}
          >
            Enter the core procurement request details including request title, department, required
            date, vendor preference, and purchase justification to initiate the P2P approval
            workflow.
          </Typography>
        </Box>
        {/* PR Title */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label="PR TITLE / DESCRIPTION *"
            value="HVAC Filter Replacement & Maintenance — Q2 2026"
            {...commonTextFieldProps}
          />
        </Grid>

        {/* Department */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="DEPARTMENT *"
            value="Network Operations"
            {...commonTextFieldProps}
          >
            <MenuItem value="Network Operations">Network Operations</MenuItem>

            <MenuItem value="Finance">Finance</MenuItem>

            <MenuItem value="HR">HR</MenuItem>
          </TextField>
        </Grid>

        {/* Required By */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="REQUIRED BY *"
            type="date"
            value="2026-06-15"
            {...commonTextFieldProps}
          />
        </Grid>

        {/* Budget Code */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="BUDGET CODE *" value="OPEX-2026-FAC-07" {...commonTextFieldProps} />
        </Grid>

        {/* Cost Centre */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="COST CENTRE"
            value="CCTR-044 · Facilities Mgmt"
            {...commonTextFieldProps}
          >
            <MenuItem value="CCTR-044 · Facilities Mgmt">CCTR-044 · Facilities Mgmt</MenuItem>

            <MenuItem value="CCTR-022 · Finance">CCTR-022 · Finance</MenuItem>
          </TextField>
        </Grid>

        {/* Business Justification */}
        <Grid size={{ xs: 12 }}>
          <TextField
            label="BUSINESS JUSTIFICATION *"
            multiline
            rows={3}
            value="HVAC filter units across 4 NOC sites are overdue for Q2 replacement per preventive maintenance schedule. Failure to replace will void OEM warranty and risk equipment damage."
            {...commonTextFieldProps}
            sx={{
              ...commonTextFieldSx,
              '& .MuiOutlinedInput-root': {
                ...commonTextFieldSx['& .MuiOutlinedInput-root'],
                alignItems: 'flex-start',
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
