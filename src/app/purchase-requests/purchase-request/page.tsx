import Container from '@mui/material/Container';
import PRForm from 'src/sections/PurchaseRequests/Forms';
import PRStepper from 'src/sections/PurchaseRequests/PRStepper';
import React from 'react';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        {/* <PRForm /> */}
                <PRStepper />
        
      </Container>
    </div>
  );
}

export default page;
