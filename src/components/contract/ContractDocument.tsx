'use client';

import { Edit } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import React, { useMemo, useRef } from 'react';
import { ContractValues } from 'src/sections/Contract/ContractGenerator';
import EditableInline from './EditableInline';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

export const parseTemplate = (html: string, data: Record<string, string | number>) => {
  return html.replace(/{{(.*?)}}/g, (_, key) => {
    const value = data[key.trim()];

    return value !== undefined ? String(value) : '';
  });
};

export const generateRfqCode = (startDate: string) => {
  if (!startDate) return '';

  const date = new Date(startDate);

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  return `RFQ-${year}${month}${day}`;
};

function ContractDocument({
  values,
  setValues,
  editMode,
}: {
  values: ContractValues;
  setValues: React.Dispatch<React.SetStateAction<ContractValues>>;
  editMode: boolean;
}) {
  const { templateHtmlContentData, templateByCodeLoading } = useSelector(
    (state: RootState) => state.contractReducer
  );

  const templateValues = {
    company_name: values.clientName,
    buyer_name: values.vendor,
    rfq_code: generateRfqCode(values?.startDate),
    rfq_title: values.contractTitle,
    category_name: values?.contractType ?? '',
    department_name: '',
    priority_name: '',
    buyer_email: values?.clientEmail,
    buyer_phone: values?.clientPhone,
    rfq_status: 'OPEN',
    currency: values.currency,
    generated_at: new Date().toLocaleString(),
    dt_issue_date: values?.startDate,
    dt_due_date: values?.endDate,
    dt_submission_deadline: values?.endDate,
  };

  console.log(values, "values")

  const parsedHtml = useMemo(() => {
    if (!templateHtmlContentData) return '';

    return parseTemplate(templateHtmlContentData, templateValues);
  }, [templateHtmlContentData, values]);

  // Stable contract ID (memoised so it doesn't re-randomise on every re-render)
  const contractId = useRef(
    `CTR-2026-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`
  ).current;

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Helper to update a single ContractValues field
  const field = (key: keyof ContractValues) => (val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  // ── Derived display values ────────────────────────────────────────────────
  const contractValueFormatted = values.contractValue
    ? Number(values.contractValue.replace(/,/g, '')).toLocaleString()
    : '44,200';

  const performanceBond = values.contractValue
    ? (Number(values.contractValue.replace(/,/g, '')) * 0.1).toLocaleString()
    : '4,420';

  // ── Edit-mode tooltip banner ──────────────────────────────────────────────
  const EditBanner = editMode ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        p: '6px 12px',
        borderRadius: 1.5,
        background: alpha('#3b82f6', 0.08),
        border: `1px solid ${alpha('#3b82f6', 0.25)}`,
      }}
    >
      <Edit sx={{ fontSize: 13, color: '#3b82f6' }} />
      <Typography sx={{ fontSize: 11, color: '#1d4ed8', fontWeight: 600 }}>
        Edit mode — click any text field to edit it directly
      </Typography>
    </Box>
  ) : null;

  if (templateByCodeLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: '#fff',
        overflowY: 'auto',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
    </Box>
  );
}

export default ContractDocument;
