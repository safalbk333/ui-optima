import Container from '@mui/material/Container';
import PurchaseRequests from 'src/sections/PurchaseRequests/RequestDashboard';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <PurchaseRequests />
      </Container>
    </div>
  );
}

export default page;
