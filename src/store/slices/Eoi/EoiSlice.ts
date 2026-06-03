import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosOptima } from 'src/lib/axios';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

export interface EOIRequest {
  pk_chr_request_id: string;
  chr_request_number: string;
  chr_title: string;
  txt_description: string;
  fk_chr_current_status_id: string;
  fk_chr_priority_id: string;
  flt_estimated_value: number;
  chr_currency: string;
  fk_chr_requested_by_id: string;
  fk_chr_department_id: string;
  fk_chr_category_id: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  chr_document_status: string;
}

export interface EOIVendor {
  pk_chr_vendor_id: string;
  chr_vendor_name: string;
  chr_vendor_email: string;
  chr_vendor_phone: string;
  fk_chr_country_id: string | null;
  fk_chr_city_id: string | null;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
  fk_chr_company_id: string;
  chr_document_status: string;
}

export interface EOI {
  pk_chr_eoi_id: string;
  chr_eoi_code: string;
  chr_eoi_title: string;
  fk_chr_request_id: string;
  fk_chr_vendor_id: string;
  chr_status: string;
  txt_notes: string;
  dt_submission_deadline: string;
  dt_submitted_at: string;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string;
  fk_chr_modified_id: string | null;
  chr_document_status: string;

  request: EOIRequest;
  vendor: EOIVendor;
}

// Payload for Create EOI API
export interface CreateEOIPayload {
  chr_eoi_code: string;
  chr_eoi_title: string;
  fk_chr_request_id: string;
  fk_chr_vendor_id: string;
  chr_status?: string;
  txt_notes?: string;
  dt_submission_deadline: string;
}

interface EOIState {
  data: EOI[];
  loading: boolean;
  error: string | null;
}

const initialState: EOIState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL EOIs
// ----------------------------------------------------------------------

export const fetchEOIs = createAsyncThunk(
  'eoi/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.get('/eoi');

      console.log('EOI API Response:', response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch EOIs'
      );
    }
  }
);

// ----------------------------------------------------------------------
// CREATE EOI
// ----------------------------------------------------------------------

export const createEOI = createAsyncThunk(
  'eoi/create',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosOptima.post('/eoi', payload);

      console.log('Create EOI Response:', response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to create EOI'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const eoiSlice = createSlice({
  name: 'eoi',
  initialState,
  reducers: {
    clearEOIs: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ---------------- Fetch EOIs ----------------

      .addCase(fetchEOIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEOIs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchEOIs.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Create EOI ----------------

      .addCase(createEOI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createEOI.fulfilled, (state, action) => {
        state.loading = false;

        // Add newly created EOI to list
        state.data.unshift(action.payload);
      })

      .addCase(createEOI.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEOIs } = eoiSlice.actions;

export default eoiSlice.reducer;