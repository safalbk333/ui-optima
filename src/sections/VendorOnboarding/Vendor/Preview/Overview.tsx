import { Box, Grid, Paper, Typography } from '@mui/material';

import React from 'react';

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: '#6b7280',
  textTransform: 'none',
  mb: 0.4,
  letterSpacing: 0.3,
};

const valueStyle = {
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1.6,
};

function ProjectOverview() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: 'primary.main',
          mb: 2,
        }}
      >
        Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box>
            <Typography sx={labelStyle}>PR TITLE / DESCRIPTION *</Typography>

            <Typography sx={valueStyle}>HVAC Filter Replacement & Maintenance – Q2 2026</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography sx={labelStyle}>DEPARTMENT *</Typography>

            <Typography sx={valueStyle}>Network Operations</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography sx={labelStyle}>REQUIRED BY *</Typography>

            <Typography sx={valueStyle}>15-06-2026</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography sx={labelStyle}>BUDGET CODE *</Typography>

            <Typography sx={valueStyle}>OPEX-2026-FAC-07</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography sx={labelStyle}>COST CENTRE</Typography>

            <Typography sx={valueStyle}>CCTR-044 · Facilities Mgmt</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box>
            <Typography sx={labelStyle}>BUSINESS JUSTIFICATION *</Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: '#4b5563',
                lineHeight: 1.8,
              }}
            >
              HVAC filter units across 4 NOC sites are overdue for Q2 replacement per preventive
              maintenance schedule. Failure to replace will void OEM warranty and risk equipment
              damage.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProjectOverview;
