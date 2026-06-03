'use client';

import {
  Box,
  Chip,
  Stack,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
} from '@mui/material';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';

export default function ApprovalReviewScreen() {
  return (
    <Box

    >
              <Box mb={2}>
        <PremiumBreadcrumbs
          title="Approval"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Approval', href: '/vendor-products' },
          ]}

        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Content */}
      <Box py={1}>
        {/* Header Info */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={4}
          mb={3}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              REQUESTER
            </Typography>

            <Typography fontSize={16} fontWeight={600} mt={0.5}>
              Farai Moyo
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              DEPARTMENT
            </Typography>

            <Typography fontSize={16} fontWeight={600} mt={0.5}>
              IT
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              APPROVAL ROUTING
            </Typography>

            <Typography fontSize={14} mt={0.5}>
              L1 (Kudakwashe Mutasa) →{' '}
              <Box
                component="span"
                sx={{
                  color: 'warning.main',
                  fontWeight: 600,
                }}
              >
                You (CFO)
              </Box>
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              SLA REMAINING
            </Typography>

            <Box mt={0.5}>
              <Chip
                label="6h"
                size="small"
                color="warning"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  height: 24,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Business Justification */}
        <Box mb={3}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            BUSINESS JUSTIFICATION
          </Typography>

          <Box
            mt={1}
            sx={{
              p: 1.5,
              borderRadius: 0,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            <Typography fontSize={14}>
              Network capacity expansion for Bulawayo NOC — current switches at
              95% utilisation causing packet loss.
            </Typography>
          </Box>
        </Box>

        {/* Items Table */}
        <Box
          sx={{
            borderRadius: 0,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: 'grey.100',
                }}
              >
                <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
                  ITEM
                </TableCell>

                <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
                  QTY
                </TableCell>

                <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
                  UNIT PRICE
                </TableCell>

                <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
                  TOTAL (USD)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell sx={{ py: 1.5, fontSize: 13 }}>
                  Cisco Catalyst 9200 24P
                </TableCell>

                <TableCell sx={{ py: 1.5, fontSize: 13 }}>4</TableCell>

                <TableCell sx={{ py: 1.5, fontSize: 13 }}>
                  USD 3,800
                </TableCell>

                <TableCell
                  sx={{
                    py: 1.5,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'success.main',
                  }}
                >
                  USD 15,200
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  bgcolor: 'grey.50',
                }}
              >
                <TableCell colSpan={2} />

                <TableCell
                  align="right"
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  Total
                </TableCell>

                <TableCell
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    color: 'success.main',
                    fontSize: 13,
                  }}
                >
                  USD 15,200
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* Remarks */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            REMARKS (REQUIRED FOR REJECT / DELEGATE)
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add remarks..."
            size="small"
            sx={{
              mt: 1,
              '& .MuiInputBase-input': {
                fontSize: 13,
              },
            }}
          />
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{ minWidth: 90 }}
          >
            Cancel
          </Button>



          <Button
            variant="outlined"
            color="error"
            sx={{ minWidth: 90 }}
          >
            Reject
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: 90 }}
          >
            Approve
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}