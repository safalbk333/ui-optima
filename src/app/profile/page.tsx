import Container from '@mui/material/Container';
import React from 'react';
import ZimbabweVendorProfilePage from 'src/sections/Profile/Profile';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ZimbabweVendorProfilePage />
      </Container>
    </div>
  );
}

export default page;
