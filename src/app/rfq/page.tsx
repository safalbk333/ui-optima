import Container from '@mui/material/Container';
import RFQList from 'src/sections/RFQ/Dashboard';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <RFQList />
      </Container>
    </div>
  );
}

export default page;
