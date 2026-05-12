import Container from '@mui/material/Container';
import React from 'react';
import ContractApprovalPage from 'src/sections/Contracts/ContractApprovalPage';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ContractApprovalPage />
      </Container>
    </div>
  );
}

export default page;
