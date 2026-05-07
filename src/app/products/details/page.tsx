import Container from '@mui/material/Container';
import React from 'react';
import AddVendorProduct from 'src/sections/Products/Details/DetailForm';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <AddVendorProduct />
      </Container>
    </div>
  );
}

export default page;
