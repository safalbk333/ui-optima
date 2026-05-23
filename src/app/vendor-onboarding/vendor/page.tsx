import BasicInfo from 'src/sections/VendorOnboarding/Vendor/Index';
import Container from '@mui/material/Container';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <BasicInfo />
      </Container>
    </div>
  );
}

export default page;
