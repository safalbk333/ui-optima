import Box from '@mui/material/Box';
import POView from './BasicInfo';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';

function DetailedView() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="New PO"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Purchase Orders', href: '/purchase_orders' },
            { label: 'New', href: '/purchase_orders/details' },
          ]}
        />
      </Box>
      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

<POView />
    </Box>
  );
}

export default DetailedView;
