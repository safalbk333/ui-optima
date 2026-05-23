import Container from '@mui/material/Container';
import Documents from 'src/sections/VendorOnboarding/Vendor/Documents/Index';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Documents />
      </Container>
    </div>
  );
}

export default page;
