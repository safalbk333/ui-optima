import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

export interface ItemCategory {
  pk_chr_category_id: string;
  chr_category_name: string;
  bln_is_active: boolean;
  chr_document_status: string;
  dt_deleted_at: string | null;
  tim_created: string;
  tim_modified: string | null;
  fk_chr_created_id: string | null;
  fk_chr_modified_id: string | null;
}

export interface Item {
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
  category: ItemCategory;
}

interface ItemState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  data: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------
// GET ALL ITEMS
// ----------------------------------------------------------------------

export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/item`
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch items'
      );
    }
  }
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItems: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchItems.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearItems } = itemSlice.actions;

export default itemSlice.reducer;