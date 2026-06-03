import ApprovalReviewScreen from 'src/sections/Approval/ApprovalReviewScreen'
import { Container } from '@mui/material'
import React from 'react'

function page() {
  return (
    <div>
              <Container maxWidth="lg" sx={{ py: { xs: 1, md: 1 } }}>
                <ApprovalReviewScreen />
</Container>
    </div>
  )
}

export default page