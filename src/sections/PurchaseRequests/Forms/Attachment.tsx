'use client';

import { Box, Button, Chip, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { setAttachments } from 'src/store/slices/PurchaseRequests/PRStepperFormSlice';
import { useAppDispatch } from 'src/store/hooks';

export default function StylishDocumentUpload() {
  const dispatch = useAppDispatch();

const [files, setFiles] = useState<
  {
    id: number;
    name: string;
    size: string;
    progress: number;
    type: string;
  }[]
>([]);
  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };
  useEffect(() => {
  dispatch(
    setAttachments(
      files.map((file) => ({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      }))
    )
  );
}, [files, dispatch]);
  // Demo Upload
  const handleUpload = () => {
    const newFile = {
      id: Date.now(),
      name: `New_Document_${files.length + 1}.pdf`,
      size: '1.2 MB',
      progress: 100,
      type: 'PDF',
    };

    // Add latest upload at TOP
    setFiles((prev) => [newFile, ...prev]);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.82rem',
              }}
            >
              Supporting Documents
            </Typography>

            <Typography
              sx={{
                color: '#64748b',
                mt: 0.2,
                fontSize: '0.74rem',
              }}
            >
              Upload invoices, specs
            </Typography>
          </Box>

          <Chip
            label={`${files.length} Files`}
            size="small"
            sx={{
              height: 24,
              fontSize: '0.68rem',
              bgcolor: '#eff6ff',
              color: '#2563eb',
              fontWeight: 700,
            }}
          />
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Uploaded Files */}
        <Stack spacing={1.2}>
            {files.length === 0 ? (
    <Box
      sx={{
        py: 4,
        textAlign: 'center',
        border: '1px dashed #e2e8f0',
        borderRadius: 2,
      }}
    >
      <DescriptionRoundedIcon
        sx={{
          fontSize: 40,
          color: '#94a3b8',
          mb: 1,
        }}
      />

      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#334155',
        }}
      >
        No documents uploaded
      </Typography>

      <Typography
        sx={{
          fontSize: '0.7rem',
          color: '#64748b',
          mt: 0.5,
        }}
      >
        Upload invoices or supporting documents
      </Typography>
    </Box>
  ) : (
          files.map((file) => (
            <Paper
              key={file.id}
              elevation={0}
              sx={{
                border: '1px solid #eef2f7',
                borderRadius: 2,
                px: 1.5,
                py: 1.2,
                transition: '0.2s',

                '&:hover': {
                  borderColor: '#dbeafe',
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent="space-between"
              >
                {/* Left */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <DescriptionRoundedIcon
                      sx={{
                        color: '#2563eb',
                        fontSize: 20,
                      }}
                    />
                  </Box>

                  {/* File Info */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 600,
                        color: '#0f172a',
                        fontSize: '0.8rem',
                        mb: 0.3,
                        maxWidth: 260,
                      }}
                    >
                      {file.name}
                    </Typography>

                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Typography
                        sx={{
                          color: '#64748b',
                          fontSize: '0.68rem',
                        }}
                      >
                        {file.size}
                      </Typography>

                      <Divider orientation="vertical" flexItem sx={{ height: 10 }} />

                      <Chip
                        label={file.type}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          bgcolor: '#f1f5f9',
                          color: '#334155',
                        }}
                      />
                    </Stack>
                  </Box>
                </Stack>

                {/* Delete */}
                <IconButton
                  onClick={() => removeFile(file.id)}
                  size="small"
                  sx={{
                    bgcolor: '#fff1f2',
                    color: '#e11d48',
                    flexShrink: 0,

                    '&:hover': {
                      bgcolor: '#ffe4e6',
                    },
                  }}
                >
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Paper>
    ))
  )}
        </Stack>

        {/* Upload Area at Bottom */}
        <Box
          sx={{
            mt: 1.5,
            border: '1px dashed #cbd5e1',
            borderRadius: 2,
            p: 1.8,
            bgcolor: '#f8fafc',
            transition: '0.3s',
            cursor: 'pointer',

            '&:hover': {
              borderColor: '#2563eb',
              bgcolor: '#f8fbff',
            },
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
            {/* Left Content */}
            <Stack direction="row" spacing={1.4} alignItems="center">
              {/* Upload Icon */}
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CloudUploadRoundedIcon
                  sx={{
                    fontSize: 20,
                    color: '#2563eb',
                  }}
                />
              </Box>

              {/* Upload Info */}
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    mb: 0.3,
                  }}
                >
                  Upload Supporting Documents
                </Typography>

                <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap">





                  <Typography
                    sx={{
                      color: '#64748b',
                      fontSize: '0.66rem',
                    }}
                  >
                    Max file size: 20MB
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Browse Button */}
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleUpload}
              startIcon={<InsertDriveFileRoundedIcon sx={{ fontSize: 15 }} />}
              sx={{
                textTransform: 'none',
                borderRadius: 1.8,
                px: 1.4,
                py: 0.45,
                minHeight: 30,
                fontWeight: 600,
                fontSize: '0.68rem',
                boxShadow: 'none',
                flexShrink: 0,

                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Browse Files
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
