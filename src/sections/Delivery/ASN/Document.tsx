import { Box, Chip, Paper, Button, Divider, IconButton, Typography } from '@mui/material';

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
        border: '1px solid #dcdfe5',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eceff4',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            Documents
          </Typography>

          <Typography
            sx={{
              fontSize: '11px',
              color: '#777',
              mt: 0.3,
            }}
          >
            Upload and manage supporting files
          </Typography>
        </Box>
      </Box>

      {/* Upload Box */}
      <Box
        sx={{
          m: 2,
          border: '1.5px dashed #c7cfdb',
          borderRadius: '10px',
          py: 3,
          px: 2,
          textAlign: 'center',
          bgcolor: '#fafbfc',
        }}
      >
        <UploadFileOutlinedIcon
          sx={{
            fontSize: 34,
            color: '#7b8aa0',
            mb: 1,
          }}
        />

        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          Drag & Drop files here
        </Typography>

        <Typography
          sx={{
            fontSize: '11px',
            color: '#7b7b7b',
            mb: 1.5,
          }}
        >
          Supports PDF, DOCX, XLSX, PNG up to 10MB
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            fontSize: '11px',
            borderRadius: '8px',
          }}
        >
          Browse Files
        </Button>
      </Box>

      <Divider />

      {/* Existing Documents */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            mb: 1.5,
            color: '#555',
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
              border: '1px solid #e6e9ef',
              borderRadius: '10px',
              px: 1.5,
              py: 1.2,
              mb: 1.2,
              bgcolor: '#fff',
            }}
          >
            {/* Left */}
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  bgcolor: '#eef3ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{
                    fontSize: 20,
                    color: '#4a67d6',
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {doc.name}
                </Typography>

                <Box display="flex" alignItems="center" gap={0.8} mt={0.3}>
                  <Typography
                    sx={{
                      fontSize: '10px',
                      color: '#777',
                    }}
                  >
                    {doc.size}
                  </Typography>

                  <Chip
                    label={doc.type}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '9px',
                      bgcolor: '#f3f5f9',
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: '10px',
                      color: '#777',
                    }}
                  >
                    Uploaded by {doc.uploadedBy}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right */}
            <Box display="flex" alignItems="center">
              <IconButton size="small">
                <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <IconButton size="small">
                <DeleteOutlineOutlinedIcon
                  sx={{
                    fontSize: 18,
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
