import Container from '@mui/material/Container';
import React from 'react';
import PurchaseOrderDashboard from 'src/sections/PurchaseOrder/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <PurchaseOrderDashboard />
      </Container>
    </div>
  );
}

export default page;
