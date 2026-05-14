'use client';

import { Box, Chip, Paper, Stack, Button, Divider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

type LineItem = {
  id: number;
  title: string;
  sku: string;
  price: number;
  attachments: string[];
};

export default function RFQPricingModern() {
  const [items, setItems] = useState<LineItem[]>([
    {
      id: 1,
      title: 'Cloud Compute Nodes',
      sku: 'CCN-HP-001',
      price: 2400,
      attachments: ['Technical-Spec.pdf', 'Commercial-Proposal.xlsx'],
    },
    {
      id: 2,
      title: 'Storage Backup Unit',
      sku: 'SBU-447',
      price: 980,
      attachments: ['Datasheet.pdf'],
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const files = Array.from(e.target.files || []).map((file) => file.name);

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              attachments: [...item.attachments, ...files],
            }
          : item
      )
    );
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#0F172A',
            }}
          >
            Pricing & Commercials
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: '#64748B',
            }}
          >
            Manage vendor pricing and supporting documents
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* MAIN CONTAINER */}
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {items.map((item, index) => (
          <Box key={item.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                gap: 2,
                py: 1.5,
              }}
            >
              {/* LEFT */}
              <Box flex={1}>
                {/* CHIP */}
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.3 }}>
                  <Chip
                    label={`ITEM ${index + 1}`}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 9,
                      fontWeight: 700,
                      bgcolor: '#EEF2FF',
                      color: '#4338CA',
                      borderRadius: 1,
                    }}
                  />
                </Stack>

                {/* DESCRIPTION */}
                <Box sx={{ mb: 1.2 }}>
                  <Typography sx={labelStyle}>Item Description</Typography>

                  <TextField
                    fullWidth
                    size="small"
                    value={item.title}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={fieldStyle}
                  />
                </Box>

                {/* SKU + PRICE */}
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  spacing={1.2}
                >
                  <Box flex={1}>
                    <Typography sx={labelStyle}>SKU / REF</Typography>

                    <TextField
                      fullWidth
                      size="small"
                      value={item.sku}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={fieldStyle}
                    />
                  </Box>

                  <Box flex={1}>
                    <Typography sx={labelStyle}>Unit Price</Typography>

                    <TextField
                      fullWidth
                      size="small"
                      value={`$ ${item.price}`}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        ...fieldStyle,
                        '& .MuiInputBase-input': {
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Box>

              {/* RIGHT */}
              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: 220,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: {
                    xs: 'none',
                    md: '1px solid #F1F5F9',
                  },
                  pl: {
                    xs: 0,
                    md: 1.5,
                  },
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  sx={{
                    height: 34,
                    borderRadius: 1.3,
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    borderColor: '#CBD5E1',
                    color: '#334155',
                    bgcolor: '#fff',
                  }}
                >
                  Add Attachments
                  <input
                    hidden
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, item.id)}
                  />
                </Button>

                <Typography
                  sx={{
                    mt: 0.7,
                    fontSize: 10,
                    color: '#94A3B8',
                    lineHeight: 1.4,
                  }}
                >
                  PDF, XLSX, DOC up to 10MB
                </Typography>

                {/* UPLOADED FILES */}
                {item.attachments.length > 0 && (
                  <Box sx={{ mt: 1.4 }}>
                    <Stack spacing={0.8}>
                      {item.attachments.map((file, fileIndex) => (
                        <Paper
                          key={fileIndex}
                          elevation={0}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.7,
                            px: 1,
                            py: 0.7,
                            borderRadius: 1.2,
                            border: '1px solid #E2E8F0',
                            bgcolor: '#fff',
                          }}
                        >
                          <DescriptionOutlinedIcon
                            sx={{
                              fontSize: 14,
                              color: '#6366F1',
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 12,
                              color: '#334155',
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {file}
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>

            {index !== items.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

const labelStyle = {
  fontSize: 12,
  color: '#94A3B8',
  fontWeight: 500,
  textTransform: 'none',
  letterSpacing: 0.4,
  mb: 0.5,
};

const fieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.3,
    bgcolor: '#fff',
    minHeight: 34,
  },
  '& .MuiInputBase-input': {
    fontSize: 12,
    py: 0.9,
    px: 1.2,
    color: '#0F172A',
  },
};
