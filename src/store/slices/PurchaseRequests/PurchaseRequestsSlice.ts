import { axiosOptima } from 'src/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// ----------------------------------------------------------------------

export interface PurchaseRequest {
  pk_chr_request_id: string;
  chr_request_number: string;
  chr_title: string;
  txt_description: string;
  flt_estimated_value: number;
  chr_currency: string;
  tim_created: string;
  chr_document_status: string;

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
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseRequestState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL PURCHASE REQUESTS
// ----------------------------------------------------------------------

export const fetchPurchaseRequests = createAsyncThunk(
  'purchaseRequests/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get(
        `${process.env.NEXT_PUBLIC_API_URL}/purchase-requests`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch purchase requests'
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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

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
      });
  },
});

export const { clearPurchaseRequests } = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;