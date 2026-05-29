import Box from '@mui/material/Box';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const STATS = [
  { value: '140+', label: 'Countries' },
  { value: '$2.4T', label: 'Assets Managed' },
  { value: '6,800', label: 'Professionals' },
  { value: '1952', label: 'Founded' },
];

export default function OptimaLandingPage() {
  const theme = useTheme();

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: 'transparent',
        color: '#161A1D',
        overflowX: 'hidden',
        marginTop: -62,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: 'transparent';
        }



        .btn-primary {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: ${theme.palette.primary.main};
          color: #FFFFFF;
          border: none;
          padding: 14px 36px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .btn-primary:hover {
          background: ${theme.palette.primary.dark};
          transform: translateY(-2px);
        }

        .btn-outline {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: transparent;
          color: #161A1D;
          border: 1px solid rgba(22,26,29,0.2);
          padding: 13px 36px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          border-color: #161A1D;
          background: rgba(22,26,29,0.04);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(42px, 11vw, 88px) !important;
          }

          .cards-grid {
            grid-template-columns: 1fr !important;
          }

          .shipment-grid {
            grid-template-columns: 1fr !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .hero-content {
            padding: 0 24px 64px !important;
          }
        }
      `}</style>

      <section style={{ background: 'transparent' }}>
        <div
          style={{
            // borderTop: `1px solid ${theme.palette.primary.main}25`,
            borderBottom: `1px solid ${theme.palette.primary.main}25`,
          }}
        >
          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
            }}
          >
            {STATS.map((s, i) => (
              <Box
                key={i}
                sx={{
                  p: '60px 48px',
                  borderRight: i < 3 ? `1px solid ${theme.palette.primary.main}20` : 'none',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    lineHeight: 1,
                    mb: 1.5,
                  }}
                >
                  {s.value}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                    opacity: 0.7,
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </div>
        </div>
      </section>
      {/* <DeliveryTracking /> */}
      {/* CARDS */}
      {/* <section style={{ background: '#FFFFFF' }}>
        <div
          style={{
            borderTop: `1px solid ${theme.palette.primary.main}18`,
            borderBottom: `1px solid ${theme.palette.primary.main}18`,
          }}
        >
          <div
            className="cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
            }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  padding: '34px 28px',
                  borderRight:
                    i < cards.length - 1 ? `1px solid ${theme.palette.primary.main}12` : 'none',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: `${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                    marginBottom: 18,
                  }}
                >
                  {card.icon}
                </div>

                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                    lineHeight: 1.12,
                    mb: 1,
                    maxWidth: 420,
                    letterSpacing: 1,
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 14,
                    color: '#6B7280',
                    lineHeight: 1.7,
                    maxWidth: 430,
                    mb: 2.5,
                  }}
                >
                  {card.desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
