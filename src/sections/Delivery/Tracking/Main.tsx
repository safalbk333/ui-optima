import {
  Box,
  Chip,
  Paper,
  Stack,
  Avatar,
  Button,
  Divider,
  IconButton,
  Typography,
  LinearProgress,
} from '@mui/material';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import React from 'react';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

const trackingHistory = [
  {
    title: 'Shipment Picked Up',
    location: 'Amazon Warehouse, Norra Nynäshamn',
    time: '15 Dec • 03:27 PM',
    icon: <Inventory2OutlinedIcon sx={{ fontSize: 16 }} />,
    status: 'completed',
  },
  {
    title: 'Departed Facility',
    location: 'Nynäshamn Logistics Hub',
    time: '15 Dec • 06:10 PM',
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />,
    status: 'completed',
  },
  {
    title: 'Reached Transit Hub',
    location: 'Farsta Distribution Center',
    time: '16 Dec • 01:45 AM',
    icon: <WarehouseOutlinedIcon sx={{ fontSize: 16 }} />,
    status: 'active',
  },
  {
    title: 'Out for Delivery',
    location: 'Stockholm Delivery Station',
    time: 'Expected • 16 Dec',
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />,
    status: 'pending',
  },
  {
    title: 'Delivered',
    location: 'Stockholm Warehouse',
    time: 'Expected • 17 Dec',
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />,
    status: 'pending',
  },
];

