import Container from '@mui/material/Container';
import React from 'react';
import VendorDocumentsTable from 'src/sections/Documents/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <VendorDocumentsTable />
      </Container>
    </div>
  );
}

export default page;
