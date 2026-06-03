import { Container } from '@mui/material'
import EOIDashboard from 'src/sections/EOI/Dashboard'
import React from 'react'

function page() {
  return (
    <div>
              <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
                <EOIDashboard />
</Container>
    </div>
  )
}

export default page