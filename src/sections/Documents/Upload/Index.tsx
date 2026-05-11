'use client';

import Box from '@mui/material/Box';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import UploadDocumentForm from './Upload';

function Upload() {
  return (
    <div>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Document Upload"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Documents', href: '/documents' },
            { label: 'Upload', href: '/documents/upload' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />
      <UploadDocumentForm />
    </div>
  );
}

export default Upload;
