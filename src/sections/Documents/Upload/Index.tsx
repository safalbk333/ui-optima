'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { paths } from 'src/routes/paths';
import Index from 'src/sections/Vendor/Management/Index';
import UploadDocumentForm from './Upload';

function Upload() {
  const router = useRouter();
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
