import { Box, Chip, Stack, Avatar, Divider, Typography, LinearProgress } from '@mui/material';

import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import React from 'react';

function ActivityPanel() {
  const files = ['Original_RFQ.pdf', 'Site_Diagrams.zip', 'Commercial_Terms.docx'];

  const participants = [
    {
      name: 'Amanda Brooks',
      role: 'Lead Procurement',
      status: 'online',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      name: 'John Stevens',
      role: 'Technical Lead',
      status: 'offline',
      initials: 'JS',
    },
  ];

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        width: '100%',
      }}
    >
      {/* OVERVIEW */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 1,
          color: 'primary.main',
          mb: 1,
        }}
      >
        Request Overview
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Estimated Value
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 24,
                fontWeight: 800,
                lineHeight: 1,
                color: '#2563eb',
              }}
            >
              $450,000
            </Typography>
          </Box>

          <Divider />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#94a3b8',
                }}
              >
                SUBMISSION DEADLINE
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                Feb 15, 2024
              </Typography>
            </Box>

            <Chip
              icon={<AccessTimeFilledRoundedIcon sx={{ fontSize: 16 }} />}
              label="8 Days Left"
              size="small"
              sx={{
                bgcolor: '#eff6ff',
                color: '#2563eb',
                fontWeight: 700,
                borderRadius: 1,
              }}
            />
          </Stack>

          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.8 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#64748b',
                  fontWeight: 600,
                }}
              >
                Progress to deadline
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: '#2563eb',
                  fontWeight: 700,
                }}
              >
                65%
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={65}
              sx={{
                height: 8,
                borderRadius: 10,
                bgcolor: '#e2e8f0',
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* PARTICIPANTS */}
      <Typography
        sx={{
          mt: 2,
          mb: 1.5,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          color: '#94a3b8',
        }}
      >
        Participants
      </Typography>

      <Stack spacing={1.2}>
        {participants.map((person) => (
          <Box
            key={person.name}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: '#fff',
              border: '1px solid #e2e8f0',
              transition: '0.2s',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
              },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={person.avatar}
                  sx={{
                    width: 42,
                    height: 42,
                    fontWeight: 700,
                    bgcolor: '#e2e8f0',
                    color: '#334155',
                  }}
                >
                  {person.initials}
                </Avatar>

                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: person.status === 'online' ? '#22c55e' : '#94a3b8',
                    position: 'absolute',
                    right: 0,
                    bottom: 1,
                    border: '2px solid #fff',
                  }}
                />
              </Box>

              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  {person.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: '#64748b',
                  }}
                >
                  {person.role}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* FILES */}
      <Typography
        sx={{
          mt: 4,
          mb: 1.5,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          color: '#94a3b8',
        }}
      >
        Files Shared
      </Typography>

      <Stack spacing={1.2}>
        {files.map((file) => (
          <Box
            key={file}
            sx={{
              p: 1.5,
              borderRadius: 1,
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': {
                borderColor: '#bfdbfe',
                bgcolor: '#f8fbff',
              },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#eff6ff',
                  color: '#2563eb',
                }}
              >
                <InsertDriveFileOutlinedIcon fontSize="small" />
              </Box>

              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#0f172a',
                  }}
                >
                  {file}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#94a3b8',
                  }}
                >
                  Shared by procurement team
                </Typography>
              </Box>

              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 18,
                  color: '#22c55e',
                }}
              />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default ActivityPanel;
