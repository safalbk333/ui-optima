import Container from '@mui/material/Container';
import React from 'react';
import AddUser from 'src/sections/UserManagement/AddNewUser';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <AddUser />
      </Container>
    </div>
  );
}

export default page;
