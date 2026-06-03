import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------

export interface PurchaseRequest {
  pk_chr_request_id: string;
  chr_request_number: string;

  chr_title: string;
  txt_description: string;

  fk_chr_current_status_id: string;
  fk_chr_priority_id: string;
  fk_chr_department_id: string;
  fk_chr_category_id: string;
  fk_chr_requested_by_id: string;

  flt_estimated_value: number;
  chr_currency: string;

  tim_created: string;
  chr_document_status: string;

  pr_item_mappings?: any[];

  current_status?: {
    chr_status_name: string;
    chr_status_code: string;
  };

  priority?: {
    chr_priority_name: string;
    chr_priority_code: string;
    int_level: number;
  };

  requested_by?: {
    chr_user_name: string;
    chr_user_email: string;
  };

  department?: {
    chr_department_name: string;
    chr_department_code: string;
  };

  category?: {
    chr_category_name: string;
  };
}
interface PurchaseRequestState {
  data: PurchaseRequest[];
  selected?: PurchaseRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseRequestState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// CREATE
// ----------------------------------------------------------------------

export const createPurchaseRequest = createAsyncThunk(
  'purchaseRequests/create',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.post('/purchase-requests', payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to create purchase request'
      );
    }
  }
);

// ----------------------------------------------------------------------
// GET ALL
// ----------------------------------------------------------------------

export const fetchPurchaseRequests = createAsyncThunk(
  'purchaseRequests/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/purchase-requests');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch purchase requests'
      );
    }
  }
);

// ----------------------------------------------------------------------
// GET BY ID
// ----------------------------------------------------------------------

export const fetchPurchaseRequestById = createAsyncThunk(
  'purchaseRequests/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get(`/purchase-requests/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch purchase request'
      );
    }
  }
);

// ----------------------------------------------------------------------
// UPDATE (PUT)
// ----------------------------------------------------------------------

export const updatePurchaseRequest = createAsyncThunk(
  'purchaseRequests/update',
  async (
    { id, payload }: { id: string; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosOptima.put(
        `/purchase-requests/${id}`,
        payload
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to update purchase request'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequests',
  initialState,
  reducers: {
    clearPurchaseRequests: (state) => {
      state.data = [];
      state.selected = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------------- FETCH ALL ----------------
      .addCase(fetchPurchaseRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPurchaseRequests.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- CREATE ----------------
      .addCase(createPurchaseRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(createPurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchaseRequest.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- GET BY ID ----------------
      .addCase(fetchPurchaseRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPurchaseRequestById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE ----------------
      .addCase(updatePurchaseRequest.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.data.findIndex(
          (item) => item.pk_chr_request_id === action.payload.pk_chr_request_id
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }

        // also update selected if open
        state.selected = action.payload;
      })
      .addCase(updatePurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePurchaseRequest.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPurchaseRequests } = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;