import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Link,
  Stack,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LayersIcon from "@mui/icons-material/Layers";

const codeLines = [
  [<><span style={{color:"#7c5af0"}}>{"{"}</span></>, null],
  [null, <><span style={{color:"#1d9e75"}}>"vendor"</span><span style={{color:"#5a5a7a"}}>: </span><span style={{color:"#e8985e"}}>"Acme Supplies Ltd"</span><span style={{color:"#5a5a7a"}}>,</span></>],
  [null, <><span style={{color:"#1d9e75"}}>"po_number"</span><span style={{color:"#5a5a7a"}}>: </span><span style={{color:"#e8985e"}}>"PO-2024-0391"</span><span style={{color:"#5a5a7a"}}>,</span></>],
  [null, <><span style={{color:"#1d9e75"}}>"amount"</span><span style={{color:"#5a5a7a"}}>: </span><span style={{color:"#e8985e"}}>48500.00</span><span style={{color:"#5a5a7a"}}>,</span></>],
  [null, <><span style={{color:"#1d9e75"}}>"currency"</span><span style={{color:"#5a5a7a"}}>: </span><span style={{color:"#e8985e"}}>"USD"</span><span style={{color:"#5a5a7a"}}>,</span></>],
  [null, <><span style={{color:"#1d9e75"}}>"status"</span><span style={{color:"#5a5a7a"}}>: </span><span style={{color:"#e8985e"}}>"pending_approval"</span></>],
  [<><span style={{color:"#7c5af0"}}>{"}"}</span></>, null],
];

export default function ProcureToPayHero() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        position: "relative",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
        "&::before": {
          content: '""',
          position: "absolute",
          top: -60, right: -60,
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(99,75,232,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Left */}
      <Box sx={{ flex: 1, zIndex: 1 }}>
          <Stack spacing={2} maxWidth={720} sx={{ pb: 2, position: 'relative', zIndex: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.dark', letterSpacing: '0.2em' }}>
              Optima Procure-to-Pay
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
              From Purchase Request to Payment — All in One
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              Manage purchase requests, approvals, invoices, and payments in one simple platform
              with faster workflows and better visibility.
            </Typography>
          </Stack>

        <Link
          href="#"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "#7c5af0",
            fontWeight: 600,
            fontSize: 14,
            "&:hover svg": { transform: "translateX(3px)" },
            "& svg": { transition: "transform 0.2s" },
          }}
        >
          Watch the demo <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>

      {/* Right — Code Panel */}
      <Box sx={{ flex: "0 0 340px", position: "relative", zIndex: 1, width: { xs: "100%", md: 340 } }}>
        {/* Deploy button */}
        <Button
          variant="contained"
          startIcon={<LayersIcon />}
          sx={{
            position: "absolute",
            top: -18, right: -16,
            background: "#7c5af0",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 2,
            px: 2.5, py: 1.5,
            boxShadow: "0 4px 24px rgba(124,90,240,0.35)",
            textTransform: "none",
            zIndex: 10,
            "&:hover": { background: "#9070ff" },
          }}
        >
          Submit PO
        </Button>

        {/* Code Window */}
        <Box
          sx={{
            background: "#1a1a24",
            border: "0.5px solid rgba(255,255,255,0.10)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Window dots */}
          <Box sx={{ display: "flex", gap: 0.75, px: 1.75, py: 1.25, borderBottom: "0.5px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </Box>

          {/* Code lines */}
          <Box component="pre" sx={{ m: 0, p: "16px 18px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.8, color: "#9090aa" }}>
            {codeLines.map(([keyword, rest], i) => (
              <Box component="div" key={i}>
                <Box component="span" sx={{ color: "#3a3a52", mr: 1.5, userSelect: "none" }}>
                  {String(i + 1).padStart(2, "0")}
                </Box>
                {keyword}
                {rest && <Box component="span">&nbsp;&nbsp;{rest}</Box>}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}