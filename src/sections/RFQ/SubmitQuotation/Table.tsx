'use client';

import {
  Box,
  Chip,
  Paper,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
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

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        sku: '',
        price: 0,
        attachments: [],
      },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box>
      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          border: '1px solid #E2E8F0',
          p: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0F172A',
                }}
              >
                Pricing & Commercials
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: '#64748B',
                  mt: 0.3,
                }}
              >
                Manage vendor pricing, SKU references and attachments
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<AddRoundedIcon />}
            onClick={addItem}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              px: 2,
              minHeight: 40,
              boxShadow: 'none',
            }}
          >
            Add Line Item
          </Button>
        </Box>
      </Paper>

      {/* ITEMS */}
      <Stack spacing={0}>
        {items.map((item, index) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              borderRadius: 1,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              transition: 'all .2s ease',
              mb: 2,
              '&:hover': {
                borderColor: '#CBD5E1',
              },
            }}
          >
            {/* TOP BAR */}
            <Box
              sx={{
                px: 2,
                py: 1.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #EEF2F7',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={`ITEM ${index + 1}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontWeight: 700,
                    fontSize: 10,
                    borderRadius: 2,
                    bgcolor: '#EEF2FF',
                    color: '#4338CA',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  Commercial Details
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => removeItem(item.id)}
                sx={{
                  bgcolor: '#FEF2F2',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#FEE2E2',
                  },
                }}
              >
                <DeleteOutlineRoundedIcon
                  sx={{
                    color: '#DC2626',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Box>

            {/* BODY */}
            <Box
              sx={{
                p: 2,
                display: 'grid',
                gridTemplateColumns: '1.5fr 180px 180px',
                gap: 2,
              }}
            >
              {/* DESCRIPTION */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748B',
                    mb: 0.8,
                  }}
                >
                  Item Description
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter product or service name"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      bgcolor: '#FCFCFD',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                      py: 1.2,
                    },
                  }}
                />
              </Box>

              {/* SKU */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748B',
                    mb: 0.8,
                  }}
                >
                  SKU / Ref
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  placeholder="SKU"
                  value={item.sku}
                  onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      bgcolor: '#FCFCFD',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                      py: 1.2,
                    },
                  }}
                />
              </Box>

              {/* PRICE */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748B',
                    mb: 0.8,
                  }}
                >
                  Unit Price
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  placeholder="$0.00"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      bgcolor: '#FCFCFD',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                      py: 1.2,
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            </Box>

            <Divider />

            {/* ATTACHMENTS */}
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748B',
                    mb: 1,
                  }}
                >
                  Attachments
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {item.attachments.map((file) => (
                    <Paper
                      key={file}
                      elevation={0}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.2,
                        py: 0.8,
                        borderRadius: 3,
                        border: '1px solid #E2E8F0',
                        bgcolor: '#FFFFFF',
                      }}
                    >
                      <DescriptionOutlinedIcon
                        sx={{
                          fontSize: 16,
                          color: '#6366F1',
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: '#334155',
                          fontWeight: 500,
                        }}
                      >
                        {file}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Button
                component="label"
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  minWidth: 140,
                  height: 38,
                  fontWeight: 600,
                  borderColor: '#CBD5E1',
                  color: '#334155',
                  bgcolor: '#FFFFFF',
                }}
              >
                Upload Files
                <input hidden type="file" multiple />
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
