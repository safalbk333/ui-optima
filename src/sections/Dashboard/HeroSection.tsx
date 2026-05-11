import { keyframes } from '@mui/system';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-12px) rotate(1deg); }
  66%       { transform: translateY(-6px) rotate(-1deg); }
`;
const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(2deg); }
`;
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;
const glowPulse = keyframes`
  0%, 100% { opacity: .18; filter: blur(60px); }
  50%       { opacity: .32; filter: blur(80px); }
`;
const lineGrow = keyframes`
  from { width: 0; opacity: 0; }
  to   { width: 72px; opacity: 1; }
`;
const textReveal = keyframes`
  from { opacity: 0; transform: translateY(32px) skewY(2deg); }
  to   { opacity: 1; transform: translateY(0) skewY(0deg); }
`;
const cardFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-8px) rotate(-1deg); }
`;
const cardFloat2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(1.5deg); }
  50%       { transform: translateY(-10px) rotate(1.5deg); }
`;
const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

function MetricCard({ label, value, sub, color, top, left, right, delay, anim }: any) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top,
        left,
        right,
        bgcolor: alpha(theme.palette.background.paper, 0.82),
        backdropFilter: 'blur(16px)',
        border: `1px solid ${alpha(theme.palette.common.white, 0.9)}`,
        borderRadius: '16px',
        px: 2.5,
        py: 2,
        minWidth: 160,
        boxShadow: `${theme.shadows[2]}, ${theme.shadows[1]}`,
        animation: `${anim ?? cardFloat} 4s ${delay ?? '0s'} ease-in-out infinite, ${countUp} .6s ${delay ?? '0s'} ease both`,
        opacity: 0,
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 8px ${color}80` }} />
        <Typography sx={{ fontSize: 11, color: 'text.secondary', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</Typography>
      </Box>
      <Typography sx={{ fontSize: 22, fontWeight: 800, color: 'text.primary', fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.4 }}>{sub}</Typography>
    </Box>
  );
}

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: -2,
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        placeItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, animation: `${fadeIn} 1.2s ease both` }}>
        <Box sx={{ position: 'absolute', inset: 0 }} />
        <Box sx={{ position: 'absolute', inset: 0 }} />
        <Box sx={{ position: 'absolute', top: '8%', left: '18%', width: 420, height: 420, borderRadius: '50%', animation: `${glowPulse} 5s ease-in-out infinite` }} />
        <Box sx={{ position: 'absolute', bottom: '10%', right: '14%', width: 360, height: 360, borderRadius: '50%', animation: `${glowPulse} 6s 1.5s ease-in-out infinite` }} />
        <Box sx={{ position: 'absolute', top: '40%', right: '30%', width: 200, height: 200, borderRadius: '50%', animation: `${glowPulse} 7s 3s ease-in-out infinite` }} />
      </Box>

      <Box sx={{ position: 'absolute', top: '15%', left: '8%', width: 56, height: 56, borderRadius: '14px', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, animation: `${float} 6s ease-in-out infinite`, zIndex: 1, backdropFilter: 'blur(4px)' }} />
      <Box sx={{ position: 'absolute', bottom: '22%', left: '12%', width: 36, height: 36, borderRadius: '50%', border: `1px solid ${alpha(theme.palette.warning.main, 0.25)}`, animation: `${floatSlow} 8s 1s ease-in-out infinite`, zIndex: 1 }} />
      <Box sx={{ position: 'absolute', top: '20%', right: '9%', width: 44, height: 44, border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`, clipPath: 'polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)', animation: `${float} 7s 2s ease-in-out infinite`, zIndex: 1 }} />
      <Box sx={{ position: 'absolute', bottom: '18%', right: '11%', width: 28, height: 28, border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`, transform: 'rotate(45deg)', animation: `${floatSlow} 5s 3s ease-in-out infinite`, zIndex: 1 }} />

      <MetricCard label="POs Pending" value="34" sub="Needs approval today" color={theme.palette.warning.main} top="58%" left="2%" delay="1.1s" anim={cardFloat2} />
      <MetricCard label="Invoices Due" value="$612K" sub="Next 7 days" color={theme.palette.secondary.main} top="62%" right="2%" delay="1.2s" anim={cardFloat2} />

      <Box sx={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: 900, mt: -3 }}>
        <Box sx={{ overflow: 'hidden', mb: '.5rem', textAlign: 'center' }}>
          <Typography component="h1" sx={{ fontFamily: "'Syne', sans-serif", fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.6rem' }, fontWeight: 800, color: 'text.primary', textAlign: 'center', lineHeight: 1.06, letterSpacing: '-3px', animation: `${textReveal} .8s .3s cubic-bezier(.16,1,.3,1) both`, opacity: 0 }}>
            Optima{' '}
            <Box component="span" sx={{ backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: `${shimmer} 4s linear infinite` }}>
              Procure
            </Box>
          </Typography>
        </Box>

        <Box sx={{ overflow: 'hidden', mb: '1rem', textAlign: 'center' }}>
          <Typography component="h1" sx={{ fontFamily: "'Syne', sans-serif", fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.6rem' }, fontWeight: 800, color: 'text.primary', textAlign: 'center', lineHeight: 1.06, letterSpacing: '-3px', animation: `${textReveal} .8s .45s cubic-bezier(.16,1,.3,1) both`, opacity: 0 }}>
            Exceeds{' '}
            <Box component="span" sx={{ position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: 4, left: 0, height: '4px', borderRadius: '4px', background: `linear-gradient(90deg,${theme.palette.primary.main},${theme.palette.secondary.main})`, animation: `${lineGrow} .8s 1.2s ease both`, opacity: 0, width: '0%' } }}>
              Expectations
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, animation: `${fadeUp} .7s .65s ease both`, opacity: 0, mb: '1.4rem' }}>
          <Box sx={{ height: 1, width: 36, bgcolor: 'divider', borderRadius: 2 }} />
          <Typography sx={{ fontSize: 13, color: 'text.secondary', letterSpacing: '.04em' }}>Good morning, Ajith 👋</Typography>
          <Box sx={{ height: 1, width: 36, bgcolor: 'divider', borderRadius: 2 }} />
        </Box>

        <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary', textAlign: 'center', maxWidth: 520, lineHeight: 1.8, fontWeight: 300, animation: `${fadeUp} .7s .75s ease both`, opacity: 0, mb: '2.4rem' }}>
          Manage your complete <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>Procure-to-Pay lifecycle</Box>{' '}
          - from requisitions to supplier payments - with real-time visibility into spend, approvals, and financial impact.
        </Typography>

        <Box sx={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', animation: `${fadeUp} .7s .9s ease both`, opacity: 0 }}>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.6,
              borderRadius: '10px',
              background: `linear-gradient(135deg,${theme.palette.primary.main},${theme.palette.primary.dark})`,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              letterSpacing: '.01em',
              boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.15)}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(135deg,${alpha(theme.palette.common.white, 0.08)},transparent)` },
              '&:hover': { boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`, transform: 'translateY(-2px)' },
              transition: 'transform .2s, box-shadow .2s',
            }}
          >
            Get Started →
          </Button>

          <Button
            variant="outlined"
            sx={{
              px: 3.5,
              py: 1.6,
              borderRadius: '10px',
              borderColor: 'divider',
              color: 'text.secondary',
              fontSize: 14,
              fontWeight: 400,
              textTransform: 'none',
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(8px)',
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.95),
                borderColor: 'divider',
                color: 'text.primary',
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.08)}`,
              },
              transition: 'transform .2s, box-shadow .2s',
            }}
          >
            ▶
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 6 }} />
    </Box>
  );
}