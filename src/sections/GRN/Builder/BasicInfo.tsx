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
import { fetchPurchaseRequestById, fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { createGoodsReceipt } from 'src/store/slices/Grn/GrnSlice';
import { fetchPurchaseOrders } from 'src/store/slices/PurchaseOrder/PRSlice';
import { fetchVendors } from 'src/store/slices/vendor/VendorSlice';
import { useRouter } from 'next/navigation';

export default function GRNBasic() {
  const router=useRouter()
  const dispatch=useAppDispatch()
  const [receivedDate, setReceivedDate] = React.useState<string>('');
const [notes, setNotes] = React.useState<string>('');
const [deliveryNotes, setDeliveryNotes] = React.useState<string>('');
  const { data: purchaseOrders, loading } = useAppSelector(
    (state) => state.purchaseOrder
  );
  const { data: purchaseRequests ,selected: selectedPurchaseRequest} = useAppSelector(
    (state) => state.purchaseRequests
  );
  console.log(selectedPurchaseRequest,'selectedPurchaseRequest')
  const [selectedPO, setSelectedPO] = React.useState<null | {
  label: string;
  id: string;
}>(null);
  const [selectedPR, setSelectedPR] = React.useState<null | {
  label: string;
  id: string;
}>(null);
const [selectedVendor, setSelectedVendor] = React.useState<null | {
  label: string;
  id: string;
}>(null);
console.log(purchaseRequests,'pr')
  React.useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);
    React.useEffect(() => {
      dispatch(fetchPurchaseRequests());
    }, [dispatch]);
    const { data: vendor } = useAppSelector(
      (state) => state.vendors
    );
    React.useEffect(() => {
      dispatch(fetchVendors());
    }, [dispatch]);
  console.log(vendor,'vendor')
const [items, setItems] = React.useState<any[]>([]);

React.useEffect(() => {
  if (!selectedPurchaseRequest?.pr_item_mappings) return;

  const mappedItems = selectedPurchaseRequest.pr_item_mappings.map((row, index) => ({
    id: index + 1,

    strItemId: row.item?.pk_chr_item_id || '',
    description: row.item?.chr_item_name || row.chr_item_description || '',

    intQuantityOrdered: row.int_quantity || 0,
    intQuantityReceived: row.int_quantity || 0,
    intQuantityRejected: 0,

    strUnitOfMeasure: row.item?.chr_unit || row.chr_unit_of_measure || '',

    strRejectionReason: '',
  }));

  setItems(mappedItems);
}, [selectedPurchaseRequest]);
const removeItem = (id: number) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
};
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
const poOptions =
  purchaseOrders?.map((po) => ({
    label: po.chr_po_number, // shown in UI
    id: po.pk_chr_purchase_order_id, // stored value
  })) || [];

const prOptions =
  purchaseRequests?.map((pr) => ({
    label: `${pr.chr_request_number} - ${pr.chr_title}`,
    id: pr.pk_chr_request_id,
  })) || [];
const vendorOptions =
  vendor?.map((v) => ({
    label: v.chr_vendor_name,
    id: v.pk_chr_vendor_id,
  })) || [];
