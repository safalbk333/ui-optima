import { Box, Paper, Stack, Divider, Typography } from '@mui/material';

import React from 'react';

const rows = [
  {
    materialCode: 'MAT-99021',
    materialName: 'Precision Ball Bearings X200',
    poNumber: 'PO-2025-00124',
    orderedQty: 500,
    asnQty: 500,
    status: 'Fully Shipped',
  },
  {
    materialCode: 'MAT-99025',
    materialName: 'Stainless Housing Unit - Large',
    poNumber: 'PO-2025-00125',
    orderedQty: 200,
    asnQty: 150,
    status: 'Partially Shipped',
  },
  {
    materialCode: 'MAT-10220',
    materialName: 'Gasket Sealant Ultra-Bond',
    poNumber: 'PO-2025-00126',
    orderedQty: 100,
    asnQty: 50,
    status: 'Pending Shipment',
  },
];

function MaterialLineItems() {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
      }}
    >
      {rows.map((item, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 3,
              px: 0,
              py: 1.8,
            }}
          >
            {/* LEFT SECTION */}
            <Box flex={1}>
              {/* Material Name */}
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {item.materialName}
              </Typography>

              {/* Material + PO */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 0.5,
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#6B7280',
                  }}
                >
                  Material Code : {item.materialCode}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#6B7280',
                  }}
                >
                  PO No : {item.poNumber}
                </Typography>
              </Stack>

              {/* Qty Section */}
              <Stack
                direction="row"
                spacing={4}
                sx={{
                  mt: 1.3,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 9,
                      color: '#94A3B8',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Ordered Qty
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    {item.orderedQty}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 9,
                      color: '#94A3B8',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    ASN Qty
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontSize: 14,
                      fontWeight: 700,
                      color: item.asnQty === item.orderedQty ? '#16A34A' : '#2563EB',
                    }}
                  >
                    {item.asnQty}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* RIGHT SECTION */}
            <Box
              sx={{
                minWidth: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {/* <Chip
                label={item.status}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  height: 22,
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 1,
                  bgcolor:
                    item.status === 'Fully Shipped'
                      ? '#DCFCE7'
                      : item.status === 'Partially Shipped'
                        ? '#DBEAFE'
                        : '#FEF3C7',
                  color:
                    item.status === 'Fully Shipped'
                      ? '#166534'
                      : item.status === 'Partially Shipped'
                        ? '#1D4ED8'
                        : '#92400E',
                }}
              /> */}

              <Typography
                sx={{
                  fontSize: 11,
                  color: '#6B7280',
                }}
              >
                Expected Delivery : 15 Oct 2025
              </Typography>
            </Box>
          </Box>

          {index !== rows.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
}

export default MaterialLineItems;
