import Container from '@mui/material/Container';
import React from 'react';
import Index from 'src/sections/RFQ/SubmitQuotation';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Index />
      </Container>
    </div>
  );
}

export default page;
