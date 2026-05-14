import { Box } from '@mui/material';
import Chat from './Chat';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import RFQThreads from './RFQThreads';
import React from 'react';

function Clarifications() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Clarifications"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'EOI', href: '/expression-of-interest' },
            { label: 'Clarifications', href: '/expression-of-interest/clarifications' },
          ]}
        />
      </Box>

      <Box sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 80px)',
          display: 'flex',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: 360,
            flexShrink: 0,
            bgcolor: '#fff',
            borderRight: '1px solid #e2e8f0',
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <RFQThreads />
        </Box>

        {/* Center Panel */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            borderRadius: 0.5,
            overflow: 'hidden',
          }}
        >
          <Chat />
        </Box>

        {/* Right Panel */}
        {/* <Box
          sx={{
            borderLeft: '1px solid #e2e8f0',
            p: 2,
            width: 320,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <ActivityPanel />
        </Box> */}
      </Box>
    </Box>
  );
}

export default Clarifications;
