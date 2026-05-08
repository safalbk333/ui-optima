import Container from '@mui/material/Container';
import React from 'react';
import VendorForm from 'src/sections/Vendor/Management/Index';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorForm />
      </Container>
    </div>
  );
}

export default page;