const handleSubmit = async () => {
  const payload = {
    strGrnCode: `GRN-${Date.now()}`,
strPurchaseOrderId: selectedPO?.id,
strRequestId: selectedPR?.id,
strVendorId: selectedVendor?.id,    strStatus: 'PENDING',
    strReceivedAt: receivedDate ? new Date(receivedDate).toISOString() : '',
    strDeliveryNoteNo: deliveryNotes,
    strNotes: notes,
    strCreatedId: '120ecf54-e333-475f-bd25-3bc1621b7bbd',
    arrItems: items.map((item) => ({
      strItemId: item.strItemId,
      intQuantityOrdered: item.intQuantityOrdered,
      intQuantityReceived: item.intQuantityReceived,
      intQuantityRejected: item.intQuantityRejected,
      strUnitOfMeasure: item.strUnitOfMeasure,
      strRejectionReason: item.strRejectionReason,
    })),
  };

  try {
    const result = await dispatch(createGoodsReceipt(payload)).unwrap();

    console.log('Created GRN:', result);

    router.push('/grn');
  } catch (error) {
    console.error('GRN create failed:', error);
  }
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
<Autocomplete
  options={poOptions}
  size="small"
  value={selectedPO}
  getOptionLabel={(option) => option.label}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  onChange={(e, value) => {
    setSelectedPO(value); // full object stored
    console.log('Stored PO ID:', value?.id); // only id if needed
  }}
  renderInput={(params) => (
    <TextField {...params} label="PO Selection" sx={smallInputSx} />
  )}
/>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
  options={prOptions}
  size="small"
  value={selectedPR}
  getOptionLabel={(option) => option.label}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  // onChange={(e, value) => {
  //   setSelectedPR(value);
  //   console.log('Selected PR ID:', value?.id);
  // }}
  onChange={(e, value) => {
  setSelectedPR(value);

  if (value?.id) {
    dispatch(fetchPurchaseRequestById(value.id));
  }
}}
  renderInput={(params) => (
    <TextField {...params} label="Purchase Request" sx={smallInputSx} />
  )}
/>
          </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
  options={vendorOptions}
  size="small"
  value={selectedVendor}
  getOptionLabel={(option) => option.label}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  onChange={(e, value) => {
    setSelectedVendor(value);
    console.log('Selected Vendor ID:', value?.id);
  }}
  renderInput={(params) => (
    <TextField {...params} label="Vendor Name" sx={smallInputSx} />
  )}
/>
</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  type="date"
  size="small"
  label="Received Date"
  value={receivedDate}
  onChange={(e) => setReceivedDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
  sx={smallInputSx}
/>
          </Grid>


          <Grid size={{ xs: 6 }}>
<TextField
  fullWidth
  multiline
  minRows={2}
  size="small"
  label="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  sx={smallInputSx}
/>
          </Grid>
          <Grid size={{ xs: 6 }}>
<TextField
  fullWidth
  multiline
  minRows={2}
  size="small"
  label="Delivery Notes"
  value={deliveryNotes}
  onChange={(e) => setDeliveryNotes(e.target.value)}
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

<Box sx={{ overflow: 'hidden' }}>
  {/* Header */}
  <Grid
    container
    sx={{
      borderBottom: '1px solid #e5e7eb',
      py: 1,
      px: 1,
    }}
  >
    <Grid size={{ xs: 3 }}>
      <Typography fontSize={11} fontWeight={600}>
        Item
      </Typography>
    </Grid>
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={11} fontWeight={600}>
        Ordered
      </Typography>
    </Grid>
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={11} fontWeight={600}>
        Received
      </Typography>
    </Grid>
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={11} fontWeight={600}>
        Remaining
      </Typography>
    </Grid>
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={11} fontWeight={600}>
        UOM
      </Typography>
    </Grid>
    <Grid size={{ xs: 2 }}>
      <Typography fontSize={11} fontWeight={600}>
        Status
      </Typography>
    </Grid>

  </Grid>

  {/* Rows */}
{items.map((row, index) => (
  <Grid container key={row.id} sx={{ py: 1, px: 1, alignItems: 'center' }}>
    
    {/* Item */}
    <Grid size={{ xs: 3 }}>
      <Typography fontSize={13} fontWeight={600}>
        {row.description}
      </Typography>
    </Grid>

    {/* Ordered */}
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={12}>
        {row.intQuantityOrdered}
      </Typography>
    </Grid>

    {/* Received */}
    <Grid size={{ xs: 1.5 }}>
      <TextField
        size="small"
        value={row.intQuantityReceived}
        onChange={(e) => {
          const value = Number(e.target.value);
          setItems((prev) =>
            prev.map((it, i) =>
              i === index ? { ...it, intQuantityReceived: value } : it
            )
          );
        }}
        sx={{ width: 70 }}
      />
    </Grid>

    {/* Rejected */}
    <Grid size={{ xs: 1.5 }}>
      <TextField
        size="small"
        value={row.intQuantityRejected}
        onChange={(e) => {
          const value = Number(e.target.value);
          setItems((prev) =>
            prev.map((it, i) =>
              i === index ? { ...it, intQuantityRejected: value } : it
            )
          );
        }}
        sx={{ width: 70 }}
      />
    </Grid>

    {/* UOM */}
    <Grid size={{ xs: 1.5 }}>
      <Typography fontSize={12}>{row.strUnitOfMeasure}</Typography>
    </Grid>

    {/* Rejection Reason */}
    <Grid size={{ xs: 2 }}>
      <TextField
        size="small"
        value={row.strRejectionReason}
        onChange={(e) => {
          const value = e.target.value;
          setItems((prev) =>
            prev.map((it, i) =>
              i === index ? { ...it, strRejectionReason: value } : it
            )
          );
        }}
        placeholder="Reason"
      />
    </Grid>

  </Grid>
))}
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
        </Box>
    <Stack direction="row" justifyContent="flex-end" mt={3}>
  <Button
    variant="contained"
    onClick={handleSubmit}
    color='primary'
    sx={{borderRadius:0.5}}
  >
    Create GRN
  </Button>
</Stack>
      </Box>
    </Box>
  );
}
