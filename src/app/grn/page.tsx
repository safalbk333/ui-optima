import { Container } from '@mui/material'
import GRNDashboard from 'src/sections/GRN/GRNDashboard'
import React from 'react'

function page() {
  return (
    <div>      <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
        <GRNDashboard />
        </Container>
</div>
  )
}

export default page