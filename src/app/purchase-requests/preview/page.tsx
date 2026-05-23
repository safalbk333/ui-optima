import Container from '@mui/material/Container';
import Preview from 'src/sections/PurchaseRequests/Preview/Preview';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Preview />
      </Container>
    </div>
  );
}

export default page;
