import Container from '@mui/material/Container';
import React from 'react';
import RequestDashboard from 'src/sections/PurchaseRequests/RequestDashboard';

function page() {
  return <div>
    
          <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
<RequestDashboard />
</Container>
</div>;
}

export default page;
