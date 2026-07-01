import Container from '@mui/material/Container';
import React from 'react';
import ItemMaster from 'src/sections/ItemMaster/ItemMaster';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ItemMaster />
      </Container>
    </div>
  );
}

export default page;
