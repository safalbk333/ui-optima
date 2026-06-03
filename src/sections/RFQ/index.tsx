'use client';

import Box from '@mui/material/Box';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import RFQBuilderForm from './BasicInfo';
import React from 'react';

function RFQ() {
  return (
    <div>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="RFP / RFQ"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'RFQ List', href: '/rfq' },
            { label: 'RFQ ', href: '/rfq/rfp' },
          ]}
          // action={
          //   <Button
          //     color="primary"
          //     variant="outlined"
          //     onClick={() => router.push('/rfq/rfp')}
          //     sx={{
          //       borderRadius: 0.5,
          //       fontWeight: 600,
          //     }}
          //   >
          //     New RFQ / RFP
          //   </Button>
          // }
        />
      </Box>

      <Box
        mb={2}
        sx={{
          borderTop: '1px dashed #d1d5db',
        }}
      />
      <RFQBuilderForm />
    </div>
  );
}

export default RFQ;
