'use client';

import {
  Box,
  Paper,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';
import React, { useState } from 'react';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface LineItem {
  item: string;
  category: string;
  uom: string;
  qty: number;
  unitPrice: number;
}

export default function LineItemsTable() {
  const [items, setItems] = useState<LineItem[]>([
    {
      item: 'MacBook Pro 14',
      category: 'Electronics',
      uom: 'Nos',
      qty: 2,
      unitPrice: 2400,
    },
    {
      item: 'Office Chair',
      category: 'Furniture',
      uom: 'Nos',
      qty: 4,
      unitPrice: 180,
    },
  ]);

  const handleChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    updated[index][field] = value as never;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        item: '',
        category: '',
        uom: '',
        qty: 1,
        unitPrice: 0,
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getTotal = (item: LineItem) => item.qty * item.unitPrice;

  const subtotal = items.reduce((sum, item) => sum + getTotal(item), 0);

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1,
      height: 32,
      fontSize: 11.5,
      transition: 'all 0.2s ease',

      '& fieldset': {
        borderColor: '#e8e8e8',
      },

      '&:hover fieldset': {
        borderColor: '#d5d5d5',
      },

      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        borderWidth: 1,
      },
    },

    '& .MuiInputBase-input': {
      fontSize: 11.5,
      py: 0.8,
      px: 1.2,
      fontWeight: 500,
      color: '#222',
    },

    '& .MuiInputBase-input::placeholder': {
      fontSize: '11px',
      opacity: 1,
      color: '#999',
    },
  };

  const headerCell = {
    fontSize: 11.5,
    fontWeight: 700,
    color: '#5f6368',
    py: 1.2,
    borderBottom: '1px solid #ececec',
    bgcolor: '#fafafa',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  };

  const bodyCell = {
    py: 1.5,
    borderBottom: '1px solid #f5f5f5',
    bgcolor: '#fff',
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: 'hidden',
        bgcolor: '#fff',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Line Items
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: '#888',
              mt: 0.2,
            }}
          >
            Add products or services for this request
          </Typography>
        </Box>

        <Button
          size="small"
          color="primary"
          startIcon={
            <AddCircleRoundedIcon
              sx={{
                fontSize: 15,
              }}
            />
          }
          onClick={addRow}
          sx={{
            textTransform: 'none',
            fontSize: 11.5,
            fontWeight: 600,
            borderRadius: 2,
            px: 1.5,
            py: 0.6,
            minHeight: 30,
          }}
        >
          Add Item
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...headerCell, minWidth: 240 }}>Item</TableCell>

              <TableCell sx={{ ...headerCell, minWidth: 170 }}>Category</TableCell>

              <TableCell sx={{ ...headerCell, width: 90 }}>UOM</TableCell>

              <TableCell align="center" sx={{ ...headerCell, width: 80 }}>
                Qty
              </TableCell>

              <TableCell align="right" sx={{ ...headerCell, width: 140 }}>
                Unit Price
              </TableCell>

              <TableCell align="right" sx={{ ...headerCell, width: 120 }}>
                Total
              </TableCell>

              <TableCell align="center" sx={{ ...headerCell, width: 40 }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '&:hover': {
                    bgcolor: '#fcfcfc',
                  },
                }}
              >
                {/* Item */}
                <TableCell sx={bodyCell}>
                  <TextField
                    fullWidth
                    value={row.item}
                    placeholder="Item name"
                    onChange={(e) => handleChange(index, 'item', e.target.value)}
                    sx={inputSx}
                  />
                </TableCell>

                {/* Category */}
                <TableCell sx={bodyCell}>
                  <TextField
                    fullWidth
                    value={row.category}
                    placeholder="Category"
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                    sx={inputSx}
                  />
                </TableCell>

                {/* UOM */}
                <TableCell sx={bodyCell}>
                  <TextField
                    fullWidth
                    value={row.uom}
                    placeholder="Nos"
                    onChange={(e) => handleChange(index, 'uom', e.target.value)}
                    sx={inputSx}
                  />
                </TableCell>

                {/* Qty */}
                <TableCell align="center" sx={bodyCell}>
                  <TextField
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleChange(index, 'qty', Number(e.target.value))}
                    sx={{
                      width: 65,
                      ...inputSx,
                    }}
                  />
                </TableCell>

                {/* Unit Price */}
                <TableCell align="right" sx={bodyCell}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e8e8e8',
                      borderRadius: 1,
                      bgcolor: '#fff',
                      height: 32,
                      px: 1,
                      width: 110,
                      ml: 'auto',

                      '&:hover': {
                        borderColor: '#d5d5d5',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: '#888',
                        mr: 0.6,
                        fontWeight: 600,
                      }}
                    >
                      $
                    </Typography>

                    <TextField
                      type="number"
                      variant="standard"
                      value={row.unitPrice}
                      onChange={(e) => handleChange(index, 'unitPrice', Number(e.target.value))}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{
                        flex: 1,

                        '& input': {
                          p: 0,
                          textAlign: 'right',
                          fontSize: 11.5,
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                </TableCell>

                {/* Total */}
                <TableCell
                  align="right"
                  sx={{
                    ...bodyCell,
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#111',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ${getTotal(row).toFixed(2)}
                </TableCell>

                {/* Delete */}
                <TableCell align="center" sx={bodyCell}>
                  <IconButton
                    size="small"
                    onClick={() => deleteRow(index)}
                    sx={{
                      color: '#d32f2f',
                      p: 0.6,

                      '&:hover': {
                        bgcolor: '#fff1f1',
                        color: '#d32f2f',
                      },
                    }}
                  >
                    <DeleteRoundedIcon
                      sx={{
                        fontSize: 15,
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          borderTop: '1px solid #f1f1f1',
          px: 2.5,
          py: 1.8,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ width: 220 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: '#666',
              }}
            >
              Grand Total
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: '#111',
              }}
            >
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
