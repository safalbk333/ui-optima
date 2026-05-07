import Container from '@mui/material/Container';
import React from 'react';
import RFQDashboard from 'src/sections/RFQ/Dashboard';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <RFQDashboard />
      </Container>
    </div>
  );
}

export default page;
