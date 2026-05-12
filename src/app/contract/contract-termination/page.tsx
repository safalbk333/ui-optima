import Container from '@mui/material/Container';
import React from 'react';
import ContractTerminationPage from 'src/sections/Contracts/ContractTerminationPage';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ContractTerminationPage />
      </Container>
    </div>
  );
}

export default page;
