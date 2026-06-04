import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------

export interface GoodsReceiptItem {
  pk_chr_gri_id: string;
  fk_chr_goods_receipt_id: string;
  fk_chr_item_id: string;
  int_quantity_ordered: number;
  int_quantity_received: number;
  int_quantity_rejected: number;
  chr_unit_of_measure: string;
  txt_rejection_reason: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  chr_document_status: string;

  item: {
    pk_chr_item_id: string;
    chr_item_name: string;
    chr_item_code: string;
    txt_description: string;
    fk_chr_category_id: string;
    chr_unit: string;
    chr_documents: string | null;
    tim_created: string;
    tim_modified: string | null;
    fk_chr_created_id: string | null;
    fk_chr_modified_id: string | null;
    chr_document_status: string;
  };
}

// ----------------------------------------------------------------------

export interface GoodsReceipt {
  pk_chr_goods_receipt_id: string;
  chr_grn_code: string;
  fk_chr_purchase_order_id: string;
  chr_status: string;
  dt_received_at: string;
  chr_delivery_note_no: string;
  txt_notes: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  txt_rendered_html: string;
  chr_document_status: string;

  purchase_order: {
    pk_chr_purchase_order_id: string;
    chr_po_number: string;
  };

  goods_receipt_items: GoodsReceiptItem[];
}

// ----------------------------------------------------------------------

interface GoodsReceiptState {
  data: GoodsReceipt[];
  loading: boolean;
  error: string | null;
}

const initialState: GoodsReceiptState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// FETCH GOODS RECEIPTS
// ----------------------------------------------------------------------

export const fetchGoodsReceipts = createAsyncThunk(
  'goodsReceipt/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/goods-receipt');

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch goods receipts'
      );
    }
  }
);
// ----------------------------------------------------------------------
// CREATE GOODS RECEIPT (POST)
// ----------------------------------------------------------------------

export const createGoodsReceipt = createAsyncThunk(
  'goodsReceipt/create',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.post('/goods-receipt', payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to create goods receipt'
      );
    }
  }
);
// ----------------------------------------------------------------------

const goodsReceiptSlice = createSlice({
  name: 'goodsReceipt',
  initialState,
  reducers: {
    clearGoodsReceipts: (state) => {
      state.data = [];
      state.error = null;
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(fetchGoodsReceipts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchGoodsReceipts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchGoodsReceipts.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })

    // CREATE
    .addCase(createGoodsReceipt.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createGoodsReceipt.fulfilled, (state, action) => {
      state.loading = false;

      // append newly created record to list
      state.data.unshift(action.payload);
    })
    .addCase(createGoodsReceipt.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export const { clearGoodsReceipts } = goodsReceiptSlice.actions;

export default goodsReceiptSlice.reducer;