import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// ----------------------------------------------------------------------

export interface Vendor {
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
  chr_document_status: string;
}

interface VendorState {
  data: Vendor[];
  loading: boolean;
  error: string | null;
}

const initialState: VendorState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// FETCH VENDORS
// ----------------------------------------------------------------------

export const fetchVendors = createAsyncThunk(
  'vendors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vendors`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch vendors'
      );
    }
  }
);

// ----------------------------------------------------------------------

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    clearVendors: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchVendors.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendors } = vendorSlice.actions;

export default vendorSlice.reducer;