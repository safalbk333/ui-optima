import Container from '@mui/material/Container';
import React from 'react';
import ContractRenewalPage from 'src/sections/Contracts/ContractRenewalPage';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ContractRenewalPage />
      </Container>
    </div>
  );
}

export default page;
