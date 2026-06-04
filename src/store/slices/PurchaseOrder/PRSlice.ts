import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// TYPES

export interface PurchaseOrderRequest {
  pk_chr_request_id: string;
  chr_request_number: string;
  chr_title: string;
}

export interface PurchaseOrderVendor {
  pk_chr_vendor_id: string;
  chr_vendor_name: string;
  chr_vendor_email: string;
}

export interface PurchaseOrderQuotation {
  pk_chr_quotation_id: string;
  chr_status: string;
}

export interface PurchaseOrder {
  pk_chr_purchase_order_id: string;
  fk_chr_request_id: string;
  chr_po_number: string;
  fk_chr_vendor_id: string;
  flt_total_value: number;
  chr_currency: string;
  dt_issued_at: string;
  chr_delivery_address: string;
  dt_expected_delivery: string;

  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;

  chr_document_status: string;
  fk_chr_quotation_id: string;

  txt_rendered_html: string | null;

  request: PurchaseOrderRequest;
  vendor: PurchaseOrderVendor;
  quotation: PurchaseOrderQuotation;
}

// ----------------------------------------------------------------------
// CREATE PAYLOAD
// ----------------------------------------------------------------------

export interface CreatePurchaseOrderPayload {
  strRequestId: string;
  strVendorId: string;
  strQuotationId: string;
  strPoNumber: string;
  fltTotalValue: number;
  strCurrency: string;
  strDeliveryAddress: string;
  strIssuedAt: string;
  strExpectedDelivery: string;
  strCreatedId: string;
}

// ----------------------------------------------------------------------
// STATE
// ----------------------------------------------------------------------

interface PurchaseOrderState {
  data: PurchaseOrder[];
  loading: boolean;
  createLoading: boolean;
  error: string | null;
}

const initialState: PurchaseOrderState = {
  data: [],
  loading: false,
  createLoading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL PURCHASE ORDERS
// ----------------------------------------------------------------------

export const fetchPurchaseOrders = createAsyncThunk(
  'purchaseOrder/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/purchase-order');

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          'Failed to fetch purchase orders'
      );
    }
  }
);

// ----------------------------------------------------------------------
// CREATE PURCHASE ORDER
// ----------------------------------------------------------------------

export const createPurchaseOrder = createAsyncThunk(
  'purchaseOrder/create',
  async (
    payload: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosOptima.post(
        '/purchase-order',
        payload
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          'Failed to create purchase order'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState,

  reducers: {
    clearPurchaseOrders: (state) => {
      state.data = [];
      state.error = null;
    },

    clearPurchaseOrderError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // FETCH PURCHASE ORDERS
      // ==========================

      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchPurchaseOrders.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // CREATE PURCHASE ORDER
      // ==========================

      .addCase(createPurchaseOrder.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })

      .addCase(createPurchaseOrder.fulfilled, (state, action) => {
        state.createLoading = false;

        if (action.payload) {
          state.data.unshift(action.payload);
        }
      })

      .addCase(
        createPurchaseOrder.rejected,
        (state, action: any) => {
          state.createLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearPurchaseOrders,
  clearPurchaseOrderError,
} = purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;