import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type AuthSplitSectionProps = BoxProps & {
  title?: string;
  method?: string;
  imgUrl?: string;
  subtitle?: string;
  layoutQuery?: Breakpoint;
  methods?: {
    path: string;
    icon: string;
    label: string;
  }[];
};

export function AuthSplitSection({
  sx,
  layoutQuery = 'md',
  title = 'OPTIMA P2P',
  subtitle = 'Streamline procurement, vendor collaboration, RFQ management, approvals, and payment workflows in one unified Procure-to-Pay platform.',
  ...other
}: AuthSplitSectionProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          position: 'relative',
          overflow: 'hidden',
          width: 1,
          maxWidth: 520,
          display: 'none',
          px: 6,
          py: 8,

          background: `
            linear-gradient(
              135deg,
              #071B2A 0%,
              #0B2440 35%,
              #12385B 100%
            )
          `,

          [theme.breakpoints.up(layoutQuery)]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            top: -180,
            right: -120,
            background: alpha('#3B82F6', 0.18),
            filter: 'blur(20px)',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            bottom: -140,
            left: -100,
            background: alpha('#06B6D4', 0.14),
            filter: 'blur(20px)',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Stack
        spacing={5}
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Logo / Brand */}
        <Stack spacing={2}>
          <Typography
            variant="overline"
            sx={{
              color: '#38BDF8',
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            PROCUREMENT PLATFORM
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: 'common.white',
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 420,
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
