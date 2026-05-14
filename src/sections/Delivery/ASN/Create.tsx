'use client';

import { Box, Paper, Button, TextField, Typography, InputAdornment } from '@mui/material';

import DocumentsSection from './Document';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MaterialLineItems from './MaterialTable';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import { useRouter } from 'next/navigation';

function Create() {
  const router = useRouter();

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Advance Shipment Notice. (ASN)"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Delivery', href: '/delivery' },
            { label: 'Create ASN', href: '/delivery/asn' },
          ]}
          action={
            <Button
              sx={{ borderRadius: 0.5, fontWeight: 600 }}
              variant="outlined"
              onClick={() => {
                router.push('/delivery/tracking');
              }}
            >
              Shipment Tracking
            </Button>
          }
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
          }}
        >
          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: 0,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 1.5,
                py: 1.1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F1F5F9',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#2f2f2f',
                  lineHeight: 1,
                }}
              >
                Order Information
              </Typography>
            </Box>

            {/* Form Section */}
            <Box
              sx={{
                p: 1.5,
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              {/* PO Reference */}
              <Box flex={1} minWidth="240px">
                <Typography
                  sx={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: '#7a7a7a',
                    mb: 0.7,
                    lineHeight: 1,
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
                        <KeyboardArrowDownIcon
                          sx={{
                            color: '#6d6d6d',
                            fontSize: 15,
                          }}
                        />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '7px',
                      fontWeight: 500,
                      fontSize: '10px',
                      height: 34,
                      px: 0.2,
                      bgcolor: '#fff',
                    },

                    '& .MuiOutlinedInput-input': {
                      py: 0.7,
                      fontSize: '12px',
                    },

                    '& fieldset': {
                      borderColor: '#dcdfe4',
                    },

                    '&:hover fieldset': {
                      borderColor: '#cfd4dc',
                    },
                  }}
                />
              </Box>

              {/* Shipment Number */}
              <Box flex={1} minWidth="240px">
                <Typography
                  sx={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    color: '#7a7a7a',
                    mb: 0.7,
                    lineHeight: 1,
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
                      borderRadius: '7px',
                      fontWeight: 500,
                      fontSize: '10px',
                      height: 34,
                      px: 0.3,
                      bgcolor: '#fff',
                    },

                    '& .MuiOutlinedInput-input': {
                      py: 0.7,
                      fontSize: '12px',
                    },

                    '& fieldset': {
                      borderColor: '#dcdfe4',
                    },

                    '&:hover fieldset': {
                      borderColor: '#cfd4dc',
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
            borderRadius: 0,
          }}
        >
          <DocumentsSection />
        </Paper>
      </Box>
    </Box>
  );
}

export default Create;
