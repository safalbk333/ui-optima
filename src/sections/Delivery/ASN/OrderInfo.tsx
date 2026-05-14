'use client';

import { Box, Grid, Paper, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import React from 'react';

const OrderInformationCard = () => (
  <Paper elevation={0}>
    {/* Header */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: '#1f2937',
          letterSpacing: 0.2,
        }}
      >
        Order Information
      </Typography>
    </Box>

    {/* Form Fields */}
    <Grid container spacing={2}>
      {/* PO Reference */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FieldLabel title="PO Reference Selection" />

        <TextField
          fullWidth
          value="PO-882910-2024 (Amazon Fulfillment)"
          size="small"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <KeyboardArrowDownIcon
                  sx={{
                    color: '#7b8794',
                    fontSize: 18,
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
      </Grid>

      {/* Shipment Number */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FieldLabel title="Shipment Number (AUTO)" />

        <TextField
          fullWidth
          value="ASN-2024-8842"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          sx={inputStyles}
        />
      </Grid>

      {/* Actual Dispatch Date */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FieldLabel title="Actual Dispatch Date" />

        <TextField
          fullWidth
          value="14 May 2026"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: '#7b8794',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
      </Grid>

      {/* Expected Delivery */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FieldLabel title="Expected Delivery Date" />

        <TextField
          fullWidth
          value="18 May 2026"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: '#7b8794',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />
      </Grid>

      {/* Logistics Provider */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FieldLabel title="Logistics Provider" />

        <TextField
          select
          fullWidth
          value="DHL Express"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalShippingOutlinedIcon
                  sx={{
                    fontSize: 17,
                    color: '#7b8794',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        >
          <MenuItem value="DHL Express">DHL Express</MenuItem>
          <MenuItem value="FedEx">FedEx</MenuItem>
          <MenuItem value="Blue Dart">Blue Dart</MenuItem>
          <MenuItem value="Delhivery">Delhivery</MenuItem>
        </TextField>
      </Grid>

      {/* Delivery Notes */}
      <Grid size={{ xs: 12 }}>
        <FieldLabel title="Delivery Notes" />

        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add any shipment or delivery instructions..."
          value="Handle with care. Fragile industrial components included in this shipment."
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  alignSelf: 'flex-start',
                  mt: 1.2,
                }}
              >
                <NotesOutlinedIcon
                  sx={{
                    fontSize: 17,
                    color: '#7b8794',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            ...inputStyles,

            '& .MuiOutlinedInput-root': {
              ...inputStyles['& .MuiOutlinedInput-root'],
              alignItems: 'flex-start',
              minHeight: 96,
              py: 0.8,
            },
          }}
        />
      </Grid>
    </Grid>
  </Paper>
);

export default OrderInformationCard;

/* -------------------------------------------------------------------------- */
/*                                Reusable Label                              */
/* -------------------------------------------------------------------------- */

const FieldLabel = ({ title }: { title: string }) => (
  <Typography
    sx={{
      fontSize: '11px',
      fontWeight: 600,
      color: '#6b7280',
      mb: 0.8,
      letterSpacing: 0.2,
    }}
  >
    {title}
  </Typography>
);

/* -------------------------------------------------------------------------- */
/*                                 Common Styles                              */
/* -------------------------------------------------------------------------- */

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontWeight: 500,
    fontSize: '12px',
    minHeight: 40,
    bgcolor: '#fff',
    transition: 'all 0.2s ease',

    '& fieldset': {
      borderColor: '#d9dee7',
    },

    '&:hover fieldset': {
      borderColor: '#b8c1cc',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#4f46e5',
      borderWidth: '1px',
    },
  },

  '& .MuiOutlinedInput-input': {
    fontSize: '12px',
    color: '#1f2937',
    py: 1.1,
  },
};
