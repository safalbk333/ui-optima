import Container from '@mui/material/Container';
import React from 'react';
import Upload from 'src/sections/Documents/Upload/Index';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <Upload />
      </Container>
    </div>
  );
}

export default page;
