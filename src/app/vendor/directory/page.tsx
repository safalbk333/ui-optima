import Container from '@mui/material/Container';
import React from 'react';
import VendorDirectory from 'src/sections/Vendor/Directory/VendorDirectory';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorDirectory />
      </Container>
    </div>
  );
}

export default page;
