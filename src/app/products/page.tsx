import Container from '@mui/material/Container';
import React from 'react';
import VendorProducts from 'src/sections/Products/ProductsDashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorProducts />
      </Container>
    </div>
  );
}

export default page;
