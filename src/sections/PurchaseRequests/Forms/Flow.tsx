import { Box, Paper, Typography } from '@mui/material';

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import React from 'react';

export default function AttachmentSection() {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Attachments
        </Typography>
      </Box>

      {/* Upload Box */}
      <Paper
        elevation={0}
        sx={{
          border: '1px dashed #cbd5e1',
          bgcolor: '#f8fafc',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          mb: 2,
        }}
      >
        <CloudUploadRoundedIcon
          sx={{
            fontSize: 30,
            color: '#6366f1',
            mb: 1,
          }}
        />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: '#111827',
            mb: 0.5,
          }}
        >
          Upload Documents
        </Typography>

        <Typography
          sx={{
            fontSize: 11,
            color: '#6b7280',
            mb: 1.5,
          }}
        >
          PDF, DOCX, XLSX up to 10MB
        </Typography>
      </Paper>

      {/* File List */}
      {/* <Stack spacing={1}>
        {attachments.map((file) => (
          <Paper
            key={file.name}
            elevation={0}
            sx={{
              border: '1px solid #e5e7eb',
              borderRadius: 2,
              px: 1.2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                overflow: 'hidden',
              }}
            >
              <DescriptionRoundedIcon
                sx={{
                  fontSize: 18,
                  color: '#6366f1',
                  flexShrink: 0,
                }}
              />

              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  {file.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10.5,
                    color: '#9ca3af',
                  }}
                >
                  {file.size}
                </Typography>
              </Box>
            </Box>

            <IconButton size="small">
              <DeleteOutlineRoundedIcon
                sx={{
                  fontSize: 18,
                  color: '#9ca3af',
                }}
              />
            </IconButton>
          </Paper>
        ))}
      </Stack> */}
    </Box>
  );
}
