import { Box } from '@mui/material';
import GRNBasic from './BasicInfo';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react'

function GRNBuilder() {
  return (
    <div>      <Box mb={2}>
        <PremiumBreadcrumbs
          title="New GRN"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'New', href: '/grn/build' },
          ]}

        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
      <GRNBasic />
</div>
  )
}

export default GRNBuilder