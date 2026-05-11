import { Box, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr ' },
        gap: 5,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          opacity: 0.18,
          backgroundImage: `
            linear-gradient(${alpha(theme.palette.primary.main, 0.35)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.35)} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 70% 50%, black 20%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* LEFT */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={2} maxWidth={800}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              letterSpacing: '0.2em',
              fontWeight: 700,
            }}
          >
            Optima Vendor Portal
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              maxWidth: 600,
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              lineHeight: 1.15,
              color: 'text.primary',
            }}
          >
            Welcome back !{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Mr. John
            </Box>
          </Typography>

          {/* <Typography
            fontSize={14}
            sx={{
              maxWidth: 500,
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            Hello , Mr John. Your current performance rating is 4.5{' '}
          </Typography> */}
        </Stack>
      </Box>

      {/* RIGHT */}
      {/* <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
            borderRadius: 3,
            p: '20px 22px',
            width: '100%',
            maxWidth: 340,
            animation: `${cardIn} 0.6s ease both`,
            boxShadow: `
              0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)},
              inset 0 1px 0 ${alpha(theme.palette.primary.main, 0.04)}
            `,
            bgcolor: 'background.paper',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25} mb={1.5}>
            <Box
              sx={{
                width: 30,
                height: 30,
                background: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GitHubIcon sx={{ fontSize: 17, color: 'primary.main' }} />
            </Box>

            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: 'text.primary',
                letterSpacing: 1,
              }}
            >
              OPTIMA
            </Typography>

            <Chip
              label="Completed"
              size="small"
              icon={<CheckCircleOutlineIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                ml: 'auto !important',
                background: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                fontWeight: 600,
                fontSize: 12,
                height: 24,
                borderRadius: 20,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Stack>

          <Box
            sx={{
              height: '1px',
              background: alpha(theme.palette.primary.main, 0.12),
              mb: 1.5,
            }}
          />

          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
              Deployed: 2026-01-01 23:22
            </Typography>

            <Typography sx={{ color: 'text.disabled', fontSize: 13 }}>·</Typography>

            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
              Branch:{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                main
              </Box>
            </Typography>

            <Box sx={{ ml: 'auto !important' }}>
              <OpenInNewIcon sx={{ fontSize: 13, color: 'primary.main' }} />
            </Box>
          </Stack>
        </Box>
      </Box> */}
    </Box>
  );
}
