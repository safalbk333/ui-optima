'use client';

import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  CheckIcon,
  ContractValues,
  GreenChip,
  ValidationCard,
  ValidationSeverity,
  WarnIcon,
} from 'src/sections/Contract/ContractGenerator';

function ValidationPanel({ values }: { values: ContractValues }) {
  type ValidationCheck = {
    id: string;
    severity: ValidationSeverity;
    title: string;
    detail: string;
  };

  const checks: ValidationCheck[] = [
    {
      id: 'penalty',
      severity: 'warning',
      title: 'Penalty Cap — Review Recommended',
      detail: `Clause 3 caps penalties at 10% of annual value (${values.currency || 'USD'} ${
        values.contractValue
          ? (Number(values.contractValue.replace(/,/g, '')) * 0.1).toLocaleString()
          : '4,420'
      }). Industry standard for critical infrastructure SLAs is 15–20%. Consider increasing for NOC environments.`,
    },
    {
      id: 'termination',
      severity: 'warning',
      title: 'Termination Notice Period',
      detail:
        'Clause 5 specifies 30 days notice. For 4-site operational dependency, 60-day notice is advisable to ensure business continuity during transition.',
    },
    {
      id: 'payment',
      severity: 'success',
      title: 'Payment Terms — Compliant',
      detail: `Net-30 payment with GRN link is standard and defensible. WHT deduction at 10% per ZIMRA is correctly referenced.`,
    },
    {
      id: 'liability',
      severity: 'success',
      title: 'Liability Cap — Acceptable',
      detail:
        'Liability capped at preceding 12-month contract value. Proportional and standard for service agreements of this nature.',
    },
    {
      id: 'praz',
      severity: 'success',
      title: 'PRAZ & Compliance References — Complete',
      detail:
        'ZIMRA, PRAZ and ZACC obligations referenced correctly in Clause 7. Consistent with Zimbabwe legal framework.',
    },
  ];

  return (
    <Box>
      {/* Status badge */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: '#16a34a',
            boxShadow: '0 0 0 3px rgba(22,163,74,0.2)',
          }}
        />
        <GreenChip>VALIDATION COMPLETE</GreenChip>
      </Stack>

      {checks.map((c) => (
        <ValidationCard key={c.id} severity={c.severity}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Box
              sx={{
                mt: 0.2,
                flexShrink: 0,
                color: c.severity === 'warning' ? '#d97706' : '#16a34a',
              }}
            >
              {c.severity === 'warning' ? <WarnIcon size={13} /> : <CheckIcon size={13} />}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: c.severity === 'warning' ? '#92400e' : '#14532d',
                  mb: 0.4,
                }}
              >
                {c.title}
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#4b5563', lineHeight: 1.5 }}>
                {c.detail}
              </Typography>
            </Box>
          </Stack>
        </ValidationCard>
      ))}
    </Box>
  );
}

export default ValidationPanel;
