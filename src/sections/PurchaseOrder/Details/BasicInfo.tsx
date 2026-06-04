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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createPurchaseOrder } from 'src/store/slices/PurchaseOrder/PRSlice';
import { fetchPurchaseRequests } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { fetchQuotations } from 'src/store/slices/Quotation/Quotation';
import { fetchRFQs } from 'src/store/slices/Rfq/RfqSlice';
import { fetchVendors } from 'src/store/slices/vendor/VendorSlice';
import { useRouter } from 'next/navigation';

const currencyOptions = ['USD', 'EUR', 'INR'];



export default function POView() {
  const [selectedRFQ, setSelectedRFQ] = React.useState<any | null>(null);
  const [items, setItems] = React.useState([
    {
      id: 1,
    },
  ]);
  const [selectedQuotation, setSelectedQuotation] =
  React.useState<any | null>(null);
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] =
  React.useState<any | null>(null);
  const [selectedVendor, setSelectedVendor] = React.useState<any | null>(null);
const dispatch = useAppDispatch();
const [issueDate, setIssueDate] = React.useState('');
const [expectedDelivery, setExpectedDelivery] = React.useState('');
const [totalValue, setTotalValue] = React.useState('');
const [currency, setCurrency] = React.useState('USD');
const [deliveryAddress, setDeliveryAddress] = React.useState('');
const { data: vendor, loading } = useAppSelector(
  (state) => state.vendors
);
React.useEffect(() => {
  dispatch(fetchVendors());
}, [dispatch]);
const { data: rfqs } = useAppSelector(
  (state) => state.rfq
);
const { data: purchaseRequests } = useAppSelector(
  (state) => state.purchaseRequests
);
const { data: quotations } = useAppSelector(
  (state) => state.quotations
);
const router=useRouter()
React.useEffect(() => {
  dispatch(fetchQuotations());
}, [dispatch]);
React.useEffect(() => {
  dispatch(fetchRFQs());
}, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchPurchaseRequests());
  }, [dispatch]);
console.log(quotations,'quotations')
  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now() }]);
  };

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
  const vendors = [
  { id: 1, name: 'ABC Suppliers' },
  { id: 2, name: 'Global Traders' },
  { id: 3, name: 'Prime Industries' },
  { id: 4, name: 'Tech Procurement Ltd' },
  { id: 5, name: 'Elite Manufacturing' },
];
const SELECT_ALL = {
  id: 0,
  name: 'Select All',
};
 const [selectedVendors, setSelectedVendors] = React.useState<any[]>([]);

  const options = [SELECT_ALL, ...vendors];

  const handleChange = (_: any, value: any[]) => {
    const isSelectAllClicked = value.some(
      (option) => option.id === SELECT_ALL.id
    );

    if (isSelectAllClicked) {
      const allSelected = selectedVendors.length === vendors.length;

      setSelectedVendors(allSelected ? [] : vendors);
      return;
    }

    setSelectedVendors(value);
  };
const handleSubmit = async () => {
const payload = {
  strRequestId: selectedPurchaseRequest?.pk_chr_request_id || '',

  strPoNumber: `PO-${Date.now()}`,

  strVendorId: selectedVendor?.pk_chr_vendor_id || '',

  strQuotationId: selectedQuotation?.pk_chr_quotation_id || '',

  intTotalValue: Number(totalValue) || 0,

  strCurrency: currency,

  strIssuedAt: issueDate ? new Date(issueDate).toISOString() : '',

  strDeliveryAddress: deliveryAddress,

  strExpectedDelivery: expectedDelivery
    ? new Date(expectedDelivery).toISOString()
    : '',

  strCreatedId: '120ecf54-e333-475f-bd25-3bc1621b7bbd',
};

  try {
    console.log('PO Payload:', payload);

    const result = await dispatch(
      createPurchaseOrder(payload)
    ).unwrap();

    console.log('PO Created:', result);

    router.push('/purchase_orders');
  } catch (error) {
    console.error('Failed to create purchase order:', error);
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
    options={purchaseRequests || []}
    size="small"
    fullWidth
    value={selectedPurchaseRequest}
    onChange={(_, value) => setSelectedPurchaseRequest(value)}
    getOptionLabel={(option) => option?.chr_title || ''}
    isOptionEqualToValue={(option, value) =>
      option.pk_chr_request_id === value.pk_chr_request_id
    }
    renderInput={(params) => (
      <TextField
        {...params}
        label="Purchase Request"
        placeholder="Select Purchase Request"
      />
    )}
  />
</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
  options={vendor || []}
  loading={loading}
  size="small"
  fullWidth
  value={selectedVendor}
  onChange={(_, value) => setSelectedVendor(value)}
  getOptionLabel={(option) => option?.chr_vendor_name || ''}
  isOptionEqualToValue={(option, value) =>
    option.pk_chr_vendor_id === value.pk_chr_vendor_id
  }
  renderInput={(params) => (
    <TextField
      {...params}
      label="Vendor"
      placeholder="Select Vendor"
    />
  )}
/>
          </Grid>
<Grid size={{ xs: 12, md: 6 }}>
  <Autocomplete
    options={quotations || []}
    size="small"
    fullWidth
    value={selectedQuotation}
    onChange={(_, value) => {
      console.log(value, 'SELECTED QUOTATION');
      setSelectedQuotation(value);
    }}
    getOptionLabel={(option) =>
      `${option?.rfq?.chr_rfq_title || ''} - ${option?.vendor?.chr_vendor_name || ''}`
    }
    isOptionEqualToValue={(option, value) =>
      option.pk_chr_quotation_id === value.pk_chr_quotation_id
    }
    renderInput={(params) => (
      <TextField
        {...params}
        label="Quotation"
        placeholder="Select Quotation"
      />
    )}
  />
</Grid>

          <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  type="date"
  size="small"
  label="Issue Date"
  value={issueDate}
  onChange={(e) => setIssueDate(e.target.value)}
  InputLabelProps={{ shrink: true }}
/>
          </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  type="date"
  size="small"
  label="Expected Delivery Date"
  value={expectedDelivery}
  onChange={(e) => setExpectedDelivery(e.target.value)}
  InputLabelProps={{ shrink: true }}
/>
          </Grid>
          



                    <Grid size={{ xs: 12, md: 6 }}>
<TextField
  fullWidth
  size="small"
  label="Total Value"
  value={totalValue}
  onChange={(e) => setTotalValue(e.target.value)}
/>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
<Autocomplete
size='small'
  options={currencyOptions}
  value={currency}
  onChange={(_, value) => setCurrency(value || 'USD')}
  renderInput={(params) => (
    <TextField {...params} label="Currency" />
  )}
/>
          </Grid>



          <Grid size={{ xs: 12, md: 6 }}>
   <TextField
  fullWidth
  size="small"
  label="Delivery Location"
  value={deliveryAddress}
  onChange={(e) => setDeliveryAddress(e.target.value)}
/>
          </Grid>

        </Grid>





      </Box>
      <Box
  sx={{
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end',
  }}
>
  <Button
    variant="contained"
    onClick={handleSubmit}
    color='primary'
    sx={{
      textTransform: 'none',
      minWidth: 120,
      borderRadius:0.5
    }}
  >
    Create PO
  </Button>
</Box>
    </Box>
  );
}
