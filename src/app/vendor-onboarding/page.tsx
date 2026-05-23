import Container from '@mui/material/Container';
import React from 'react';
import VendorOnboardingDetails from 'src/sections/VendorOnboarding/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorOnboardingDetails />
      </Container>
    </div>
  );
}

export default page;
