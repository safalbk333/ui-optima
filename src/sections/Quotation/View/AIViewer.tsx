import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

// ─── Theme ───────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#185FA5" },
    success: { main: "#0F6E56" },
    secondary: { main: "#534AB7" },
    background: { default: "#F1EFE8", paper: "#FFFFFF" },
    text: { primary: "#2C2C2A", secondary: "#5F5E5A" },
  },
  typography: {
    fontFamily: "'Syne', 'Inter', sans-serif",
    h6: { fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase" },
    body2: { fontSize: "0.75rem" },
    caption: { fontSize: "0.68rem" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontFamily: "'Syne', 'Inter', sans-serif", fontWeight: 500, fontSize: "0.75rem" },
      },
    },
    MuiChip: { styleOverrides: { root: { fontFamily: "'Syne', 'Inter', sans-serif", fontWeight: 500 } } },
    MuiLinearProgress: { styleOverrides: { root: { borderRadius: 4, height: 4 } } },
  },
});

// ─── Data ────────────────────────────────────────────────────────────────────
const lineItems = [
  { name: "Cloud Storage (1 TB)", qty: "×1", price: "$480.00" },
  { name: "AI API Access · Pro", qty: "×1", price: "$1,200.00" },
  { name: "Onboarding Setup", qty: "×1", price: "$350.00" },
  { name: "Support Retainer", qty: "×1/mo", price: "$600.00" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated scan line + highlight for the laptop screen */
// function LaptopScreen() {
//   return (
//     <Box
//       sx={{
//         bgcolor: "background.paper",
//         borderRadius: "4px",
//         overflow: "hidden",
//         border: "0.5px solid",
//         borderColor: "divider",
// height: "100%",
// flex: 1,        display: "flex",
//         flexDirection: "column",
//         position: "relative",
//       }}
//     >
//       {/* Fake toolbar */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.5, py: 0.8, bgcolor: "#F1EFE8", borderBottom: "0.5px solid", borderColor: "divider" }}>
//         {["#E24B4A", "#EF9F27", "#639922"].map((c) => (
//           <Box key={c} sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: c }} />
//         ))}
//         <Typography variant="caption" sx={{ ml: 0.5, color: "text.secondary", fontFamily: "monospace" }}>
//           quotation_INV-2024-0847.pdf
//         </Typography>
//       </Box>

//       {/* PDF mock content */}
//       <Box sx={{ flex: 1, px: 1.5, py: 1, overflow: "hidden" }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//             <Box sx={{ width: 22, height: 14, bgcolor: "primary.main", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <Typography sx={{ fontSize: "7px", color: "white", fontWeight: 600 }}>Q</Typography>
//             </Box>
//             <Typography sx={{ fontSize: "8px", fontWeight: 600 }}>Nexus Systems Pte. Ltd.</Typography>
//           </Box>
//           <Typography sx={{ fontSize: "8px", color: "text.secondary" }}>QUOTATION</Typography>
//         </Box>
//         <Divider sx={{ my: 0.5 }} />

//         <Typography sx={{ fontSize: "7px", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>Line items</Typography>

//         <Table size="small" sx={{ "& td": { p: "2px 0", border: "none", borderBottom: "0.5px solid", borderColor: "divider" } }}>
//           <TableBody>
//             {[
//               ["Cloud Storage (1TB)", "$480.00"],
//               ["AI API Access · Pro", "$1,200.00"],
//               ["Onboarding Setup", "$350.00"],
//               ["Support Retainer", "$600.00"],
//               ["Total (incl. GST)", "$2,838.60"],
//             ].map(([label, val], i) => (
//               <TableRow key={label}>
//                 <TableCell sx={{ fontSize: "7px", color: i === 4 ? "text.primary" : "text.secondary", fontWeight: i === 4 ? 600 : 400 }}>{label}</TableCell>
//                 <TableCell align="right" sx={{ fontSize: "7px", fontWeight: 600, color: i === 4 ? "#185FA5" : "text.primary" }}>{val}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Scan line animation */}
//         <Box
//           sx={{
//             position: "absolute",
//             left: 12,
//             right: 12,
//             height: 1,
//             background: "linear-gradient(90deg, transparent, #378ADD, transparent)",
//             animation: "scan 3s ease-in-out infinite",
//             "@keyframes scan": {
//               "0%": { top: 20, opacity: 0 },
//               "10%": { opacity: 0.7 },
//               "90%": { opacity: 0.7 },
//               "100%": { top: 195, opacity: 0 },
//             },
//           }}
//         />
//         {/* Highlight bar */}
//         <Box
//           sx={{
//             position: "absolute",
//             left: 12,
//             right: 12,
//             height: 12,
//             bottom: 26,
//             bgcolor: alpha("#378ADD", 0.12),
//             borderRadius: "2px",
//             borderLeft: "2px solid #378ADD",
//             animation: "pulse 2s ease-in-out infinite",
//             "@keyframes pulse": {
//               "0%, 100%": { opacity: 0.6 },
//               "50%": { opacity: 1 },
//             },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }

// function LaptopScreen() {
//   const pdfUrl =
//     "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         borderRadius: "4px",
//         overflow: "hidden",
//         border: "0.5px solid",
//         borderColor: "divider",
//       }}
//     >
//       <iframe
//         src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
//           pdfUrl
//         )}`}
//         style={{
//           width: "100%",
//           height: "100%",
//           border: "none",
//         }}
//       />
//     </Box>
//   );
// }
function LaptopScreen() {
  const pdfUrl = "/dell-pro-14-16-laptop-product-brochure.pdf";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        border: "0.5px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <iframe
        src={pdfUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </Box>
  );
}
/** Section card with icon header */
function SectionCard({ icon, title, children }:any) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 0, overflow: "hidden", border: "0.5px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1,borderBottom: "0.5px solid", borderColor: "divider" }}>
        {icon}
        <Typography variant="h6" sx={{ color: "text.secondary" }}>{title}</Typography>
      </Box>
      {children}
    </Paper>
  );
}

