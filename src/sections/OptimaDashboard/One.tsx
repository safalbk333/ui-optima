import { Box, Paper, Stack, useTheme, Typography } from '@mui/material';

const steps = [
  {
    id: '01.',
    title: 'Vendor Management',
    desc: 'Centralize supplier onboarding, approvals, compliance tracking, and vendor collaboration in one streamlined workspace.',
  },
  {
    id: '02.',
    title: 'RFQ / RFQ',
    desc: 'Create RFQs instantly, compare quotations efficiently, and identify the best suppliers with smart sourcing workflows.',
  },
  {
    id: '03.',
    title: 'Purchase Requests',
    desc: 'Manage purchase requisitions, POs, and multi-level approval processes with complete visibility and control.',
  },
  {
    id: '04.',
    title: 'Invoice',
    desc: 'Automate invoice matching, payment tracking, and financial reconciliation for a seamless procure-to-pay cycle.',
  },
];

export default function ProcessSection() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: 0,
        py: { xs: 2.5, md: 3.5 },
        color: 'primary.main',
        maxWidth: 1200,
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        mb={4}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'primary.main',
              mb: 0.5,
            }}
          >
            4 MAIN modules
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 24, md: 26 },
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: 0.5,
              maxWidth: 400,
            }}
          >
            Effortless Process,
            <br />
            Continuous Supply
          </Typography>
        </Box>

        <Box
          sx={{
            height: 1,
            width: { xs: '100%', md: 220 },
            borderTop: `1px solid ${theme.palette.primary.main}`,
          }}
        />
      </Stack>

      {/* Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2,1fr)',
            md: 'repeat(4,1fr)',
          },
          gap: 2,
        }}
      >
        {steps.map((step) => (
          <Paper
            key={step.id}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 0,
              p: 2,
              minHeight: 185,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: '0.3s',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.14)',
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {step.id}
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: 0.5,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  mb: 1,
                }}
              >
                {step.title}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                lineHeight: 1.7,
                color: 'primary.main',
              }}
            >
              {step.desc}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
