import Container from '@mui/material/Container';
import PRLineItem from 'src/sections/PurchaseRequests/LineItems';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <PRLineItem />
      </Container>
    </div>
  );
}

export default page;
