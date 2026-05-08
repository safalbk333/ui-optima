'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function P2PFlowGraph() {
  return (
    <Box sx={{ fontFamily: 'var(--font-sans)' }}>
      <style>{`
        @keyframes p2p-flow { to { stroke-dashoffset: -28; } }
        @keyframes p2p-fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes p2p-ripple { 0%,100%{r:5;opacity:.9} 60%{r:9;opacity:0} }
        .p2p-fl { stroke-dasharray:6 5; animation:p2p-flow 1.6s linear infinite; }
        .p2p-rp { animation:p2p-ripple 2.4s ease-out infinite; }
        .p2p-nd { cursor:pointer; transition:opacity .15s; }
        .p2p-nd:hover { opacity:.88; }
      `}</style>

      <Box
        sx={{
          //   background: 'rgba(0,0,0,0.03)',
          borderRadius: '16px',
          padding: '20px 16px 16px',
        }}
      >
        <Typography
          sx={{
            margin: '0 0 16px',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '.14em',
            color: '#7F77DD',
            textAlign: 'center',
          }}
        >
          PROCURE · TO · PAY
        </Typography>

        <svg
          width="100%"
          viewBox="0 0 620 390"
          role="img"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <title>Procure-to-pay lifecycle</title>
          <desc>
            Six-node flow: purchase request, approval, purchase order, goods receipt, invoice
            matching, vendor payment
          </desc>

          <defs>
            <marker
              id="p2p-mp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M1 2L9 5L1 8"
                fill="none"
                stroke="#AFA9EC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id="p2p-mt"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M1 2L9 5L1 8"
                fill="none"
                stroke="#5DCAA5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* ── EDGES ── */}
          <line
            x1="200"
            y1="68"
            x2="248"
            y2="68"
            stroke="#AFA9EC"
            strokeWidth="1.5"
            className="p2p-fl"
            markerEnd="url(#p2p-mp)"
            style={{ animationDelay: '0s' }}
          />
          <line
            x1="360"
            y1="100"
            x2="360"
            y2="148"
            stroke="#AFA9EC"
            strokeWidth="1.5"
            className="p2p-fl"
            markerEnd="url(#p2p-mp)"
            style={{ animationDelay: '.2s' }}
          />
          <line
            x1="272"
            y1="188"
            x2="224"
            y2="188"
            stroke="#5DCAA5"
            strokeWidth="1.5"
            className="p2p-fl"
            markerEnd="url(#p2p-mt)"
            style={{ animationDelay: '.4s' }}
          />
          <line
            x1="104"
            y1="220"
            x2="104"
            y2="268"
            stroke="#5DCAA5"
            strokeWidth="1.5"
            className="p2p-fl"
            markerEnd="url(#p2p-mt)"
            style={{ animationDelay: '.6s' }}
          />
          <line
            x1="200"
            y1="308"
            x2="248"
            y2="308"
            stroke="#1D9E75"
            strokeWidth="1.8"
            className="p2p-fl"
            markerEnd="url(#p2p-mt)"
            style={{ animationDelay: '.8s' }}
          />
          <path
            d="M408 188 Q460 188 460 308 L408 308"
            fill="none"
            stroke="#AFA9EC"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="p2p-fl"
            markerEnd="url(#p2p-mp)"
            style={{ animationDelay: '.5s', opacity: 0.4 }}
          />

          {/* ripple dots */}
          <circle cx="200" cy="68" r="5" fill="#7F77DD" className="p2p-rp" />
          <circle
            cx="360"
            cy="100"
            r="5"
            fill="#534AB7"
            className="p2p-rp"
            style={{ animationDelay: '.25s' }}
          />
          <circle
            cx="272"
            cy="188"
            r="5"
            fill="#1D9E75"
            className="p2p-rp"
            style={{ animationDelay: '.5s' }}
          />
          <circle
            cx="104"
            cy="220"
            r="5"
            fill="#1D9E75"
            className="p2p-rp"
            style={{ animationDelay: '.75s' }}
          />
          <circle
            cx="200"
            cy="308"
            r="5"
            fill="#7F77DD"
            className="p2p-rp"
            style={{ animationDelay: '1s' }}
          />

          {/* ── NODE 1 — Purchase request ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease 0s both' }}
            onClick={() => {}}
          >
            <rect
              x="8"
              y="28"
              width="192"
              height="80"
              rx="14"
              fill="#EEEDFE"
              stroke="#AFA9EC"
              strokeWidth="0.5"
            />
            <rect x="20" y="36" width="44" height="17" rx="8.5" fill="#7F77DD" />
            <text
              x="42"
              y="48.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#EEEDFE"
              fontFamily="var(--font-sans)"
            >
              Step 1
            </text>
            <circle cx="179" cy="52" r="18" fill="#7F77DD" fillOpacity=".1" />
            <rect
              x="171"
              y="45"
              width="14"
              height="16"
              rx="2"
              fill="none"
              stroke="#534AB7"
              strokeWidth="1.4"
            />
            <line
              x1="174"
              y1="50"
              x2="182"
              y2="50"
              stroke="#534AB7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="174"
              y1="54"
              x2="182"
              y2="54"
              stroke="#534AB7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="174"
              y1="58"
              x2="178"
              y2="58"
              stroke="#534AB7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <text
              x="22"
              y="76"
              fontSize="12.5"
              fontWeight="500"
              fill="#3C3489"
              fontFamily="var(--font-sans)"
            >
              Purchase request
            </text>
            <text x="22" y="94" fontSize="11" fill="#534AB7" fontFamily="var(--font-sans)">
              Create &amp; track PRs
            </text>
          </g>

          {/* ── NODE 2 — Approval ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease .07s both' }}
            onClick={() => {}}
          >
            <rect
              x="248"
              y="28"
              width="192"
              height="80"
              rx="14"
              fill="#EEEDFE"
              stroke="#AFA9EC"
              strokeWidth="0.5"
            />
            <rect x="260" y="36" width="44" height="17" rx="8.5" fill="#534AB7" />
            <text
              x="282"
              y="48.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#EEEDFE"
              fontFamily="var(--font-sans)"
            >
              Step 2
            </text>
            <circle cx="419" cy="52" r="18" fill="#534AB7" fillOpacity=".1" />
            <path
              d="M410 52l5 5.5 10-11"
              fill="none"
              stroke="#534AB7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="262"
              y="76"
              fontSize="12.5"
              fontWeight="500"
              fill="#3C3489"
              fontFamily="var(--font-sans)"
            >
              Approval workflow
            </text>
            <text x="262" y="94" fontSize="11" fill="#534AB7" fontFamily="var(--font-sans)">
              Multi-level sign-off
            </text>
          </g>

          {/* ── NODE 3 — Purchase Order ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease .14s both' }}
            onClick={() => {}}
          >
            <rect
              x="248"
              y="148"
              width="192"
              height="80"
              rx="14"
              fill="#E1F5EE"
              stroke="#5DCAA5"
              strokeWidth="0.5"
            />
            <rect x="260" y="156" width="44" height="17" rx="8.5" fill="#1D9E75" />
            <text
              x="282"
              y="168.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#E1F5EE"
              fontFamily="var(--font-sans)"
            >
              Step 3
            </text>
            <circle cx="419" cy="172" r="18" fill="#1D9E75" fillOpacity=".1" />
            <rect
              x="410"
              y="163"
              width="17"
              height="20"
              rx="2.5"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="1.4"
            />
            <line
              x1="413"
              y1="169"
              x2="423"
              y2="169"
              stroke="#0F6E56"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="413"
              y1="174"
              x2="423"
              y2="174"
              stroke="#0F6E56"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="413"
              y1="179"
              x2="418"
              y2="179"
              stroke="#0F6E56"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <text
              x="262"
              y="196"
              fontSize="12.5"
              fontWeight="500"
              fill="#085041"
              fontFamily="var(--font-sans)"
            >
              Purchase order
            </text>
            <text x="262" y="214" fontSize="11" fill="#0F6E56" fontFamily="var(--font-sans)">
              Auto-generated PO
            </text>
          </g>

          {/* ── NODE 4 — Goods Receipt ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease .21s both' }}
            onClick={() => {}}
          >
            <rect
              x="8"
              y="148"
              width="192"
              height="80"
              rx="14"
              fill="#E1F5EE"
              stroke="#5DCAA5"
              strokeWidth="0.5"
            />
            <rect x="20" y="156" width="44" height="17" rx="8.5" fill="#1D9E75" />
            <text
              x="42"
              y="168.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#E1F5EE"
              fontFamily="var(--font-sans)"
            >
              Step 4
            </text>
            <circle cx="179" cy="172" r="18" fill="#1D9E75" fillOpacity=".1" />
            <rect
              x="169"
              y="163"
              width="18"
              height="18"
              rx="3"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="1.4"
            />
            <path
              d="M163 169h6M187 169h6"
              stroke="#0F6E56"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M172 174l3 3 6-6"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="22"
              y="196"
              fontSize="12.5"
              fontWeight="500"
              fill="#085041"
              fontFamily="var(--font-sans)"
            >
              Goods receipt
            </text>
            <text x="22" y="214" fontSize="11" fill="#0F6E56" fontFamily="var(--font-sans)">
              3-way PO matching
            </text>
          </g>

          {/* ── NODE 5 — Invoice ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease .28s both' }}
            onClick={() => {}}
          >
            <rect
              x="8"
              y="268"
              width="192"
              height="80"
              rx="14"
              fill="#EEEDFE"
              stroke="#AFA9EC"
              strokeWidth="0.5"
            />
            <rect x="20" y="276" width="44" height="17" rx="8.5" fill="#7F77DD" />
            <text
              x="42"
              y="288.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#EEEDFE"
              fontFamily="var(--font-sans)"
            >
              Step 5
            </text>
            <circle cx="179" cy="292" r="18" fill="#7F77DD" fillOpacity=".1" />
            <rect
              x="170"
              y="282"
              width="16"
              height="20"
              rx="2.5"
              fill="none"
              stroke="#534AB7"
              strokeWidth="1.4"
            />
            <line
              x1="173"
              y1="288"
              x2="183"
              y2="288"
              stroke="#534AB7"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <line
              x1="173"
              y1="293"
              x2="183"
              y2="293"
              stroke="#534AB7"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <line
              x1="173"
              y1="298"
              x2="178"
              y2="298"
              stroke="#534AB7"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <text
              x="22"
              y="316"
              fontSize="12.5"
              fontWeight="500"
              fill="#3C3489"
              fontFamily="var(--font-sans)"
            >
              Invoice matching
            </text>
            <text x="22" y="334" fontSize="11" fill="#534AB7" fontFamily="var(--font-sans)">
              Auto-validate &amp; post
            </text>
          </g>

          {/* ── NODE 6 — Vendor Payment (featured) ── */}
          <g
            className="p2p-nd"
            style={{ animation: 'p2p-fadeUp .45s ease .35s both' }}
            onClick={() => {}}
          >
            <rect
              x="248"
              y="268"
              width="192"
              height="80"
              rx="14"
              fill="#1D9E75"
              stroke="#0F6E56"
              strokeWidth="1"
            />
            <rect x="260" y="276" width="44" height="17" rx="8.5" fill="#085041" />
            <text
              x="282"
              y="288.5"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="500"
              fill="#9FE1CB"
              fontFamily="var(--font-sans)"
            >
              Step 6
            </text>
            <circle cx="419" cy="292" r="18" fill="#085041" fillOpacity=".35" />
            <rect
              x="409"
              y="283"
              width="20"
              height="14"
              rx="3"
              fill="none"
              stroke="#9FE1CB"
              strokeWidth="1.5"
            />
            <line
              x1="409"
              y1="288"
              x2="429"
              y2="288"
              stroke="#9FE1CB"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <rect x="411" y="291" width="5" height="3" rx="1.5" fill="#9FE1CB" />
            <text
              x="262"
              y="316"
              fontSize="12.5"
              fontWeight="500"
              fill="#E1F5EE"
              fontFamily="var(--font-sans)"
            >
              Vendor payment
            </text>
            <text x="262" y="334" fontSize="11" fill="#9FE1CB" fontFamily="var(--font-sans)">
              Full visibility &amp; audit
            </text>
          </g>
        </svg>

        {/* ── Analytics bar ── */}
        <Box
          sx={{
            mt: '12px',
            background: 'var(--mui-palette-background-paper, #fff)',
            borderRadius: '10px',
            border: '0.5px solid rgba(0,0,0,0.1)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <svg width="36" height="28" viewBox="0 0 36 28" style={{ flexShrink: 0 }}>
            <rect x="0" y="8" width="6" height="20" rx="2" fill="#7F77DD" />
            <rect x="8" y="14" width="6" height="14" rx="2" fill="#7F77DD" fillOpacity=".55" />
            <rect x="16" y="4" width="6" height="24" rx="2" fill="#7F77DD" fillOpacity=".35" />
            <rect x="24" y="18" width="6" height="10" rx="2" fill="#7F77DD" fillOpacity=".5" />
            <rect x="32" y="11" width="4" height="17" rx="2" fill="#7F77DD" fillOpacity=".4" />
          </svg>

          <Box>
            <Typography sx={{ fontSize: '12.5px', fontWeight: 500, mb: '2px' }}>
              Analytics &amp; reporting
            </Typography>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
              Real-time spend visibility across all stages
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
