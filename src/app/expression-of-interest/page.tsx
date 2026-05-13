import Container from '@mui/material/Container';
import React from 'react';
import VendorEOIWhiteUI from 'src/sections/EOI/Main';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorEOIWhiteUI />
      </Container>
    </div>
  );
}

export default page;