function PremiumShipmentTracking() {
  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Shipment Tracking"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'ASN', href: '/delivery' },
            { label: 'Tracking', href: '/delivery/tracking' },
          ]}
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      <Paper
        elevation={0}
        sx={{
          height: '100vh',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '290px 1fr',
            },
            height: '100%',
          }}
        >
          {/* LEFT SIDEBAR */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#FBFCFE',
              borderRight: '1px solid #EDF1F5',
              overflowY: 'auto',
            }}
          >
            {/* HEADER */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.8 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: -0.4,
                  }}
                >
                  Shipments
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,
                    fontSize: 10.5,
                    color: '#94A3B8',
                  }}
                >
                  Live tracking overview
                </Typography>
              </Box>

              <IconButton
                size="small"
                sx={{
                  border: '1px solid #E2E8F0',
                  bgcolor: '#fff',
                  transition: '0.2s ease',
                  '&:hover': {
                    bgcolor: '#F8FAFC',
                    transform: 'rotate(90deg)',
                  },
                }}
              >
                <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>

            {/* TABS */}
            <Stack direction="row" spacing={1} sx={{ mb: 1.8 }}>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                sx={{
                  height: 32,
                  borderRadius: 2.5,
                  bgcolor: 'primary.main',
                  textTransform: 'none',
                  fontSize: 10.5,
                  fontWeight: 700,
                  boxShadow: 'none',
                }}
              >
                In Transit
              </Button>

              <Button
                fullWidth
                disableElevation
                variant="outlined"
                sx={{
                  height: 32,
                  borderRadius: 2.5,
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  textTransform: 'none',
                  fontSize: 10.5,
                  fontWeight: 700,
                }}
              >
                Delivered
              </Button>
            </Stack>

            {/* ACTIVE SHIPMENT CARD */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 1,
                p: 1.5,
                bgcolor: '#fff',
                border: '1px solid #DDE7F3',
              }}
            >
              {/* ROUTE */}
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.4,
                    }}
                  >
                    Norra Nynäshamn
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.4} sx={{ my: 0.2 }}>
                    <TrendingFlatRoundedIcon
                      sx={{
                        fontSize: 14,
                        color: '#94A3B8',
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#111827',
                      }}
                    >
                      Stockholm
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: 10,
                      color: '#94A3B8',
                    }}
                  >
                    Order ID #29698-98971
                  </Typography>
                </Box>

                <Chip
                  label="IN TRANSIT"
                  size="small"
                  sx={{
                    height: 20,
                    borderRadius: 2,
                    fontSize: 8,
                    fontWeight: 800,
                    bgcolor: '#E8F7EC',
                    color: '#16A34A',
                  }}
                />
              </Stack>

              {/* PROGRESS */}
              <Box sx={{ mt: 1.8 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.7 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      color: '#94A3B8',
                      fontWeight: 600,
                    }}
                  >
                    Shipment Progress
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 9,
                      color: '#111827',
                      fontWeight: 700,
                    }}
                  >
                    58%
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={58}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    bgcolor: '#EEF2F7',
                    overflow: 'hidden',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      background: 'linear-gradient(90deg,#4ADE80,#22C55E)',
                    },
                  }}
                />
              </Box>

              {/* QUICK STATS */}
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.8 }}>
                {[
                  ['Distance', '1246 km'],
                  ['Weight', '5.2 kg'],
                  ['ETA', '17 Dec'],
                ].map((item, i) => (
                  <Box key={i}>
                    <Typography
                      sx={{
                        fontSize: 8,
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item[0]}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#111827',
                      }}
                    >
                      {item[1]}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              {/* COURIER */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                  <Avatar
                    src="https://i.pravatar.cc/100?img=12"
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 8,
                        color: '#94A3B8',
                      }}
                    >
                      Courier
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#111827',
                      }}
                    >
                      Harris Whitaker
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={0.8}>
                  {[<ChatBubbleOutlineRoundedIcon />, <CallRoundedIcon />].map((icon, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      sx={{
                        width: 30,
                        height: 30,
                        border: '1px solid #E2E8F0',
                        bgcolor: '#fff',
                        transition: '0.2s ease',
                        '&:hover': {
                          bgcolor: '#F8FAFC',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {React.cloneElement(icon, {
                        sx: {
                          fontSize: 14,
                          color: '#475569',
                        },
                      })}
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Box>

          {/* RIGHT TRACKING TIMELINE */}
          <Box
            sx={{
              px: 2,
              overflowY: 'auto',
            }}
          >
            {/* HEADER */}
            <Paper
              elevation={0}
              sx={{
                p: 1.6,
                borderRadius: 0,
                border: '1px solid #E8EDF3',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    Tracking Activity
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,
                      fontSize: 11,
                      color: '#64748B',
                    }}
                  >
                    Real-time shipment movement and milestone history
                  </Typography>
                </Box>

                <Chip
                  icon={<AccessTimeRoundedIcon sx={{ fontSize: '14px !important' }} />}
                  label="Updated 6 mins ago"
                  size="small"
                  sx={{
                    height: 24,
                    borderRadius: 2,
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#475569',
                  }}
                />
              </Stack>
            </Paper>

            {/* TIMELINE */}
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {trackingHistory.map((item, index) => {
                const active = item.status === 'active';
                const completed = item.status === 'completed';

                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                    }}
                  >
                    {/* LEFT TIMELINE */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: completed ? 'primary.main' : active ? '#16A34A' : '#E2E8F0',
                          color: completed || active ? '#fff' : '#94A3B8',
                          boxShadow: active ? '0 0 0 6px rgba(34,197,94,0.12)' : 'none',
                          animation: active ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': {
                              boxShadow: '0 0 0 0 rgba(34,197,94,0.25)',
                            },
                            '70%': {
                              boxShadow: '0 0 0 10px rgba(34,197,94,0)',
                            },
                            '100%': {
                              boxShadow: '0 0 0 0 rgba(34,197,94,0)',
                            },
                          },
                        }}
                      >
                        {item.icon}
                      </Box>

                      {index !== trackingHistory.length - 1 && (
                        <Box
                          sx={{
                            width: '2px',
                            flex: 1,
                            minHeight: 40,
                            bgcolor: '#E2E8F0',
                            mt: 0.6,
                          }}
                        />
                      )}
                    </Box>

                    {/* CONTENT CARD */}
                    <Paper
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 1.6,
                        borderRadius: 0,
                        border: active ? '1px solid #D1FAE5' : '1px solid #EDF2F7',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: '#111827',
                            }}
                          >
                            {item.title}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 0.5,
                              fontSize: 10.5,
                              color: '#64748B',
                              lineHeight: 1.6,
                            }}
                          >
                            {item.location}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 9.5,
                            color: '#94A3B8',
                            whiteSpace: 'nowrap',
                            fontWeight: 600,
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PremiumShipmentTracking;
