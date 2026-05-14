'use client';

import { Box, Paper, Avatar, IconButton, Typography } from '@mui/material';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import React from 'react';

function WarehouseLocationCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0.5,
        overflow: 'hidden',
        border: '1px solid #DDE3EA',
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              bgcolor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 0.2,
            }}
          >
            <BusinessOutlinedIcon
              sx={{
                fontSize: 16,
                color: '#1E1B8F',
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                color: '#6B7280',
                lineHeight: 1.2,
              }}
            >
              Warehouse Location
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: '#111827',
                mt: 0.3,
              }}
            >
              Rotterdam Terminal 3
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* User Section */}
      <Box
        sx={{
          px: 2,
          py: 1.6,
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
          }}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: 12,
              fontWeight: 700,
              bgcolor: '#E0E7FF',
              color: '#4F46E5',
            }}
          >
            SC
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.2,
              }}
            >
              Sarah Chen
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: '#6B7280',
                mt: 0.2,
              }}
            >
              Senior QC Lead
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="small"
          sx={{
            color: '#1E1B8F',
          }}
        >
          <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Map Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            bgcolor: '#F3F4F6',
            borderRadius: 1.5,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 0.7,
              mb: 1,
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 15,
                color: '#6B7280',
                mt: 0.1,
              }}
            />

            <Typography
              sx={{
                fontSize: 11.5,
                color: '#4B5563',
                lineHeight: 1.4,
              }}
            >
              Rotterdam Port,
              <br />
              Netherlands
            </Typography>
          </Box>

          <Box
            component="img"
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
            alt="map"
            sx={{
              width: '100%',
              height: 68,
              objectFit: 'cover',
              borderRadius: 1,
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default WarehouseLocationCard;
