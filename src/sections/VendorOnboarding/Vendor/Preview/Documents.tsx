'use client';

import * as React from 'react';

import { Box, Stack, Divider, Typography } from '@mui/material';

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

const documents = [
  {
    title: 'W-9 / W-8BEN Form',
    subtitle: 'Taxpayer Identification & Certification',
    required: true,
    icon: <DescriptionRoundedIcon sx={{ fontSize: 18 }} />,
    fileName: 'W9_Tax_Certificate.pdf',
    uploadedOn: '12 May 2026',
  },
  {
    title: 'Insurance Certificates',
    subtitle: 'General Liability & Workers Comp',
    required: true,
    icon: <SecurityRoundedIcon sx={{ fontSize: 18 }} />,
    policyNumber: 'GL-90034-22',
    expiryDate: '18 Dec 2026',
    fileName: 'Insurance_Certificate.pdf',
  },
  {
    title: 'Industry Certifications',
    subtitle: 'ISO 9001, SOC2, HIPAA',
    required: false,
    icon: <WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />,
    fileName: 'ISO9001_Certificate.pdf',
    uploadedOn: '02 Jan 2026',
  },
];

export default function VendorDocumentsPreview() {
  return (
    <Box>
      <Stack spacing={1.5}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: 0.3,
          }}
        >
          Uploaded Documents
        </Typography>

        <Stack spacing={1.2}>
          {documents.map((doc) => (
            <Box
              key={doc.title}
              sx={{
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                bgcolor: 'background.paper',
                transition: '0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Box sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1.3} alignItems="flex-start">
                  {/* Left Icon */}

                  {/* Main Content */}
                  <Box flex={1} minWidth={0}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {doc.title}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: 'text.secondary',
                        mt: 0.3,
                      }}
                    >
                      {doc.subtitle}
                    </Typography>

                    {/* File */}
                    <Box
                      sx={{
                        mt: 1.2,
                        px: 1.2,
                        py: 1,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <DescriptionRoundedIcon
                          sx={{
                            fontSize: 16,
                            color: 'primary.main',
                          }}
                        />

                        <Box flex={1} minWidth={0}>
                          <Typography
                            noWrap
                            sx={{
                              fontSize: 11.5,
                              fontWeight: 600,
                            }}
                          >
                            {doc.fileName}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 10.5,
                              color: 'text.secondary',
                            }}
                          >
                            PDF Document
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Bottom Meta */}
                    {(doc.uploadedOn || doc.policyNumber) && (
                      <>
                        <Divider sx={{ my: 1.2 }} />

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          gap={1}
                        >
                          {doc.policyNumber && (
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  color: 'text.secondary',
                                }}
                              >
                                Policy No
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: 11.5,
                                  fontWeight: 600,
                                }}
                              >
                                {doc.policyNumber}
                              </Typography>
                            </Box>
                          )}

                          {doc.expiryDate && (
                            <Box>
                              <Stack direction="row" spacing={0.4} alignItems="center">
                                <CalendarMonthRoundedIcon
                                  sx={{
                                    fontSize: 12,
                                    color: 'text.secondary',
                                  }}
                                />

                                <Typography
                                  sx={{
                                    fontSize: 10,
                                    color: 'text.secondary',
                                  }}
                                >
                                  Expiry
                                </Typography>
                              </Stack>

                              <Typography
                                sx={{
                                  fontSize: 11.5,
                                  fontWeight: 600,
                                }}
                              >
                                {doc.expiryDate}
                              </Typography>
                            </Box>
                          )}

                          {doc.uploadedOn && (
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: 10,
                                  color: 'text.secondary',
                                }}
                              >
                                Uploaded
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: 11.5,
                                  fontWeight: 600,
                                }}
                              >
                                {doc.uploadedOn}
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </>
                    )}
                  </Box>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
