'use client';

import * as React from 'react';

import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import AiLaptopCatalogViewer from './AIViewer';
import AiPdfViewer from './AIViewer';
import AiQuotationViewer from './AIViewer';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import QuotationViewer from './AIViewer';
import { fetchQuotationById } from 'src/store/slices/Quotation/Quotation';
import { useSearchParams } from 'next/navigation';

// ---------------- styles ----------------
const compactText = {
  fontSize: '0.68rem',
  lineHeight: 1.3,
  opacity: 0.8,
};

const compactTitle = {
  fontSize: '0.8rem',
  fontWeight: 600,
};

// ---------------- utils ----------------
function formatDate(date?: string) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
}

// ---------------- reusable card ----------------
function SectionCard({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: any;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 0,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ---------------- component ----------------
function QuotationView() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  React.useEffect(() => {
    if (id) dispatch(fetchQuotationById(id));
  }, [id, dispatch]);

  const { selectedQuotation: q } = useAppSelector(
    (state) => state.quotations
  );

  if (!q) return null;

  return (
    <Box sx={{ p: 2, background: theme.palette.background.default, minHeight: '100vh' }}>

      {/* HEADER */}
      <Box mb={2}>
        <PremiumBreadcrumbs
          title='Quotation'
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Quotation', href: '/quotation' },
            { label: 'View', href: '#' },
          ]}
        />
      </Box>

      <Box
        mb={2}
        sx={{
          borderTop: `1px dashed ${alpha(theme.palette.text.primary, 0.12)}`,
        }}
      />
      {/* SUMMARY */}


      {/* VENDOR + BUYER */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard>
            <Typography sx={compactTitle} mb={1}>
              Vendor
            </Typography>
            <Typography sx={compactTitle}>{q.vendor?.chr_vendor_name}</Typography>
            <Typography sx={compactText}>
              {q.vendor?.chr_vendor_email}
            </Typography>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard>
            <Typography sx={compactTitle} mb={1}>
              Buyer
            </Typography>
            <Typography sx={compactTitle}>{q.buyer?.chr_user_name}</Typography>
            <Typography sx={compactText}>
              {q.buyer?.chr_user_email}
            </Typography>
          </SectionCard>
        </Grid>
      </Grid>
<QuotationViewer />
      {/* ITEMS */}
      {/* <SectionCard sx={{ mb: 2 }}>
        <Typography sx={compactTitle} mb={1}>
          Items
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                background: alpha(theme.palette.primary.main, 0.04),
              }}
            >
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {q.quotation_items?.map((item) => (
              <TableRow key={item.pk_chr_quotation_item_id}>
                <TableCell>{item.chr_item_description}</TableCell>
                <TableCell>{item.int_quantity}</TableCell>
                <TableCell>{item.chr_unit_of_measure}</TableCell>
                <TableCell>{item.flt_unit_price}</TableCell>
                <TableCell>{item.flt_total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard> */}
    </Box>
  );
}

export default QuotationView;