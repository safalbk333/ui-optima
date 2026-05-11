import Container from '@mui/material/Container';
import React from 'react';
import Create from 'src/sections/Delivery/ASN/Create';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Create />
      </Container>
    </div>
  );
}

export default page;
