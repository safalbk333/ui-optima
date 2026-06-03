'use client';

import {
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { fetchPurchaseRequestById, updatePurchaseRequest } from 'src/store/slices/PurchaseRequests/PurchaseRequestsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import PremiumBreadcrumbs from 'src/components/DynamicBreadcrumbs/page';
import { useSearchParams } from 'next/navigation';

export default function ApprovalReviewScreen() {
  const searchParams = useSearchParams();
const prId = searchParams.get('PR_ID');
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (prId) {
      dispatch(fetchPurchaseRequestById(prId));
    }
  }, [prId, dispatch]);
  const { selected, loading } = useAppSelector(
    (state) => state.purchaseRequests
  );
  console.log(selected,'selected')
  const APPROVED_STATUS_ID = '0b882a87-d4ed-415b-8ff0-80daf0a91331';
const REJECTED_STATUS_ID = '8cdf40a5-dc92-42df-8ced-886eec85d133';
const handleStatusChange = async (statusId: string) => {
  if (!selected) return;

const payload = {
  strTitle: selected.chr_title,
  strDescription: selected.txt_description,
  strCurrentStatusId: statusId, // Approved or Rejected ID
  strPriorityId: selected.fk_chr_priority_id,
  intEstimatedValue: selected.flt_estimated_value,
  strCurrency: selected.chr_currency,
  strDepartmentId: selected.fk_chr_department_id,
  strCategoryId: selected.fk_chr_category_id,
  strModifiedId: '00004d78-422a-451d-9771-fef9aa8cf8a6',
  arrItems: selected.pr_item_mappings?.map((item: any) => ({
    strItemId: item.fk_chr_item_id,
    intQuantity: item.int_quantity,
  })),
};

  try {
    await dispatch(
      updatePurchaseRequest({
        id: selected.pk_chr_request_id,
        payload,
      })
    ).unwrap();

    console.log('Status updated successfully');
  } catch (error) {
    console.error(error);
  }
};
  return (
    <Box

    >
              <Box mb={2}>
        <PremiumBreadcrumbs
          title="Approval"
          paths={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Approval', href: '/approval' },
                        { label: 'Approval', href: '/approval/view' },

          ]}

        />
      </Box>

      <Box mb={2} sx={{ borderTop: '1px dashed #d1d5db' }} />

      {/* Content */}
      <Box py={1}>
        {/* Header Info */}
<Box
  display="grid"
  gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
  gap={4}
  mb={3}
>
  {/* REQUESTER */}
  <Box>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      REQUESTER
    </Typography>

    <Typography fontSize={16} fontWeight={600} mt={0.5}>
      {selected?.requested_by?.chr_user_name || '-'}
    </Typography>
  </Box>

  {/* DEPARTMENT */}
  <Box>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      DEPARTMENT
    </Typography>

    <Typography fontSize={16} fontWeight={600} mt={0.5}>
      {selected?.department?.chr_department_name || '-'}
    </Typography>
  </Box>
{/* ESTIMATED VALUE */}
<Box>
  <Typography variant="caption" color="text.secondary" fontWeight={600}>
    ESTIMATED VALUE
  </Typography>

  <Typography fontSize={16} fontWeight={700} mt={0.5}>
    {selected?.chr_currency} {selected?.flt_estimated_value || 0}
  </Typography>
</Box>
  {/* PRIORITY / APPROVAL ROUTING */}
  <Box>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      PRIORITY / STATUS
    </Typography>

    <Typography fontSize={14} mt={0.5}>
      {selected?.priority?.chr_priority_name || '-'} →{' '}
      <Box component="span" sx={{ color: 'warning.main', fontWeight: 600 }}>
        {selected?.current_status?.chr_status_name || '-'}
      </Box>
    </Typography>
  </Box>


</Box>

        {/* Business Justification */}
        <Box mb={3}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            BUSINESS JUSTIFICATION
          </Typography>

          <Box

          >
<Typography fontSize={14}>
  {selected?.txt_description || '-'}
</Typography>
          </Box>
        </Box>

        {/* Items Table */}
        <Box
          sx={{
            borderRadius: 0,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <Table size="small">
<TableHead>
  <TableRow sx={{ bgcolor: 'grey.100' }}>
    <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
      ITEM
    </TableCell>

    <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
      QTY
    </TableCell>

    <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
      DESCRIPTION
    </TableCell>

    <TableCell sx={{ py: 1, fontSize: 12, fontWeight: 700 }}>
      CATEGORY
    </TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {selected?.pr_item_mappings?.map((line: any) => (
    <TableRow key={line.pk_chr_pr_item_mapping_id}>
      {/* ITEM */}
      <TableCell sx={{ py: 1.5, fontSize: 13 }}>
        <Box>
          <Typography fontSize={13} fontWeight={600}>
            {line.item?.chr_item_name || '-'}
          </Typography>

          <Typography fontSize={11} color="text.secondary">
            {line.item?.chr_item_code || ''}
          </Typography>
        </Box>
      </TableCell>

      {/* QTY */}
      <TableCell sx={{ py: 1.5, fontSize: 13 }}>
        {line.int_quantity || 0}
      </TableCell>

      {/* DESCRIPTION */}
      <TableCell sx={{ py: 1.5, fontSize: 13 }}>
        {line.item?.txt_description || '-'}
      </TableCell>

      {/* CATEGORY (NEW USEFUL INFO) */}
      <TableCell sx={{ py: 1.5, fontSize: 13 }}>
        {line.item?.category?.chr_category_name || '-'}
      </TableCell>
    </TableRow>
  ))}


</TableBody>
          </Table>
        </Box>

        {/* Remarks */}
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            REMARKS (REQUIRED FOR REJECT / DELEGATE)
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add remarks..."
            size="small"
            sx={{
              mt: 1,
              '& .MuiInputBase-input': {
                fontSize: 13,
              },
            }}
          />
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{ minWidth: 90 }}
          >
            Cancel
          </Button>



         <Button
  variant="outlined"
  color="error"
  sx={{ minWidth: 90 }}
  onClick={() => handleStatusChange(REJECTED_STATUS_ID)}
>
  Reject
</Button>

<Button
  variant="contained"
  color="primary"
  sx={{ minWidth: 90 }}
  onClick={() => handleStatusChange(APPROVED_STATUS_ID)}
>
  Approve
</Button>
        </Stack>
      </Box>
    </Box>
  );
}