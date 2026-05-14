'use client';

import { Box, Paper, IconButton, Typography } from '@mui/material';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import React from 'react';

const attachments = [
  {
    name: 'ASN_Document.pdf',
    size: '2.4 MB',
    type: 'pdf',
  },
  {
    name: 'Quality_Report.xlsx',
    size: '1.1 MB',
    type: 'excel',
  },
  {
    name: 'Inspection_Images.zip',
    size: '8.7 MB',
    type: 'file',
  },
];

function AttachmentSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0.5,
        border: '1px solid #E5E7EB',
        bgcolor: '#fff',
        p: 2,
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: '#6B7280',
          mb: 1.5,
          letterSpacing: 0.5,
        }}
      >
        Attachments
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {attachments.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: 1.5,
              p: 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all .2s ease',
              '&:hover': {
                borderColor: '#CBD5E1',
                bgcolor: '#FAFAFA',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1,
                  bgcolor:
                    item.type === 'pdf' ? '#EEF2FF' : item.type === 'excel' ? '#ECFDF5' : '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.type === 'pdf' ? (
                  <PictureAsPdfOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: '#4338CA',
                    }}
                  />
                ) : (
                  <InsertDriveFileOutlinedIcon
                    sx={{
                      fontSize: 18,
                      color: item.type === 'excel' ? '#059669' : '#64748B',
                    }}
                  />
                )}
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#111827',
                    lineHeight: 1.2,
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10.5,
                    color: '#6B7280',
                    mt: 0.2,
                  }}
                >
                  {item.size}
                </Typography>
              </Box>
            </Box>

            <IconButton
              size="small"
              sx={{
                color: '#475569',
              }}
            >
              <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default AttachmentSection;
