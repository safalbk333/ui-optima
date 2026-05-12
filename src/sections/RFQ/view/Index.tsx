'use client';

import React, { useState } from 'react';
import {
  Box,
  Chip,
  Paper,
  Stack,
  Avatar,
  Button,
  Divider,
  Typography,
  IconButton,
  Drawer,
} from '@mui/material';
import RFQHeaderCard from './RFQSummaryCard';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import BusinessIcon from '@mui/icons-material/Business';
import ModernItemsTable from './Table';
import AttachmentsSection from './Attachment';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks/use-router';
import RFQProcessFlow from './ProcessFlow';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function BuyingOrganizationCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 1,
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Top */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
          sx={{
            bgcolor: '#EEF2FF',
            color: '#4F46E5',
            width: 40,
            height: 40,
          }}
        >
          <BusinessIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Box>
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.3,
            }}
          >
            Global Industrial Solutions Ltd.
          </Typography>

          <Typography
            sx={{
              fontSize: '12px',
              color: '#6B7280',
            }}
          >
            Manufacturing & Engineering
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Details */}
      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Typography
            sx={{
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            Contact Person
          </Typography>

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#111827',
            }}
          >
            John Mathews
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#6B7280',
            }}
          >
            Email
          </Typography>

          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#111827',
            }}
          >
            procurement@gisltd.com
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontSize: '13px',
              color: '#6B7280',
            }}
          >
            Vendor Category
          </Typography>

          <Chip
            label="Preferred Buyer"
            size="small"
            sx={{
              height: 22,
              fontSize: '13px',
              bgcolor: '#ECFDF5',
              color: '#047857',
              fontWeight: 700,
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
function DetailedView() {
  const router = useRouter();
  const [openFlow, setOpenFlow] = useState(false);
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="RFQ #2024-0892"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'RFQ Dashboard', href: '/quotations' },
            { label: 'View RFQ', href: '/quotations/view' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => setOpenFlow(true)}
                startIcon={<AccountTreeRoundedIcon />}
                sx={{ fontWeight: 600, borderRadius: 0.3 }}
                variant="contained"
                color="primary"
              >
                RFQ Flow
              </Button>

              <Button
                onClick={() => {
                  router.push(paths.quotations.submit);
                }}
                sx={{ fontWeight: 600, borderRadius: 0.3 }}
                variant="outlined"
              >
                Submit Quotation
              </Button>
            </Stack>
          }
        />
      </Box>
      <Box mb={2.5} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box display="flex" gap={2} mb={3}>
        {/* Left Side - Larger Area */}
        <Paper
          elevation={0}
          sx={{
            flex: 2,
            borderRadius: 1,
            overflow: 'auto',
          }}
        >
          <Box mb={2}>
            <RFQHeaderCard />
          </Box>
          <ModernItemsTable />

          {/* Add your detailed content here */}
        </Paper>

        {/* Right Side */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 1,
            overflow: 'auto',
          }}
        >
          <BuyingOrganizationCard />
          <AttachmentsSection />

          {/* Sidebar / summary / actions */}
        </Paper>
      </Box>
      <Drawer
        anchor="right"
        open={openFlow}
        onClose={() => setOpenFlow(false)}
        PaperProps={{
          sx: {
            width: 480,
            bgcolor: '#F8FAFC',
            borderLeft: '1px solid #E2E8F0',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E2E8F0',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                color: '#0F172A',
              }}
            >
              RFQ Workflow
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: '#64748B',
                mt: 0.3,
              }}
            >
              Vendor quotation lifecycle tracking
            </Typography>
          </Box>

          <IconButton onClick={() => setOpenFlow(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 2,
            overflow: 'auto',
            flex: 1,
          }}
        >
          <RFQProcessFlow />
        </Box>
      </Drawer>
    </Box>
  );
}

export default DetailedView;
