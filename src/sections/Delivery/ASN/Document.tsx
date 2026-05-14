import { Box, Paper, Button, Divider, IconButton, Typography } from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import React from 'react';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

const documents = [
  {
    name: 'Purchase_Order_2024.pdf',
    size: '2.4 MB',
    type: 'PDF',
    uploadedBy: 'Ajith',
  },
  {
    name: 'Vendor_Invoice.xlsx',
    size: '1.1 MB',
    type: 'XLSX',
    uploadedBy: 'Finance Team',
  },
  {
    name: 'Shipment_Label.docx',
    size: '850 KB',
    type: 'DOCX',
    uploadedBy: 'Warehouse',
  },
];

function DocumentsSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #F1F5F9',
        borderRadius: 0.5,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 1.5,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eceff4',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '11.5px',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Documents
          </Typography>

          <Typography
            sx={{
              fontSize: '9.5px',
              color: '#777',
              mt: 0.2,
            }}
          >
            Upload and manage files
          </Typography>
        </Box>
      </Box>

      {/* Upload Box */}
      <Box
        sx={{
          m: 1.5,
          border: '1px dashed #cfd6e2',
          borderRadius: '8px',
          py: 2,
          px: 1.5,
          textAlign: 'center',
          bgcolor: '#fafbfc',
        }}
      >
        <UploadFileOutlinedIcon
          sx={{
            fontSize: 24,
            color: '#7b8aa0',
            mb: 0.5,
          }}
        />

        <Typography
          sx={{
            fontSize: '11px',
            fontWeight: 600,
            mb: 0.3,
          }}
        >
          Drag & Drop files
        </Typography>

        <Typography
          sx={{
            fontSize: '9px',
            color: '#7b7b7b',
            mb: 1,
          }}
        >
          PDF, DOCX, XLSX, PNG up to 10MB
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            fontSize: '10px',
            minHeight: 28,
            px: 1.5,
            borderRadius: '7px',
          }}
        >
          Browse
        </Button>
      </Box>

      <Divider />

      {/* Existing Documents */}
      <Box sx={{ p: 1.5 }}>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Existing Documents
        </Typography>

        {documents.map((doc, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #e7eaf0',
              borderRadius: '8px',
              px: 1.2,
              py: 0.9,
              mb: 0.8,
              bgcolor: '#fff',
              transition: 'all .2s ease',

              '&:hover': {
                bgcolor: '#fcfcfd',
                borderColor: '#d9dee7',
              },
            }}
          >
            {/* Left */}
            <Box display="flex" alignItems="center" gap={1} minWidth={0}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '7px',
                  bgcolor: '#eef3ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: '#4a67d6',
                  }}
                />
              </Box>

              <Box minWidth={0}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {doc.name}
                </Typography>

                <Box display="flex" alignItems="center" gap={0.6} mt={0.2} flexWrap="wrap">
                  <Typography
                    sx={{
                      fontSize: '8.5px',
                      color: '#777',
                    }}
                  >
                    {doc.size}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '8.5px',
                      color: '#777',
                    }}
                  >
                    {doc.uploadedBy}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right */}
            <Box display="flex" alignItems="center" ml={1}>
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                }}
              >
                <DownloadOutlinedIcon sx={{ fontSize: 15 }} />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                }}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{
                    fontSize: 15,
                    color: '#d9534f',
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default DocumentsSection;
