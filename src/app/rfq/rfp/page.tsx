import Container from '@mui/material/Container';
import RFQ from 'src/sections/RFQ';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <RFQ />
      </Container>
    </div>
  );
}

export default page;
