import { Box, Paper, Divider, Typography } from '@mui/material';

import React from 'react';

const rows = [
  {
    item: 'HVAC Air Filter - Industrial Grade',
    category: 'Maintenance',
    uom: 'Nos',
    qty: 24,
    unitPrice: 85,
    total: 2040,
  },
  {
    item: 'Cooling Coil Cleaning Chemical',
    category: 'Consumables',
    uom: 'Ltr',
    qty: 15,
    unitPrice: 32,
    total: 480,
  },
  {
    item: 'HVAC Preventive Service Kit',
    category: 'Service',
    uom: 'Set',
    qty: 4,
    unitPrice: 250,
    total: 1000,
  },
];

const grandTotal = rows.reduce((sum, item) => sum + item.total, 0);

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  color: '#94A3B8',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  mb: 0.45,
};

const valueStyle = {
  fontSize: 13,
  fontWeight: 600,
};

function MaterialLineItems() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      {rows.map((item, index) => (
        <Box key={index}>
          <Box
            sx={{
              py: 1.7,
            }}
          >
            {/* Item Name */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              {item.item}
            </Typography>

            {/* Details */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0,1fr))',
                  md: '1.1fr 0.7fr 0.5fr 0.8fr 0.8fr',
                },
                gap: 2.5,
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography sx={labelStyle}>Category</Typography>

                <Typography sx={valueStyle}>{item.category}</Typography>
              </Box>

              <Box>
                <Typography sx={labelStyle}>UOM</Typography>

                <Typography sx={valueStyle}>{item.uom}</Typography>
              </Box>

              <Box>
                <Typography sx={labelStyle}>Qty</Typography>

                <Typography sx={valueStyle}>{item.qty}</Typography>
              </Box>

              <Box>
                <Typography sx={labelStyle}>Unit Price</Typography>

                <Typography sx={valueStyle}>${item.unitPrice}</Typography>
              </Box>

              <Box>
                <Typography sx={labelStyle}>Total</Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#111827',
                  }}
                >
                  ${item.total}
                </Typography>
              </Box>
            </Box>
          </Box>

          {index !== rows.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
}

export default MaterialLineItems;
