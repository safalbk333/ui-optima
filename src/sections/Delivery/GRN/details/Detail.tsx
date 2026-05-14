import AttachmentSection from './Attachment';
import Box from '@mui/material/Box';
import GrnCard from './GRNCard';
import MaterialLineItems from './MaterialTable';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import WarehouseLocationCard from './Warehouse';

function Detail() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="GRN Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'GRN List', href: '/delivery/grn' },
            { label: 'GRN Details', href: '/delivery/grn/details' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Main Layout */}
      <Box
        display="flex"
        gap={2}
        alignItems="flex-start"
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        {/* Left Section */}
        <Box flex={3} width="100%">
          <Box mb={2}>
            <GrnCard />
          </Box>
          <MaterialLineItems />
        </Box>

        {/* Right Section */}
        <Box
          flex={1}
          width="100%"
          sx={{
            minHeight: 300,
          }}
        >
          <WarehouseLocationCard />
          <AttachmentSection />
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;
