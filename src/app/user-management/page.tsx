import Container from '@mui/material/Container';
import React from 'react';
import UserManagement from 'src/sections/UserManagement/UserManagement';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <UserManagement />
      </Container>
    </div>
  );
}

export default page;
