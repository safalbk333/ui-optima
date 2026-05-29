import { Box, Typography } from '@mui/material';

const imageUrl =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop';

export default function OptmaHero() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f3f3f3',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
      }}
    >
      {/* Left Text */}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          left: 60,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 4,
          color: '#111',
          lineHeight: 1.8,
        }}
      >
        <div>SUNDAY</div>
        <div>PROCURE</div>
        <div>2026</div>
      </Box>

      {/* Right Text */}
      <Typography
        sx={{
          position: 'absolute',
          top: 80,
          right: 70,
          textAlign: 'right',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 3,
          color: '#111',
          lineHeight: 1.7,
        }}
      >
        DIGITAL
        <br />
        PROCUREMENT
        <br />
        EXPERIENCE
      </Typography>

      {/* OPTMA TEXT */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: { xs: '8px', md: '14px' },
          position: 'relative',
        }}
      >
        {'OPTMA'.split('').map((letter, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: { xs: 55, md: 95 },
              height: { xs: 280, md: 430 },
              overflow: 'hidden',
              boxShadow: '18px 18px 18px rgba(0,0,0,0.28)',
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1,
            }}
          >
            {/* Dark Overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))',
              }}
            />

            {/* BIG LETTER */}
            <Typography
              sx={{
                position: 'absolute',
                top: -40,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: { xs: 120, md: 210 },
                fontWeight: 900,
                lineHeight: 1,
                color: 'white',
                mixBlendMode: 'screen',
                textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {letter}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(64,106,175,0.12)',
          filter: 'blur(100px)',
          bottom: -220,
          right: -100,
        }}
      />
    </Box>
  );
}