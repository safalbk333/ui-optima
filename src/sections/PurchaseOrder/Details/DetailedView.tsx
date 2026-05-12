import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompanyDetailsSidebar from './CompanyDetails';
import ContactCard from './ContactCards';
import Divider from '@mui/material/Divider';
import LineItemsTable from './Table';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react';
import Typography from '@mui/material/Typography';

const PurchaseOrderCard = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    sx={{
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      padding: '10px 14px',
      backgroundColor: '#fff',
      gap: 2,
      mb: 2,
    }}
  >
    {/* Left Section */}
    <Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2b2b2b',
          }}
        >
          PO-2024-001
        </Typography>
      </Box>

      <Box display="flex" gap={3} mt={0.5}>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#7a7a7a',
          }}
        >
          Buyer:{' '}
          <Box component="span" fontWeight={600} color="#333">
            GlobalLink Corp
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: '12px',
            color: '#7a7a7a',
          }}
        >
          Total Value:{' '}
          <Box component="span" fontWeight={700} color="#3b5ccc">
            $12,400.00
          </Box>
        </Typography>
      </Box>
    </Box>

    {/* Right Section */}
    <Box display="flex" alignItems="center" gap={1}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        sx={{
          textTransform: 'none',
          fontSize: '12px',
          minWidth: '90px',
          borderRadius: '4px',
          boxShadow: 'none',
        }}
      >
        Accept
      </Button>

      <Button
        variant="outlined"
        size="small"
        startIcon={<CancelIcon sx={{ fontSize: 16 }} />}
        sx={{
          textTransform: 'none',
          fontSize: '12px',
          minWidth: '90px',
          borderColor: '#ef9a9a',
          color: '#d32f2f',
          borderRadius: '4px',
        }}
      >
        Reject
      </Button>

      <Divider orientation="vertical" flexItem />

      <Button
        variant="outlined"
        size="small"
        startIcon={<PrintIcon sx={{ fontSize: 16 }} />}
        sx={{
          textTransform: 'none',
          fontSize: '12px',
          minWidth: '70px',
          color: '#444',
          borderColor: '#cfcfcf',
          borderRadius: '4px',
        }}
      >
        Print
      </Button>
    </Box>
  </Box>
);
function DetailedView() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Purchase Orders Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Purchase Orders', href: '/purchase_orders' },
            { label: 'Details', href: '/purchase_orders/details' },
          ]}
        />
      </Box>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* 2 Column Layout */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: {
              lg: '0 0 70%',
            },
            width: '100%',
            minWidth: 0,
          }}
        >
          <PurchaseOrderCard />

          <Box mt={2}>
            <LineItemsTable />
          </Box>

          {/* <VendorAttestationCard /> */}
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            flex: {
              lg: '0 0 30%',
            },
            width: '100%',
            minWidth: 280,
            position: 'sticky',
            top: 20,
          }}
        >
          <ContactCard />

          <Box mt={2}>
            <CompanyDetailsSidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailedView;
