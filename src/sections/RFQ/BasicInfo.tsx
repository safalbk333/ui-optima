'use client';

import * as React from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import AddIcon from '@mui/icons-material/Add';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createRFQ } from 'src/store/slices/Rfq/RfqSlice';
import { fetchEOIs } from 'src/store/slices/Eoi/EoiSlice';
import { fetchItems } from 'src/store/slices/Item/Items';
import { fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { useRouter } from 'next/navigation';

export default function RFQBuilderForm() {
  // ----------------------------------------------------------------------
  // ROUTER
  // ----------------------------------------------------------------------

  const router = useRouter();

  // ----------------------------------------------------------------------
  // LOCAL STATE
  // ----------------------------------------------------------------------

  const [selectedPR, setSelectedPR] = React.useState<{
    label: string;
    value: string;
  } | null>(null);

  const [selectedEOI, setSelectedEOI] = React.useState<{
    label: string;
    value: string;
  } | null>(null);

  const [rfqTitle, setRfqTitle] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [submissionDeadline, setSubmissionDeadline] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const [items, setItems] = React.useState([
    {
      id: Date.now(),
      itemId: '',
      quantity: '',
    },
  ]);

  // ----------------------------------------------------------------------
  // REDUX
  // ----------------------------------------------------------------------

  const dispatch = useAppDispatch();

  const { data: purchaseRequests, loading } = useAppSelector(
    (state) => state.purchaseRequests
  );

  const { data: item } = useAppSelector(
    (state) => state.items
  );

  const {
    data: eois,
    loading: eoiLoading,
    error,
  } = useAppSelector((state) => state.eoi);

  // ----------------------------------------------------------------------
  // EFFECTS
  // ----------------------------------------------------------------------

  React.useEffect(() => {
    dispatch(fetchPurchaseRequests());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchEOIs());
  }, [dispatch]);

  // ----------------------------------------------------------------------
  // OPTIONS
  // ----------------------------------------------------------------------

  const purchaseRequestOptions =
    purchaseRequests?.map((pr) => ({
      label: pr.chr_title,
      value: pr.pk_chr_request_id,
    })) || [];

  const itemOptions =
    item?.map((itm) => ({
      label: itm.chr_item_name,
      value: itm.pk_chr_item_id,
      unit: itm.chr_unit,
    })) || [];

  const eoiOptions =
    eois?.map((eoi) => ({
      label: eoi.chr_eoi_title,
      value: eoi.pk_chr_eoi_id,
      requestId: eoi.fk_chr_request_id,
      vendorId: eoi.fk_chr_vendor_id,
    })) || [];

  // ----------------------------------------------------------------------
  // HELPERS
  // ----------------------------------------------------------------------

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemId: '',
        quantity: '',
      },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ----------------------------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------------------------

  const handleSubmit = async () => {
    const payload = {
      strRfqCode: `RFQ-${Date.now()}`,
      strRfqTitle: rfqTitle,
      strRequestId: selectedPR?.value || '',
      strEoiId: selectedEOI?.value || '',
      strStatus: 'DRAFT',
      strIssueDate: new Date().toISOString(),
      strDueDate: dueDate,
      strSubmissionDeadline: submissionDeadline,
      strNotes: notes,
      strCreatedId: '120ecf54-e333-475f-bd25-3bc1621b7bbd',

      arrItems: items.map((item) => ({
        strItemId: item.itemId,
        intQuantity: Number(item.quantity),
      })),
    };

    try {
      const result = await dispatch(createRFQ(payload)).unwrap();

      console.log('RFQ Created:', result);

      router.push('/rfq');
    } catch (error) {
      console.error(error);
    }

    console.log(payload);
  };

  // ----------------------------------------------------------------------
  // STYLES
  // ----------------------------------------------------------------------

  const smallInputSx = {
    '& .MuiInputBase-root': {
      fontSize: 12,
      minHeight: 34,
      bgcolor: '#fff',
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px 10px',
    },
  };
  return (
    <Box>
      <Box maxWidth={700}>
        {/* RFQ Details */}
        <Typography fontSize={13} fontWeight={600}>
          Basic Details
        </Typography>
        <Typography fontSize={11} color="text.secondary" mb={2}>
          Create supplier quotation request
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="RFQ Title"
               value={rfqTitle}
  onChange={(e) => setRfqTitle(e.target.value)}
              placeholder="Laptop Procurement"
              sx={smallInputSx}
            />
          </Grid>


          <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  type="date"
  size="small"
  label="Due Date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
  sx={smallInputSx}
/>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
  <Autocomplete
    options={purchaseRequestOptions}
    value={selectedPR}
    onChange={(_, newValue) => {
      setSelectedPR(newValue);

      console.log('Selected PR ID:', newValue?.value);
      console.log('Selected PR Title:', newValue?.label);
    }}
    size="small"
    renderInput={(params) => (
      <TextField
        {...params}
        label="Purchase Request"
        placeholder="Select Purchase Request"
        sx={smallInputSx}
      />
    )}
  />
</Grid>
<Grid size={{ xs: 12, md: 6 }}>
  <Autocomplete
    options={eoiOptions}
    value={selectedEOI}
    onChange={(_, newValue) => {
      setSelectedEOI(newValue);

      console.log('EOI ID:', newValue?.value);
      console.log('EOI Title:', newValue?.label);
    }}
    size="small"
    loading={eoiLoading}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Expression of Interest"
        placeholder="Select EOI"
        sx={smallInputSx}
      />
    )}
  />
