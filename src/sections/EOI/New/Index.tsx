import { Box } from '@mui/material';
import EOIBuilder from './Info'
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react'

function Index() {
  return (
    <div>
             <Box mb={2}>
<PremiumBreadcrumbs
  title="New EOI"
  paths={[
    { label: 'Home', href: '/dashboard' },
    { label: 'EOI', href: '/eoi/eois' },
  ]}

/>
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
 
        <EOIBuilder /></div>
  )
}

export default Index