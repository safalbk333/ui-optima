import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { CONFIG } from 'src/global-config';
import Typography from '@mui/material/Typography';
import { varAlpha } from 'minimal-shared/utils';

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
  method,
  methods,
  layoutQuery = 'md',
  title = 'Manage the job',
  imgUrl = `${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`,
  subtitle = 'OPTIMA PROCUR-TO-PAY',
  ...other
}: AuthSplitSectionProps) {
  return (
<Box
  sx={[
    (theme) => ({
      backgroundColor: theme.vars.palette.primary.main,
      px: 3,
      pb: 3,
      width: 1,
      maxWidth: 480,
      display: 'none',
      position: 'relative',
      pt: 'var(--layout-header-desktop-height)',
      [theme.breakpoints.up(layoutQuery)]: {
        gap: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    }),
    ...(Array.isArray(sx) ? sx : [sx]),
  ]}
  {...other}
>
      <div>
        <Typography variant="h3" sx={{ textAlign: 'center',color:'#fff' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: '#fff',fontSize:13, textAlign: 'center', mt: 1,letterSpacing:0.5 }}>
            {subtitle}
          </Typography>
        )}
      </div>

      {/* <Box
        component="img"
        alt="Dashboard illustration"
        src={imgUrl}
        sx={{ width: 1, aspectRatio: '4/3', objectFit: 'cover' }}
      /> */}
    </Box>
  );
}
