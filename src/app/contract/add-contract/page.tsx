import Container from '@mui/material/Container';
import React from 'react';
import AddorEditContract from 'src/sections/Contracts/AddorEditContract';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <AddorEditContract />
      </Container>
    </div>
  );
}

export default page;
