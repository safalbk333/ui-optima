import Container from '@mui/material/Container';
import PurchaseRequests from 'src/sections/PurchaseRequests/RequestDashboard';
import QuotationView from 'src/sections/Quotation/View/QuotationView';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <QuotationView />
      </Container>
    </div>
  );
}

export default page;
