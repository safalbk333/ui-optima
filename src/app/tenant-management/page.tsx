import Container from '@mui/material/Container';
import React from 'react';
import TenantManagement from 'src/sections/TenantManagement/TenantManagement';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <TenantManagement />
      </Container>
    </div>
  );
}

export default page;
