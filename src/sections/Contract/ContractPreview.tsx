'use client';

import { AppDispatch, RootState, } from 'src/store/store';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import {
  CheckIcon,
  ContractValues,
  CreateContractIcon,
  DownloadIcon,
  GreenChip,
  PrinterIcon,
} from './ContractGenerator';
import ContractDocument, { generateRfqCode } from 'src/components/contract/ContractDocument';
import { Document, Packer, Paragraph } from 'docx';
import React, { useEffect, useRef, useState } from 'react';
import { createContract, fetchTemplateByCode } from 'src/store/slices/contract/contractSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Edit } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import saveAs from 'file-saver';
import { toast } from 'src/components/snackbar';

function ContractPreview() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const {
    createContractLoading,
    createContractData,
    createContractError,
    createContractErrorMessage,
  } = useSelector((state: RootState) => state.contract);

  const [values, setValues] = useState<ContractValues>({
    clientEmail: '',
    clientName: '',
    clientPhone: '',
    contractTitle: '',
    contractType: '',
    contractValue: '',
    contractValueWords: '',
    currency: '',
    endDate: '',
    governingLaw: '',
    paymentTerms: '',
    scope: '',
    startDate: '',
    vendor: '',
  });
  const documentRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const contract = window.sessionStorage.getItem('contractDetails');

    let parsedData = null;

    if (typeof contract === 'string') {
      parsedData = JSON.parse(contract);
    }

    setValues(parsedData);
  }, []);

  useEffect(() => {
    const payload = {
      templateCode: 'RFQ',
    };

    dispatch(fetchTemplateByCode(payload));
  }, [dispatch]);

  const handleDownloadPdf = async () => {
    if (!documentRef.current) return;

    const canvas = await html2canvas(documentRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save(`RFQ-${new Date().getTime()}.pdf`);
  };

  const handleDownloadDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph('Contract Document'),
            new Paragraph(values.contractTitle),
            new Paragraph(values.clientName),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    saveAs(blob, 'Contract.docx');
  };

  const handleCreateContract = async () => {
    try {
      const payload = {
        contractCode: generateRfqCode(values.startDate),
        title: values.contractTitle,
        description: values.scope,
        startDate: values.startDate,
        endDate: values.endDate,
        value: Number(values.contractValue),
        vendorId: values.vendor,
        strHtmlContent: documentRef.current?.innerHTML || '',
      };

      await dispatch(createContract(payload)).unwrap();

      toast.success('Contract created successfully');
    } catch (error) {
      console.error({ error });
      toast.error('Contract is not created!');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 1.8,
          borderBottom: `1px solid ${editMode ? alpha('#3b82f6', 0.3) : '#e5e7eb'}`,
          position: 'sticky',
          top: 0,
          bgcolor: editMode ? alpha('#3b82f6', 0.03) : '#fff',
          zIndex: 10,
          transition: 'background 0.25s, border-color 0.25s',
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <Typography sx={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>
              Contract Preview
            </Typography>

            <Tooltip title={editMode ? 'Exit edit mode' : 'Edit contract'} placement="top" arrow>
              <IconButton
                size="small"
                onClick={() => setEditMode((prev) => !prev)}
                sx={{
                  // ── Color indicator: icon colour changes by mode ──
                  color: editMode ? '#3b82f6' : '#6b7280',
                  bgcolor: editMode ? alpha('#3b82f6', 0.1) : 'transparent',
                  border: `1.5px solid ${editMode ? alpha('#3b82f6', 0.35) : 'transparent'}`,
                  borderRadius: 1.5,
                  p: '4px',
                  transition: 'color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    bgcolor: editMode ? alpha('#3b82f6', 0.18) : '#f3f4f6',
                    boxShadow: editMode
                      ? `0 0 0 3px ${alpha('#3b82f6', 0.18)}`
                      : '0 0 0 3px #f3f4f6',
                  },
                }}
              >
                <Edit
                  sx={{
                    fontSize: 15,
                    // Icon itself pulses subtly when in edit mode
                    animation: editMode ? 'editPulse 2.4s ease-in-out infinite' : 'none',
                    '@keyframes editPulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.65 },
                    },
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* ── Mode label badge next to the icon ────────────────── */}
            {editMode && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: '2px',
                  borderRadius: 10,
                  bgcolor: alpha('#3b82f6', 0.1),
                  border: `1px solid ${alpha('#3b82f6', 0.25)}`,
                  color: '#1d4ed8',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  userSelect: 'none',
                }}
              >
                EDITING
              </Box>
            )}
          </Box>

          <Typography sx={{ fontSize: 11, color: '#6b7280' }}>
            {values.contractType} · {values.vendor} · {values.clientName}
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Validation badge inside preview */}
            <GreenChip>
              <CheckIcon size={10} />
              VALIDATED
            </GreenChip>
            <Button
              size="small"
              variant="contained"
              startIcon={
                createContractLoading ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <CreateContractIcon />
                )
              }
              disabled={createContractLoading}
              onClick={handleCreateContract}
              sx={{
                minWidth: 140,
                justifyContent: 'center',
                bgcolor: '#16a34a',
                color: '#fff',
                textTransform: 'none',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#15803d',
                  boxShadow: 'none',
                },
              }}
            >
              {createContractLoading ? 'Creating...' : 'Create Contract'}
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                minWidth: 140,
                justifyContent: 'center',
                borderColor: '#e5e7eb',
                color: '#374151',
                textTransform: 'none',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
              }}
              onClick={handleDownloadDocx}
            >
              Download DOCX
            </Button>

            <Button
              size="small"
              variant="contained"
              startIcon={<PrinterIcon />}
              sx={{
                minWidth: 140,
                justifyContent: 'center',
                bgcolor: theme.palette.primary.main,
                textTransform: 'none',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: 'none',
              }}
              onClick={handleDownloadPdf}
            >
              Print
            </Button>
          </Stack>
        </Box>
      </Box>
      {createContractError && (
        <Typography
          color="error"
          sx={{
            fontSize: 12,
            mt: 1,
            p: 2,
          }}
        >
          {createContractErrorMessage}
        </Typography>
      )}
      <Box
        sx={{
          flex: 1,
          p: { xs: 3, md: 1 },
          bgcolor: editMode ? '#f0f4ff' : '#f8f8f8',
          overflowY: 'auto',
          transition: 'background 0.25s',
        }}
        ref={documentRef}
      >
        <ContractDocument values={values} setValues={setValues} editMode={editMode} />
      </Box>
    </>
  );
}

export default ContractPreview;
