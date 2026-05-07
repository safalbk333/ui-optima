import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const rows = [
  {
    code: 'HW-8821',
    product: 'Enterprise Server Rack',
    desc: '42U Standard Grade, Black Chrome',
    ordered: 2,
    unitPrice: '$2,400.00',
    tax: '8%',
    total: '$5,184.00',
  },
  {
    code: 'SW-0042',
    product: 'Cloud Infra License',
    desc: 'Annual Subscription - Tier 3',
    ordered: 5,
    unitPrice: '$1,200.00',
    tax: '0%',
    total: '$6,000.00',
  },
  {
    code: 'CS-1192',
    product: 'Managed Setup Fee',
    desc: 'On-site technical configuration',
    ordered: 1,
    unitPrice: '$1,216.00',
    tax: '0%',
    total: '$1,216.00',
  },
];

const LineItemsTable = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #dcdce3',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        px={2}
        py={1.2}
        sx={{
          borderBottom: '1px solid #ececf2',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: '#333',
          }}
        >
          Line Items Detail
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#f4f4f7',
              }}
            >
              {['CODE', 'PRODUCT NAME', 'ORDERED', 'UNIT PRICE', 'TAX', 'TOTAL'].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#7b7b88',
                    py: 1,
                    borderBottom: '1px solid #e4e4ea',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '& td': {
                    borderBottom: '1px solid #f0f0f4',
                  },
                }}
              >
                {/* CODE */}
                <TableCell
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#6f6f78',
                    py: 1.2,
                    width: 90,
                  }}
                >
                  {row.code}
                </TableCell>

                {/* PRODUCT */}
                <TableCell
                  sx={{
                    py: 1.2,
                    minWidth: 260,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#2d2d2d',
                      lineHeight: 1.2,
                    }}
                  >
                    {row.product}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#7b7b88',
                      lineHeight: 1.35,
                      mt: 0.3,
                    }}
                  >
                    {row.desc}
                  </Typography>
                </TableCell>

                {/* ORDERED */}
                <TableCell
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#444',
                    py: 1.2,
                  }}
                >
                  {row.ordered}
                </TableCell>

                {/* UNIT PRICE */}
                <TableCell
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#444',
                    py: 1.2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.unitPrice}
                </TableCell>

                {/* TAX */}
                <TableCell
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#444',
                    py: 1.2,
                  }}
                >
                  {row.tax}
                </TableCell>

                {/* TOTAL */}
                <TableCell
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#222',
                    py: 1.2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.total}
                </TableCell>
              </TableRow>
            ))}

            {/* Footer */}
            <TableRow
              sx={{
                backgroundColor: '#f7f7fb',
              }}
            >
              <TableCell colSpan={3} />

              {/* Subtotal */}
              <TableCell sx={{ py: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#7b7b88',
                  }}
                >
                  Subtotal
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#222',
                  }}
                >
                  $12,016.00
                </Typography>
              </TableCell>

              {/* Tax */}
              <TableCell sx={{ py: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#7b7b88',
                  }}
                >
                  Tax Total
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#222',
                  }}
                >
                  $384.00
                </Typography>
              </TableCell>

              {/* Grand Total */}
              <TableCell sx={{ py: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#4d5bd1',
                    letterSpacing: 0.3,
                  }}
                >
                  GRAND TOTAL
                </Typography>

                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#3559d9',
                    lineHeight: 1.1,
                  }}
                >
                  $12,400.00
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LineItemsTable;
