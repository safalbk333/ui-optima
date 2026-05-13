import Clarifications from 'src/sections/EOI/Clarifications';
import Container from '@mui/material/Container';
import React from 'react';

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
