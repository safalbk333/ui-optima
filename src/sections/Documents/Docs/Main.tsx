'use client';

import { Box, Chip, Avatar, Button, Divider, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

const files = [
  {
    id: 1,
    name: 'Q4_Performance_Report.pdf',
    size: '4.2 MB',
    modified: 'Oct 12, 2023, 09:45',
    status: 'Stored',
    type: 'pdf',
  },
  {
    id: 2,
    name: 'Hero_Campaign_Background.png',
    size: '12.8 MB',
    modified: 'Oct 11, 2023, 14:20',
    status: 'Syncing',
    type: 'image',
  },
  {
    id: 3,
    name: 'Client_Feedback_Sheet.xlsx',
    size: '842 KB',
    modified: 'Oct 11, 2023, 11:05',
    status: 'Stored',
    type: 'sheet',
  },
  {
    id: 4,
    name: 'Brand_Introduction_v2.mp4',
    size: '245.5 MB',
    modified: 'Oct 10, 2023, 16:55',
    status: 'Stored',
    type: 'video',
  },
];

const getIcon = (type: any) => {
  switch (type) {
    case 'pdf':
      return (
        <Avatar
          sx={{
            bgcolor: '#ffe9e9',
            width: 34,
            height: 34,
          }}
        >
          <InsertDriveFileOutlinedIcon sx={{ color: '#ef5350', fontSize: 18 }} />
        </Avatar>
      );

    case 'image':
      return (
        <Avatar
          sx={{
            bgcolor: '#e8f0ff',
            width: 34,
            height: 34,
          }}
        >
          <ImageOutlinedIcon sx={{ color: '#2979ff', fontSize: 18 }} />
        </Avatar>
      );

    default:
      return (
        <Avatar
          sx={{
            bgcolor: '#f2f4f7',
            width: 34,
            height: 34,
          }}
        >
          <MovieOutlinedIcon sx={{ color: '#667085', fontSize: 18 }} />
        </Avatar>
      );
  }
};

function FileManagerUI() {
  const [selected, setSelected] = useState(1);

  return (
    <>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Document Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Documents', href: '/documents' },
            { label: 'Details', href: '/documents/docs' },
          ]}
        />
      </Box>
      <Box sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Box
        sx={{
          display: 'flex',
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            mt: 2,
            flex: 1,
            borderRight: '1px solid #e5e7eb',
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '40px 1.8fr 120px 180px 120px',
              px: 2,
              py: 1,
              color: '#98a2b3',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <Box />
            <Box>Name</Box>
            <Box>Size</Box>
            <Box>Modified</Box>
            <Box>Status</Box>
          </Box>

          <Divider />

          {/* File Rows */}
          {files.map((file) => (
            <React.Fragment key={file.id}>
              <Box
                onClick={() => setSelected(file.id)}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1.8fr 120px 180px 120px',
                  alignItems: 'center',
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  bgcolor: selected === file.id ? '#eef4ff' : 'transparent',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                <Checkbox checked={selected === file.id} size="small" />

                <Box display="flex" alignItems="center" gap={1.5}>
                  {getIcon(file.type)}

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#344054',
                    }}
                  >
                    {file.name}
                  </Typography>
                </Box>

                <Typography fontSize={13} color="#667085">
                  {file.size}
                </Typography>

                <Typography fontSize={13} color="#667085">
                  {file.modified}
                </Typography>

                <Chip
                  label={file.status}
                  size="small"
                  sx={{
                    width: 'fit-content',
                    fontSize: 11,
                    height: 24,
                    bgcolor: file.status === 'Stored' ? '#ecfdf3' : '#fff7ed',
                    color: file.status === 'Stored' ? '#027a48' : '#ea580c',
                  }}
                />
              </Box>

              <Divider />
            </React.Fragment>
          ))}
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            width: 340,
            bgcolor: '#fff',
            p: 2.5,
          }}
        >
          {/* Information */}
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: '#98a2b3',
              mb: 2,
            }}
          >
            INFORMATION
          </Typography>

          {[
            ['Type', 'PDF Document'],
            ['Size', '4.2 MB'],
            ['Dimensions', 'A4 (210 × 297mm)'],
            ['Owner', 'Jane Doe'],
            ['Permissions', 'Read & Write'],
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography fontSize={13} color="#667085">
                {item[0]}
              </Typography>

              <Typography fontSize={13} fontWeight={600} color="#344054">
                {item[1]}
              </Typography>
            </Box>
          ))}

          {/* Version History */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: '#98a2b3',
              }}
            >
              VERSION HISTORY
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: '#2563eb',
                cursor: 'pointer',
              }}
            >
              View All
            </Typography>
          </Box>

          {[
            {
              version: 'v3',
              title: 'Current Version',
              date: 'Oct 12, 2023 by Jane Doe',
            },
            {
              version: 'v2',
              title: 'Revised Layout',
              date: 'Oct 08, 2023 by Mike Chen',
            },
            {
              version: 'v1',
              title: 'Initial Draft',
              date: 'Oct 01, 2023 by Jane Doe',
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: '#eef2ff',
                  color: '#4f46e5',
                  fontSize: 12,
                }}
              >
                {item.version}
              </Avatar>

              <Box>
                <Typography fontSize={13} fontWeight={600}>
                  {item.title}
                </Typography>

                <Typography fontSize={12} color="#667085">
                  {item.date}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* Download Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 4,
              py: 1.3,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Download File
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FileManagerUI;
