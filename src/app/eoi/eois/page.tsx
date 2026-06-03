import { Container } from '@mui/material'
import Index from 'src/sections/EOI/New/Index'
import React from 'react'

function page() {
  return (
    <div>
              <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
                <Index />
</Container>
    </div>
  )
}

export default page