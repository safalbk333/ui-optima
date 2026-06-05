import Container from '@mui/material/Container';
import PurchaseRequests from 'src/sections/PurchaseRequests/RequestDashboard';
import Quotation from 'src/sections/Quotation/Dashboard';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Quotation />
      </Container>
    </div>
  );
}

export default page;
