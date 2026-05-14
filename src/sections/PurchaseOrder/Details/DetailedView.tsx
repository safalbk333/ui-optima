'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Checkbox from '@mui/material/Checkbox';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ContactCard from './ContactCards';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LineItemsTable from './Table';
import POSupportingDocsBox from './SupportingDocuments';
import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import PrintIcon from '@mui/icons-material/Print';
import PurchaseOrderTracker from './POTracker';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const PurchaseOrderCard = () => (
  <Box
    sx={{
      borderBottom: '1px solid #e4e7ec',
      borderRadius: 0,
      px: 2,
      py: 1.5,
      mb: 2,
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
      {/* LEFT CONTENT */}
      <Box flex={1} minWidth={0}>
        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1f2937',
            }}
          >
            PO-2024-001
          </Typography>

          <Box
            sx={{
              px: 1,
              py: '2px',
              borderRadius: '4px',
              backgroundColor: '#edf7ed',
              color: '#2e7d32',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Pending Vendor Action
          </Box>
        </Box>

        <Box
          mt={1}
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: 'repeat(2, minmax(140px, 1fr))',
            md: 'repeat(4, minmax(120px, auto))',
          }}
          gap={1.5}
        >
          {[
            {
              label: 'Buyer',
              value: 'GlobalLink Corp',
              color: '#344054',
            },
            {
              label: 'Total Value',
              value: '$12,400.00',
              color: '#3b5ccc',
            },
            {
              label: 'Issue Date',
              value: '12 May 2026',
              color: '#344054',
            },
            {
              label: 'Delivery Date',
              value: '25 May 2026',
              color: '#d97706',
            },
          ].map((item) => (
            <Box key={item.label}>
              <Typography
                sx={{
                  fontSize: '10px',
                  color: '#98a2b3',
                  textTransform: 'uppercase',
                  mb: 0.2,
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
        <IconButton
          size="small"
          sx={{
            border: '1px solid #d0d5dd',
            borderRadius: '6px',
          }}
        >
          <PrintIcon sx={{ fontSize: 17, color: '#475467' }} />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

function DetailedView() {
  const [open, setOpen] = useState(false);
  const [decision, setDecision] = useState<'agree' | 'disagree' | ''>('');
  const [clarification, setClarification] = useState('');

  const handleClose = () => {
    setOpen(false);
    setDecision('');
    setClarification('');
  };

  const handleSubmit = () => {
    console.log({
      decision,
      clarification,
    });

    handleClose();
  };

  return (
    <Box>
      <Box mb={2}>
        <PremiumBreadcrumbs
          title="Purchase Orders Details"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Purchase Orders', href: '/purchase_orders' },
            { label: 'Details', href: '/purchase_orders/details' },
          ]}
          action={
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                  borderRadius: 0.5,
                  textTransform: 'none',
                  px: 2.5,
                  height: 40,
                  fontWeight: 700,

                }}
              >
                Acknowledge PO
              </Button>
            </Stack>
          }
        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Layout */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
        }}
      >
        {/* Left */}
        <Box
          sx={{
            flex: {
              lg: '0 0 70%',
            },
            width: '100%',
            minWidth: 0,
          }}
        >
          <PurchaseOrderCard />

          <Box mt={2}>
            <LineItemsTable />
          </Box>

          <PurchaseOrderTracker />
        </Box>

        {/* Right */}
        <Box
          sx={{
            flex: {
              lg: '0 0 30%',
            },
            width: '100%',
            minWidth: 280,
            position: 'sticky',
            top: 20,
          }}
        >
          <ContactCard />

          <POSupportingDocsBox />
        </Box>
      </Box>

      {/* ACKNOWLEDGE POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            p: 0,
          },
        }}
      >
        {/* HEADER */}
        <DialogTitle
          sx={{
            px: 2.2,
            py: 1.8,
            background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
            borderBottom: '1px solid #eaecf0',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                Purchase Order Acknowledgement
              </Typography>

              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#667085',
                  mt: 0.3,
                }}
              >
                Confirm whether you accept this purchase order.
              </Typography>
            </Box>

            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                border: '1px solid #e5e7eb',
                bgcolor: '#fff',
                p: 0.7,
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </DialogTitle>

        {/* BODY */}
        <DialogContent sx={{ p: 2.2 }}>
          {/* PO SUMMARY */}
          <Box
            sx={{
              border: '1px solid #e4e7ec',
              borderRadius: '12px',
              p: 1.6,
              mb: 2,
              mt: 2,
              background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: '#98a2b3',
                    textTransform: 'uppercase',
                    mb: 0.4,
                    letterSpacing: 0.4,
                  }}
                >
                  Purchase Order
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#111827',
                  }}
                >
                  PO-2024-001
                </Typography>
              </Box>

              <Box textAlign="right">
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: '#98a2b3',
                    textTransform: 'uppercase',
                    mb: 0.4,
                    letterSpacing: 0.4,
                  }}
                >
                  Total Value
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#4f46e5',
                  }}
                >
                  $12,400.00
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* AGREE OPTION */}
          <Box
            onClick={() => setDecision('agree')}
            sx={{
              border: decision === 'agree' ? '2px solid #22c55e' : '1px solid #e5e7eb',
              borderRadius: '14px',
              p: 1.6,
              cursor: 'pointer',
              transition: '0.2s',
              mb: 1.5,
              background: decision === 'agree' ? 'rgba(34,197,94,0.05)' : '#fff',
              '&:hover': {
                borderColor: '#22c55e',
              },
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="flex-start">
              <Checkbox checked={decision === 'agree'} size="small" sx={{ p: 0.3 }} />

              <Box>
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <CheckCircleRoundedIcon
                    sx={{
                      color: '#22c55e',
                      fontSize: 18,
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#111827',
                    }}
                  >
                    I Agree
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#667085',
                    mt: 0.5,
                    lineHeight: 1.5,
                  }}
                >
                  I acknowledge and accept all terms, pricing, delivery timelines, and conditions
                  mentioned in this purchase order.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* DISAGREE OPTION */}
          <Box
            onClick={() => setDecision('disagree')}
            sx={{
              border: decision === 'disagree' ? '1px solid #f59e0b' : '1px solid #e5e7eb',
              borderRadius: '14px',
              p: 1.6,
              cursor: 'pointer',
              transition: '0.2s',
              background: decision === 'disagree' ? 'rgba(240, 238, 234, 0.06)' : '#fff',
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="flex-start">
              <Checkbox checked={decision === 'disagree'} size="small" sx={{ p: 0.3 }} />

              <Box width="100%">
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <ErrorOutlineRoundedIcon
                    sx={{
                      color: '#f59e0b',
                      fontSize: 18,
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#111827',
                    }}
                  >
                    I Disagree
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#667085',
                    mt: 0.5,
                    lineHeight: 1.5,
                    mb: decision === 'disagree' ? 1.5 : 0,
                  }}
                >
                  I have concerns or clarification requests related to pricing, quantities,
                  timelines, or other PO terms.
                </Typography>

                {decision === 'disagree' && (
                  <Slide direction="up" in={decision === 'disagree'} mountOnEnter unmountOnExit>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      placeholder="Enter clarification or concern..."
                      value={clarification}
                      onChange={(e) => setClarification(e.target.value)}
                      sx={{
                        mt: 0.5,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: '#fff',
                          fontSize: '13px',
                        },
                        '& .MuiInputBase-input': {
                          fontSize: '13px',
                          p: 1.2,
                        },
                      }}
                    />
                  </Slide>
                )}
              </Box>
            </Stack>
          </Box>

          {/* ACTIONS */}
          <Stack direction="row" spacing={1} justifyContent="flex-end" mt={3}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderRadius: '9px',
                px: 2.2,
                height: 38,
                fontWeight: 600,
                fontSize: '13px',
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              color='primary'
              sx={{
                textTransform: 'none',
                borderRadius: '9px',
                px: 2.2,
                height: 38,
                fontWeight: 700,
                fontSize: '13px',
                boxShadow: 'none',
              }}
            >
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DetailedView;
