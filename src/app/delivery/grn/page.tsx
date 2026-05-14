import Container from '@mui/material/Container';
import React from 'react';
import VendorGRNDetails from 'src/sections/Delivery/GRN/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorGRNDetails />
      </Container>
    </div>
  );
}

export default page;
