'use client';

import {
  Box,
  Paper,
  Stack,
  alpha,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
} from '@mui/material';
import React, { useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/ArticleOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmberRounded';

const feedItems = [
  {
    title: 'Payment released — Acme Supplies',
    sub: 'INV-2041 · $14,200.00 via bank transfer',
    badge: 'Payment',
    time: '2 min ago',
    dotBg: '#EAF3DE',
    badgeBg: '#EAF3DE',
    badgeColor: '#27500A',
    icon: <CheckIcon sx={{ fontSize: 13, color: '#3B6D11' }} />,
  },
  {
    title: 'Invoice matched — TechParts Co.',
    sub: '3-way match passed · PO-3382 · INV-2039',
    badge: 'Invoice',
    time: '41 min ago',
    dotBg: '#E6F1FB',
    badgeBg: '#E6F1FB',
    badgeColor: '#0C447C',
    icon: <InventoryIcon sx={{ fontSize: 13, color: '#185FA5' }} />,
  },
  {
    title: 'PR approved — Office furniture',
    sub: 'Approved by R. Sharma · PR-1128 · $3,450',
    badge: 'Approval',
    time: '1 hr ago',
    dotBg: '#E1F5EE',
    badgeBg: '#E1F5EE',
    badgeColor: '#085041',
    icon: <AccessTimeIcon sx={{ fontSize: 13, color: '#0F6E56' }} />,
  },
  {
    title: 'New purchase request submitted',
    sub: 'K. Menon · Lab equipment · $8,900',
    badge: 'Request',
    time: '2 hr ago',
    dotBg: '#EEEDFE',
    badgeBg: '#EEEDFE',
    badgeColor: '#3C3489',
    icon: <ArticleIcon sx={{ fontSize: 13, color: '#534AB7' }} />,
  },
  {
    title: 'Invoice exception flagged',
    sub: 'Amount mismatch · INV-2037 · GlobalPrint Ltd',
    badge: 'Exception',
    time: '3 hr ago',
    dotBg: '#FAEEDA',
    badgeBg: '#FAEEDA',
    badgeColor: '#633806',
    icon: <WarningAmberIcon sx={{ fontSize: 13, color: '#BA7517' }} />,
  },
];

export default function RecentActivityCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Small Preview Card */}
      <Paper
        elevation={0}
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          px: 1.5,
          py: 1.15,
          borderRadius: 0,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: '0.2s',
          minHeight: 82,
          cursor: 'pointer',
        })}
      >
        {/* Left */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
          {/* Icon */}
          <Box
            sx={(theme) => ({
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1), // same bg
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              ml: 0.5,
              color: theme.palette.primary.main,
            })}
          >
            <AccessTimeIcon
              sx={{
                fontSize: 20,
                color: 'inherit', // inherit same primary color
              }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: '#2B2B2B',
                lineHeight: 1.2,
                mb: 0.3,
              }}
            >
              Recent Activity
            </Typography>

            <Typography
              sx={{
                color: '#666',
                fontSize: 12,
                lineHeight: 1.35,
                mb: 0.8,
              }}
            >
              Payments, approvals and invoice updates from today.
            </Typography>

            {/* <Stack direction="row" spacing={0.5} alignItems="center">
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#10B981',
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 12,
            color: '#111827',
          }}
        >
          24 updates
        </Typography>

        <Typography
          sx={{
            color: '#777',
            fontSize: 11,
          }}
        >
          (live)
        </Typography>
      </Stack> */}
          </Box>
        </Stack>

        {/* Action */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            minWidth: 68,
            height: 32,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 12,
            color: '#2B2B2B',
            borderColor: '#D0D0D0',
            px: 1.5,
            ml: 1,
          }}
        >
          Open
        </Button>
      </Paper>

      {/* Popup */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={(theme) => ({
              background: theme.palette.background.paper,
              border: `0.5px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            })}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '0.5px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                  }}
                />

                <Typography fontSize={13} fontWeight={600}>
                  Recent activity
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontSize={11} color="text.disabled">
                  Today
                </Typography>

                <IconButton size="small" onClick={() => setOpen(false)}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Feed */}
            {feedItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 1.75,
                  px: 2,
                  py: 1.75,
                  borderTop: index === 0 ? 'none' : '0.5px solid',
                  borderColor: 'divider',
                  position: 'relative',

                  '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    left: 30,
                    top: 46,
                    bottom: -14,
                    width: '1px',
                    bgcolor: 'divider',
                    display: 'block',
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: item.dotBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mt: '2px',
                  }}
                >
                  {item.icon}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography fontSize={13} fontWeight={500} mb={0.25} lineHeight={1.4}>
                    {item.title}
                  </Typography>

                  <Typography fontSize={12} color="text.secondary" lineHeight={1.4}>
                    {item.sub}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={0.75} mt={0.75}>
                    <Box
                      sx={{
                        fontSize: 11,
                        fontWeight: 500,
                        px: 1,
                        py: '2px',
                        borderRadius: 20,
                        bgcolor: item.badgeBg,
                        color: item.badgeColor,
                      }}
                    >
                      {item.badge}
                    </Box>

                    <Typography fontSize={11} color="text.disabled" sx={{ ml: 'auto !important' }}>
                      {item.time}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