/** Key-value row */
function KVRow({ label, children, last }:any) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.6, borderBottom: last ? "none" : "0.5px solid", borderColor: "divider", gap: 1 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", flexShrink: 0 }}>{label}</Typography>
      {children}
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function QuotationViewer() {
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    let v = 0;
    const interval = setInterval(() => {
      v = Math.min(v + 2, 97);
      setConfidence(v);
      if (v >= 97) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", fontFamily: "'Syne', sans-serif",mb:2 }}>
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "0.5px solid",
            borderColor: "divider",
            borderRadius: 0,
            overflow: "hidden",
            minHeight: 680,
          }}
        >
          {/* ── LEFT: PDF Preview ── */}
{/* ── LEFT: PDF Preview (FULL FILL) ── */}
<Box
  sx={{
    borderRight: "0.5px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  }}
>

  {/* FULL WIDTH/FULL HEIGHT PREVIEW AREA */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      p: 0,
    }}
  >
    {/* Laptop wrapper now fills space */}
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Screen */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          borderRadius: "10px 10px 0 0",
          p: 1,
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <LaptopScreen />
        </Box>
      </Box>

      {/* Base */}
      <Box
        sx={{
          width: "100%",
          height: 10,
          bgcolor: "#444441",
          borderRadius: "0 0 6px 6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          pb: "2px",
        }}
      >
        <Box sx={{ width: 60, height: 4, bgcolor: "#5F5E5A", borderRadius: 1 }} />
      </Box>
    </Box>
  </Box>

  {/* Footer stays same */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 2,
      py: 1.25,
      borderTop: "0.5px solid",
      borderColor: "divider",
    }}
  >
    <InsertDriveFileOutlinedIcon sx={{ color: "primary.main", fontSize: 18 }} />
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
        quotation_INV-2024-0847.pdf
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        284 KB · 3 pages
      </Typography>
    </Box>
  </Box>
</Box>

          {/* ── RIGHT: AI Summary ── */}
          <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
            {/* AI header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: "0.5px solid", borderColor: "divider" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                <Typography variant="h6" sx={{ color: "text.secondary" }}>AI extracted summary</Typography>
              </Box>
            </Box>

            {/* Scrollable body */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>

              {/* Confidence bar */}
              <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 0, }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary", flexShrink: 0 }}>Extraction confidence</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={confidence}
                    sx={{ flex: 1, "& .MuiLinearProgress-bar": { bgcolor: "#1D9E75", transition: "transform 0.05s linear" } }}
                  />
                  <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600, minWidth: 32, textAlign: "right" }}>
                    {confidence}%
                  </Typography>
                </Box>
              </Paper>

              {/* Parties */}
              <SectionCard icon={<BusinessOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />} title="Parties">
                <Box sx={{ px: 1.5, py: 0.5 }}>
                  {[
                    { label: "Vendor", value: "Nexus Systems Pte. Ltd.", chip: true, chipColor: { bgcolor: "#E6F1FB", color: "#185FA5" } },
                    { label: "Bill to", value: "Horizon Tech Corp." },
                    { label: "Quote no.", value: "INV-2024-0847", highlight: true },
                    { label: "Issue date", value: "14 Nov 2024", chip: true, chipColor: { bgcolor: "#E1F5EE", color: "#0F6E56" } },
                    { label: "Valid until", value: "14 Dec 2024", chip: true, chipColor: { bgcolor: "#EEEDFE", color: "#3C3489" } },
                  ].map(({ label, value, chip, chipColor, highlight }, i, arr) => (
                    <KVRow key={label} label={label} last={i === arr.length - 1}>
                      {chip ? (
                        <Chip label={value} size="small" sx={{ height: 20, fontSize: "0.68rem", ...chipColor }} />
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: 500, color: highlight ? "primary.main" : "text.primary", textAlign: "right" }}>
                          {value}
                        </Typography>
                      )}
                    </KVRow>
                  ))}
                </Box>
              </SectionCard>

              {/* Line items */}
              <SectionCard icon={<ListAltOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />} title="Line items">
                <Box sx={{ px: 1.5, py: 0.5 }}>
                  {lineItems.map(({ name, qty, price }, i) => (
                    <Box
                      key={name}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gap: 1,
                        alignItems: "center",
                        py: 0.7,
                        borderBottom: i < lineItems.length - 1 ? "0.5px solid" : "none",
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="body2">{name}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace" }}>{qty}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: "monospace", textAlign: "right" }}>{price}</Typography>
                    </Box>
                  ))}
                </Box>
                {/* Totals */}
                <Box sx={{ px: 1.5, py: 1, bgcolor: "background.default", borderTop: "0.5px solid", borderColor: "divider" }}>
                  {[
                    { label: "Subtotal", val: "$2,630.00" },
                    { label: "GST 8%", val: "$208.60" },
                  ].map(({ label, val }) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", py: 0.3 }}>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{label}</Typography>
                      <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{val}</Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 0.75 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>Total</Typography>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "monospace", color: "success.main" }}>$2,838.60</Typography>
                  </Box>
                </Box>
              </SectionCard>

              {/* Terms */}
              <SectionCard icon={<NoteAltOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />} title="Terms & notes">
                <Box sx={{ px: 1.5, py: 1 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    Payment due within 30 days of acceptance. Wire transfer preferred. Late payments subject to 1.5% monthly interest. Quote valid for 30 days from issue date.
                  </Typography>
                </Box>
              </SectionCard>
            </Box>

            {/* Footer actions */}
            <Box sx={{ px: 2, py: 2.1, borderTop: "0.5px solid", borderColor: "divider", display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ borderColor: "divider", color: "text.primary", "&:hover": { bgcolor: "background.default" } }}
              >
                Accept
              </Button>

              <Button
                variant="contained"
                size="small"
                fullWidth
                disableElevation
                sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "#0C447C" } }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}