import Container from '@mui/material/Container';
import React from 'react';
import VendorShipmentDetails from 'src/sections/Delivery/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorShipmentDetails />
      </Container>
    </div>
  );
}

export default page;
