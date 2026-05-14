import Container from '@mui/material/Container';
import DocumentDetailsView from 'src/sections/Documents/Docs/Main';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <DocumentDetailsView />
      </Container>
    </div>
  );
}

export default page;
