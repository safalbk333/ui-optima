'use client';

import { Box, Stack, Typography } from '@mui/material';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import React from 'react';

const deliveries = [
  {
    id: '#001234ABCD',
    from: '87 Wiem Du Lane',
    to: '15 Vicar Lane',
    active: true,
  },
  {
    id: '#001234ABCD',
    from: '40 Borerfield Place',
    to: '44 Muland Bridge',
    active: false,
  },
  {
    id: '#001234ABCD',
    from: '29 Queen Street',
    to: '71 Market Road',
    active: false,
  },
];

export default function DeliveryTracking() {
  return (
    <Box mt={3}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '380px 1fr',
          },
          gap: 2,
        }}
      >
        {/* LEFT PANEL */}
        <Box>
          {/* HEADER */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Ongoing delivery
              </Typography>
            </Stack>
          </Stack>

          {/* DELIVERY LIST */}
          <Stack spacing={1.2}>
            {deliveries.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: item.active ? '1px solid #4F8CFF' : '1px solid #E5E7EB',
                  borderRadius: 1,
                  p: 1.3,
                  background: '#FFFFFF',
                  boxShadow: item.active ? '0 4px 12px rgba(79,140,255,0.10)' : 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  {/* LEFT CONTENT */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: '#9CA3AF',
                        mb: 0.3,
                      }}
                    >
                      Shipment number
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#111827',
                        lineHeight: 1.2,
                        mb: 0.8,
                      }}
                    >
                      {item.id}
                    </Typography>

                    <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
                      <FiberManualRecordRoundedIcon
                        sx={{
                          color: '#22C55E',
                          fontSize: 8,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: '#6B7280',
                        }}
                      >
                        {item.from}
                      </Typography>

                      <LocationOnRoundedIcon
                        sx={{
                          fontSize: 13,
                          color: '#4F8CFF',
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: '#6B7280',
                        }}
                      >
                        {item.to}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* TRUCK IMAGE */}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT PANEL */}
        <Box>
          {/* TOP */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              On the way
            </Typography>
          </Stack>

          {/* GOOGLE MAP */}
          <Box
            sx={{
              height: 260,
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              mb: 2,
            }}
          >
            <iframe
              title="google-map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=9.9312,76.2673&z=12&output=embed"
            />
          </Box>

          {/* BOTTOM STATS */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2,1fr)',
                md: 'repeat(5,1fr)',
              },
              gap: 1.5,
            }}
          >
            {[
              ['Category', 'Electronic'],
              ['Distance', '60.41 km'],
              ['Estimation', '1d 16h'],
              ['Weight', '25kg'],
              ['Fee', '$1,050'],
            ].map(([label, value]) => (
              <Box key={label}>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#9CA3AF',
                    mb: 0.3,
                  }}
                >
                  {label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
