import Container from '@mui/material/Container';
import React from 'react';
import UserDetailPage from 'src/sections/UserManagement/UserDetails';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <UserDetailPage />
      </Container>
    </div>
  );
}

export default page;
