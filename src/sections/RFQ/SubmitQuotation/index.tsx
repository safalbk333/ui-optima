'use client';

import React from 'react';
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import LineItemPricing from './Table';
import QuoteSummaryCard from './QuoteSummary';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { useRouter } from 'src/routes/hooks/use-router';
import { paths } from 'src/routes/paths';
function QuotationTerms() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2, // reduced padding
        borderRadius: 1,
        border: '1px solid #e5e7eb',
      }}
    >
      <Typography
        sx={{
          fontSize: 13, // reduced title size
          fontWeight: 700,
          mb: 2,
          color: '#1f2937',
        }}
      >
        Quotation Validity & Terms
      </Typography>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              mb: 0.5,
              color: '#6b7280',
            }}
          >
            Quote Expiry Date
          </Typography>

          <TextField
            fullWidth
            size="medium"
            type="date"
            defaultValue="2024-12-31"
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 13,
                py: 1,
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              mb: 0.5,
              color: '#6b7280',
            }}
          >
            Payment Terms
          </Typography>

          <TextField
            select
            fullWidth
            size="small"
            defaultValue="Net 30"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 13,
                py: 1,
              },
            }}
          >
            <MenuItem value="Net 30">Net 30</MenuItem>
            <MenuItem value="Net 45">Net 45</MenuItem>
            <MenuItem value="Net 60">Net 60</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              mb: 0.5,
              color: '#6b7280',
            }}
          >
            Vendor Comments
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter any additional notes or specific conditions for this quote..."
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 13,
                py: 1,
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
function Index() {
  const router = useRouter();

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Submit RFQ Quotation"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'RFQ Dashboard', href: '/quotations' },
            { label: 'View RFQ', href: '/quotations/view' },
            { label: 'Submit Quotation', href: '/quotations/submit_quotation' },
          ]}
          action={
            <Button
              onClick={() => {
                router.push(paths.quotations.submit);
              }}
              sx={{ fontWeight: 600, borderRadius: 0.3 }}
              variant="outlined"
            >
              Submit Quotation
            </Button>
          }
        />
      </Box>
      <Box mb={2.5} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
        }}
      >
        {/* Left Side - More Space */}
        <Paper
          elevation={0}
          sx={{
            flex: 3,
            borderRadius: 2,
          }}
        >
          <LineItemPricing />
          <QuotationTerms />
        </Paper>

        {/* Right Side */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
          }}
        >
          <QuoteSummaryCard />
        </Paper>
      </Box>
    </Box>
  );
}

export default Index;
