import Container from '@mui/material/Container';
import React from 'react';
import ContractGeneratorPage from 'src/sections/Contract/ContractGenerator';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ContractGeneratorPage />
      </Container>
    </div>
  );
}

export default page;
