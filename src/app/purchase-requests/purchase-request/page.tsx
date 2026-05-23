import Container from '@mui/material/Container';
import PRForm from 'src/sections/PurchaseRequests/Forms';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <PRForm />
      </Container>
    </div>
  );
}

export default page;
