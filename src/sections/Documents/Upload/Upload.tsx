'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FileEntry {
  id: string;
  file: File;
  name: string;
  size: string;
  mimeType: string;
  documentName: string;
}

interface SharedValues {
  vendorName: string;
  uploadedDate: string;
  documentType: string | null;
  expiryDate: string;
  tags: string[];
  description: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DOCUMENT_TYPES = ['Compliance', 'Certification', 'Finance', 'Insurance', 'Legal', 'Other'];
const ACCEPTED_FORMATS = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx';
const MAX_DESC_CHARS = 300;
const MAX_FILES = 10;
const TODAY = new Date().toISOString().split('T')[0];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function generateRefId(): string {
  return `DOC-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function getFileIcon(mimeType: string) {
  if (mimeType.includes('pdf')) return PictureAsPdfOutlinedIcon;
  if (mimeType.includes('image')) return ImageOutlinedIcon;
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return TableChartOutlinedIcon;
  return ArticleOutlinedIcon;
}

function getFileColor(mimeType: string, primaryColor: string): string {
  if (mimeType.includes('pdf')) return '#E24B4A';
  if (mimeType.includes('image')) return '#1D9E75';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return '#3B6D11';
  return primaryColor;
}

function fileToEntry(file: File): FileEntry {
  return {
    id: generateId(),
    file,
    name: file.name,
    size: formatFileSize(file.size),
    mimeType: file.type,
    documentName: file.name.replace(/\.[^/.]+$/, ''),
  };
}

// ─── Step Badge ───────────────────────────────────────────────────────────────

function StepBadge({ label, status }: { label: number; status: 'idle' | 'active' | 'done' }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: '1px solid',
        borderColor:
          status === 'idle'
            ? alpha(theme.palette.text.primary, 0.15)
            : status === 'active'
              ? theme.palette.primary.main
              : theme.palette.success.main,
        bgcolor:
          status === 'idle'
            ? 'transparent'
            : status === 'active'
              ? theme.palette.primary.main
              : theme.palette.success.main,
        color: status === 'idle' ? theme.palette.text.secondary : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 600,
        transition: 'all 0.25s ease',
      }}
    >
      {status === 'done' ? <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> : label}
    </Box>
  );
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────

function DropZone({ onFiles, compact }: { onFiles: (files: File[]) => void; compact?: boolean }) {
  const theme = useTheme();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFiles(files);
    },
    [onFiles]
  );

  return (
    <Box
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      sx={{
        border: '1.5px dashed',
        borderColor: dragging ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.2),
        borderRadius: 2,
        py: compact ? 2 : 5,
        px: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: dragging
          ? alpha(theme.palette.primary.main, 0.04)
          : alpha(theme.palette.grey[100], 0.6),
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FORMATS}
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files));
          e.target.value = '';
        }}
      />

      {compact ? (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <AddCircleOutlineIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
          <Typography fontSize={13} fontWeight={600} color="primary.main">
            Add more files
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            — drag & drop or browse
          </Typography>
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              width: 52,
              height: 52,
              bgcolor: '#fff',
              border: '1px solid',
              borderColor: alpha(theme.palette.text.primary, 0.1),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <CloudUploadOutlinedIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />
          </Box>

          <Typography fontSize={14} fontWeight={600} color="text.primary" mb={0.5}>
            Drag & drop files here
          </Typography>

          <Typography fontSize={12} color="text.secondary" mb={2}>
            Supports PDF, DOCX, XLSX, JPG, PNG — up to {MAX_FILES} files, max 25 MB each
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            sx={{ borderRadius: 1.5, fontSize: 12, fontWeight: 600, px: 2.5 }}
          >
            Browse files
          </Button>
        </>
      )}
    </Box>
  );
}

// ─── File Row (name only) ─────────────────────────────────────────────────────

interface FileRowProps {
  entry: FileEntry;
  index: number;
  onChange: (id: string, patch: Partial<FileEntry>) => void;
  onRemove: (id: string) => void;
  isLast: boolean;
}

function FileRow({ entry, index, onChange, onRemove, isLast }: FileRowProps) {
  const theme = useTheme();
  const FileIcon = getFileIcon(entry.mimeType);
  const iconColor = getFileColor(entry.mimeType, theme.palette.primary.main);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} py={1.5}>
        {/* File type icon */}
        <Box
          sx={{
            width: 36,
            height: 36,
            bgcolor: alpha(iconColor, 0.08),
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FileIcon sx={{ fontSize: 17, color: iconColor }} />
        </Box>

        {/* Index badge */}
        <Typography
          fontSize={11}
          fontWeight={700}
          color="text.secondary"
          sx={{ minWidth: 20, flexShrink: 0 }}
        >
          {index + 1}.
        </Typography>

        {/* Editable document name */}
        <TextField
          size="small"
          fullWidth
          value={entry.documentName}
          onChange={(e) => onChange(entry.id, { documentName: e.target.value })}
          placeholder="Document name"
          sx={{
            '& .MuiOutlinedInput-root': { fontSize: 13 },
          }}
        />

        {/* Original file name + size hint */}
        <Tooltip title={`${entry.name} · ${entry.size}`}>
          <Typography
            fontSize={11}
            color="text.secondary"
            noWrap
            sx={{ maxWidth: 100, flexShrink: 0, cursor: 'default' }}
          >
            {entry.size}
          </Typography>
        </Tooltip>

        {/* Remove */}
        <IconButton
          size="small"
          onClick={() => onRemove(entry.id)}
          sx={{
            flexShrink: 0,
            color: 'text.secondary',
            border: '1px solid',
            borderColor: alpha(theme.palette.text.primary, 0.12),
            borderRadius: 1,
            width: 28,
            height: 28,
            '&:hover': { color: 'error.main', borderColor: 'error.main' },
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Stack>

      {!isLast && (
        <Divider
          sx={{ borderStyle: 'dashed', borderColor: alpha(theme.palette.text.primary, 0.08) }}
        />
      )}
    </Box>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({
  count,
  refIds,
  onReset,
}: {
  count: number;
  refIds: string[];
  onReset: () => void;
}) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2.5}
      py={7}
      px={3}
      textAlign="center"
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: alpha(theme.palette.success.main, 0.1),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 32, color: theme.palette.success.main }} />
      </Box>

      <Box>
        <Typography fontSize={18} fontWeight={700} color="text.primary" mb={0.5}>
          {count} document{count > 1 ? 's' : ''} submitted successfully
        </Typography>
        <Typography fontSize={13} color="text.secondary" maxWidth={360} mx="auto">
          Your documents have been uploaded and queued for review. You'll be notified once each is
          processed.
        </Typography>
      </Box>

      <Stack spacing={1} alignItems="center">
        {refIds.map((id) => (
          <Chip
            key={id}
            label={`Ref #${id}`}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 10,
              px: 1,
            }}
          />
        ))}
      </Stack>

      <Button
        variant="outlined"
        size="small"
        onClick={onReset}
        sx={{ borderRadius: 1.5, fontSize: 13, fontWeight: 600, mt: 1 }}
      >
        Upload more documents
      </Button>
    </Stack>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UploadDocumentForm() {
  const theme = useTheme();

  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [shared, setShared] = useState<SharedValues>({
    vendorName: '',
    uploadedDate: TODAY,
    documentType: null,
    expiryDate: '',
    tags: [],
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [refIds, setRefIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const step1Status = entries.length > 0 ? 'done' : 'active';
  const step2Status = submitted ? 'done' : entries.length > 0 ? 'active' : 'idle';
  const step3Status = submitted ? 'done' : 'idle';
  const canAddMore = entries.length < MAX_FILES;

  const handleFiles = (files: File[]) => {
    const remaining = MAX_FILES - entries.length;
    const toAdd = files.slice(0, remaining).map(fileToEntry);
    setEntries((prev) => [...prev, ...toAdd]);
    setError('');
  };

  const handleEntryChange = (id: string, patch: Partial<FileEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSubmit = () => {
    if (!entries.length) {
      setError('Please add at least one file.');
      return;
    }
    if (!shared.vendorName.trim()) {
      setError('Please provide the uploader name.');
      return;
    }
    if (!shared.documentType) {
      setError('Please select a document type.');
      return;
    }
    const missing = entries.filter((e) => !e.documentName.trim());
    if (missing.length) {
      setError(
        `${missing.length} file${missing.length > 1 ? 's are' : ' is'} missing a document name.`
      );
      return;
    }
    setError('');
    setRefIds(entries.map(() => generateRefId()));
    setSubmitted(true);
  };

  const handleReset = () => {
    setEntries([]);
    setShared({
      vendorName: '',
      uploadedDate: TODAY,
      documentType: null,
      expiryDate: '',
      tags: [],
      description: '',
    });
    setSubmitted(false);
    setRefIds([]);
    setError('');
  };

  return (
    <Box>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: alpha(theme.palette.text.primary, 0.1),
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.text.primary, 0.08),
          }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <CloudUploadOutlinedIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Typography fontSize={15} fontWeight={700} color="text.primary">
                Upload Documents
              </Typography>
              {entries.length > 0 && (
                <Chip
                  label={`${entries.length} / ${MAX_FILES}`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                />
              )}
            </Stack>
            <Typography fontSize={13} color="text.secondary">
              Upload multiple vendor compliance documents at once
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <StepBadge label={1} status={step1Status} />
            <Box sx={{ width: 20, height: 1, bgcolor: alpha(theme.palette.text.primary, 0.15) }} />
            <StepBadge label={2} status={step2Status} />
            <Box sx={{ width: 20, height: 1, bgcolor: alpha(theme.palette.text.primary, 0.15) }} />
            <StepBadge label={3} status={step3Status} />
          </Stack>
        </Stack>

        {submitted ? (
          <SuccessState count={entries.length} refIds={refIds} onReset={handleReset} />
        ) : (
          <Box px={3} py={3}>
            {/* ── Drop Zone ── */}
            {entries.length === 0 ? (
              <Box mb={3}>
                <DropZone onFiles={handleFiles} />
              </Box>
            ) : canAddMore ? (
              <Box mb={2.5}>
                <DropZone onFiles={handleFiles} compact />
              </Box>
            ) : (
              <Box
                mb={2.5}
                px={2}
                py={1.2}
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.06),
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.warning.main, 0.2),
                }}
              >
                <Typography fontSize={12} color="warning.dark">
                  Maximum of {MAX_FILES} files reached. Remove a file to add another.
                </Typography>
              </Box>
            )}

            {/* ── File List (name only per file) ── */}
            {entries.length > 0 && (
              <Box
                mb={2.5}
                sx={{
                  border: '1px solid',
                  borderColor: alpha(theme.palette.text.primary, 0.1),
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 2,
                    py: 1.2,
                    bgcolor: alpha(theme.palette.grey[100], 0.6),
                    borderBottom: '1px solid',
                    borderColor: alpha(theme.palette.text.primary, 0.08),
                  }}
                >
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color="text.secondary"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    Files ({entries.length}) — edit names if needed
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    sx={{ fontSize: 12, fontWeight: 600, py: 0 }}
                    onClick={() => setEntries([])}
                  >
                    Clear all
                  </Button>
                </Stack>

                <Box px={2}>
                  {entries.map((entry, i) => (
                    <FileRow
                      key={entry.id}
                      entry={entry}
                      index={i}
                      onChange={handleEntryChange}
                      onRemove={handleRemoveEntry}
                      isLast={i === entries.length - 1}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* ── Shared Details Panel ── */}
            {entries.length > 0 && (
              <Box
                mb={2.5}
                sx={{
                  border: '1px solid',
                  borderColor: alpha(theme.palette.text.primary, 0.08),
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                {/* Panel header */}
                <Box
                  sx={{
                    px: 2,
                    py: 1.2,
                    bgcolor: alpha(theme.palette.grey[100], 0.6),
                    borderBottom: '1px solid',
                    borderColor: alpha(theme.palette.text.primary, 0.08),
                  }}
                >
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color="text.secondary"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    Shared details — applies to all files
                  </Typography>
                </Box>

                <Stack spacing={2.5} p={2}>
                  {/* Row 1: Uploaded By + Uploaded Date */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="Uploaded By *"
                      placeholder="Full name"
                      size="small"
                      sx={{ flex: 1 }}
                      value={shared.vendorName}
                      onChange={(e) => setShared((s) => ({ ...s, vendorName: e.target.value }))}
                    />
                    <TextField
                      label="Uploaded Date"
                      type="date"
                      size="small"
                      sx={{ flex: 1 }}
                      value={shared.uploadedDate}
                      onChange={(e) => setShared((s) => ({ ...s, uploadedDate: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>

                  {/* Row 2: Document Type + Expiry Date */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Autocomplete
                      size="small"
                      options={DOCUMENT_TYPES}
                      value={shared.documentType}
                      onChange={(_, val) => setShared((s) => ({ ...s, documentType: val }))}
                      sx={{ flex: 1 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Document Type *" placeholder="Select type" />
                      )}
                    />
                    <TextField
                      label="Expiry Date"
                      type="date"
                      size="small"
                      sx={{ flex: 1 }}
                      value={shared.expiryDate}
                      onChange={(e) => setShared((s) => ({ ...s, expiryDate: e.target.value }))}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: TODAY }}
                    />
                  </Stack>

                  {/* Row 3: Tags */}
                  <Autocomplete
                    multiple
                    freeSolo
                    size="small"
                    options={[]}
                    value={shared.tags}
                    onChange={(_, val) => setShared((s) => ({ ...s, tags: val as string[] }))}
                    renderTags={(value, getTagProps) =>
                      value.map((tag, i) => (
                        <Chip
                          {...getTagProps({ index: i })}
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            fontSize: 11,
                            '& .MuiChip-deleteIcon': { color: theme.palette.primary.main },
                          }}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="Type and press Enter to add tags…"
                      />
                    )}
                  />

                  {/* Row 4: Description */}
                  <Box>
                    <TextField
                      label="Description / Notes"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      value={shared.description}
                      onChange={(e) => setShared((s) => ({ ...s, description: e.target.value }))}
                      inputProps={{ maxLength: MAX_DESC_CHARS }}
                      placeholder="Add any notes or context about these documents…"
                    />
                    <Typography fontSize={11} color="text.secondary" textAlign="right" mt={0.5}>
                      {shared.description.length} / {MAX_DESC_CHARS}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}

            {/* ── Info Notice ── */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                p: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                borderRadius: 1.5,
              }}
            >
              <InfoOutlinedIcon
                sx={{ fontSize: 16, color: theme.palette.primary.main, mt: 0.1, flexShrink: 0 }}
              />
              <Typography fontSize={12} color="primary.main" lineHeight={1.6}>
                Uploaded documents will be reviewed within 2–3 business days. You'll receive an
                email once the status is updated. Ensure files are clearly named and valid before
                submitting.
              </Typography>
            </Stack>

            {/* ── Error ── */}
            {error && (
              <Alert severity="error" sx={{ mt: 2, fontSize: 13, borderRadius: 1.5 }}>
                {error}
              </Alert>
            )}

            {/* ── Actions ── */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
              pt={2.5}
              sx={{ borderTop: '1px solid', borderColor: alpha(theme.palette.text.primary, 0.08) }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ color: 'text.secondary', fontSize: 13 }}
                href="/documents"
              >
                Cancel
              </Button>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<SaveOutlinedIcon />}
                  disabled={entries.length === 0}
                  sx={{
                    borderRadius: 1,
                    fontSize: 13,
                    fontWeight: 600,
                    borderColor: alpha(theme.palette.text.primary, 0.2),
                    color: 'text.secondary',
                  }}
                >
                  Save as draft
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendOutlinedIcon />}
                  onClick={handleSubmit}
                  disabled={entries.length === 0}
                  sx={{ borderRadius: 1, fontSize: 13, fontWeight: 600, px: 2.5 }}
                >
                  Submit{entries.length > 1 ? ` ${entries.length} documents` : ' for review'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
