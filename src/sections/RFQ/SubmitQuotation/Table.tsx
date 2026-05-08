'use client';

import React, { useMemo, useState } from 'react';
import { Box, Paper, Button, Divider, TextField, Typography, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type LineItem = {
  id: number;
  description: string;
  sku: string;
  qty: number;
  unitPrice: number;
  tax: number;
  discount: number;
};

export default function CompactLineItemPricing() {
  const [items, setItems] = useState<LineItem[]>([
    {
      id: 1,
      description: 'Cloud Compute Nodes',
      sku: 'CP-HP-001',
      qty: 1,
      unitPrice: 1250,
      tax: 15,
      discount: 5,
    },
  ]);

  const handleChange = (id: number, field: keyof LineItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'description' || field === 'sku' ? value : Number(value),
            }
          : item
      )
    );
  };

  const addLineItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: '',
        sku: '',
        qty: 1,
        unitPrice: 0,
        tax: 0,
        discount: 0,
      },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = (item: LineItem) => {
    const subtotal = item.qty * item.unitPrice;
    const taxAmount = subtotal * (item.tax / 100);
    const discountAmount = subtotal * (item.discount / 100);

    return subtotal + taxAmount - discountAmount;
  };

  const grandTotal = useMemo(() => items.reduce((sum, item) => sum + calculateTotal(item), 0), [items]);

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        border: '1px solid #E5E7EB',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Line Item Pricing
        </Typography>

        <Button
          size="small"
          startIcon={<AddIcon sx={{ fontSize: 14 }} />}
          onClick={addLineItem}
          sx={{
            minWidth: 0,
            p: 0.5,
            fontSize: 13,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Add Item
        </Button>
      </Box>

      {/* Table Header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 55px 90px 65px 65px 90px 35px',
          gap: 1,
          px: 1.5,
          py: 0.8,
          bgcolor: '#F9FAFB',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        {['Description', 'Qty', 'Price', 'Tax', 'Disc', 'Total', ''].map((head) => (
          <Typography
            key={head}
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: '#6B7280',
            }}
          >
            {head}
          </Typography>
        ))}
      </Box>

      {/* Rows */}
      {items.map((item, index) => (
        <Box key={item.id}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 55px 90px 65px 65px 90px 35px',
              gap: 1,
              px: 1.5,
              py: 1,
              alignItems: 'center',
            }}
          >
            {/* Description */}
            <Box>
              <TextField
                fullWidth
                size="small"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                sx={{
                  mb: 0.5,
                  '& .MuiInputBase-input': {
                    fontSize: 13,
                    py: 0.7,
                    px: 1,
                  },
                }}
              />

              <TextField
                fullWidth
                size="small"
                placeholder="SKU"
                value={item.sku}
                onChange={(e) => handleChange(item.id, 'sku', e.target.value)}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 13,
                    py: 0.7,
                    px: 1,
                  },
                }}
              />
            </Box>

            {/* Qty */}
            <TextField
              size="small"
              type="number"
              value={item.qty}
              onChange={(e) => handleChange(item.id, 'qty', e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 13,
                  py: 0.7,
                  px: 1,
                },
              }}
            />

            {/* Price */}
            <TextField
              size="small"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleChange(item.id, 'unitPrice', e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 13,
                  py: 0.7,
                  px: 1,
                },
              }}
            />

            {/* Tax */}
            <TextField
              size="small"
              type="number"
              value={item.tax}
              onChange={(e) => handleChange(item.id, 'tax', e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 13,
                  py: 0.7,
                  px: 1,
                },
              }}
            />

            {/* Discount */}
            <TextField
              size="small"
              type="number"
              value={item.discount}
              onChange={(e) => handleChange(item.id, 'discount', e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 13,
                  py: 0.7,
                  px: 1,
                },
              }}
            />

            {/* Total */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: '#111827',
              }}
            >
              $
              {calculateTotal(item).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>

            {/* Delete */}
            <IconButton
              size="small"
              onClick={() => removeItem(item.id)}
              sx={{
                p: 0.4,
              }}
            >
              <DeleteOutlineIcon
                sx={{
                  fontSize: 16,
                  color: '#EF4444',
                }}
              />
            </IconButton>
          </Box>

          {index !== items.length - 1 && <Divider />}
        </Box>
      ))}

      {/* Footer */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#FAFAFA',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            color: '#6B7280',
          }}
        >
          {items.length} Items
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Total: $
          {grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </Paper>
  );
}