</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  type="date"
  size="small"
  label="Submission Deadline"
  value={submissionDeadline}
  onChange={(e) => setSubmissionDeadline(e.target.value)}
  InputLabelProps={{ shrink: true }}
  sx={smallInputSx}
/>
          </Grid>
    


          <Grid size={{ xs: 12 }}>
<TextField
  fullWidth
  multiline
  minRows={2}
  size="small"
  label="Description"
  placeholder="Enter RFQ description"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  sx={smallInputSx}
/>
          </Grid>
        </Grid>

        {/* Line Items */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2.5} mb={1}>
          <Typography fontSize={13} fontWeight={600}>
            Line Items
          </Typography>
        </Stack>

        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
<Grid
  container
  spacing={1}
  sx={{
    px: 1,
    py: 0.8,
    borderBottom: '1px solid #e2e8f0',
  }}
>
  <Grid size={{ xs: 8 }}>
    <Typography fontSize={11} fontWeight={700} color="text.secondary">
      Item
    </Typography>
  </Grid>

  <Grid size={{ xs: 3 }}>
    <Typography fontSize={11} fontWeight={700} color="text.secondary">
      Qty
    </Typography>
  </Grid>

  <Grid size={{ xs: 1 }} />
</Grid>

          {/* Rows */}
          {items.map((row) => (
            <Grid
              container
              spacing={1}
              key={row.id}
              sx={{
                px: 1,
                py: 1,
                alignItems: 'center',
                borderBottom: '1px solid #edf2f7',
              }}
            >
<Grid size={{ xs: 8 }}>
<Autocomplete
  options={itemOptions}
  getOptionLabel={(option) => option.label}
  value={
    itemOptions.find((opt) => opt.value === row.itemId) || null
  }
  onChange={(_, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === row.id
          ? { ...item, itemId: value?.value || '' }
          : item
      )
    );
  }}
  size="small"
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Select Item"
      sx={smallInputSx}
    />
  )}
/>
</Grid>

<Grid size={{ xs: 3 }}>
<TextField
  fullWidth
  size="small"
  type="number"
  value={row.quantity}
  onChange={(e) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === row.id
          ? { ...item, quantity: e.target.value }
          : item
      )
    );
  }}
  sx={smallInputSx}
/>
</Grid>

<Grid size={{ xs: 1 }}>
  <IconButton
    size="small"
    onClick={() => removeItem(row.id)}
    sx={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: 'rgba(244, 67, 54, 0.10)',
      color: '#d32f2f',
      '&:hover': {
        backgroundColor: 'rgba(244, 67, 54, 0.18)',
      },
    }}
  >
    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
  </IconButton>
</Grid>
            </Grid>
          ))}
          <Box
            sx={{
              mt: 'auto',
              pt: 1,
              px:1,
              display: 'flex',
              justifyContent: 'flex-start',
              // borderTop: '1px solid',
              // borderColor: 'divider',
            }}
          >
            <Button
              startIcon={<AddIcon sx={{ fontSize: 14 }} />}
              size="small"
              variant="outlined"
              onClick={addItem}
              sx={{
                textTransform: 'none',
                fontSize: 11,
                minHeight: 28,
              }}
            >
              Add Item
            </Button>
          </Box>
        </Box>

        {/* Attachment Section */}
        <Typography fontSize={13} fontWeight={600} mt={2.5} mb={1}>
          Attachments
        </Typography>

        <Typography fontSize={11} color="text.secondary" mb={1.5}>
          Upload RFQ related documents and supporting files
        </Typography>

        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          {/* Uploaded Files */}


          {/* Upload Area */}
          <Box
            sx={{
              borderTop: '1px solid #f1f5f9',
              py: 2,
            }}
          >
            <Box
              component="label"
              sx={{
                border: '1px dashed #dbe3ec',
                borderRadius: 1,
                minHeight: 170,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: '0.2s',

                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(64,106,175,0.03)',
                },
              }}
            >
              <input type="file" hidden multiple />

              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  bgcolor: 'rgba(64,106,175,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  mb: 1.5,
                }}
              >
                <CloudUploadOutlinedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography fontSize={13} fontWeight={600}>
                Drop your files here
              </Typography>

              <Typography fontSize={11} color="text.secondary" mt={0.5}>
                or click to browse multiple attachments
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" color='primary' sx={{borderRadius:0.5}} onClick={handleSubmit}>
  Create RFQ
</Button>
        </Box>

      </Box>
    </Box>
  );
}
