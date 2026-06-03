import ApprovalDashboard from 'src/sections/Approval/ApprovalDashboard'
import { Container } from '@mui/material'
import React from 'react'

function page() {
  return (
    <div>
              <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>

        <ApprovalDashboard />
        </Container>
    </div>
  )
}

export default page