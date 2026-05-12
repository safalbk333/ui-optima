import { Box, Paper, TextField, Typography, InputAdornment } from '@mui/material';

import DocumentsSection from './Document';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MaterialLineItems from './MaterialTable';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';

function Create() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Create ASN"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Delivery', href: '/delivery' },
            { label: 'Create ASN', href: '/delivery/asn' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box display="flex" gap={2}>
        {/* Left Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 2.5,
            borderRadius: 1,
            overflow: 'auto',
            mb: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #d9d9df',
              borderRadius: '10px',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e4e4e7',
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2f2f2f',
                  }}
                >
                  Order Information
                </Typography>
              </Box>
            </Box>

            {/* Form Section */}
            <Box
              sx={{
                p: 2,
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              {/* Left */}
              <Box flex={1} minWidth="280px">
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#7a7a7a',
                    mb: 1,
                  }}
                >
                  PO Reference Selection
                </Typography>

                <TextField
                  fullWidth
                  value="PO-882910-2024 (Amazon Fulfillment)"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyboardArrowDownIcon sx={{ color: '#6d6d6d' }} />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontWeight: 500,
                      fontSize: '10px',
                      borderRadius: '6px',
                    },
                  }}
                />
              </Box>

              {/* Right */}
              <Box flex={1} minWidth="280px">
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Shipment Number (AUTO)
                </Typography>

                <TextField
                  fullWidth
                  value="ASN-2024-8842"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontWeight: 500,
                      fontSize: '10px',
                      borderRadius: '6px',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
          <MaterialLineItems />
        </Paper>

        {/* Right Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          <DocumentsSection />
        </Paper>
      </Box>
    </Box>
  );
}

export default Create;
