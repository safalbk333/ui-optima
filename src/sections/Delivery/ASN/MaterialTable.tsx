import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const rows = [
  {
    code: 'MAT-99021',
    description: 'Precision Ball Bearings X200',
    ordered: 500,
    shipping: 500,
    remaining: 0,
    delivery: '10/15/2024',
  },
  {
    code: 'MAT-99025',
    description: 'Stainless Housing Unit - Large',
    ordered: 200,
    shipping: 150,
    remaining: 50,
    delivery: '10/15/2024',
  },
  {
    code: 'MAT-10220',
    description: 'Gasket Sealant Ultra-Bond',
    ordered: 100,
    shipping: 50,
    remaining: 50,
    delivery: '10/18/2024',
  },
];

function MaterialLineItems() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #d8d8de',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #dcdce3',
        }}
      >
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          Material Line Items
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#d8d8e2' }}>
              {[
                'Material Code',
                'Description',
                'Ordered',
                'Shipping Qty',
                'Remaining',
                'Exp. Delivery',
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontSize: '12px',
                    fontWeight: 700,
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {row.code}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: '12px',
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {row.description}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {row.ordered}
                </TableCell>

                <TableCell
                  sx={{
                    py: 1,
                    px: 1.5,
                  }}
                >
                  <TextField
                    value={row.shipping}
                    size="small"
                    sx={{
                      width: 80,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '12px',
                        alignItems: 'center',
                        fontWeight: 400,
                      },
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#555',
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {row.remaining}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    py: 1,
                    px: 1.5,
                  }}
                >
                  {row.delivery}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px solid #e1e1e8',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          sx={{
            color: '#3366cc',
            cursor: 'pointer',
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 14 }} />

          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            Add Supplemental Item
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default MaterialLineItems;
