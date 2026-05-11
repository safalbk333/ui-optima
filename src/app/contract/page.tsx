import Container from '@mui/material/Container';
import React from 'react';
import ContractDashboard from 'src/sections/Contracts/ContractsDashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ContractDashboard />
      </Container>
    </div>
  );
}

export default page;
