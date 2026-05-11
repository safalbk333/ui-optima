import Container from '@mui/material/Container';
import React from 'react';
import VendorDashboard from 'src/sections/Vendor/VendorDashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorDashboard />
      </Container>
    </div>
  );
}

export default page;
