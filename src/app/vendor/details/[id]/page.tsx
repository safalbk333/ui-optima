import Container from '@mui/material/Container';
import React from 'react';
import VendorDetailPage from 'src/sections/Vendor/VendorDetails/VendorDetails';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorDetailPage />
      </Container>
    </div>
  );
}

export default page;
