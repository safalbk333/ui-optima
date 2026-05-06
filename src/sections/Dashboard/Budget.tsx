'use client';

import * as React from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
  LinearProgress,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

// ---- Custom Progress Bar ----
const ProgressContainer = styled(Box)({
  position: 'relative',
  height: 10,
  borderRadius: 6,
  overflow: 'hidden',
  background: '#e0e0e0',
});

const Segment = styled(Box)<{ color: string; width: number }>(({ color, width }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: `${width}%`,
  backgroundColor: color,
}));

// ---- Budget Card ----
function BudgetCard({
  title,
  year,
  total,
  committed,
  pending,
}: any) {
  const committedPct = (committed / total) * 100;
  const pendingPct = (pending / total) * 100;
  const remaining = total - committed;
  const remainingAfterPending = total - committed - pending;

  return (
    <Card sx={{ p: 3, borderRadius: 0,bgcolor:'transparent' }}>
      <Stack spacing={1}>
        {/* Header */}
        <Typography fontSize={14} fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {year}
        </Typography>

        {/* Progress Bar */}
        <ProgressContainer>
          <Segment color="#4B8BBE" width={committedPct} />
          <Segment color="#E09F1F" width={committedPct + pendingPct} />
        </ProgressContainer>

        {/* Details */}
        <Stack spacing={1.5}>
          <Row label="Total budget" value={`${total.toLocaleString()} USD`} percent="100%" />

          <Row
            label="Committed"
            value={`${committed.toLocaleString()} USD`}
            percent={`${Math.round(committedPct)}%`}
            dot="#4B8BBE"
          />

          <Row
            label="Remaining"
            value={`${remaining.toLocaleString()} USD`}
            percent={`${Math.round((remaining / total) * 100)}%`}
            bold
          />

          <Row
            label="Pending requests"
            value={`${pending.toLocaleString()} USD`}
            percent={`${Math.round(pendingPct)}%`}
            dot="#E09F1F"
          />

          <Row
            label="Remaining after pending requests"
            value={`${remainingAfterPending.toLocaleString()} USD`}
            percent={`${Math.round((remainingAfterPending / total) * 100)}%`}
            dot="#9E9E9E"
            bold
          />
        </Stack>
      </Stack>
    </Card>
  );
}

// ---- Row Component ----
function Row({ label, value, percent, dot, bold }: any) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        {dot && (
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: dot,
            }}
          />
        )}
        <Typography fontSize={14} fontWeight={bold ? 600 : 400}>{label}</Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography fontSize={14} fontWeight={bold ? 600 : 400}>{value}</Typography>
        <Typography fontSize={14} color="text.secondary">{percent}</Typography>
      </Stack>
    </Stack>
  );
}

// ---- Main Page ----
export default function BudgetUI() {
  return (
    <Box mb={3}>
      <Stack spacing={3}>
        {/* Header */}
        <Typography fontSize={15} fontWeight={600}>
          Budgets
        </Typography>

        {/* Search + Filter */}
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search for a Budget..."
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />

          <Button variant="outlined" startIcon={<FilterListIcon />}>
            Filters
          </Button>
        </Stack>

        {/* Cards */}
        <BudgetCard
          title="NY HQ Roll Up"
          year="2025"
          total={1250000}
          committed={652410}
          pending={117373}
        />

        <BudgetCard
          title="NY IT Hardware"
          year="2025"
          total={500000}
          committed={134282}
          pending={90000}
        />
      </Stack>
    </Box>
  );
}