'use client';

import { Avatar, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import React from 'react';

const documents = [
  {
    name: 'EOI Technical Specification.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Sarah Mapondera',
    uploadedAt: '12 May 2026',
  },
  {
    name: 'Commercial Requirements.docx',
    type: 'DOCX',
    size: '840 KB',
    uploadedBy: 'Procurement Team',
    uploadedAt: '11 May 2026',
  },
  {
    name: 'Site Visit Guidelines.pdf',
    type: 'PDF',
    size: '1.1 MB',
    uploadedBy: 'Operations Team',
    uploadedAt: '10 May 2026',
  },
];

function UploadedDocumentsSidebar() {
  return (
    <Paper
      elevation={0}
      sx={{
        // borderLeft: '1px solid #e5e7eb',
        borderRadius: 0,
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Uploaded Documents
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: '#6b7280',
            }}
          >
            Supporting procurement files
          </Typography>
        </Box>
      </Stack>

      {/* Document List */}
      <Stack spacing={1.5}>
        {documents.map((doc, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #e5e7eb',
              p: 1.5,
              borderRadius: 1,
              bgcolor: '#fff',
              transition: '0.2s',
              '&:hover': {
                borderColor: '#cbd5e1',
              },
            }}
          >
            <Stack direction="row" spacing={1.2}>
              <Avatar
                variant="rounded"
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: doc.type === 'PDF' ? '#fee2e2' : '#eff6ff',
                  color: doc.type === 'PDF' ? '#dc2626' : '#2563eb',
                }}
              >
                {doc.type === 'PDF' ? (
                  <PictureAsPdfOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <InsertDriveFileOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </Avatar>

              <Box flex={1} minWidth={0}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#111827',
                    mb: 0.4,
                  }}
                >
                  {doc.name}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
                  <Chip
                    label={doc.type}
                    size="small"
                    sx={{
                      bgcolor: '#fff',
                      color: 'primary.main',
                      height: 20,
                      fontSize: 10,
                      fontWeight: 500,
                      borderRadius: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: '#6b7280',
                    }}
                  >
                    {doc.size}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#6b7280',
                    lineHeight: 1.5,
                  }}
                >
                  Uploaded by {doc.uploadedBy}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#9ca3af',
                  }}
                >
                  {doc.uploadedAt}
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{
                mt: 1.5,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 700,
                py: 0.8,
                borderColor: '#dbeafe',
              }}
            >
              Download
            </Button>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default UploadedDocumentsSidebar;
