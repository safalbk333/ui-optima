import Container from '@mui/material/Container';
import React from 'react';
import ShipmentTrackingInsight from 'src/sections/Delivery/Tracking/Main';

function page() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <ShipmentTrackingInsight />
      </Container>
    </div>
  );
}

export default page;
