import Container from '@mui/material/Container';
import React from 'react';
import Clarifications from 'src/sections/RFQ/Clarifications';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Clarifications />
      </Container>
    </div>
  );
}

export default page;
