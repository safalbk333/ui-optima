import {
  Box,
  Stack,
  Avatar,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import React from 'react';

function Chat() {
  const messages = [
    {
      id: 1,
      sender: 'Amanda Brooks',
      time: '9:30 AM',
      type: 'left',
      message:
        'Regarding EOI-2024-089, we noticed a discrepancy in the tensile strength requirements listed for Item 4.',
    },
    {
      id: 2,
      sender: 'You',
      time: '10:02 AM',
      type: 'right',
      message: 'Thank you for the inquiry. ASTM A36 standard will be sufficient.',
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #e2e8f0',
          bgcolor: '#fff',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography fontWeight={700} fontSize={15}>
              Steel Infrastructure Component Supply
            </Typography>

            <Typography variant="body2" color="text.secondary">
              EOI-2024-089 • Global Builders Inc.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 12,
            color: '#94a3b8',
            mb: 3,
          }}
        >
          January 24, 2024
        </Typography>

        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.type === 'right' ? 'flex-end' : 'flex-start',
              mb: 3,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-end">
              {msg.type === 'left' && <Avatar sx={{ width: 34, height: 34 }} />}

              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#64748b',
                    mb: 0.5,
                    px: 1,
                  }}
                >
                  {msg.sender} • {msg.time}
                </Typography>

                <Box
                  sx={{
                    maxWidth: 420,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.type === 'right' ? '#2563eb' : '#fff',
                    color: msg.type === 'right' ? '#fff' : '#111827',
                    border: msg.type === 'left' ? '1px solid #e2e8f0' : 'none',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.message}
                  </Typography>
                </Box>
              </Box>

              {msg.type === 'right' && (
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: '#1e3a8a',
                    fontSize: 12,
                    color: '#fff',
                  }}
                >
                  Y
                </Avatar>
              )}
            </Stack>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Composer */}
      <Box
        sx={{
          p: 2,
          bgcolor: '#fff',
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Write clarification reply..."
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#f8fafc',
            },
          }}
        />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <AttachFileIcon fontSize="small" />
            </IconButton>

            <IconButton size="small">
              <ImageIcon fontSize="small" />
            </IconButton>

            <IconButton size="small">
              <InsertEmoticonIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            color="primary"
            sx={{
              borderRadius: 1,
              textTransform: 'none',
              px: 3,
            }}
          >
            Send Reply
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Chat;
