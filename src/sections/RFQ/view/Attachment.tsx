import React from 'react';
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const attachments = [
  {
    name: 'Technical_Specification.pdf',
    size: '2.4 MB',
    type: 'PDF',
  },
  {
    name: 'Commercial_Pricing.xlsx',
    size: '1.1 MB',
    type: 'XLSX',
  },
  {
    name: 'Terms_Conditions.docx',
    size: '860 KB',
    type: 'DOCX',
  },
];

function AttachmentItem({ file }:any) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1.2,
        border: '1px solid #EEF2F7',
        borderRadius: 1,
        transition: '0.2s',
        '&:hover': {
          bgcolor: '#FAFAFA',
        },
      }}
    >
      {/* Left */}
      <Box display="flex" alignItems="center" gap={1.2}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 1,
            bgcolor: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InsertDriveFileOutlinedIcon
            sx={{
              fontSize: 18,
              color: '#4B5563',
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.3,
            }}
          >
            {file.name}
          </Typography>

          <Stack direction="row" spacing={0.8} mt={0.3}>
            <Typography
              sx={{
                fontSize: '10px',
                color: '#6B7280',
              }}
            >
              {file.size}
            </Typography>

            <Chip
              label={file.type}
              size="small"
              sx={{
                height: 18,
                fontSize: '9px',
                fontWeight: 700,
                bgcolor: '#EEF2FF',
                color: '#4338CA',
              }}
            />
          </Stack>
        </Box>
      </Box>

      {/* Right */}
      <IconButton
        size="small"
        sx={{
          border: '1px solid #E5E7EB',
          borderRadius: 1,
        }}
      >
        <DownloadRoundedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}

function AttachmentsSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        p: 1.5,
        borderRadius: 1,
        border: '1px solid #E5E7EB',
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={1.5}
      >


        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#111827',
          }}
        >
          Supporting Documents
        </Typography>
      </Box>

      {/* Files */}
      <Stack spacing={1}>
        {attachments.map((file, index) => (
          <AttachmentItem
            key={index}
            file={file}
          />
        ))}
      </Stack>
    </Paper>
  );
}

export default AttachmentsSection;