import Container from '@mui/material/Container';
import React from 'react';
import InvoicePreview from 'src/sections/Documents/preview/page';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <InvoicePreview />
      </Container>
    </div>
  );
}

export default page;
