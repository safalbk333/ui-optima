'use client';

import React, { useState } from 'react';

import { Box, Chip, Stack, Button, Divider, Typography, IconButton } from '@mui/material';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

export default function InvoiceDetailView() {
  const [zoom, setZoom] = useState(100);

  const fileUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

  const sectionBoxStyles = {
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider',
  };

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Preview Document"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Documents', href: '/documents' },
            { label: 'Invoice_Q3_Acme_8821.pdf', href: '/documents/preview' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box>
        <Box
          sx={{
            ...sectionBoxStyles,
            mb: 2,
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* LEFT */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Typography fontSize={13} fontWeight={700}>
                  Invoice_Q3_Acme_8821.pdf
                </Typography>

                <Stack direction="row" spacing={1} mt={0.5} alignItems="center" flexWrap="wrap">
                  <Chip
                    size="small"
                    color="success"
                    icon={<CheckCircleRoundedIcon />}
                    label="Verified"
                  />

                  <Typography variant="caption" color="text.secondary">
                    Uploaded Oct 24, 2023 • 2.4 MB
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* RIGHT */}
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<ShareOutlinedIcon />}>
                Share
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* ================================================= */}
        {/* 2 COLUMN LAYOUT */}
        {/* ================================================= */}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1fr) 300px',
            },
            gap: 2,
            alignItems: 'start',
          }}
        >
          {/* ================================================= */}
          {/* LEFT - FILE PREVIEW */}
          {/* ================================================= */}

          <Box
            sx={{
              ...sectionBoxStyles,
              overflow: 'hidden',
              height: 'calc(100vh - 140px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* TOOLBAR */}
            <Box
              sx={{
                px: 2,
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}>
                  <ZoomOutOutlinedIcon fontSize="small" />
                </IconButton>

                <Typography variant="body2" fontWeight={600}>
                  {zoom}%
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
                >
                  <ZoomInOutlinedIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <Typography variant="body2" color="text.secondary">
                  Page 1 of 1
                </Typography>
              </Stack>

              <IconButton size="small">
                <OpenInFullOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* PREVIEW AREA */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: 3,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: `${zoom}%`,
                  minWidth: 650,
                  height: '100%',
                  transition: 'all 0.2s ease',
                }}
              >
                <iframe
                  src={fileUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    background: '#fff',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* ================================================= */}
          {/* RIGHT - SIDEBAR */}
          {/* ================================================= */}

          <Stack spacing={2}>
            {/* DOCUMENT METADATA */}
            <Box sx={sectionBoxStyles}>
              <Box p={2.5}>
                <Typography variant="subtitle2" fontWeight={700} mb={2}>
                  Document Metadata
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Invoice ID
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={600}>
                      INV-2023-8821
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Total Amount
                    </Typography>

                    <Typography variant="h6" color="primary.main" fontWeight={700}>
                      $19,100.00
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Vendor Entity
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={500}>
                      Acme Corporation
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Expiry Date
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={500}>
                      Nov 24, 2023
                    </Typography>
                  </Box>

                  <Button fullWidth variant="outlined">
                    Edit Metadata
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* APPROVAL WORKFLOW */}
            <Box sx={sectionBoxStyles}>
              <Box p={2.5}>
                <Typography variant="subtitle2" fontWeight={700} mb={2}>
                  Approval Workflow
                </Typography>

                <Stack spacing={2.5}>
                  <Box>
                    <Typography fontWeight={600} fontSize={14}>
                      Procurement Review
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Approved by Sarah Jenkins
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography fontWeight={600} fontSize={14}>
                      Finance Verification
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Approved by Marcus Thorne
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography fontWeight={600} fontSize={14}>
                      Payment Processing
                    </Typography>

                    <Typography variant="body2" color="warning.main">
                      Waiting for treasury release...
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* VERSION HISTORY */}
            <Box sx={sectionBoxStyles}>
              <Box p={2.5}>
                <Typography variant="subtitle2" fontWeight={700} mb={2}>
                  Version History
                </Typography>

                <Stack spacing={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Current Version (v2.1)
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Oct 24, 2023 • User Upload
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Original Upload (v1.0)
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                      Oct 20, 2023 • Auto Generated
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
